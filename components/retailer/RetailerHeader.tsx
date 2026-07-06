import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function RetailerHeader() {
  const user = await currentUser();
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Retailer";

  return (
    <header className="flex items-center justify-between border-b border-black/5 bg-white px-8 py-4">
      <div>
        <p className="text-xs text-muted">Welcome,</p>
        <p className="font-semibold text-brand-dark">{name}</p>
      </div>
      <UserButton />
    </header>
  );
}
