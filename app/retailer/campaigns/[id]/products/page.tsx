import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns, products } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";
import ProductTable from "@/components/retailer/ProductTable";

export default async function CampaignProductsPage({
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

  const productRows = await db.select().from(products).where(eq(products.campaignId, id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted">{campaign.name}</p>
          <h1 className="text-2xl font-bold text-brand-dark">Products</h1>
        </div>
        <Link
          href={`/retailer/campaigns/${id}/products/new`}
          className="rounded-full bg-brand-dark px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand"
        >
          + Add Manually
        </Link>
      </div>

      <ProductTable campaignId={id} products={productRows} />
    </div>
  );
}
