import Container from "@/components/Container";

const team = [
  {
    name: "Avron Rubin",
    title: "Co-Founder",
    bio: "Visionary leader in AI innovation and market disruption with extensive scaling experience. Founded Clarity Health (impacting 2M+ people), led Rejuvenation Clinics to 8x growth, and was the third employee at Max Brenner, helping it reach $100M+ in revenue.",
  },
  {
    name: "Lubos Jezik",
    title: "Co-Founder, Technology",
    bio: "Tech innovator and process engineer with a decade of experience in scalable solutions. Delivered the GPT Sommelier SaaS MVP ahead of schedule, re-engineered infrastructure at Clarity Health (boosting customer acquisition 25%), and led AI integration work that reduced system downtime by 50%.",
  },
];

export default function OurTeam() {
  return (
    <section className="py-20">
      <Container>
        <h1 className="text-3xl font-bold text-brand-dark sm:text-4xl">Our Team</h1>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {team.map((member) => (
            <div key={member.name} className="rounded-2xl border border-black/5 bg-white p-6">
              <div className="h-16 w-16 rounded-full bg-brand-light" />
              <h2 className="mt-4 font-bold text-brand-dark">{member.name}</h2>
              <p className="text-sm font-semibold text-brand">{member.title}</p>
              <p className="mt-3 text-sm text-muted">{member.bio}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
