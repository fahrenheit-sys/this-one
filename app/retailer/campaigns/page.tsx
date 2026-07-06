import Link from "next/link";
import { and, eq, inArray } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns, products, widgetEvents } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";
import { getCampaignStatus, STATUS_LABELS, type CampaignStatus } from "@/lib/campaigns/status";
import CampaignStatusTabs from "@/components/retailer/CampaignStatusTabs";
import WidgetModal from "@/components/retailer/WidgetModal";

function formatCurrency(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function CampaignsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const { retailerId } = await requireRetailer();
  const db = getDb();

  const rows = await db.select().from(campaigns).where(eq(campaigns.retailerId, retailerId));
  const campaignIds = rows.map((c) => c.id);

  const productCounts = campaignIds.length
    ? await db
        .select({ campaignId: products.campaignId, count: products.id })
        .from(products)
        .where(inArray(products.campaignId, campaignIds))
    : [];
  const productCountByCampaign = new Map<string, number>();
  for (const row of productCounts) {
    productCountByCampaign.set(row.campaignId, (productCountByCampaign.get(row.campaignId) ?? 0) + 1);
  }

  const clickEvents = campaignIds.length
    ? await db
        .select({ campaignId: widgetEvents.campaignId, eventType: widgetEvents.eventType })
        .from(widgetEvents)
        .where(
          and(
            inArray(widgetEvents.campaignId, campaignIds),
            inArray(widgetEvents.eventType, ["buy_now", "buy_pack"]),
          ),
        )
    : [];
  const clicksByCampaign = new Map<string, number>();
  for (const row of clickEvents) {
    clicksByCampaign.set(row.campaignId, (clicksByCampaign.get(row.campaignId) ?? 0) + 1);
  }

  const withStatus = rows.map((campaign) => ({
    campaign,
    status: getCampaignStatus(campaign),
    productCount: productCountByCampaign.get(campaign.id) ?? 0,
    clicks: clicksByCampaign.get(campaign.id) ?? 0,
  }));

  const activeTab = (status as CampaignStatus | undefined) ?? "all";
  const filtered =
    activeTab === "all" ? withStatus : withStatus.filter((row) => row.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Campaigns</h1>
        <Link
          href="/retailer/campaigns/new"
          className="rounded-full bg-brand-dark px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand"
        >
          + Create Campaign
        </Link>
      </div>

      <div className="flex justify-center">
        <CampaignStatusTabs active={activeTab} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-black/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/10 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Campaign Name</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Clicks</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ campaign, status: campaignStatus, productCount, clicks }) => (
              <tr key={campaign.id} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3 font-medium text-brand-dark">{campaign.name}</td>
                <td className="px-4 py-3 text-muted">
                  {campaign.startDate} - {campaign.endDate}
                </td>
                <td className="px-4 py-3 capitalize">{STATUS_LABELS[campaignStatus]}</td>
                <td className="px-4 py-3">
                  {formatCurrency(campaign.costPerSkuCents * productCount)}
                </td>
                <td className="px-4 py-3">{clicks}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {campaignStatus !== "draft" && <WidgetModal publicKey={campaign.publicKey} />}
                    <Link
                      href={`/retailer/campaigns/${campaign.id}`}
                      className="rounded-md bg-brand-dark px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand"
                    >
                      View
                    </Link>
                    <Link
                      href={`/retailer/campaigns/${campaign.id}/stats`}
                      className="rounded-md bg-brand-dark px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand"
                    >
                      Stats
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No campaigns yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
