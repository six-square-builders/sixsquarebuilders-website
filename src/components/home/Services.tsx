import { services } from "@/lib/data";

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="text-2xl font-bold md:text-3xl">Our Services</h2>
      <p className="mt-2 max-w-prose text-muted-foreground">
        From blueprint to handover, we manage the complete construction
        lifecycle with uncompromising quality.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((card) => (
          <div key={card.title} className="rounded-lg border p-5 shadow-sm">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
