import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";

const stats = [
  { value: "92%", label: "of shoppers purchase recommended products" },
  { value: "97%", label: "willingly spend above budget for trusted suggestions" },
  { value: "87%", label: "trust AI for product recommendations" },
  { value: "85%", label: "find suggestion bots more engaging than unguided browsing" },
];

const features = [
  {
    title: "Category-Specific Matching Engine",
    body: "Vitamins & supplements are matched by health need and active ingredient. Skincare uses a proven dermatologist-style skin assessment across moisture, pigment, and tolerance. Fragrance is matched by scent profile — floral vs. fresh, sweet vs. earthy, light vs. intense. Not one generic AI chatbot guessing at every category.",
  },
  {
    title: "As Few as 3 Questions",
    body: "A short, category-specific assessment determines a shopper's needs in under 30 seconds — whatever the category calls for, from a health concern to a skin profile to a scent preference.",
  },
  {
    title: "Zero Hardware Integration",
    body: "Deploys via QR code or chatbot overlay — no scanners, screens, or POS system modifications required.",
  },
  {
    title: "Retail Media Monetization Layer",
    body: "Brands reserve a limited number of placement slots per campaign and pay only for the SKUs they feature — funding the platform so retailers use it at no cost. Which product actually gets recommended is still driven by the best match for the shopper and the best margin for the retailer.",
  },
  {
    title: "Real-Time Analytics Dashboard",
    body: "Live reporting on widget opens, click-throughs, and — question by question — exactly which needs, ingredients, and preferences your shoppers are asking about most.",
  },
  {
    title: "Omnichannel Compatibility",
    body: "Functions consistently across in-store, online, and mobile shopping environments.",
  },
];

export default function OurTechnology() {
  return (
    <>
      <section className="border-b border-black/5 bg-surface py-20">
        <Container>
          <h1 className="max-w-3xl text-3xl font-bold text-brand-dark sm:text-4xl">
            ThisOne.ai isn&rsquo;t just another filter system — it&rsquo;s an advanced AI wellness
            advisor powered by proprietary algorithms and deep product knowledge.
          </h1>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaLink href="/contact-us">Start your free trial</CtaLink>
            <CtaLink href="/contact-us" variant="secondary">
              Contact Sales
            </CtaLink>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-2xl font-bold text-brand-dark">What the technology does</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-black/5 bg-white p-6">
                <h3 className="font-bold text-brand-dark">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-black/5 bg-surface py-20">
        <Container>
          <h2 className="text-center text-2xl font-bold text-brand-dark">Why it works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-bold text-brand">{s.value}</p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CtaLink href="/contact-us">Book a demo</CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
