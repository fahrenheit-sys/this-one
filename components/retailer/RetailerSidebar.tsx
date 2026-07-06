"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/retailer/dashboard", label: "Dashboard" },
  { href: "/retailer/campaigns", label: "Campaigns" },
  { href: "/retailer/profile", label: "Profile" },
];

export default function RetailerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-black/5 bg-brand-light px-4 py-6">
      <Link href="/" className="block px-2 text-lg font-bold tracking-tight text-brand-dark">
        ThisOne<span className="text-brand">.ai</span>
      </Link>

      <nav className="mt-8 flex flex-col gap-1 text-sm font-medium">
        {navLinks.map((link) => {
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-2 py-2 transition ${
                active ? "bg-white font-semibold text-brand-dark" : "text-muted hover:text-brand-dark"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
