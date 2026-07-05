"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const storyLinks = [
  { href: "/our-technology", label: "Our Technology" },
  { href: "/case-study", label: "Case Study" },
  { href: "/our-team", label: "Our Team" },
];

const supportLinks = [
  { href: "/faqs", label: "FAQs" },
  { href: "/contact-us", label: "Contact Us" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) return null;

  return (
    <footer className="border-t border-black/5 bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-brand-dark">
            ThisOne<span className="text-brand">.ai</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            AI wellness advisor recommendations that turn pharmacy aisle overwhelm into confident
            purchases.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Our Story</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {storyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-4 text-sm text-muted">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 px-6 py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} ThisOne.ai. All rights reserved.
      </div>
    </footer>
  );
}
