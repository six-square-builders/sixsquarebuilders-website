"use client";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-2 max-w-prose text-muted-foreground">
          We are a full-service construction company focused on transforming skylines and enriching lives.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Our Story</h2>
          <p className="mt-2 text-muted-foreground">
            Since our inception, Skyline Constructions has delivered projects distinguished by quality, innovation, and integrity. With a multidisciplinary team, we manage residential and commercial developments from concept to completion.
          </p>
          <h2 className="mt-8 text-xl font-semibold">Mission & Values</h2>
          <ul className="mt-2 list-inside list-disc text-muted-foreground">
            <li>Deliver exceptional craftsmanship and value.</li>
            <li>Prioritize safety, sustainability, and compliance.</li>
            <li>Build long-term relationships through transparency.</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-lg border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1600&auto=format&fit=crop"
            alt="Team at a construction site"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Our Team</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              name: "Ava Shah",
              role: "CEO & Founder",
              src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
            },
            {
              name: "Daniel Kim",
              role: "Head of Projects",
              src: "https://images.unsplash.com/photo-1573496529574-be85d6a60704?q=80&w=800&auto=format&fit=crop",
            },
            {
              name: "Priya Nair",
              role: "Lead Architect",
              src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
            },
          ].map((m) => (
            <div key={m.name} className="overflow-hidden rounded-lg border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.name} className="h-56 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}