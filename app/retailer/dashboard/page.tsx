import { requireRetailer } from "@/lib/retailer/requireRetailer";
import AnalyticsView from "@/components/retailer/AnalyticsView";

export default async function DashboardPage() {
  const { retailerId } = await requireRetailer();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-dark">Dashboard</h1>
      <AnalyticsView retailerId={retailerId} />
    </div>
  );
}
