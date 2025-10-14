"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-28 text-primary-foreground md:grid-cols-2 md:py-36">
          <div>
            <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
              Designing Dreams, Building Realities
            </h1>
            <p className="mt-4 max-w-prose text-lg text-white/90">
               Six Square Builders transforms visions into luxurious living and working spaces, with attention to detail, quality craftsmanship, and modern aesthetics.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/flats"
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                View Flats for Sale
              </Link>
              <Link
                href="/projects"
                className="rounded-md border px-5 py-3 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
              >
                See Our Projects
              </Link>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=800&auto=format&fit=crop",
              ].map((src, i) => (
                <div key={i} className="aspect-video overflow-hidden rounded-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="Project" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Our Services</h2>
        <p className="mt-2 max-w-prose text-muted-foreground">
          From blueprint to handover, we manage the complete construction lifecycle with uncompromising quality.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Residential",
              desc: "Premium apartments and villas built for comfort and longevity.",
            },
            {
              title: "Commercial",
              desc: "Office and retail spaces designed to elevate your business.",
            },
            {
              title: "Renovation",
              desc: "Modern makeovers that improve efficiency and aesthetics.",
            },
            {
              title: "Project Management",
              desc: "On-time delivery with transparent processes and reporting.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-lg border p-5 shadow-sm">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Featured Projects</h2>
            <p className="mt-2 max-w-prose text-muted-foreground">
              A glimpse of our craftsmanship across residential and commercial developments.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground md:inline-block"
          >
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Ganesh Castle",
              src: "/flats/ganesh_castle.png",
              tag: "Ongoing",
            },
            {
              title: "Ganapathy Enclave",
              src: "/flats/ganapathi_enclave.png",
              tag: "Past",
            },
            {
              title: "Balaiah Garden",
              src: "/flats/balaiah_garden.png",
              tag: "Past",
            },
          ].map((p) => (
            <div key={p.title} className="group overflow-hidden rounded-lg border">
              <div className="relative aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
                  {p.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
          >
            View all projects
          </Link>
        </div>
      </section>
    </main>
  );
}