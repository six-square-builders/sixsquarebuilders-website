"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

type Flat = {
  id: string;
  title: string;
  address?: string;
  beds: number;
  baths: number;
  area: string;
  img: string;
};

// Added some static content for testing
const FLATS: Flat[] = [
  {
    id: "ganesha-tower",
    title: "Ganesha Tower • 3 BHK",
    address: "Sadasivam Nagar, Madipakkam, Chennai 600091",
    beds: 3,
    baths: 2,
    area: "1336 sq.ft",
    img: "/flats/ganesha_tower.png",
  }
];

import { getProjectById } from "@/lib/projects";
import type { ProjectDetail } from "@/types";

export default function FlatsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [data, setData] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const openProject = async (id: string) => {
    setOpenId(id);
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const found = await getProjectById(id);
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
              <Image src={flat.img} alt={flat.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{flat.title}</h3>
              {flat.address ? (
                <p className="mt-1 text-sm text-muted-foreground">{flat.address}</p>
              ) : null}
              <div className="mt-1 text-sm text-muted-foreground">
                {flat.beds} Beds • {flat.baths} Baths • {flat.area}
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/contact.html?interest=${encodeURIComponent(flat.id)}`}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Enquire
                </Link>
                <button
                  onClick={() => openProject(flat.id)}
                  className="rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  View Project
                </button>
              </div>
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
  const [isClosing, setIsClosing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAllMedia, setShowAllMedia] = useState(false);
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

  const previewMedia = useMemo(() => {
    if (!data?.media?.length) return [];
    return data.media.slice(0, Math.min(5, data.media.length));
  }, [data?.media]);

  const galleryMedia = showAllMedia ? (data?.media ?? []) : previewMedia;
  const hiddenMediaCount = Math.max((data?.media?.length ?? 0) - previewMedia.length, 0);

  useEffect(() => {
    // autofocus close button when modal opens
    if (open) {
       closeBtnRef.current?.focus();
      setIsClosing(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setSelectedImage(null);
      setShowAllMedia(false);
    }
  }, [open]);

  const handleStartClose = () => {
    // triggers fade-out animation
    setIsClosing(true); 
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      // notify parent component
      onClose();           
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex w-full items-stretch justify-center">
      <div className={`${isClosing ? "animate-fadeOut" : "animate-fadeIn"} absolute inset-0 bg-black/60`} onClick={handleStartClose} onAnimationEnd={handleAnimationEnd} />
      <div
        ref={contentRef}
        className={`${isClosing ? "animate-scaleOut" : "animate-scaleIn"} relative z-10 flex h-full w-full flex-col overflow-hidden bg-background md:rounded-none lg:max-w-6xl lg:rounded-xl lg:shadow-2xl`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
      >
        {selectedImage ? (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/85 p-4" onClick={() => setSelectedImage(null)}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image preview"
              className="absolute right-4 top-4 rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm text-white hover:bg-black/60"
            >
              ×
            </button>
            <div className="relative h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage}
                alt="Project preview"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        ) : null}
        {/* Focus trap sentinels */}
        <span tabIndex={0} aria-hidden="true" />
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/90 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <h2 id="project-modal-title" className="truncate text-lg font-semibold">{data?.name || (loading ? "Loading project…" : error ? "Not found" : "Project Details")}</h2>
          </div>
          <button ref={closeBtnRef} onClick={handleStartClose} onAnimationEnd={handleAnimationEnd} aria-label="Close" className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">
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
                  <div>
                    {!showAllMedia && previewMedia.length > 0 ? (
                      <div className="grid gap-2 sm:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] sm:h-[22rem] lg:h-[24rem]">
                        {(() => {
                          const featured = previewMedia[0];
                          const sideMedia = previewMedia.slice(1);

                          return (
                            <>
                              <div className="relative min-h-[16rem] overflow-hidden rounded-lg border sm:h-full sm:min-h-0">
                                {featured.type === "image" ? (
                                  <button
                                    type="button"
                                    onClick={() => setSelectedImage(featured.url)}
                                    className="absolute inset-0 cursor-zoom-in"
                                    aria-label="Open featured image"
                                  >
                                    <Image
                                      loading="lazy"
                                      src={featured.url}
                                      alt="project media"
                                      fill
                                      className="object-cover transition-transform hover:scale-[1.02]"
                                      sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setShowAllMedia(true)}
                                    className="absolute inset-0"
                                    aria-label="View all project media"
                                  >
                                    <video preload="metadata" muted playsInline className="h-full w-full object-cover">
                                      <source src={featured.url} />
                                    </video>
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3 text-left text-sm font-medium text-white">
                                      Video
                                    </div>
                                  </button>
                                )}
                              </div>
                              {sideMedia.length > 0 ? (
                                <div className="grid grid-cols-2 gap-2 sm:h-full sm:grid-rows-2">
                                  {sideMedia.map((m, i) => {
                                    const showViewAllOverlay =
                                      hiddenMediaCount > 0 && i === sideMedia.length - 1;

                                    return (
                                      <div key={i} className="relative min-h-[7.25rem] overflow-hidden rounded-lg border sm:h-full sm:min-h-0">
                                        {m.type === "image" ? (
                                          <button
                                            type="button"
                                            onClick={() => setSelectedImage(m.url)}
                                            className="absolute inset-0 cursor-zoom-in"
                                            aria-label={`Open image ${i + 2}`}
                                          >
                                            <Image
                                              loading="lazy"
                                              src={m.url}
                                              alt="project media"
                                              fill
                                              className="object-cover transition-transform hover:scale-[1.02]"
                                              sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                          </button>
                                        ) : (
                                          <button
                                            type="button"
                                            onClick={() => setShowAllMedia(true)}
                                            className="absolute inset-0"
                                            aria-label="View all project media"
                                          >
                                            <video preload="metadata" muted playsInline className="h-full w-full object-cover">
                                              <source src={m.url} />
                                            </video>
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-left text-xs font-medium text-white">
                                              Video
                                            </div>
                                          </button>
                                        )}
                                        {showViewAllOverlay ? (
                                          <button
                                            type="button"
                                            onClick={() => setShowAllMedia(true)}
                                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 text-white backdrop-blur-[1px] transition hover:bg-black/65"
                                            aria-label={`View ${hiddenMediaCount} more media items`}
                                          >
                                            <span className="text-3xl font-semibold leading-none">+{hiddenMediaCount}</span>
                                            <span className="mt-2 text-sm font-medium">View all</span>
                                          </button>
                                        ) : null}
                                      </div>
                                    );
                                  })}
                                </div>
                              ) : null}
                            </>
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {galleryMedia.map((m, i) => (
                          <div key={i} className="relative aspect-video overflow-hidden rounded-lg border">
                            {m.type === "image" ? (
                              <button
                                type="button"
                                onClick={() => setSelectedImage(m.url)}
                                className="absolute inset-0 cursor-zoom-in"
                                aria-label={`Open image ${i + 1}`}
                              >
                                <Image loading="lazy" src={m.url} alt="project media" fill className="object-cover transition-transform hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 50vw" />
                              </button>
                            ) : (
                              <video preload="metadata" controls className="h-full w-full object-cover">
                                <source src={m.url} />
                              </video>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {showAllMedia && hiddenMediaCount > 0 ? (
                      <button
                        type="button"
                        onClick={() => setShowAllMedia(false)}
                        className="mt-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      >
                        Show less
                      </button>
                    ) : null}
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
                          {f.unitsCount ? (
                            <div className="text-sm text-muted-foreground">{f.unitsCount} units</div>
                          ) : null}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">{f.areas.superBuiltUp} flat sqft</div>
                        <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
                          <div><dt className="text-muted-foreground">Carpet Area</dt><dd className="font-medium">{f.areas.carpet} sqft</dd></div>
                          <div><dt className="text-muted-foreground">Plinth Area</dt><dd className="font-medium">{(f.areas.plinthArea ?? f.areas.builtUp)} sqft</dd></div>
                          <div><dt className="text-muted-foreground">Super Built-up Area</dt><dd className="font-medium">{f.areas.superBuiltUp} sqft</dd></div>
                          <div><dt className="text-muted-foreground">Floors</dt><dd className="font-medium">{f.floors}</dd></div>
                          <div><dt className="text-muted-foreground">Facing</dt><dd className="font-medium">{f.facing.join(", ")}</dd></div>
                          <div><dt className="text-muted-foreground">Balcony/View</dt><dd className="font-medium">{f.balcony.join(", ")}</dd></div>
                        </dl>
                        {f.floorPlans?.length ? (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {f.floorPlans.map((p, i) => (
                              <figure key={i} className="overflow-hidden rounded border relative">
                                <Image loading="lazy" src={p.url} alt={p.label} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
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
                          <li className="flex justify-between"><span>Parking</span><span>{data.pricing.allInclusiveExample.parking > 0 ? `₹ ${data.pricing.allInclusiveExample.parking.toLocaleString()}` : "Available"}</span></li>
                          <li className="flex justify-between"><span>Membership Charges</span><span>₹ {data.pricing.allInclusiveExample.club.toLocaleString()}</span></li>
                          <li className="flex justify-between"><span>GST</span><span>{data.pricing.allInclusiveExample.gstPercent}%</span></li>
                          <li className="flex justify-between"><span>Registration</span><span>{data.pricing.allInclusiveExample.registrationPercent}%</span></li>
                        </>
                      )}
                    </ul>
                    {!!data.pricing?.banks?.length && (
                      <div className="mt-3 text-sm text-muted-foreground">Bank-approved: {data.pricing.banks.join(", ")}</div>
                    )}
                  </div>
                  {!!data.pricing?.paymentSchedule?.length && (
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Payment schedule</div>
                      <div className="mt-3 overflow-x-auto rounded-md border">
                        <table className="min-w-full border-collapse text-sm">
                          <thead className="bg-muted/60">
                            <tr>
                              <th className="border-b px-3 py-2 text-left font-medium">No.</th>
                              <th className="border-b px-3 py-2 text-left font-medium">Particular</th>
                              <th className="border-b px-3 py-2 text-right font-medium">Percentage to Payment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.pricing.paymentSchedule.map((item, index) => (
                              <tr key={`${item.milestone}-${index}`} className="border-b last:border-b-0">
                                <td className="px-3 py-2 align-top text-muted-foreground">{index + 1}</td>
                                <td className="px-3 py-2">{item.milestone}</td>
                                <td className="px-3 py-2 text-right font-medium">{item.percent}%</td>
                              </tr>
                            ))}
                            <tr className="bg-muted/40 font-semibold">
                              <td className="px-3 py-2" />
                              <td className="px-3 py-2">Total</td>
                              <td className="px-3 py-2 text-right">
                                {data.pricing.paymentSchedule.reduce((sum, item) => sum + item.percent, 0)}%
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
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
                    {data.legal?.rera ? (
                      <>
                        <div className="text-sm text-muted-foreground">RERA</div>
                        <div className="mt-1 font-medium">{data.legal.rera}</div>
                      </>
                    ) : null}
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
                  <Link href={`/contact.html?interest=${encodeURIComponent(data.name)}`} className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Book a Site Visit</Link>
                  <Link href={`/contact.html?interest=${encodeURIComponent(data.name)}&type=callback`} className="rounded-md border px-4 py-2">Request Call Back</Link>
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
