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
    title: "AI-Powered Wine Matching Engine",
    body: "Proprietary algorithms combine customer preferences with wine data to deliver instant recommendations across digital and physical retail.",
  },
  {
    title: "3-Question Predictive Taste Model",
    body: "A minimal interface determines a shopper's taste profile in under 30 seconds to boost engagement and conversions.",
  },
  {
    title: "Zero Hardware Integration",
    body: "Deploys via QR code or chatbot overlay — no scanners, screens, or POS system modifications required.",
  },
  {
    title: "Retail Media Monetization Layer",
    body: "Suppliers and wineries can pay for featured product placements within recommendations.",
  },
  {
    title: "Real-Time Analytics Dashboard",
    body: "Live reporting on customer preferences, interaction rates, and conversion metrics.",
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
            WineQ.ai isn&rsquo;t just another filter system — it&rsquo;s an advanced AI sommelier
            powered by proprietary algorithms and deep wine knowledge.
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
