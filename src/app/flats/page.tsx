"use client";

import Link from "next/link";

type Flat = {
  id: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  img: string;
};

const FLATS: Flat[] = [
  {
    id: "skyline-2bhk-a1",
    title: "Skyline Heights • 2 BHK",
    price: "$145,000",
    beds: 2,
    baths: 2,
    area: "980 sq.ft",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "riverview-3bhk-b2",
    title: "Riverview Residency • 3 BHK",
    price: "$210,000",
    beds: 3,
    baths: 3,
    area: "1,320 sq.ft",
    img: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2b8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "techpark-studio-c3",
    title: "Tech Park Central • Studio",
    price: "$95,000",
    beds: 1,
    baths: 1,
    area: "520 sq.ft",
    img: "https://images.unsplash.com/photo-1521783988139-893ce3a8e9a0?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function FlatsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Flats For Sale</h1>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Explore available units across our premium developments. Transparent pricing and detailed specifications.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FLATS.map((flat) => (
          <article key={flat.id} className="overflow-hidden rounded-lg border">
            <div className="relative aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flat.img} alt={flat.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{flat.title}</h3>
              <div className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{flat.price}</span> • {flat.beds} Beds • {flat.baths} Baths • {flat.area}
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/contact?interest=${encodeURIComponent(flat.id)}`}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Enquire
                </Link>
                <Link
                  href="/projects"
                  className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
                >
                  View Project
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}