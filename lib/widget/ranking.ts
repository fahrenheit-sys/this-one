import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { products } from "@/lib/db/schema";
import { TAXONOMY, type CategoryId } from "@/lib/taxonomy";

type Answers = Record<string, string | string[] | number>;

function matchesChoiceAnswers(productAttributes: Record<string, unknown>, answers: Answers): boolean {
  for (const [key, value] of Object.entries(answers)) {
    if (value === undefined || value === "") continue;
    const productValue = productAttributes[key];

    if (Array.isArray(value)) {
      // Shopper selected up to N values (e.g. ingredients) — product matches on any overlap.
      const productValues = Array.isArray(productValue) ? productValue : [];
      if (!value.some((v) => productValues.includes(v))) return false;
    } else if (Array.isArray(productValue)) {
      if (!productValue.includes(value)) return false;
    } else if (productValue !== value) {
      return false;
    }
  }
  return true;
}

// Ranked by Product Margin (RRP - Wholesale + Promotional Rebate), adjusted by the
// retailer's manual Product Bias % nudge — confirmed formula from the reference app.
export async function getRankedProducts(
  campaignId: string,
  category: CategoryId,
  answers: Answers,
  limit = 5,
) {
  const db = getDb();
  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.campaignId, campaignId), eq(products.category, category)));

  const taxonomy = TAXONOMY[category];

  if (taxonomy.kind === "survey") {
    // Each product carries a single target number per axis (skincare: 4-12, fragrances:
    // 1-5), not a range — chosen deliberately so manufacturers can't hedge with a broad
    // band that fits "everyone." Matched by closest overall distance across all axes,
    // margin as tiebreaker.
    const axisIds = taxonomy.axes.map((a) => a.id);
    const customerScores: Record<string, number> = {};
    for (const axisId of axisIds) {
      customerScores[axisId] = Number(answers[axisId] ?? 0);
    }

    return rows
      .map((product) => {
        const productScores = (product.attributes as Record<string, number>) ?? {};
        const distance = axisIds.reduce(
          (sum, axisId) => sum + Math.abs((productScores[axisId] ?? 0) - customerScores[axisId]),
          0,
        );
        return { product, distance };
      })
      .sort(
        (a, b) => a.distance - b.distance || (b.product.marginCents ?? 0) - (a.product.marginCents ?? 0),
      )
      .slice(0, limit)
      .map((row) => row.product);
  }

  const matched = rows.filter((p) =>
    matchesChoiceAnswers(p.attributes as Record<string, unknown>, answers),
  );

  return matched
    .sort((a, b) => {
      const scoreA = (a.marginCents ?? 0) * (1 + Number(a.productBiasPercent ?? 0) / 100);
      const scoreB = (b.marginCents ?? 0) * (1 + Number(b.productBiasPercent ?? 0) / 100);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
