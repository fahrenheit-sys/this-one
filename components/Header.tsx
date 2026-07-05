"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/our-technology", label: "Our Technology" },
  { href: "/case-study", label: "Case Study" },
  { href: "/faqs", label: "FAQs" },
  { href: "/our-team", label: "Our Team" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand-dark">
          ThisOne<span className="text-brand">.ai</span>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-foreground md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact-us"
          className="hidden rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark md:inline-block"
        >
          Book a demo
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-black/10 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-6 py-4 text-sm font-medium md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-2 transition hover:text-brand"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
