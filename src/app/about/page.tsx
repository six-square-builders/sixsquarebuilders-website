"use client";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Building the Future, <br />
            <span className="text-gray-500">Restoring the Past.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are a full-service construction company focused on transforming skylines and enriching lives through sustainable, innovative, and high-quality craftsmanship.
          </p>
        </div>
      </section>

      {/* Story & Image Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Our Story
            </h2>
            <div className="mt-6 space-y-6 text-gray-600 leading-relaxed">
              <p>
                Since our inception, Six Square Builders has delivered projects
                distinguished by quality, innovation, and integrity. What started
                as a small team of passionate builders has grown into a
                multidisciplinary force in the industry.
              </p>
              <p>
                We manage residential and commercial developments from concept to
                completion, ensuring that every beam laid and every detail
                finished meets our rigorous standards.
              </p>
            </div>

            <div className="mt-8 border-l-4 border-gray-900 pl-4">
              <p className="italic text-gray-600">
                "We don't just build structures; we build trust."
              </p>
            </div>
          </div>

          {/* Large Image */}
          <div className="relative h-[400px] overflow-hidden rounded-2xl bg-gray-100 shadow-xl lg:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1600&auto=format&fit=crop"
              alt="Team at a construction site"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values Section (Transformed into Cards) */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Mission & Values
            </h2>
            <p className="mt-4 text-gray-600">
              The core principles that guide every decision we make.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Craftsmanship",
                desc: "We deliver exceptional quality and value in every square foot we build.",
              },
              {
                title: "Safety & Compliance",
                desc: "We prioritize the safety of our team and sustainability of our environment.",
              },
              {
                title: "Transparency",
                desc: "We build long-term relationships through honesty and open communication.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
