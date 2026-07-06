"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Container from "@/components/Container";
import KioskHeader from "@/components/demo/KioskHeader";
import KioskFooter from "@/components/demo/KioskFooter";
import StepTopBar from "@/components/demo/StepTopBar";
import OptionCard from "@/components/demo/OptionCard";
import ProductCard from "@/components/demo/ProductCard";
import {
  CATEGORIES,
  TAXONOMY,
  getBandForScore,
  type CategoryId,
  type CategoryTaxonomy,
  type ChoiceTaxonomy,
  type SurveyTaxonomy,
} from "@/lib/taxonomy";
import {
  IconVitamins,
  IconSkincare,
  IconFragrance,
  IconBone,
  IconBrain,
  IconVirus,
  IconStomach,
  IconEnergy,
  IconEye,
  IconStethoscope,
  IconHand,
  IconHeartPulse,
  IconBabyHand,
  IconMolecule,
  IconCollagen,
  IconJoint,
  IconCapsule,
  IconTablet,
  IconPowder,
  IconLiquid,
  IconGummi,
  IconCreamJar,
} from "@/components/icons/DemoIcons";

// Every category taxonomy shape is known statically here. A plain `if (x.kind !== ...)`
// guard doesn't survive into nested closures (JSX callbacks, helper functions defined
// later), so assert-and-return through a typed function instead — that gives these
// constants a concrete type, not a narrowed-at-one-point union.
function assertChoice(t: CategoryTaxonomy, name: string): ChoiceTaxonomy {
  if (t.kind !== "choice") throw new Error(`Expected ${name} to be a choice taxonomy`);
  return t;
}
function assertSurvey(t: CategoryTaxonomy, name: string): SurveyTaxonomy {
  if (t.kind !== "survey") throw new Error(`Expected ${name} to be a survey taxonomy`);
  return t;
}

const vitaminsTaxonomy = assertChoice(TAXONOMY.vitamins_supplements, "vitamins_supplements");
const skincareTaxonomy = assertSurvey(TAXONOMY.skincare, "skincare");
const fragrancesTaxonomy = assertSurvey(TAXONOMY.fragrances, "fragrances");

const [healthNeedQuestion, ingredientsQuestion, deliveryFormatQuestion] = vitaminsTaxonomy.questions;

const CATEGORY_ICONS: Record<CategoryId, ReactNode> = {
  vitamins_supplements: <IconVitamins />,
  skincare: <IconSkincare />,
  fragrances: <IconFragrance />,
};

const HEALTH_NEED_ICONS: Record<string, ReactNode> = {
  bone_joints_muscles: <IconBone />,
  brain_mind: <IconBrain />,
  cold_flu_immunity: <IconVirus />,
  digestive_health: <IconStomach />,
  energy_performance_recovery: <IconEnergy />,
  eye_health: <IconEye />,
  general_health_wellbeing: <IconStethoscope />,
  hair_skin_nails: <IconHand />,
  heart_circulation: <IconHeartPulse />,
  kids_health: <IconBabyHand />,
};

const INGREDIENT_ICONS: Record<string, ReactNode> = {
  calcium: <IconMolecule label="Ca" />,
  vitamin_d3: <IconMolecule label="D3" />,
  magnesium: <IconMolecule label="Mg" />,
  collagen: <IconCollagen />,
  glucosamine_chondroitin: <IconJoint />,
};

const DELIVERY_FORMAT_ICONS: Record<string, ReactNode> = {
  capsule: <IconCapsule />,
  tablet: <IconTablet />,
  powder: <IconPowder />,
  liquid: <IconLiquid />,
  gummi: <IconGummi />,
  cream: <IconCreamJar />,
};

// Only this one health need is wired up end-to-end for the demo — everything else stays
// dimmed, same restriction as before.
const ENABLED_HEALTH_NEED = "bone_joints_muscles";

type StepKey =
  | "category"
  | "health_need"
  | "ingredients"
  | "delivery_format"
  | "moisture"
  | "pigment"
  | "tolerance"
  | "floral_fresh"
  | "sweet_earthy"
  | "light_intense"
  | "results";

// All three flows are 5 steps long — keeps the step counter uniform across categories.
const FLOWS: Record<CategoryId, StepKey[]> = {
  vitamins_supplements: ["category", "health_need", "ingredients", "delivery_format", "results"],
  skincare: ["category", "moisture", "pigment", "tolerance", "results"],
  fragrances: ["category", "floral_fresh", "sweet_earthy", "light_intense", "results"],
};

const STEP_META: Record<StepKey, { breadcrumb: string; heading: string; subheading: string }> = {
  category: {
    breadcrumb: "Select Category",
    heading: "First, select a category",
    subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum.",
  },
  health_need: {
    breadcrumb: "Health Needs",
    heading: "Next, select by need",
    subheading:
      "Tell us what you need help with—whether it's energy, immunity, digestion, or something else.",
  },
  ingredients: {
    breadcrumb: "Vitamins",
    heading: "Are you specifically after a particular vitamin/supplement?",
    subheading:
      "You can select up to two options from the list of vitamins and supplements below to tailor your preferences.",
  },
  delivery_format: {
    breadcrumb: "Vitamin Type",
    heading: "Do you have a preferred type in mind?",
    subheading: "Select the delivery format that best suits your patient's preferences or dietary needs.",
  },
  moisture: {
    breadcrumb: "Skin Assessment",
    heading: "Let's check your skin's moisture",
    subheading: "Answer these quick questions about how your skin feels day-to-day.",
  },
  pigment: {
    breadcrumb: "Skin Assessment",
    heading: "Now, a bit about your skin tone",
    subheading: "These help us understand how your skin reacts to sun and healing.",
  },
  tolerance: {
    breadcrumb: "Skin Assessment",
    heading: "Finally, how sensitive is your skin?",
    subheading: "This helps us avoid recommending anything too harsh for you.",
  },
  floral_fresh: {
    breadcrumb: "Scent Profile",
    heading: "Floral or fresh — what's your style?",
    subheading: "Pick the point on the spectrum that feels most like you.",
  },
  sweet_earthy: {
    breadcrumb: "Scent Profile",
    heading: "Sweet or earthy?",
    subheading: "Choose whichever feels closest to your usual taste.",
  },
  light_intense: {
    breadcrumb: "Scent Profile",
    heading: "How strong do you like your scent?",
    subheading: "From a light everyday spritz to a bold statement scent.",
  },
  results: {
    breadcrumb: "Product Recommendations",
    heading: "Recommended Products",
    subheading: "Based on your selections, here are the top products that best match your needs.",
  },
};

const VITAMIN_PRODUCTS = [
  { rank: "01", name: "Blackmores Special Tablet", location: "Aisle 4, Bay 10", price: "$0.20 Per Dose" },
  { rank: "02", name: "Swisse BCDS", location: "Aisle 4, Bay 12", price: "$0.30 Per Dose" },
  {
    rank: "03",
    name: "Wagner Special Tablet",
    location: "Aisle 5, Bay 1",
    price: "$0.31 Per Dose",
    badge: { label: "Staff Pick", className: "bg-sky-600" },
  },
  {
    rank: "04",
    name: "Wagner Special Tablet",
    location: "Aisle 4, Bay 13",
    price: "$0.39 Per Dose",
    badge: { label: "Best Seller", className: "bg-brand" },
  },
  {
    rank: "05",
    name: "Cenovis Special Tablet",
    location: "Aisle 4, Bay 14",
    price: "$0.42 Per Dose",
    badge: { label: "Most Recommended", className: "bg-orange-500" },
  },
];

type ScoredProduct = { name: string; location: string; price: string; scores: Record<string, number> };

const SKINCARE_PRODUCTS: ScoredProduct[] = [
  {
    name: "Hydraboost Rich Cream",
    location: "Aisle 2, Bay 3",
    price: "$18.50 Per Unit",
    scores: { moisture: 11, pigment: 8, tolerance: 9 },
  },
  {
    name: "Balance Daily Lotion",
    location: "Aisle 2, Bay 4",
    price: "$14.00 Per Unit",
    scores: { moisture: 8, pigment: 8, tolerance: 8 },
  },
  {
    name: "UltraLight Gel Moisturizer",
    location: "Aisle 2, Bay 5",
    price: "$12.90 Per Unit",
    scores: { moisture: 5, pigment: 6, tolerance: 7 },
  },
  {
    name: "Soothe Sensitive Balm",
    location: "Aisle 2, Bay 6",
    price: "$16.20 Per Unit",
    scores: { moisture: 9, pigment: 7, tolerance: 11 },
  },
  {
    name: "Brightening Pigment Serum",
    location: "Aisle 2, Bay 7",
    price: "$22.00 Per Unit",
    scores: { moisture: 7, pigment: 11, tolerance: 8 },
  },
];

const FRAGRANCE_PRODUCTS: ScoredProduct[] = [
  {
    name: "Rose Bloom EDP",
    location: "Aisle 6, Bay 1",
    price: "$65.00",
    scores: { floral_fresh: 1, sweet_earthy: 2, light_intense: 3 },
  },
  {
    name: "Ocean Citrus Splash",
    location: "Aisle 6, Bay 2",
    price: "$48.00",
    scores: { floral_fresh: 5, sweet_earthy: 4, light_intense: 2 },
  },
  {
    name: "Amber Musk Woods",
    location: "Aisle 6, Bay 3",
    price: "$72.00",
    scores: { floral_fresh: 3, sweet_earthy: 5, light_intense: 5 },
  },
  {
    name: "Vanilla Sky Gourmand",
    location: "Aisle 6, Bay 4",
    price: "$58.00",
    scores: { floral_fresh: 2, sweet_earthy: 1, light_intense: 4 },
  },
  {
    name: "Green Fern Fresh",
    location: "Aisle 6, Bay 5",
    price: "$39.00",
    scores: { floral_fresh: 4, sweet_earthy: 3, light_intense: 1 },
  },
];

// Same distance formula as lib/widget/ranking.ts's survey-category branch — closest overall
// distance across every axis in `answers` wins, so different answers genuinely reorder results.
function rankByDistance(products: ScoredProduct[], answers: Record<string, number>) {
  function distance(product: ScoredProduct) {
    return Object.entries(answers).reduce(
      (sum, [axis, value]) => sum + Math.abs((product.scores[axis] ?? 0) - value),
      0,
    );
  }
  return [...products].sort((a, b) => distance(a) - distance(b));
}

function computeSkinAxisScores(answers: Record<string, number>) {
  const scores: Record<string, number> = { moisture: 0, pigment: 0, tolerance: 0 };
  for (const q of skincareTaxonomy.questions) {
    scores[q.axis] += answers[q.id] ?? 2; // neutral default for unanswered questions
  }
  return scores;
}

function bandSummary(taxonomy: typeof skincareTaxonomy, scores: Record<string, number>) {
  return taxonomy.axes
    .map((axis) => getBandForScore(axis, scores[axis.id] ?? 0)?.label)
    .filter(Boolean)
    .join(" · ");
}

function StepHeading({ heading, subheading }: { heading: string; subheading: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-2xl italic font-bold text-brand-dark sm:text-3xl">{heading}</h1>
      <p className="mt-3 text-sm text-muted">{subheading}</p>
    </div>
  );
}

function PillQuestion({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options: { label: string; points: number }[];
  value?: number;
  onSelect: (points: number) => void;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-5 text-left">
      <p className="font-medium text-brand-dark">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => onSelect(opt.points)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              value === opt.points
                ? "border-brand bg-brand-light text-brand-dark"
                : "border-black/10 text-muted hover:border-brand"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [category, setCategory] = useState<CategoryId>("vitamins_supplements");
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [skinAnswers, setSkinAnswers] = useState<Record<string, number>>({});
  const [fragranceAnswers, setFragranceAnswers] = useState<Record<string, number>>({});
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const flow = FLOWS[category];
  const stepKey = flow[stepIndex];
  const meta = STEP_META[stepKey];

  function selectCategory(id: CategoryId) {
    setCategory(id);
    setStepIndex(1);
    setSelectedIngredients([]);
    setSkinAnswers({});
    setFragranceAnswers({});
  }

  function goNext() {
    setStepIndex((i) => Math.min(flow.length - 1, i + 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function toggleIngredient(id: string) {
    setSelectedIngredients((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setSent(true);
  }

  let content: ReactNode = null;

  if (stepKey === "category") {
    content = (
      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
        {CATEGORIES.map((c) => (
          <OptionCard
            key={c.id}
            icon={CATEGORY_ICONS[c.id]}
            label={c.label}
            onClick={() => selectCategory(c.id)}
          />
        ))}
      </div>
    );
  } else if (stepKey === "health_need") {
    content = (
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {healthNeedQuestion.options.map((n) => (
          <OptionCard
            key={n.id}
            icon={HEALTH_NEED_ICONS[n.id]}
            label={n.label}
            enabled={n.id === ENABLED_HEALTH_NEED}
            onClick={() => n.id === ENABLED_HEALTH_NEED && goNext()}
          />
        ))}
      </div>
    );
  } else if (stepKey === "ingredients") {
    content = (
      <div>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {ingredientsQuestion.options.map((i) => (
            <OptionCard
              key={i.id}
              icon={INGREDIENT_ICONS[i.id]}
              label={i.label}
              description={i.description}
              selected={selectedIngredients.includes(i.id)}
              onClick={() => toggleIngredient(i.id)}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setSelectedIngredients([]);
              goNext();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Skip <span aria-hidden>⏭</span>
          </button>

          <button
            type="button"
            disabled={selectedIngredients.length === 0}
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand"
          >
            Next <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    );
  } else if (stepKey === "delivery_format") {
    content = (
      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
        {deliveryFormatQuestion.options.map((d) => (
          <OptionCard key={d.id} icon={DELIVERY_FORMAT_ICONS[d.id]} label={d.label} onClick={goNext} />
        ))}
      </div>
    );
  } else if (stepKey === "moisture" || stepKey === "pigment" || stepKey === "tolerance") {
    const questions = skincareTaxonomy.questions.filter((q) => q.axis === stepKey);
    content = (
      <div className="mx-auto max-w-2xl space-y-4">
        {questions.map((q) => (
          <PillQuestion
            key={q.id}
            label={q.label}
            options={q.options}
            value={skinAnswers[q.id]}
            onSelect={(points) => setSkinAnswers((prev) => ({ ...prev, [q.id]: points }))}
          />
        ))}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Next <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    );
  } else if (stepKey === "floral_fresh" || stepKey === "sweet_earthy" || stepKey === "light_intense") {
    const question = fragrancesTaxonomy.questions.find((q) => q.axis === stepKey)!;
    content = (
      <div className="mx-auto max-w-2xl">
        <PillQuestion
          label={question.label}
          options={question.options}
          value={fragranceAnswers[stepKey]}
          onSelect={(points) => {
            setFragranceAnswers((prev) => ({ ...prev, [stepKey]: points }));
            goNext();
          }}
        />
      </div>
    );
  } else {
    // results
    let products: { rank: string; name: string; location: string; price: string; badge?: { label: string; className: string } }[];
    let summary: string | null = null;

    if (category === "vitamins_supplements") {
      products = VITAMIN_PRODUCTS;
    } else if (category === "skincare") {
      const scores = computeSkinAxisScores(skinAnswers);
      summary = bandSummary(skincareTaxonomy, scores);
      products = rankByDistance(SKINCARE_PRODUCTS, scores).map((p, idx) => ({
        rank: String(idx + 1).padStart(2, "0"),
        name: p.name,
        location: p.location,
        price: p.price,
        badge: idx === 0 ? { label: "Best Match", className: "bg-brand" } : undefined,
      }));
    } else {
      summary = bandSummary(fragrancesTaxonomy, fragranceAnswers);
      products = rankByDistance(FRAGRANCE_PRODUCTS, fragranceAnswers).map((p, idx) => ({
        rank: String(idx + 1).padStart(2, "0"),
        name: p.name,
        location: p.location,
        price: p.price,
        badge: idx === 0 ? { label: "Best Match", className: "bg-brand" } : undefined,
      }));
    }

    content = (
      <div>
        {summary && (
          <p className="mx-auto -mt-4 mb-6 max-w-2xl text-center text-sm font-medium text-brand-dark">
            Your Profile: {summary}
          </p>
        )}

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((p) => (
            <ProductCard
              key={p.rank}
              rank={p.rank}
              name={p.name}
              location={p.location}
              price={p.price}
              badge={p.badge}
            />
          ))}
        </div>

        <form
          onSubmit={handleSend}
          className="mx-auto mt-10 max-w-md rounded-xl border border-black/10 bg-white p-6"
        >
          <p className="text-sm font-medium text-brand-dark">Need it later? Text yourself the list now.</p>
          <div className="mt-3 flex gap-2">
            <span className="flex items-center gap-1 rounded-lg border border-black/10 px-3 text-sm text-muted">
              🇦🇺 +61
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setSent(false);
              }}
              placeholder="XXX XXX XXX"
              className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              {sent ? "Sent ✓" : "Send"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <KioskHeader />

      <main className="flex-1 py-10">
        <Container className="space-y-8">
          <StepTopBar
            label={meta.breadcrumb}
            step={stepIndex + 1}
            total={flow.length}
            onBack={stepIndex > 0 ? goBack : undefined}
          />

          <StepHeading heading={meta.heading} subheading={meta.subheading} />

          {content}
        </Container>
      </main>

      <KioskFooter />
    </div>
  );
}
