"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { campaigns, products, type productCategoryEnum } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";

async function assertCampaignOwnership(campaignId: string, retailerId: string) {
  const db = getDb();
  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(and(eq(campaigns.id, campaignId), eq(campaigns.retailerId, retailerId)))
    .limit(1);
  if (!campaign) throw new Error("Campaign not found");
  return campaign;
}

function parseAttributes(formData: FormData): Record<string, unknown> {
  try {
    return JSON.parse(String(formData.get("attributes") ?? "{}"));
  } catch {
    return {};
  }
}

export async function upsertProduct(formData: FormData) {
  const { retailerId } = await requireRetailer();
  const campaignId = String(formData.get("campaignId") ?? "");
  await assertCampaignOwnership(campaignId, retailerId);

  const db = getDb();
  const productId = String(formData.get("productId") ?? "");

  const values = {
    campaignId,
    category: formData.get("category") as (typeof productCategoryEnum.enumValues)[number],
    name: String(formData.get("name") ?? ""),
    skuCode: String(formData.get("skuCode") ?? ""),
    brand: (formData.get("brand") as string) || null,
    attributes: parseAttributes(formData),
    rrpCents: Math.round(Number(formData.get("rrp") ?? 0) * 100),
    wholesaleCents: Math.round(Number(formData.get("wholesale") ?? 0) * 100),
    promotionalRebateCents: Math.round(Number(formData.get("promotionalRebate") ?? 0) * 100),
    productBiasPercent: String(formData.get("productBias") ?? "0"),
    buyNowUrl: String(formData.get("buyNowUrl") ?? ""),
    aisleBayLocation: (formData.get("aisleBayLocation") as string) || null,
  };

  if (productId) {
    await db
      .update(products)
      .set({ ...values, updatedAt: new Date() })
      .where(and(eq(products.id, productId), eq(products.campaignId, campaignId)));
  } else {
    await db.insert(products).values(values);
  }

  revalidatePath(`/retailer/campaigns/${campaignId}/products`);
  redirect(`/retailer/campaigns/${campaignId}/products`);
}

export async function deleteProduct(formData: FormData) {
  const { retailerId } = await requireRetailer();
  const campaignId = String(formData.get("campaignId") ?? "");
  await assertCampaignOwnership(campaignId, retailerId);

  const db = getDb();
  const productId = String(formData.get("productId") ?? "");

  await db
    .delete(products)
    .where(and(eq(products.id, productId), eq(products.campaignId, campaignId)));

  revalidatePath(`/retailer/campaigns/${campaignId}/products`);
  redirect(`/retailer/campaigns/${campaignId}/products`);
}
