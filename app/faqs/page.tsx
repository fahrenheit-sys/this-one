import Container from "@/components/Container";

const faqs = [
  {
    q: "Why should I use ThisOne.ai?",
    a: "ThisOne.ai helps convert pharmacy aisle overwhelm into confident purchases by providing personalized product recommendations that boost sales, improve customer experience, and drive loyalty with minimal setup required.",
  },
  {
    q: "What is the difference between ThisOne.ai and other chat bots?",
    a: "Unlike generic chatbots, ThisOne.ai is specifically designed for pharmacy and wellness retail. It combines product expertise with AI to deliver personalized recommendations quickly in both online and in-store environments, functioning as a sales conversion tool rather than a support bot.",
  },
  {
    q: "How much does it cost?",
    a: "ThisOne.ai operates on a retail media model where supplement, skincare, and fragrance brands pay to be included in the sponsored match pool. Retailers can use it at no cost, with optional upgrades and performance-based pricing models available.",
  },
  {
    q: "How do I set it up?",
    a: "Setup is plug-and-play. In-store implementations include QR codes and display materials, while online integration uses lightweight, no-code solutions that integrate with existing websites. Setup support is included.",
  },
  {
    q: "Can I see performance metrics?",
    a: "Yes — you receive detailed reporting including customer interaction data, recommendation conversion rates, and product-level performance analytics to optimize strategy and track ROI.",
  },
  {
    q: "What kind of questions does the chatbot ask?",
    a: "Shoppers answer three straightforward questions about their needs, concerns, or preferences — such as skin type, wellness goals, or scent preference — after which the AI suggests matching products.",
  },
  {
    q: "Is it suitable for small retailers or independent pharmacies?",
    a: "Yes — the platform makes advanced AI tools accessible to smaller operators without the typical high costs or complexity barriers.",
  },
  {
    q: "Is ThisOne.ai compliant with privacy regulations?",
    a: "ThisOne.ai is fully compliant with Australian privacy laws and data protection regulations. No personally identifiable information is collected during recommendations. ThisOne.ai matches shoppers to products based on stated preferences — it doesn't provide medical or clinical advice.",
  },
];

export default function Faqs() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold text-brand-dark sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <dl className="mt-10 divide-y divide-black/5">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-6">
              <dt className="font-bold text-brand-dark">{faq.q}</dt>
              <dd className="mt-2 text-muted">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
