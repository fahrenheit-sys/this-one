"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";

const tabs = [
  {
    label: "Retailers",
    heading: "Turn browsers into confident buyers",
    body: "Give shoppers a 3-question guided experience that matches them to the right bottle in under 30 seconds — in-store via QR code or online via chatbot, with no POS or hardware changes required.",
    cta: { href: "/case-study", label: "See in action" },
  },
  {
    label: "Distributors",
    heading: "Get your wines in front of the right shopper",
    body: "The retail media layer lets suppliers and wineries pay to be featured in relevant recommendations, reaching shoppers at the exact moment they're deciding what to buy.",
    cta: { href: "/contact-us", label: "Book a demo" },
  },
  {
    label: "Wine Lovers",
    heading: "Skip the aisle confusion",
    body: "Answer a few quick questions about taste, occasion, or food pairing, and get a personalized recommendation from an AI sommelier — no expertise required.",
    cta: { href: "/our-technology", label: "Begin your free trial" },
  },
];

export default function BenefitTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 rounded-full bg-surface p-1 sm:inline-flex">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              i === active ? "bg-brand text-white" : "text-muted hover:text-brand-dark"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-8 text-center sm:p-12">
        <h3 className="text-2xl font-bold text-brand-dark">{tab.heading}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-muted">{tab.body}</p>
        <div className="mt-6">
          <CtaLink href={tab.cta.href}>{tab.cta.label}</CtaLink>
        </div>
      </div>
    </div>
  );
}
