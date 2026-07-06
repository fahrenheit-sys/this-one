import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { retailers } from "@/lib/db/schema";
import { requireRetailer } from "@/lib/retailer/requireRetailer";
import { updateRetailerProfile } from "@/app/retailer/profile/actions";
import ManageAccountButton from "@/components/retailer/ManageAccountButton";

export default async function ProfilePage() {
  const { retailerId } = await requireRetailer();
  const db = getDb();

  const [retailer] = await db.select().from(retailers).where(eq(retailers.id, retailerId)).limit(1);

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-brand-dark">Profile</h1>

      <div className="rounded-xl border border-black/10 bg-white p-6">
        <p className="text-sm font-semibold text-brand-dark">Analytics</p>
        <p className="mt-2 text-sm text-muted">
          Google Analytics is not connected. Please connect with your Google account to view your
          data.
        </p>
        <button
          type="button"
          disabled
          className="mt-4 cursor-not-allowed rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white opacity-50"
        >
          Connect now
        </button>
      </div>

      <div className="rounded-xl border border-black/10 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-brand-dark">Account</p>
          <ManageAccountButton />
        </div>

        <form action={updateRetailerProfile} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-brand-dark">Company</span>
            <input
              type="text"
              name="name"
              required
              defaultValue={retailer?.name}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </label>

          <label className="block text-sm">
            <span className="font-medium text-brand-dark">Contact person</span>
            <input
              type="text"
              name="contactPerson"
              defaultValue={retailer?.contactPerson ?? ""}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </label>

          <label className="block text-sm">
            <span className="font-medium text-brand-dark">Phone</span>
            <input
              type="tel"
              name="phone"
              defaultValue={retailer?.phone ?? ""}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </label>

          <label className="block text-sm sm:col-span-2">
            <span className="font-medium text-brand-dark">Address</span>
            <input
              type="text"
              name="address"
              defaultValue={retailer?.address ?? ""}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
