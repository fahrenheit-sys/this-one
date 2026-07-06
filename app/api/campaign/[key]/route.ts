import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns } from "@/lib/db/schema";
import { getCampaignStatus } from "@/lib/campaigns/status";
import { corsPreflight, withCors } from "@/lib/widget/cors";

export async function OPTIONS() {
  return corsPreflight();
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
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

  const status = getCampaignStatus(campaign);

  return withCors(
    NextResponse.json({
      key: campaign.publicKey,
      name: campaign.name,
      categories: campaign.categories,
      integrationType: campaign.integrationType,
      integrationUrl: campaign.integrationUrl,
      active: status === "active",
      status,
    }),
  );
}
