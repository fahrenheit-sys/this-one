// Server-side source of truth for categories and their question flows.
// Mirrors app/demo/page.tsx's hardcoded arrays conceptually (same ids/labels/order for
// vitamins_supplements), but is a separate plain-data module — /demo has its own JSX icons
// and disabled-flag presentation logic and is intentionally left untouched.

export const CATEGORIES = [
  { id: "vitamins_supplements", label: "Vitamins & Supplements" },
  { id: "skincare", label: "Skincare" },
  { id: "fragrances", label: "Fragrances" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type TaxonomyOption = {
  id: string;
  label: string;
  description?: string;
};

export type TaxonomyQuestion = {
  id: string;
  label: string;
  type: "single" | "multi";
  maxSelect?: number;
  options: TaxonomyOption[];
};

export type SurveyOption = { label: string; points: 1 | 2 | 3 | 4 | 5 };

export type SurveyQuestion = {
  id: string;
  axis: string;
  label: string;
  options: SurveyOption[];
};

export type SurveyBand = { label: string; min: number; max: number };

export type SurveyAxis = {
  id: string;
  label: string;
  bands: SurveyBand[];
};

// "choice" categories present discrete tile/tag questions (Vitamins & Supplements).
// "survey" categories tally points across several questions per axis, then bucket the
// summed score into a band (Skincare) — a fundamentally different shape, not just a
// variant of "choice", so it's a separate branch of this union rather than forced into
// TaxonomyQuestion's shape.
export type ChoiceTaxonomy = { kind: "choice"; questions: TaxonomyQuestion[] };
export type SurveyTaxonomy = { kind: "survey"; axes: SurveyAxis[]; questions: SurveyQuestion[] };
export type CategoryTaxonomy = ChoiceTaxonomy | SurveyTaxonomy;

// Each category defines its own question flow — there is no shared shape across
// Vitamins & Supplements, Skincare, and Fragrances (confirmed with the product owner).
export const TAXONOMY: Record<CategoryId, CategoryTaxonomy> = {
  vitamins_supplements: {
    kind: "choice",
    questions: [
      {
        id: "health_need",
        label: "Health Need",
        type: "single",
        options: [
          { id: "bone_joints_muscles", label: "Bone, Joints, Muscles" },
          { id: "brain_mind", label: "Brain & Mind" },
          { id: "cold_flu_immunity", label: "Cold, Flu & Immunity" },
          { id: "digestive_health", label: "Digestive Health" },
          { id: "energy_performance_recovery", label: "Energy, Performance & Recovery" },
          { id: "eye_health", label: "Eye Health" },
          { id: "general_health_wellbeing", label: "General Health & Wellbeing" },
          { id: "hair_skin_nails", label: "Hair, Skin & Nails" },
          { id: "heart_circulation", label: "Heart & Circulation" },
          { id: "kids_health", label: "Kid's Health" },
        ],
      },
      {
        id: "ingredients",
        label: "Ingredients",
        type: "multi",
        maxSelect: 2,
        options: [
          {
            id: "calcium",
            label: "Calcium",
            description: "Core mineral for strong bones and skeletal integrity.",
          },
          {
            id: "vitamin_d3",
            label: "Vitamin D3",
            description: "Enhances calcium absorption and supports muscle function.",
          },
          {
            id: "magnesium",
            label: "Magnesium",
            description: "Crucial for bone density, muscle relaxation, and cramp prevention.",
          },
          {
            id: "collagen",
            label: "Collagen",
            description:
              "(Type II or Hydrolyzed) – Supports joint health and connective tissue strength.",
          },
          {
            id: "glucosamine_chondroitin",
            label: "Glucosamine & Chondroitin",
            description: "Popular for joint cushioning, flexibility, and reducing inflammation",
          },
        ],
      },
      {
        id: "delivery_format",
        label: "Delivery Format",
        type: "single",
        options: [
          { id: "capsule", label: "Capsule" },
          { id: "tablet", label: "Tablet" },
          { id: "powder", label: "Powder" },
          { id: "liquid", label: "Liquid" },
          { id: "gummi", label: "Gummi" },
          { id: "cream", label: "Cream" },
        ],
      },
    ],
  },
  // Dr Rich's 12 Skin Type Survey: 4 questions per axis (moisture, pigment, tolerance),
  // each answer worth 1-3 points, summed per axis into a 4-12 score and bucketed into a
  // band. Bands are deliberately asymmetric — Moisture has 3, Pigment/Tolerance only 2 —
  // matching the source survey exactly, not smoothed into 3 even bands.
  //
  // Products are scored with a single target number (4-12) per axis, not a band — the
  // product owner wants manufacturers forced to commit to a specific number rather than
  // hedge with a broad band that could cover "everyone." Matching against a shopper's
  // computed scores is by closest overall distance across all 3 axes (see
  // lib/widget/ranking.ts), not band membership.
  skincare: {
    kind: "survey",
    axes: [
      {
        id: "moisture",
        label: "Moisture",
        bands: [
          { label: "Greasy / Oily", min: 4, max: 6 },
          { label: "Normal", min: 7, max: 9 },
          { label: "Dry / Parched", min: 10, max: 12 },
        ],
      },
      {
        id: "pigment",
        label: "Pigment",
        bands: [
          { label: "Pigment forming skin", min: 4, max: 7 },
          { label: "Pale / light skin", min: 8, max: 12 },
        ],
      },
      {
        id: "tolerance",
        label: "Tolerance",
        bands: [
          { label: "Irritable skin", min: 4, max: 7 },
          { label: "Tolerant skin", min: 8, max: 12 },
        ],
      },
    ],
    questions: [
      {
        id: "moisture_q1",
        axis: "moisture",
        label: "Does your skin generally feel or look shiny or greasy?",
        options: [
          { label: "Severe", points: 1 },
          { label: "Moderate", points: 2 },
          { label: "Nil to mild", points: 3 },
        ],
      },
      {
        id: "moisture_q2",
        axis: "moisture",
        label: "With prolonged exposure to heating or air conditioning, does your skin feel",
        options: [
          { label: "Normal", points: 1 },
          { label: "Slightly dry / taut", points: 2 },
          { label: "Very dry / taut", points: 3 },
        ],
      },
      {
        id: "moisture_q3",
        axis: "moisture",
        label:
          "If you apply moisturizer and/or foundation in the morning, how does your skin feel by the afternoon?",
        options: [
          { label: "Normal to oily", points: 1 },
          { label: "Normal to a little dry", points: 2 },
          { label: "Taut, flaky, wrinkly", points: 3 },
        ],
      },
      {
        id: "moisture_q4",
        axis: "moisture",
        label: "After washing your face with normal soap, does your skin feel",
        options: [
          { label: "Oily / greasy", points: 1 },
          { label: "Normal", points: 2 },
          { label: "Dry, taut, flaky", points: 3 },
        ],
      },
      {
        id: "pigment_q1",
        axis: "pigment",
        label:
          "If you scratch, burn or damage your skin, do you get a colour/pigment forming in the damaged area after healing?",
        options: [
          { label: "Always", points: 1 },
          { label: "Sometimes", points: 2 },
          { label: "Never", points: 3 },
        ],
      },
      {
        id: "pigment_q2",
        axis: "pigment",
        label: "After a holiday in the sun is your skin",
        options: [
          { label: "Normal", points: 1 },
          { label: "A little darker", points: 2 },
          { label: "Pink, but not really darker", points: 3 },
        ],
      },
      {
        id: "pigment_q3",
        axis: "pigment",
        label: "If you are exposed to the sun without sunblock for 1 hour, the effect is",
        options: [
          { label: "Nil", points: 1 },
          { label: "Little red or uncomfortable", points: 2 },
          { label: "Red, sore, even blistered", points: 3 },
        ],
      },
      {
        id: "pigment_q4",
        axis: "pigment",
        label: "You consider your skin colour to be",
        options: [
          { label: "Tanned or dark", points: 1 },
          { label: "Middle of the range", points: 2 },
          { label: "Fair / pale", points: 3 },
        ],
      },
      {
        id: "tolerance_q1",
        axis: "tolerance",
        label: "Do cheap soaps and cleansers upset your skin?",
        options: [
          { label: "Always upset your skin", points: 1 },
          { label: "Sometimes upset", points: 2 },
          { label: "Never a problem", points: 3 },
        ],
      },
      {
        id: "tolerance_q2",
        axis: "tolerance",
        label: "Do you have a history of eczema, asthma, hay-fever or dermatitis?",
        options: [
          { label: "All or most of above", points: 1 },
          { label: "Some of above", points: 2 },
          { label: "Nil", points: 3 },
        ],
      },
      {
        id: "tolerance_q3",
        axis: "tolerance",
        label: "Does your face flush easily with emotional upset, alcohol, heat, spicy food?",
        options: [
          { label: "Severe", points: 1 },
          { label: "Sometimes", points: 2 },
          { label: "Never", points: 3 },
        ],
      },
      {
        id: "tolerance_q4",
        axis: "tolerance",
        label: "Do cheap or certain brands of makeup cause irritation and/or itch to your skin?",
        options: [
          { label: "Always or often", points: 1 },
          { label: "Sometimes", points: 2 },
          { label: "Never", points: 3 },
        ],
      },
    ],
  },
  // Simplified fragrance-wheel projection (Michael Edwards' wheel, reduced to 3 spectrums,
  // the third — Light vs Intense, day-vs-evening strength — added on top of the classic
  // Floral/Fresh and Sweet/Earthy pair) rather than a "name 3 you like" similarity search —
  // the latter would need a fragrance database mapping named products to scent profiles,
  // which doesn't exist here. One quick spectrum question per axis (not summed across
  // several questions like skincare) — fragrance shopping is a casual/impulse decision, not
  // a clinical survey, so this reuses the same "survey" + distance-matching engine with a
  // 1-5 range per axis instead of skincare's 4-12 (each axis has exactly one question, so
  // the "sum" is trivially that single answer — no special-casing needed in the ranking logic).
  fragrances: {
    kind: "survey",
    axes: [
      {
        id: "floral_fresh",
        label: "Floral vs Fresh",
        bands: [
          { label: "Floral", min: 1, max: 2 },
          { label: "Balanced", min: 3, max: 3 },
          { label: "Fresh", min: 4, max: 5 },
        ],
      },
      {
        id: "sweet_earthy",
        label: "Sweet vs Earthy",
        bands: [
          { label: "Sweet", min: 1, max: 2 },
          { label: "Balanced", min: 3, max: 3 },
          { label: "Earthy", min: 4, max: 5 },
        ],
      },
      {
        id: "light_intense",
        label: "Light vs Intense",
        bands: [
          { label: "Light", min: 1, max: 2 },
          { label: "Balanced", min: 3, max: 3 },
          { label: "Intense", min: 4, max: 5 },
        ],
      },
    ],
    questions: [
      {
        id: "floral_fresh_q1",
        axis: "floral_fresh",
        label: "Which scent style do you prefer?",
        options: [
          { label: "Very Floral", points: 1 },
          { label: "Floral", points: 2 },
          { label: "Balanced", points: 3 },
          { label: "Fresh", points: 4 },
          { label: "Very Fresh", points: 5 },
        ],
      },
      {
        id: "sweet_earthy_q1",
        axis: "sweet_earthy",
        label: "Which scent style do you prefer?",
        options: [
          { label: "Very Sweet", points: 1 },
          { label: "Sweet", points: 2 },
          { label: "Balanced", points: 3 },
          { label: "Earthy", points: 4 },
          { label: "Very Earthy", points: 5 },
        ],
      },
      {
        id: "light_intense_q1",
        axis: "light_intense",
        label: "How strong do you like your scent?",
        options: [
          { label: "Very Light", points: 1 },
          { label: "Light", points: 2 },
          { label: "Balanced", points: 3 },
          { label: "Intense", points: 4 },
          { label: "Very Intense", points: 5 },
        ],
      },
    ],
  },
};

export function getBandForScore(axis: SurveyAxis, score: number): SurveyBand | undefined {
  return axis.bands.find((b) => score >= b.min && score <= b.max);
}
