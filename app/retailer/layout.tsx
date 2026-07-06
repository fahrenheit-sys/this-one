import { currentUser } from "@clerk/nextjs/server";
import { ensureRetailerForUser } from "@/lib/retailer/ensureRetailer";
import RetailerHeader from "@/components/retailer/RetailerHeader";
import RetailerSidebar from "@/components/retailer/RetailerSidebar";

export default async function RetailerLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  // Sign-in/sign-up pages render without the authenticated chrome.
  if (!user) {
    return <div className="flex min-h-screen flex-col bg-white">{children}</div>;
  }

  await ensureRetailerForUser();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <RetailerHeader />
      <div className="flex flex-1">
        <RetailerSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
