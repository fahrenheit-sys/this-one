import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";

export default function ContactUs() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark sm:text-4xl">Contact Us</h1>
          <p className="mt-4 max-w-md text-muted">
            Whether you&rsquo;re a retailer looking to enhance the wine shopping experience, a
            distributor wanting your wines matched with the right customers, or just curious
            about how WineQ works, we look forward to connecting.
          </p>
          <div className="mt-8">
            <p className="text-sm font-semibold text-brand-dark">Address</p>
            <p className="mt-1 text-sm text-muted">
              81-83 Campbell St, Surry Hills, NSW 2010, Australia
            </p>
          </div>
        </div>

        <ContactForm />
      </Container>
    </section>
  );
}
