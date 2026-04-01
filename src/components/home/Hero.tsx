import Image from "next/image";
import Link from "next/link";
import { heroImages } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-28 text-primary-foreground md:grid-cols-2 md:py-36">
        <div>
          <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl">
            Designing Dreams, Building Realities
          </h1>
          <p className="mt-4 max-w-prose text-lg text-white/90">
            Six Square Builders transforms visions into luxurious living and
            working spaces, with attention to detail, quality craftsmanship, and
            modern aesthetics.
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
            {heroImages.map((src, i) => (
              <div
                key={i}
                className="aspect-video overflow-hidden rounded-md relative"
              >
                <Image
                  src={src}
                  alt="Project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
