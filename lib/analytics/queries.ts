import { and, eq, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns, products, widgetEvents } from "@/lib/db/schema";
import { getCampaignStatus } from "@/lib/campaigns/status";

type EventRow = typeof widgetEvents.$inferSelect;
type ProductRow = typeof products.$inferSelect;

function topProducts(
  events: EventRow[],
  predicate: (e: EventRow) => boolean,
  productsById: Map<string, ProductRow>,
  limit = 10,
) {
  const counts = new Map<string, number>();
  for (const e of events) {
    if (!predicate(e) || !e.productId) continue;
    counts.set(e.productId, (counts.get(e.productId) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([productId, count]) => ({ product: productsById.get(productId), count }))
    .filter((row): row is { product: ProductRow; count: number } => !!row.product)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((row) => ({ name: row.product.name, count: row.count }));
}

export type Analytics = Awaited<ReturnType<typeof getAnalytics>>;

// Dashboard (no campaignId) = aggregate across every campaign the retailer owns.
// Stats (with campaignId) = same shape, scoped to one campaign.
export async function getAnalytics(retailerId: string, campaignId?: string) {
  const db = getDb();

  const campaignRows = campaignId
    ? await db
        .select()
        .from(campaigns)
        .where(and(eq(campaigns.id, campaignId), eq(campaigns.retailerId, retailerId)))
    : await db.select().from(campaigns).where(eq(campaigns.retailerId, retailerId));

  const campaignIds = campaignRows.map((c) => c.id);

  const empty = {
    activeCampaigns: 0,
    upcomingCampaigns: 0,
    widgetOpenings: 0,
    clicks: 0,
    revenueCents: 0,
    topClicked: [] as { name: string; count: number }[],
    topDisplayed: [] as { name: string; count: number }[],
    buyNowLeaderboard: [] as { name: string; count: number }[],
    buyPackLeaderboard: [] as { name: string; count: number }[],
    attributeBreakdown: {} as Record<string, { answer: string; count: number }[]>,
  };

  if (campaignIds.length === 0) return empty;

  const [productRows, eventRows] = await Promise.all([
    db.select().from(products).where(inArray(products.campaignId, campaignIds)),
    db.select().from(widgetEvents).where(inArray(widgetEvents.campaignId, campaignIds)),
  ]);

  const productsById = new Map(productRows.map((p) => [p.id, p]));
  const productCountByCampaign = new Map<string, number>();
  for (const p of productRows) {
    productCountByCampaign.set(p.campaignId, (productCountByCampaign.get(p.campaignId) ?? 0) + 1);
  }

  const activeCampaigns = campaignRows.filter((c) => getCampaignStatus(c) === "active").length;
  const upcomingCampaigns = campaignRows.filter((c) => getCampaignStatus(c) === "upcoming").length;

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const widgetOpenings = eventRows.filter(
    (e) => e.eventType === "widget_opened" && e.createdAt >= monthStart,
  ).length;

  const clicks = eventRows.filter(
    (e) => (e.eventType === "buy_now" || e.eventType === "buy_pack") && e.createdAt >= monthStart,
  ).length;

  // Revenue = the retailer's retail-media income (cost per SKU x participating SKUs),
  // not shopper sales revenue — confirmed formula.
  const revenueCents = campaignRows.reduce(
    (sum, c) => sum + c.costPerSkuCents * (productCountByCampaign.get(c.id) ?? 0),
    0,
  );

  const topClicked = topProducts(
    eventRows,
    (e) => e.eventType === "buy_now" || e.eventType === "buy_pack",
    productsById,
  );
  const topDisplayed = topProducts(eventRows, (e) => e.eventType === "product_displayed", productsById);
  const buyNowLeaderboard = topProducts(eventRows, (e) => e.eventType === "buy_now", productsById);
  const buyPackLeaderboard = topProducts(eventRows, (e) => e.eventType === "buy_pack", productsById);

  const attributeBreakdown: Record<string, { answer: string; count: number }[]> = {};
  for (const e of eventRows) {
    if (e.eventType !== "question_answered" || !e.questionId || !e.answerValue) continue;
    const bucket = attributeBreakdown[e.questionId] ?? [];
    const existing = bucket.find((b) => b.answer === e.answerValue);
    if (existing) existing.count += 1;
    else bucket.push({ answer: e.answerValue, count: 1 });
    attributeBreakdown[e.questionId] = bucket;
  }
  for (const key of Object.keys(attributeBreakdown)) {
    attributeBreakdown[key].sort((a, b) => b.count - a.count);
  }

  return {
    activeCampaigns,
    upcomingCampaigns,
    widgetOpenings,
    clicks,
    revenueCents,
    topClicked,
    topDisplayed,
    buyNowLeaderboard,
    buyPackLeaderboard,
    attributeBreakdown,
  };
}
