import Container from "@/components/Container";
import CtaLink from "@/components/CtaLink";

const metrics = [
  { value: "30%", label: "higher cart completion rates" },
  { value: "20%", label: "larger average order sizes" },
  { value: "15%", label: "increase in premium product purchases" },
  { value: "25%", label: "overall revenue growth" },
];

export default function CaseStudy() {
  return (
    <>
      <section className="border-b border-black/5 bg-surface py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">Case Study</p>
          <h1 className="mt-2 text-3xl font-bold text-brand-dark sm:text-4xl">Vitality Chemist</h1>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-brand-dark">The Challenge</h2>
            <p className="mt-3 text-muted">
              Online customers faced decision paralysis from excessive vitamin, skincare, and
              fragrance options, resulting in smaller orders and abandoned carts.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-dark">The Solution</h2>
            <p className="mt-3 text-muted">
              Vitality Chemist added ThisOne.ai&rsquo;s guided AI wellness advisor across its
              vitamins, skincare, and fragrance ranges — a fast, category-specific quiz that
              replaced generic browsing with a confident, ranked recommendation in under 30
              seconds.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-black/5 bg-surface py-20">
        <Container>
          <h2 className="text-center text-2xl font-bold text-brand-dark">3-Month Results</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-4xl font-bold text-brand">{m.value}</p>
                <p className="mt-2 text-sm text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl text-center">
          <blockquote className="text-xl font-medium text-brand-dark">
            &ldquo;ThisOne.ai transformed our online store. Customers love the personalized
            recommendations, and we&rsquo;ve seen a major boost in sales and customer
            satisfaction.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-muted">Alex Chen, Owner, Vitality Chemist</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <CtaLink href="/contact-us">Get the chatbot</CtaLink>
            <CtaLink href="/contact-us" variant="secondary">
              Book a demo
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
