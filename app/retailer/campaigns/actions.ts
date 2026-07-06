"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getDb } from "@/lib/db/client";
import { campaigns, type integrationTypeEnum } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";
import { CATEGORIES, type CategoryId } from "@/lib/taxonomy";

function parseCategories(formData: FormData): CategoryId[] {
  const valid = new Set<string>(CATEGORIES.map((c) => c.id));
  return formData
    .getAll("categories")
    .map(String)
    .filter((v): v is CategoryId => valid.has(v));
}

// Single action for both create and edit — the form includes a hidden "campaignId" input
// (empty for new campaigns) rather than binding two separate server actions per-id.
export async function upsertCampaign(formData: FormData) {
  const { retailerId } = await requireRetailer();
  const db = getDb();

  const campaignId = String(formData.get("campaignId") ?? "");
  const categories = parseCategories(formData);
  if (categories.length === 0) {
    throw new Error("Select at least one category");
  }

  const values = {
    name: String(formData.get("name") ?? ""),
    startDate: String(formData.get("startDate") ?? ""),
    endDate: String(formData.get("endDate") ?? ""),
    categories,
    maxSkusPerCategory: Number(formData.get("maxSkusPerCategory") ?? 0),
    costPerSkuCents: Math.round(Number(formData.get("costPerSku") ?? 0) * 100),
    integrationType: (formData.get("integrationType") as (typeof integrationTypeEnum.enumValues)[number]) || "website",
    integrationUrl: (formData.get("integrationUrl") as string) || null,
    isDraft: formData.get("isDraft") === "on",
  };

  if (campaignId) {
    await db
      .update(campaigns)
      .set({ ...values, updatedAt: new Date() })
      .where(and(eq(campaigns.id, campaignId), eq(campaigns.retailerId, retailerId)));

    revalidatePath("/retailer/campaigns");
    revalidatePath(`/retailer/campaigns/${campaignId}`);
    redirect(`/retailer/campaigns/${campaignId}`);
  }

  const [campaign] = await db
    .insert(campaigns)
    .values({ ...values, retailerId, publicKey: nanoid(12) })
    .returning();

  revalidatePath("/retailer/campaigns");
  redirect(`/retailer/campaigns/${campaign.id}`);
}

export async function deleteCampaign(formData: FormData) {
  const { retailerId } = await requireRetailer();
  const db = getDb();
  const campaignId = String(formData.get("campaignId") ?? "");

  await db
    .delete(campaigns)
    .where(and(eq(campaigns.id, campaignId), eq(campaigns.retailerId, retailerId)));

  revalidatePath("/retailer/campaigns");
  redirect("/retailer/campaigns");
}
