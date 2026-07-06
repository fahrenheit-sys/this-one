import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns, widgetEvents } from "@/lib/db/schema";
import { corsPreflight, withCors } from "@/lib/widget/cors";

const VALID_EVENT_TYPES = new Set([
  "widget_opened",
  "question_answered",
  "buy_now",
  "buy_pack",
  "start_over",
]);

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ key: string; type: string }> },
) {
  const { key, type } = await params;

  if (!VALID_EVENT_TYPES.has(type)) {
    return withCors(NextResponse.json({ error: "Invalid event type" }, { status: 400 }));
  }

  const db = getDb();
  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.publicKey, key))
    .limit(1);

  if (!campaign) {
    return withCors(NextResponse.json({ error: "Campaign not found" }, { status: 404 }));
  }

  // buy_pack (bundle checkout) only exists for Shopify-integration campaigns, matching the
  // reference app's gating.
  if (type === "buy_pack" && campaign.integrationType !== "shopify") {
    return withCors(
      NextResponse.json({ error: "buy_pack is only available for Shopify campaigns" }, { status: 400 }),
    );
  }

  const body = await req.text();
  const form = new URLSearchParams(body);

  if (type === "question_answered") {
    await db.insert(widgetEvents).values({
      campaignId: campaign.id,
      eventType: "question_answered",
      questionId: form.get("question") ?? undefined,
      answerValue: form.get("answer") ?? undefined,
    });
  } else if (type === "buy_now" || type === "buy_pack") {
    const eventType = type as "buy_now" | "buy_pack";
    const ids = type === "buy_now" ? [form.get("id")].filter((v): v is string => !!v) : form.getAll("ids[]");

    if (ids.length === 0) {
      await db.insert(widgetEvents).values({
        campaignId: campaign.id,
        eventType,
      });
    } else {
      await db.insert(widgetEvents).values(
        ids.map((id) => ({
          campaignId: campaign.id,
          eventType,
          productId: id,
        })),
      );
    }
  } else {
    await db.insert(widgetEvents).values({
      campaignId: campaign.id,
      eventType: type as "widget_opened" | "start_over",
    });
  }

  return withCors(NextResponse.json({ ok: true }));
}
