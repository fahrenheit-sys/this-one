import { notFound } from "next/navigation";
import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";
import CampaignForm from "@/components/retailer/CampaignForm";
import { deleteCampaign } from "@/app/retailer/campaigns/actions";

export default async function EditCampaignPage({
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
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-dark">Campaign Setup</h1>
        <Link
          href={`/retailer/campaigns/${campaign.id}/products`}
          className="rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand-dark transition hover:bg-brand-light"
        >
          Manage Products
        </Link>
      </div>

      <CampaignForm campaign={campaign} />

      <form action={deleteCampaign} className="border-t border-black/5 pt-6">
        <input type="hidden" name="campaignId" value={campaign.id} />
        <button type="submit" className="text-sm font-medium text-red-600 hover:underline">
          Delete campaign
        </button>
      </form>
    </div>
  );
}
