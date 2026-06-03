"use client";
import { Award, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 selection:bg-neutral-900 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-4 pb-12 pt-16 sm:px-6 sm:pb-20 sm:pt-28 lg:pb-32 lg:pt-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
            Building the Future, <br />
            <span className="text-neutral-400">Restoring the Past.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:mt-6 sm:text-lg sm:leading-8">
            We are a full-service construction company focused on transforming skylines and enriching lives through sustainable, innovative, and high-quality craftsmanship.
          </p>
        </div>
      </section>

      {/* Story & Founders Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-neutral-900 sm:mb-6 sm:text-4xl">
              Our Story & Leadership
            </h2>
            <div className="space-y-5 text-base leading-7 text-neutral-600 sm:space-y-6 sm:text-lg sm:leading-relaxed">
              <p>
                Founded and guided by our visionary partners,{" "}
                <strong className="text-neutral-900 font-semibold">Gopinathan G</strong> and{" "}
                <strong className="text-neutral-900 font-semibold">Viji G</strong>, Six Square
                Builders has consistently delivered projects distinguished by
                quality, innovation, and integrity.
              </p>
              <p>
                What started as a small team of passionate builders has grown into a
                multidisciplinary force in the industry. Under their leadership, we
                manage residential and commercial developments from concept to
                completion, ensuring that every beam laid and every detail
                finished meets our rigorous standards.
              </p>
            </div>

            <div className="mt-8 border-l-4 border-neutral-900 py-2 pl-4 sm:mt-10 sm:pl-6">
              <p className="text-lg italic text-neutral-800 font-medium sm:text-xl">
                "We don't just build structures; we build trust."
              </p>
            </div>
          </div>

          {/* Founders Images Container */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Partner 1 Image */}
              <div className="group relative min-h-72 overflow-hidden rounded-lg bg-neutral-100 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:aspect-[3/4] sm:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#f5f5f5_0%,#d4d4d4_100%)]" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full border border-white/50 bg-white/55 px-6 py-5 text-4xl font-bold text-neutral-700 shadow-sm backdrop-blur">
                    GG
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 transition-transform duration-500 group-hover:translate-y-0 sm:p-6 sm:translate-y-4">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">Gopinathan G</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-300 sm:text-sm">Owner & Partner</p>
                </div>
              </div>

              {/* Partner 2 Image */}
              <div className="group relative min-h-72 overflow-hidden rounded-lg bg-neutral-100 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:mt-12 sm:aspect-[3/4] sm:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#fafafa_0%,#c7c7c7_100%)]" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded-full border border-white/50 bg-white/55 px-6 py-5 text-4xl font-bold text-neutral-700 shadow-sm backdrop-blur">
                    VG
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 transition-transform duration-500 group-hover:translate-y-0 sm:p-6 sm:translate-y-4">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">Viji G</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-300 sm:text-sm">Owner & Partner</p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -inset-x-4 -inset-y-4 bg-gradient-to-tr from-neutral-200 to-white opacity-50 blur-2xl rounded-lg" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl sm:mb-16 lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-neutral-500 uppercase tracking-widest">Our DNA</h2>
            <p className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Mission & Values
            </p>
            <p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              The core principles that guide every decision we make, ensuring excellence in every project.
            </p>
          </div>

          <div className="mx-auto max-w-2xl lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-4 sm:gap-6 lg:max-w-none lg:grid-cols-3 lg:gap-8">
              {[
                {
                  title: "Craftsmanship",
                  desc: "We deliver exceptional quality and value in every square foot we build. Our attention to detail ensures longevity.",
                  icon: <Award className="w-6 h-6 text-neutral-900" />,
                },
                {
                  title: "Safety & Compliance",
                  desc: "We prioritize the safety of our team and sustainability of our environment. Zero compromises on standards.",
                  icon: <ShieldCheck className="w-6 h-6 text-neutral-900" />,
                },
                {
                  title: "Transparency",
                  desc: "We build long-term relationships through honesty and open communication. You're involved at every step.",
                  icon: <HeartHandshake className="w-6 h-6 text-neutral-900" />,
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start rounded-lg border border-neutral-100 bg-neutral-50 p-5 transition-all duration-300 hover:bg-white hover:shadow-xl sm:p-8"
                >
                  <div className="rounded-xl bg-white p-3 shadow-sm border border-neutral-100 mb-6">
                    {value.icon}
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-neutral-900">
                    {value.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-600">
                    <p className="flex-auto">{value.desc}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
