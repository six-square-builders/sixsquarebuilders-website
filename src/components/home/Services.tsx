import { services } from "@/lib/data";

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <h2 className="text-2xl font-bold md:text-3xl">Our Services</h2>
      <p className="mt-2 max-w-prose text-base leading-7 text-muted-foreground">
        From blueprint to handover, we manage the complete construction
        lifecycle with uncompromising quality.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {services.map((card) => (
          <div key={card.title} className="rounded-lg border p-4 shadow-sm sm:p-5">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
