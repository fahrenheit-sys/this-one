"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { retailers } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";

export async function updateRetailerProfile(formData: FormData) {
  const { retailerId } = await requireRetailer();
  const db = getDb();

  await db
    .update(retailers)
    .set({
      name: String(formData.get("name") ?? ""),
      contactPerson: (formData.get("contactPerson") as string) || null,
      phone: (formData.get("phone") as string) || null,
      address: (formData.get("address") as string) || null,
      updatedAt: new Date(),
    })
    .where(eq(retailers.id, retailerId));

  revalidatePath("/retailer/profile");
}
