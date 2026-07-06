import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";
import AnalyticsView from "@/components/retailer/AnalyticsView";

export default async function CampaignStatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { retailerId } = await requireRetailer();
  const db = getDb();

  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(and(eq(campaigns.id, id), eq(campaigns.retailerId, retailerId)))
    .limit(1);

  if (!campaign) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-dark">Stats - {campaign.name}</h1>
      <AnalyticsView retailerId={retailerId} campaignId={campaign.id} />
    </div>
  );
}
