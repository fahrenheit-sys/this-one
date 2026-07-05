"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Container from "@/components/Container";
import KioskHeader from "@/components/demo/KioskHeader";
import KioskFooter from "@/components/demo/KioskFooter";
import StepTopBar from "@/components/demo/StepTopBar";
import OptionCard from "@/components/demo/OptionCard";
import ProductCard from "@/components/demo/ProductCard";
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

const TOTAL_STEPS = 5;

const categories = [
  { id: "vitamins", label: "Vitamins & Supplements", count: "2,600", enabled: true, icon: <IconVitamins /> },
  { id: "skincare", label: "Skincare", count: "2,800", enabled: false, icon: <IconSkincare /> },
  { id: "fragrances", label: "Fragrances", count: "2,300", enabled: false, icon: <IconFragrance /> },
];

const healthNeeds = [
  { id: "bone", label: "Bone, Joints, Muscles", count: "153", enabled: true, icon: <IconBone /> },
  { id: "brain", label: "Brain & Mind", count: "9", enabled: false, icon: <IconBrain /> },
  { id: "immunity", label: "Cold, Flu & Immunity", count: "114", enabled: false, icon: <IconVirus /> },
  { id: "digestive", label: "Digestive Health", count: "53", enabled: false, icon: <IconStomach /> },
  {
    id: "energy",
    label: "Energy, Performance & Recovery",
    count: "2,300",
    enabled: false,
    icon: <IconEnergy />,
  },
  { id: "eye", label: "Eye Health", count: "15", enabled: false, icon: <IconEye /> },
  {
    id: "general",
    label: "General Health & Wellbeing",
    count: "141",
    enabled: false,
    icon: <IconStethoscope />,
  },
  { id: "hair", label: "Hair, Skin & Nails", count: "57", enabled: false, icon: <IconHand /> },
  { id: "heart", label: "Heart & Circulation", count: "26", enabled: false, icon: <IconHeartPulse /> },
  { id: "kids", label: "Kid's Health", count: "51", enabled: false, icon: <IconBabyHand /> },
];

const ingredients = [
  {
    id: "calcium",
    label: "Calcium",
    description: "Core mineral for strong bones and skeletal integrity.",
    icon: <IconMolecule label="Ca" />,
  },
  {
    id: "d3",
    label: "Vitamin D3",
    description: "Enhances calcium absorption and supports muscle function.",
    icon: <IconMolecule label="D3" />,
  },
  {
    id: "magnesium",
    label: "Magnesium",
    description: "Crucial for bone density, muscle relaxation, and cramp prevention.",
    icon: <IconMolecule label="Mg" />,
  },
  {
    id: "collagen",
    label: "Collagen",
    description: "(Type II or Hydrolyzed) – Supports joint health and connective tissue strength.",
    icon: <IconCollagen />,
  },
  {
    id: "glucosamine",
    label: "Glucosamine & Chondroitin",
    description: "Popular for joint cushioning, flexibility, and reducing inflammation",
    icon: <IconJoint />,
  },
];

const deliveryTypes = [
  { id: "capsule", label: "Capsule", icon: <IconCapsule /> },
  { id: "tablet", label: "Tablet", icon: <IconTablet /> },
  { id: "powder", label: "Powder", icon: <IconPowder /> },
  { id: "liquid", label: "Liquid", icon: <IconLiquid /> },
  { id: "gummi", label: "Gummi", icon: <IconGummi /> },
  { id: "cream", label: "Cream", icon: <IconCreamJar /> },
];

const products = [
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

const stepMeta: Record<number, { breadcrumb: string; heading: string; subheading: string }> = {
  1: {
    breadcrumb: "Select Category",
    heading: "First, select a category",
    subheading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum.",
  },
  2: {
    breadcrumb: "Health Needs",
    heading: "Next, select by need",
    subheading:
      "Tell us what you need help with—whether it's energy, immunity, digestion, or something else.",
  },
  3: {
    breadcrumb: "Vitamins",
    heading: "Are you specifically after a particular vitamin/supplement?",
    subheading:
      "You can select up to two options from the list of vitamins and supplements below to tailor your preferences.",
  },
  4: {
    breadcrumb: "Vitamin Type",
    heading: "Do you have a preferred type in mind?",
    subheading: "Select the delivery format that best suits your patient's preferences or dietary needs.",
  },
  5: {
    breadcrumb: "Product Recommendations",
    heading: "Recommended Products",
    subheading: "Based on your selections, here are the top supplements that best match your patients needs.",
  },
};

function StepHeading({ heading, subheading }: { heading: string; subheading: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-2xl italic font-bold text-brand-dark sm:text-3xl">{heading}</h1>
      <p className="mt-3 text-sm text-muted">{subheading}</p>
    </div>
  );
}

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const meta = stepMeta[step];

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

  if (step === 1) {
    content = (
      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
        {categories.map((c) => (
          <OptionCard
            key={c.id}
            icon={c.icon}
            label={c.label}
            sublabel={c.count}
            enabled={c.enabled}
            onClick={() => c.enabled && setStep(2)}
          />
        ))}
      </div>
    );
  } else if (step === 2) {
    content = (
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {healthNeeds.map((n) => (
          <OptionCard
            key={n.id}
            icon={n.icon}
            label={n.label}
            sublabel={n.count}
            enabled={n.enabled}
            onClick={() => n.enabled && setStep(3)}
          />
        ))}
      </div>
    );
  } else if (step === 3) {
    content = (
      <div>
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {ingredients.map((i) => (
            <OptionCard
              key={i.id}
              icon={i.icon}
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
              setStep(4);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Skip <span aria-hidden>⏭</span>
          </button>

          <button
            type="button"
            disabled={selectedIngredients.length === 0}
            onClick={() => setStep(4)}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand"
          >
            Next <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    );
  } else if (step === 4) {
    content = (
      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-3">
        {deliveryTypes.map((d) => (
          <OptionCard key={d.id} icon={d.icon} label={d.label} onClick={() => setStep(5)} />
        ))}
      </div>
    );
  } else {
    content = (
      <div>
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
            step={step}
            total={TOTAL_STEPS}
            onBack={step > 1 ? () => setStep((s) => s - 1) : undefined}
          />

          <StepHeading heading={meta.heading} subheading={meta.subheading} />

          {content}
        </Container>
      </main>

      <KioskFooter />
    </div>
  );
}
