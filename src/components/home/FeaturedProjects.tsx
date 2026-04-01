import Image from "next/image";
import { featuredProjects } from "@/lib/data";

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">
            Featured Projects
          </h2>
          <p className="mt-2 max-w-prose text-muted-foreground">
            A glimpse of our craftsmanship across residential and commercial
            developments.
          </p>
        </div>
        <a
          href="/projects.html"
          className="hidden rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground md:inline-block"
        >
          View all
        </a>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {featuredProjects.map((p) => (
          <div
            key={p.title}
            className="group overflow-hidden rounded-lg border"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={p.src}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <span className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
                {p.tag}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              {("address" in p) && p.address ? (
                <p className="mt-1 text-sm text-muted-foreground">{p.address}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center md:hidden">
        <a
          href="/projects.html"
          className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
        >
          View all projects
        </a>
      </div>
    </section>
  );
}
