import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns, widgetEvents } from "@/lib/db/schema";
import { getRankedProducts } from "@/lib/widget/ranking";
import { corsPreflight, withCors } from "@/lib/widget/cors";
import type { CategoryId } from "@/lib/taxonomy";

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const db = getDb();

  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.publicKey, key))
    .limit(1);

  if (!campaign) {
    return withCors(NextResponse.json({ error: "Campaign not found" }, { status: 404 }));
  }

  const url = new URL(req.url);
  const category = url.searchParams.get("category") as CategoryId | null;
  if (!category || !campaign.categories.includes(category)) {
    return withCors(NextResponse.json({ error: "Missing or invalid category" }, { status: 400 }));
  }

  const answers: Record<string, string | string[]> = {};
  for (const [k, v] of url.searchParams.entries()) {
    if (k === "category") continue;
    answers[k] = v.includes(",") ? v.split(",") : v;
  }

  const ranked = await getRankedProducts(campaign.id, category, answers);

  // Log impressions server-side — the recovered widget event contract has no client
  // "product displayed" event, so this is how "Top Displayed Products" gets real data.
  if (ranked.length > 0) {
    await db.insert(widgetEvents).values(
      ranked.map((p) => ({
        campaignId: campaign.id,
        eventType: "product_displayed" as const,
        productId: p.id,
      })),
    );
  }

  return withCors(
    NextResponse.json(
      ranked.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        rrp: p.rrpCents / 100,
        margin: (p.marginCents ?? 0) / 100,
        buyNowUrl: p.buyNowUrl,
        aisleBayLocation: p.aisleBayLocation,
        imageUrl: p.imageUrl,
      })),
    ),
  );
}
