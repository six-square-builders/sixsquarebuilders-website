"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation'

type Flat = {
  id: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  img: string;
};

// Added some static content for testing
const FLATS: Flat[] = [
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },
  {
    id: "ganesh-castle",
    title: "Ganesh Castle • 3 BHK",
    price: "₹XX,XX,XXX",
    beds: 3,
    baths: 2,
    area: "980 sq.ft",
    img: "/flats/ganesh_castle.png",
  },


];

export default function FlatsPage() {
  const router = useRouter()
  
  const onClickHandler = (id: string) => {
    // add id to the router
    router.push(`/projects?projectId=${id}`)
  }

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
                <button
                  onClick={() => onClickHandler(flat.id)}
                  className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  View Project
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}