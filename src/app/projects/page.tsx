"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useSearchParams } from 'next/navigation'

type TabKey = "past" | "ongoing" | "future";

const TABS: { key: TabKey; label: string }[] = [
  { key: "ongoing", label: "Ongoing" },
  { key: "past", label: "Past" },
  { key: "future", label: "Future" },
];


// Simple slug utility to derive id used by /api/projects?id=
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const GALLERIES: Record<TabKey, { id: string; title: string; src: string }[]> = {
  ongoing: [
    {
      title: "Ganesh Castle",
      id: "ganesh-castle",
      src: "/flats/ganesh_castle.png",
    },
    {
      title: "Ganesh Castle",
      id: "ganesh-castle-1",
      src: "/flats/ganesh_castle.png",
    },
    {
      title: "Ganesh Castle",
      id: "ganesh-castle-2",
      src: "/flats/ganesh_castle.png",
    },
    {
      title: "Ganesh Castle",
      id: "ganesh-castle-3",
      src: "/flats/ganesh_castle.png",
    },
    {
      title: "Ganesh Castle",
      id: "ganesh-castle-4",
      src: "/flats/ganesh_castle.png",
    },
    {
      title: "Ganesh Castle",
      id: "ganesh-castle-5",
      src: "/flats/ganesh_castle.png",
    },
    {
      title: "Ganesh Castle",
      id: "ganesh-castle-6",
      src: "/flats/ganesh_castle.png",
    },
    {
      title: "Ganesh Castle",
      id: "ganesh-castle-7",
      src: "/flats/ganesh_castle.png",
    },

  ],
  past: [
    {
      title: "Balaian Garden",
      id: slugify("Riverview Residency"),
      src: "/flats/balaiah_garden.png",
    },
    {
      title: "Ganapathi Enclave",
      id: slugify("Maple Grove Villas"),
      src: "/flats/ganapathi_enclave.png",
    },

  ],
  future: [
    {
      title: "Coming Soon",
      id: slugify("Tech Park Central"),
      src: "/flats/coming_soon.png",
    },

  ],
};

// Types matching API response shape (subset)
interface ProjectDetail {
  id: string;
  name: string;
  address: string;
  coords?: { lat: number; lng: number };
  status?: { stage: string; progress: number };
  possessionDate?: string;
  media?: { type: "image" | "video"; url: string }[];
  flats?: {
    type: string;
    areas: { carpet: number; builtUp: number; superBuiltUp: number };
    floors: string;
    facing: string[];
    balcony: string[];
    floorPlans: { label: string; url: string }[];
    basePricePerSqft: number;
  }[];
  pricing?: {
    allInclusiveExample?: {
      maintenance: number;
      parking: number;
      club: number;
      gstPercent: number;
      registrationPercent: number;
    };
    banks?: string[];
    paymentSchedule?: { milestone: string; percent: number }[];
  };
  amenities?: string[];
  specs?: {
    flooring?: string;
    fittings?: string;
    kitchen?: string;
    smartHome?: string;
  };
  sustainability?: string[];
  developer?: { name: string; trackRecord: string };
  legal?: {
    rera?: string;
    approvals?: string;
    documents?: { label: string; url: string }[];
  };
  testimonials?: { name: string; text: string }[];
  awards?: string[];
  landmarks?: { type: string; name: string; distanceKm: number }[];
}

export default function ProjectsPage() {
  const [active, setActive] = useState<TabKey>("ongoing");
  const [openId, setOpenId] = useState<string | null>(null);
  const [data, setData] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams()
  const projectId = params.get('projectId')

  // Open modal and fetch data
// Only fetch from /projects.json for all projects
const openProject = async (id: string) => {
  setOpenId(id);
  setLoading(true);
  setError(null);
  setData(null);
  try {
    // Use only /projects.json (static data source)
    const res = await fetch("/projects.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load project data");
    const all: ProjectDetail[] = await res.json();
    const found = all.find((p) => p.id === id);
    if (!found) throw new Error("Project not found");
    setData(found);
  } catch (e: any) {
    setError(e?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  const close = () => {
    setOpenId(null);
    setData(null);
    setError(null);
  };

  // Prevent body scroll when modal open
  useEffect(() => {
    if (openId) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [openId]);

  // Open modal on change route if projectId exists in url
  useEffect(() => { 
    if (projectId) { 
      openProject(projectId)
    }  
  }, [projectId])

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Our Projects</h1>
        <p className="mt-2 max-w-prose text-muted-foreground">
          Explore our portfolio across ongoing developments, completed landmarks, and upcoming visions.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
              active === t.key ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {GALLERIES[active].map((item) => (
          <article
            key={item.id}
            onClick={() => openProject(item.id)}
            className="group cursor-pointer overflow-hidden rounded-lg border transition shadow-sm hover:shadow"
          >
            <div className="relative aspect-[16/10]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Premium location • Quality materials • Timely delivery</p>
            </div>
          </article>
        ))}
      </div>

      {openId && (
        <ProjectModal open onClose={close} loading={loading} data={data} error={error} />
      )}
    </main>
  );
}

// Modal Component
function ProjectModal({
  open,
  onClose,
  loading,
  data,
  error,
}: {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  data: ProjectDetail | null;
  error: string | null;
}) {
  const startY = useRef<number | null>(null);
  const deltaY = useRef(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Focus trap: keep tabbing inside
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !contentRef.current) return;
    const focusables = contentRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      (last as HTMLElement).focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      (first as HTMLElement).focus();
    }
  };

  // Swipe down to close on mobile
  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    deltaY.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startY.current == null) return;
    deltaY.current = e.touches[0].clientY - startY.current;
    if (deltaY.current > 0 && contentRef.current) {
      contentRef.current.style.transform = `translateY(${Math.min(deltaY.current, 120)}px)`;
    }
  };
  const onTouchEnd = () => {
    if (deltaY.current > 80) onClose();
    if (contentRef.current) contentRef.current.style.transform = "";
    startY.current = null;
    deltaY.current = 0;
  };

  const possession = useMemo(() => {
    if (!data?.possessionDate) return null;
    try {
      return new Date(data.possessionDate).toLocaleDateString();
    } catch {
      return data.possessionDate;
    }
  }, [data?.possessionDate]);

  useEffect(() => {
    // autofocus close button when modal opens
    if (open) closeBtnRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex w-full items-stretch justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        ref={contentRef}
        className="relative z-10 flex h-full w-full flex-col overflow-hidden bg-background md:rounded-none lg:max-w-6xl lg:rounded-xl lg:shadow-2xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        aria-describedby="project-modal-desc"
        tabIndex={-1}
      >
        {/* Focus trap sentinels */}
        <span tabIndex={0} aria-hidden="true" />
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/90 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <p id="project-modal-desc" className="truncate text-sm text-muted-foreground">{data?.address || (loading ? "Loading address…" : "")}</p>
            <h2 id="project-modal-title" className="truncate text-lg font-semibold">{data?.name || (loading ? "Loading project…" : error ? "Not found" : "Project Details")}</h2>
          </div>
          <button ref={closeBtnRef} onClick={onClose} aria-label="Close" className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">
            ×
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="p-4 md:p-6">
              <div className="grid gap-4 md:grid-cols-2" aria-hidden>
                <div className="h-40 animate-pulse rounded-lg bg-muted" />
                <div className="h-40 animate-pulse rounded-lg bg-muted" />
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-24 animate-pulse rounded bg-muted" />
              </div>
            </div>
          )}
          {error && !loading && (
            <div className="p-6 text-destructive">{error}</div>
          )}
          {!loading && data && (
            <div className="space-y-10 p-4 md:p-6">
              {/* Project Overview */}
              <section>
                <h3 className="text-xl font-semibold">Project Overview</h3>
                <p className="mt-1 text-muted-foreground">{data.name} • {data.address}</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {/* Media Gallery */}
                  <div className="grid grid-cols-2 gap-2">
                    {data.media?.slice(0, 6).map((m, i) => (
                      <div key={i} className={"relative aspect-video overflow-hidden rounded-lg border"}>
                        {m.type === "image" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img loading="lazy" src={m.url} alt="project media" className="h-full w-full object-cover" />
                        ) : (
                          <video preload="metadata" controls className="h-full w-full object-cover">
                            <source src={m.url} />
                          </video>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Map + Landmarks */}
                  <div>
                    {data.coords ? (
                      <iframe
                        title="Google Map"
                        className="h-64 w-full rounded-lg border md:h-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps?q=${data.coords.lat},${data.coords.lng}&hl=en&z=14&output=embed`}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center rounded-lg border text-sm text-muted-foreground">Map not available</div>
                    )}
                    {!!data.landmarks?.length && (
                      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                        {data.landmarks.map((l, idx) => (
                          <li key={idx} className="flex items-center justify-between border-b py-1 text-muted-foreground">
                            <span className="mr-3 truncate">{l.type}: {l.name}</span>
                            <span className="shrink-0 tabular-nums">{l.distanceKm.toFixed(1)} km</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </section>

              {/* Construction Status */}
              <section>
                <h3 className="text-xl font-semibold pt-10">Construction Status</h3>
                <div className="mt-2 grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Current Stage</div>
                    <div className="mt-1 font-medium">{data.status?.stage || "—"}</div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-2 bg-primary" style={{ width: `${data.status?.progress ?? 0}%` }} />
                    </div>
                    <div className="mt-1 text-right text-xs text-muted-foreground">{data.status?.progress ?? 0}%</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Estimated Possession</div>
                    <div className="mt-1 font-medium">{possession || "TBA"}</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Live Updates</div>
                    <div className="mt-1 text-sm">Photos and video in gallery above.</div>
                  </div>
                </div>
              </section>

              {/* Flat / Unit Details */}
              {!!data.flats?.length && (
                <section>
                  <h3 className="text-xl font-semibold">Flat / Unit Details</h3>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    {data.flats.map((f, idx) => (
                      <div key={idx} className="rounded-lg border p-4">
                        <div className="flex items-baseline justify-between">
                          <div className="font-medium">{f.type}</div>
                          <div className="text-sm text-muted-foreground">Base ₹ {f.basePricePerSqft.toLocaleString()}/sqft</div>
                        </div>
                        <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div><dt className="text-muted-foreground">Carpet</dt><dd className="font-medium">{f.areas.carpet} sqft</dd></div>
                          <div><dt className="text-muted-foreground">Built-up</dt><dd className="font-medium">{f.areas.builtUp} sqft</dd></div>
                          <div><dt className="text-muted-foreground">Super built-up</dt><dd className="font-medium">{f.areas.superBuiltUp} sqft</dd></div>
                          <div><dt className="text-muted-foreground">Floors</dt><dd className="font-medium">{f.floors}</dd></div>
                          <div><dt className="text-muted-foreground">Facing</dt><dd className="font-medium">{f.facing.join(", ")}</dd></div>
                          <div><dt className="text-muted-foreground">Balcony/View</dt><dd className="font-medium">{f.balcony.join(", ")}</dd></div>
                        </dl>
                        {f.floorPlans?.length ? (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {f.floorPlans.map((p, i) => (
                              <figure key={i} className="overflow-hidden rounded border">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img loading="lazy" src={p.url} alt={p.label} className="aspect-video w-full object-cover" />
                                <figcaption className="px-2 py-1 text-xs text-muted-foreground">{p.label}</figcaption>
                              </figure>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Pricing & Payment */}
              <section>
                <h3 className="text-xl font-semibold">Pricing & Payment</h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">All-inclusive estimate example</div>
                    <ul className="mt-2 space-y-1 text-sm">
                      {data.pricing?.allInclusiveExample && (
                        <>
                          <li className="flex justify-between"><span>Maintenance</span><span>₹ {data.pricing.allInclusiveExample.maintenance.toLocaleString()}</span></li>
                          <li className="flex justify-between"><span>Parking</span><span>₹ {data.pricing.allInclusiveExample.parking.toLocaleString()}</span></li>
                          <li className="flex justify-between"><span>Club Membership</span><span>₹ {data.pricing.allInclusiveExample.club.toLocaleString()}</span></li>
                          <li className="flex justify-between"><span>GST</span><span>{data.pricing.allInclusiveExample.gstPercent}%</span></li>
                          <li className="flex justify-between"><span>Registration</span><span>{data.pricing.allInclusiveExample.registrationPercent}%</span></li>
                        </>
                      )}
                    </ul>
                    {!!data.pricing?.paymentSchedule?.length && (
                      <div className="mt-3">
                        <div className="text-sm text-muted-foreground">Payment schedule</div>
                        <ul className="mt-1 space-y-1 text-sm">
                          {data.pricing.paymentSchedule.map((s, i) => (
                            <li key={i} className="flex justify-between"><span>{s.milestone}</span><span>{s.percent}%</span></li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {!!data.pricing?.banks?.length && (
                      <div className="mt-3 text-sm text-muted-foreground">Bank-approved: {data.pricing.banks.join(", ")}</div>
                    )}
                  </div>

                  {/* Simple EMI calculator */}
                  <EMICalculator />
                </div>
              </section>

              {/* Amenities & Specifications */}
              <section>
                <h3 className="text-xl font-semibold">Amenities & Specifications</h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Building amenities</div>
                    <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
                      {data.amenities?.map((a, i) => (
                        <li key={i} className="rounded border px-2 py-1">{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Apartment specs</div>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li><span className="text-muted-foreground">Flooring: </span>{data.specs?.flooring || "—"}</li>
                      <li><span className="text-muted-foreground">Fittings: </span>{data.specs?.fittings || "—"}</li>
                      <li><span className="text-muted-foreground">Kitchen: </span>{data.specs?.kitchen || "—"}</li>
                      <li><span className="text-muted-foreground">Smart-home: </span>{data.specs?.smartHome || "—"}</li>
                    </ul>
                    {!!data.sustainability?.length && (
                      <div className="mt-3 text-sm"><span className="text-muted-foreground">Sustainability: </span>{data.sustainability.join(", ")}</div>
                    )}
                  </div>
                </div>
              </section>

              {/* Developer & Legal Info */}
              <section>
                <h3 className="text-xl font-semibold">Developer & Legal Info</h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">Developer</div>
                    <div className="mt-1 font-medium">{data.developer?.name}</div>
                    <div className="text-sm text-muted-foreground">{data.developer?.trackRecord}</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm text-muted-foreground">RERA</div>
                    <div className="mt-1 font-medium">{data.legal?.rera || "—"}</div>
                    <div className="mt-2 text-sm text-muted-foreground">{data.legal?.approvals}</div>
                    {!!data.legal?.documents?.length && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {data.legal.documents.map((d, i) => (
                          <a key={i} href={d.url} target="_blank" rel="noopener noreferrer" className="rounded border px-3 py-1.5 text-sm hover:bg-accent">
                            {d.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </section>

              {/* Interaction & Lead Capture */}
              <section>
                <h3 className="text-xl font-semibold">Get in touch</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link href={`/contact?interest=${encodeURIComponent(data.name)}`} className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Book a Site Visit</Link>
                  <Link href={`/contact?interest=${encodeURIComponent(data.name)}&type=callback`} className="rounded-md border px-4 py-2">Request Call Back</Link>
                  <ShareButtons title={data.name} url={typeof window !== 'undefined' ? window.location.href : ''} />
                </div>
                <QuickInquiry defaultInterest={data.name} />
              </section>

              {/* Social Proof */}
              {(!!data.testimonials?.length ) && (
                <section>
                  <h3 className="text-xl font-semibold">Social Proof</h3>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    {!!data.testimonials?.length && (
                      <div className="rounded-lg border p-4">
                        <div className="text-sm text-muted-foreground">Testimonials</div>
                        <ul className="mt-2 space-y-2">
                          {data.testimonials.map((t, i) => (
                            <li key={i} className="rounded border p-3"><div className="font-medium">{t.name}</div><p className="text-sm text-muted-foreground">{t.text}</p></li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </section>
              )}
            </div>
          )}
        </div>
        {/* Focus trap sentinel end */}
        <span tabIndex={0} aria-hidden="true" />
      </div>
    </div>
  );
}

function EMICalculator() {
  const [amount, setAmount] = useState(5000000); // ₹50L
  const [rate, setRate] = useState(8.5); // % annual
  const [years, setYears] = useState(20);

  const emi = useMemo(() => {
    const P = amount;
    const r = rate / 12 / 100;
    const n = years * 12;
    if (r === 0) return P / n;
    return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [amount, rate, years]);

  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">EMI Calculator</div>
      <div className="mt-2 grid gap-3">
        <label className="text-sm">Loan Amount (₹)
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 w-full rounded border px-3 py-2" />
        </label>
        <label className="text-sm">Interest Rate (% p.a.)
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-1 w-full rounded border px-3 py-2" />
        </label>
        <label className="text-sm">Tenure (years)
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1 w-full rounded border px-3 py-2" />
        </label>
      </div>
      <div className="mt-3 rounded bg-muted px-3 py-2 text-sm">Approx. EMI: <span className="font-semibold">₹ {Math.round(emi).toLocaleString()}</span>/month</div>
    </div>
  );
}

function QuickInquiry({ defaultInterest }: { defaultInterest?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const validatePhone = (v: string) => /^[0-9+()[\]\-\s]{7,}$/.test(v);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!validatePhone(phone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service not configured. Add EmailJS keys in .env.");
      return;
    }

    setSubmitting(true);

    const vars = {
      project_name: defaultInterest || "General Inquiry",
      name,
      email,
      phone,
      message,
      to_email: "myaddress@example.com",
    } as Record<string, any>;

    try {
      await emailjs.send(serviceId, templateId, vars, { publicKey });
      toast.success("Thanks! Your enquiry has been sent.");
      setName(""); setEmail(""); setPhone(""); setMessage("");
    } catch (err) {
      toast.error("Couldn't send your enquiry.", {
        action: {
          label: "Retry",
          onClick: () => {
            // re-submit
            const fakeEvent = { preventDefault: () => {} } as unknown as React.FormEvent;
            onSubmit(fakeEvent);
          },
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3 rounded-lg border p-4" aria-label="Quick inquiry form">
      <div className="grid gap-3 md:grid-cols-2">
        <input aria-label="Name" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="rounded border px-3 py-2" />
        <input aria-label="Email" required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded border px-3 py-2" />
        <input aria-label="Phone" required placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded border px-3 py-2 md:col-span-2" />
        <textarea aria-label="Message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className="rounded border px-3 py-2 md:col-span-2" />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button disabled={submitting} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50">
          {submitting && <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/60 border-t-transparent" aria-hidden />}
          {submitting ? "Sending…" : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}

function ShareButtons({ title, url }: { title: string; url: string }) {
  const share = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, url });
      } catch {}
    }
  };

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(title + " - " + url)}`;
  const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={share} className="rounded border px-3 py-1.5 text-sm">Share</button>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded border px-3 py-1.5 text-sm">WhatsApp</a>
      <a href={mailto} className="rounded border px-3 py-1.5 text-sm">Email</a>
    </div>
  );
}