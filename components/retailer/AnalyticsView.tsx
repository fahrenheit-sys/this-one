import { getAnalytics } from "@/lib/analytics/queries";
import StatTile from "@/components/retailer/StatTile";
import BarChart from "@/components/retailer/BarChart";
import Leaderboard from "@/components/retailer/Leaderboard";
import AttributeBreakdownTabs from "@/components/retailer/AttributeBreakdownTabs";

function formatCurrency(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function AnalyticsView({
  retailerId,
  campaignId,
}: {
  retailerId: string;
  campaignId?: string;
}) {
  const analytics = await getAnalytics(retailerId, campaignId);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <StatTile
          label="Active Campaigns"
          value={analytics.activeCampaigns}
          hint={analytics.upcomingCampaigns > 0 ? `${analytics.upcomingCampaigns} upcoming` : undefined}
        />
        <StatTile label="Widget openings this month" value={analytics.widgetOpenings} />
        <StatTile label="Clicks this month" value={analytics.clicks} />
        <StatTile label="Retail media revenue" value={formatCurrency(analytics.revenueCents)} />
      </div>

      <BarChart title="Top Clicked Products" data={analytics.topClicked} />
      <BarChart title="Top Displayed Products" data={analytics.topDisplayed} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Leaderboard title="Clicks on Buy Now" data={analytics.buyNowLeaderboard} />
        <Leaderboard title="Clicks on Buy Pack" data={analytics.buyPackLeaderboard} />
      </div>

      <AttributeBreakdownTabs breakdown={analytics.attributeBreakdown} />
    </div>
  );
}
