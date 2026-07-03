import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";
import ChatWidget from "@/components/ChatWidget";
import BenefitTabs from "@/components/BenefitTabs";

const benefits = [
  {
    title: "Personalization",
    body: "Every recommendation is tailored to the shopper's needs, concerns, or preferences — not a generic bestseller list.",
  },
  {
    title: "Plug-and-Play Setup",
    body: "Deploy via QR code in-store or a lightweight, no-code embed online. No hardware, no POS integration, no IT project.",
  },
  {
    title: "Cost-Effective",
    body: "Retailers use ThisOne.ai at no cost — the platform runs on a retail media model funded by participating brands and suppliers.",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-black/5 bg-surface">
        <Container className="grid gap-10 py-20 sm:grid-cols-2 sm:items-center sm:py-28">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              Win-Win-Wellness
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              ThisOne.ai is an AI wellness advisor that turns pharmacy aisle overwhelm into
              confident purchases — boosting sales and loyalty for retailers, brands, and
              shoppers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CtaLink href="/contact-us">Book a demo</CtaLink>
              <CtaLink href="/our-technology" variant="secondary">
                For Retailers
              </CtaLink>
              <CtaLink href="/case-study" variant="secondary">
                For Brands
              </CtaLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 sm:grid-cols-2 sm:items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-dark">
              Meet your 24/7 AI wellness advisor
            </h2>
            <p className="mt-4 text-muted">
              Retailers using ThisOne.ai have seen up to 25% revenue growth and 30% higher cart
              completion rates by putting a knowledgeable product advisor in every customer&rsquo;s
              pocket — day or night.
            </p>
            <div className="mt-6">
              <CtaLink href="/contact-us">Get the chatbot</CtaLink>
            </div>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <p className="text-sm font-semibold text-muted">Try the AI wellness advisor</p>
            <ChatWidget />
          </div>
        </Container>
      </section>

      <section className="border-y border-black/5 bg-surface py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold text-brand-dark">
            Why retailers choose ThisOne.ai
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <h3 className="text-lg font-bold text-brand-dark">{b.title}</h3>
                <p className="mt-3 text-sm text-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <h2 className="text-center text-3xl font-bold text-brand-dark">
            Built for every part of the wellness journey
          </h2>
          <div className="mt-12">
            <BenefitTabs />
          </div>
        </Container>
      </section>
    </>
  );
}
