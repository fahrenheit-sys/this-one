import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { retailers, users } from "@/lib/db/schema";

// Called once per session from app/retailer/layout.tsx. Creates a retailers + users row
// the first time a newly signed-up Clerk user reaches any /retailer/* page. Simpler than a
// Clerk webhook for Phase 1 (see plan's assumptions) — the tradeoff is a user who signs up
// but never visits /retailer/* leaves no tenant row, which is fine since there's nothing to
// provision for them yet anyway.
export async function ensureRetailerForUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("ensureRetailerForUser called without an authenticated user");
  }

  const db = getDb();
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUser.id))
    .limit(1);

  if (existing) return existing;

  const email = clerkUser.primaryEmailAddress?.emailAddress ?? "";
  const [retailer] = await db
    .insert(retailers)
    .values({
      name: clerkUser.firstName ? `${clerkUser.firstName}'s Retailer` : "New Retailer",
    })
    .returning();

  const [user] = await db
    .insert(users)
    .values({ clerkUserId: clerkUser.id, retailerId: retailer.id, email })
    .returning();

  return user;
}
