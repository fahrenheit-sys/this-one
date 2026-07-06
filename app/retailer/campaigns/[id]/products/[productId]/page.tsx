import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns, products } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";
import ProductForm from "@/components/retailer/ProductForm";
import { upsertProduct } from "@/app/retailer/campaigns/[id]/products/actions";
import type { CategoryId } from "@/lib/taxonomy";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id, productId } = await params;
  const { retailerId } = await requireRetailer();
  const db = getDb();

  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(and(eq(campaigns.id, id), eq(campaigns.retailerId, retailerId)))
    .limit(1);

  if (!campaign) notFound();

  const [product] = await db
    .select()
    .from(products)
    .where(and(eq(products.id, productId), eq(products.campaignId, id)))
    .limit(1);

  if (!product) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-dark">Edit Product</h1>
      <ProductForm
        campaignId={id}
        campaignCategories={campaign.categories as CategoryId[]}
        product={product}
        action={upsertProduct}
      />
    </div>
  );
}
