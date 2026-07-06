import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { users } from "@/lib/db/schema";

// Every server action/query in the retailer section goes through this rather than calling
// auth() directly, so tenant scoping (retailerId) can't be forgotten on a per-file basis.
export async function requireRetailer() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const db = getDb();
  const [user] = await db.select().from(users).where(eq(users.clerkUserId, userId)).limit(1);
  if (!user) throw new Error("No retailer account found for this user");

  return { retailerId: user.retailerId, userId: user.id, clerkUserId: userId };
}
