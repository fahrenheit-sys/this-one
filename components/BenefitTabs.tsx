"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";

const tabs = [
  {
    label: "Retailers",
    heading: "Turn browsers into confident buyers",
    body: "Give shoppers a fast, guided experience — a few tailored questions about their needs — that matches them to the right vitamin, skincare, or fragrance product in under 30 seconds, in-store via QR code or online via chatbot. It's free to run, and you get a live dashboard on everything your shoppers are asking for.",
    cta: { href: "/case-study", label: "See in action" },
  },
  {
    label: "Brands",
    heading: "Get your products in front of the right shopper",
    body: "Run a campaign that puts your product in front of shoppers actively looking for it: reserve a limited number of placement slots per category for the dates that matter to you, and pay only for the SKUs you feature.",
    cta: { href: "/contact-us", label: "Book a demo" },
  },
  {
    label: "Shoppers",
    heading: "Skip the aisle overwhelm",
    body: "Answer a few quick questions about your needs, concerns, or preferences, and get a personalized product recommendation from an AI wellness advisor — no expertise required.",
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
