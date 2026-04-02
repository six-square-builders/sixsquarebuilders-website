"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import type { ProjectDetail } from "@/types";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkgqopaa";

type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  data: ProjectDetail | null;
  error: string | null;
};

const MEDIA_SWIPE_THRESHOLD = 56;

export default function ProjectModal({
  open,
  onClose,
  loading,
  data,
  error,
}: ProjectModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const startY = useRef<number | null>(null);
  const deltaY = useRef(0);
  const viewerTouchStartX = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

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
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (viewerIndex !== null) return;
    startY.current = e.touches[0].clientY;
    deltaY.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (viewerIndex !== null) return;
    if (startY.current == null) return;
    deltaY.current = e.touches[0].clientY - startY.current;
    if (deltaY.current > 0 && contentRef.current) {
      contentRef.current.style.transform = `translateY(${Math.min(deltaY.current, 120)}px)`;
    }
  };

  const onTouchEnd = () => {
    if (viewerIndex !== null) return;
    if (deltaY.current > 80) {
      handleStartClose();
    }
    if (contentRef.current) {
      contentRef.current.style.transform = "";
    }
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

  const mediaItems = data?.media ?? [];
  const normalizedActiveIndex =
    mediaItems.length > 0
      ? Math.min(activeMediaIndex, mediaItems.length - 1)
      : 0;
  const normalizedViewerIndex =
    viewerIndex != null && mediaItems.length > 0
      ? Math.min(viewerIndex, mediaItems.length - 1)
      : null;

  const activeMedia = mediaItems[normalizedActiveIndex] ?? null;
  const viewerMedia =
    normalizedViewerIndex != null ? mediaItems[normalizedViewerIndex] ?? null : null;

  const getWrappedMediaIndex = (index: number) => {
    if (mediaItems.length === 0) return 0;
    return (index + mediaItems.length) % mediaItems.length;
  };

  const goToMedia = (index: number) => {
    const wrappedIndex = getWrappedMediaIndex(index);
    setActiveMediaIndex(wrappedIndex);
    if (viewerIndex != null) {
      setViewerIndex(wrappedIndex);
    }
  };

  const openViewerAt = (index: number) => {
    const wrappedIndex = getWrappedMediaIndex(index);
    setActiveMediaIndex(wrappedIndex);
    setViewerIndex(wrappedIndex);
  };

  const closeViewer = () => {
    setViewerIndex(null);
    viewerTouchStartX.current = null;
  };

  const onViewerTouchStart = (e: React.TouchEvent) => {
    viewerTouchStartX.current = e.touches[0].clientX;
  };

  const onViewerTouchEnd = (e: React.TouchEvent) => {
    if (viewerTouchStartX.current == null || mediaItems.length < 2) return;
    const deltaX = e.changedTouches[0].clientX - viewerTouchStartX.current;
    if (Math.abs(deltaX) >= MEDIA_SWIPE_THRESHOLD) {
      goToMedia(normalizedViewerIndex == null ? normalizedActiveIndex : normalizedViewerIndex + (deltaX < 0 ? 1 : -1));
    }
    viewerTouchStartX.current = null;
  };

  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus();
      setIsClosing(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setViewerIndex(null);
      setActiveMediaIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveMediaIndex(0);
    setViewerIndex(null);
  }, [data?.id]);

  useEffect(() => {
    if (!open) return;

    const onWindowKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (viewerIndex != null) {
          closeViewer();
        } else {
          handleStartClose();
        }
        return;
      }

      if (viewerIndex == null || mediaItems.length < 2) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToMedia(viewerIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToMedia(viewerIndex - 1);
      }
    };

    window.addEventListener("keydown", onWindowKeyDown);
    return () => window.removeEventListener("keydown", onWindowKeyDown);
  }, [open, viewerIndex, mediaItems.length]);

  const handleStartClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex w-full items-stretch justify-center">
      <div
        className={`${isClosing ? "animate-fadeOut" : "animate-fadeIn"} absolute inset-0 bg-black/60`}
        onClick={handleStartClose}
        onAnimationEnd={handleAnimationEnd}
      />
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
        {viewerMedia ? (
          <div className="absolute inset-0 z-30 overflow-hidden bg-black/95 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%)]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-black/35 px-3 py-3 backdrop-blur md:px-5">
                <div className="min-w-0">
                  <div className="text-[0.7rem] uppercase tracking-[0.24em] text-white/55">Media viewer</div>
                  <div className="truncate text-sm font-medium md:text-base">{data?.name}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/80">
                    {(normalizedViewerIndex ?? 0) + 1} / {mediaItems.length}
                  </div>
                  <button
                    type="button"
                    onClick={closeViewer}
                    aria-label="Close media viewer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/18"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              <div
                className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-3 md:px-6 md:py-5"
                onTouchStart={onViewerTouchStart}
                onTouchEnd={onViewerTouchEnd}
              >
                {mediaItems.length > 1 ? (
                  <GalleryNavButton
                    direction="left"
                    onClick={() => goToMedia((normalizedViewerIndex ?? 0) - 1)}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 md:left-5"
                  />
                ) : null}

                <div className="relative flex h-full w-full max-w-6xl items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl">
                  {viewerMedia.type === "image" ? (
                    <div className="relative h-full min-h-[18rem] w-full">
                      <Image
                        src={viewerMedia.url}
                        alt={`${data?.name || "Project"} media ${(normalizedViewerIndex ?? 0) + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </div>
                  ) : (
                    <video
                      preload="auto"
                      controls
                      autoPlay
                      playsInline
                      className="h-full max-h-full w-full rounded-[1.75rem] bg-black object-contain"
                    >
                      <source src={viewerMedia.url} />
                    </video>
                  )}
                </div>

                {mediaItems.length > 1 ? (
                  <GalleryNavButton
                    direction="right"
                    onClick={() => goToMedia((normalizedViewerIndex ?? 0) + 1)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 md:right-5"
                  />
                ) : null}
              </div>

              {mediaItems.length > 1 ? (
                <div className="border-t border-white/10 bg-black/35 px-3 py-3 backdrop-blur md:px-5">
                  <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pb-1">
                    {mediaItems.map((media, index) => {
                      const isActive = index === normalizedViewerIndex;

                      return (
                        <button
                          key={`${media.url}-${index}`}
                          type="button"
                          onClick={() => goToMedia(index)}
                          className={`group relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border transition ${
                            isActive
                              ? "border-white/70 ring-2 ring-white/35"
                              : "border-white/10 hover:border-white/35"
                          }`}
                          aria-label={`Open media ${index + 1}`}
                        >
                          {media.type === "image" ? (
                            <Image
                              src={media.url}
                              alt={`${data?.name || "Project"} thumbnail ${index + 1}`}
                              fill
                              className="object-cover transition duration-300 group-hover:scale-105"
                              sizes="96px"
                            />
                          ) : (
                            <>
                              <video preload="metadata" muted playsInline className="h-full w-full object-cover">
                                <source src={media.url} />
                              </video>
                              <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                                <PlayIcon />
                              </div>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <span tabIndex={0} aria-hidden="true" />

        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b bg-background/90 px-4 py-3 backdrop-blur md:px-5">
          <div className="min-w-0">
            <h2 id="project-modal-title" className="truncate text-lg font-semibold">
              {data?.name || (loading ? "Loading project…" : error ? "Not found" : "Project Details")}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={handleStartClose}
            onAnimationEnd={handleAnimationEnd}
            aria-label="Close"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border bg-background shadow-sm transition hover:bg-accent"
          >
            <CloseIcon />
          </button>
        </div>

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
          {error && !loading && <div className="p-6 text-destructive">{error}</div>}
          {!loading && data && (
            <div className="space-y-10 p-4 md:p-6">
              <section>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Project Overview</h3>
                    <p className="mt-1 text-muted-foreground">{data.name} • {data.address}</p>
                  </div>
                </div>
                <div className="mt-4 grid items-stretch gap-4 md:grid-cols-2">
                  <div className="flex h-full flex-col md:min-h-[42rem] lg:min-h-[46rem]">
                    {activeMedia ? (
                      <>
                        <div className="flex-1 overflow-hidden rounded-[1.5rem] border bg-zinc-950 text-white shadow-lg">
                          <div className="group relative h-full min-h-[20rem] sm:min-h-[24rem] md:min-h-[33rem] lg:min-h-[37rem]">
                            {activeMedia.type === "image" ? (
                              <>
                                <Image
                                  loading="lazy"
                                  src={activeMedia.url}
                                  alt={`${data.name} media ${normalizedActiveIndex + 1}`}
                                  fill
                                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-black/60 via-black/15 to-transparent px-4 py-4">
                                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                                    {normalizedActiveIndex + 1} / {mediaItems.length}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => openViewerAt(normalizedActiveIndex)}
                                    aria-label={`Open media ${normalizedActiveIndex + 1} in fullscreen viewer`}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white transition hover:bg-black/65"
                                  >
                                    <FullscreenIcon />
                                  </button>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/70 via-black/15 to-transparent px-4 py-4">
                                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                                    Photo
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <video preload="metadata" controls playsInline className="h-full w-full object-cover bg-black">
                                  <source src={activeMedia.url} />
                                </video>
                                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 bg-gradient-to-b from-black/60 via-black/15 to-transparent px-4 py-4">
                                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                                    {normalizedActiveIndex + 1} / {mediaItems.length}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => openViewerAt(normalizedActiveIndex)}
                                    aria-label={`Open media ${normalizedActiveIndex + 1} in fullscreen viewer`}
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white transition hover:bg-black/65"
                                  >
                                    <FullscreenIcon />
                                  </button>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/70 via-black/15 to-transparent px-4 py-4">
                                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
                                    Video
                                  </span>
                                </div>
                              </>
                            )}

                            {mediaItems.length > 1 ? (
                              <>
                                <GalleryNavButton
                                  direction="left"
                                  onClick={() => goToMedia(normalizedActiveIndex - 1)}
                                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 opacity-100 transition md:left-4 md:opacity-0 md:group-hover:opacity-100"
                                />
                                <GalleryNavButton
                                  direction="right"
                                  onClick={() => goToMedia(normalizedActiveIndex + 1)}
                                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 opacity-100 transition md:right-4 md:opacity-0 md:group-hover:opacity-100"
                                />
                              </>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm text-muted-foreground">
                              {mediaItems.length} media item{mediaItems.length === 1 ? "" : "s"} available
                            </div>
                            <button
                              type="button"
                              onClick={() => openViewerAt(normalizedActiveIndex)}
                              className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                            >
                              View all media
                            </button>
                          </div>

                          {mediaItems.length > 1 ? (
                            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                              {mediaItems.map((media, index) => {
                                const isActive = index === normalizedActiveIndex;

                                return (
                                  <button
                                    key={`${media.url}-${index}`}
                                    type="button"
                                    onClick={() => setActiveMediaIndex(index)}
                                    className={`group relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border transition ${
                                      isActive
                                        ? "border-primary ring-2 ring-primary/20"
                                        : "border-border hover:border-foreground/20"
                                    }`}
                                    aria-label={`Preview media ${index + 1}`}
                                  >
                                    {media.type === "image" ? (
                                      <Image
                                        loading="lazy"
                                        src={media.url}
                                        alt={`${data.name} thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover transition duration-300 group-hover:scale-105"
                                        sizes="112px"
                                      />
                                    ) : (
                                      <>
                                        <video preload="metadata" muted playsInline className="h-full w-full object-cover">
                                          <source src={media.url} />
                                        </video>
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                                          <PlayIcon />
                                        </div>
                                      </>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      </>
                    ) : (
                      <div className="flex h-64 items-center justify-center rounded-[1.5rem] border border-dashed text-sm text-muted-foreground">
                        Project media will appear here.
                      </div>
                    )}
                  </div>

                  <div className="flex h-full flex-col md:min-h-[42rem] lg:min-h-[46rem]">
                    {data.coords ? (
                      <iframe
                        title="Google Map"
                        className="h-72 w-full rounded-lg border sm:h-80 md:min-h-0 md:flex-1"
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
                            <span className="mr-3 truncate">
                              {l.type}: {l.name}
                            </span>
                            <span className="shrink-0 tabular-nums">{l.distanceKm.toFixed(1)} km</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </section>

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

              {!!data.flats?.length && (
                <section>
                  <h3 className="text-xl font-semibold">Flat / Unit Details</h3>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    {data.flats.map((f, idx) => (
                      <div key={idx} className="rounded-lg border p-4">
                        <div className="flex items-baseline justify-between">
                          <div className="font-medium">{f.type}</div>
                          {f.unitsCount ? <div className="text-sm text-muted-foreground">{f.unitsCount} units</div> : null}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">{f.areas.superBuiltUp} sqft</div>
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

              <section>
                <h3 className="text-xl font-semibold">Get in touch</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link href={`/contact?interest=${encodeURIComponent(data.name)}`} className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Book a Site Visit</Link>
                  <Link href={`/contact?interest=${encodeURIComponent(data.name)}&type=callback`} className="rounded-md border px-4 py-2">Request Call Back</Link>
                  <ShareButtons title={data.name} url={typeof window !== "undefined" ? window.location.href : ""} />
                </div>
                <QuickInquiry defaultInterest={data.name} />
              </section>

              {!!data.testimonials?.length && (
                <section>
                  <h3 className="text-xl font-semibold">Social Proof</h3>
                  <div className="mt-3 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Testimonials</div>
                      <ul className="mt-2 space-y-2">
                        {data.testimonials.map((t, i) => (
                          <li key={i} className="rounded border p-3">
                            <div className="font-medium">{t.name}</div>
                            <p className="text-sm text-muted-foreground">{t.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
        <span tabIndex={0} aria-hidden="true" />
      </div>
    </div>
  );
}

function QuickInquiry({ defaultInterest }: { defaultInterest?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const lastPayloadRef = useRef<Record<string, string> | null>(null);

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const validatePhone = (v: string) => /^[0-9+()[\]\-\s]{7,}$/.test(v);

  const sendToFormspree = async (payload: Record<string, string>) => {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(
        data?.errors?.[0]?.message || data?.error || "Failed to send."
      );
    }

    return response.json().catch(() => ({}));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();
    const projectName = defaultInterest || "General Inquiry";

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (!validateEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!validatePhone(trimmedPhone)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);

    const payload = {
      project_name: projectName,
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      message: trimmedMessage || `Quick enquiry for ${projectName}`,
      subject: `Property enquiry: ${projectName}`,
      _subject: `Property enquiry: ${projectName}`,
      _replyto: trimmedEmail,
      _form_name: "Project Quick Inquiry",
    };
    lastPayloadRef.current = payload;

    try {
      await sendToFormspree(payload);
      toast.success("Thanks! Your enquiry has been sent.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error: any) {
      toast.error(error?.message || "Couldn't send your enquiry.", {
        action: {
          label: "Retry",
          onClick: async () => {
            if (!lastPayloadRef.current) return;
            try {
              setSubmitting(true);
              await sendToFormspree(lastPayloadRef.current);
              toast.success("Thanks! Your enquiry has been sent.");
              setName("");
              setEmail("");
              setPhone("");
              setMessage("");
            } catch (retryError: any) {
              toast.error(retryError?.message || "Still couldn't send. Please try later.");
            } finally {
              setSubmitting(false);
            }
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
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
    }
  };

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;
  const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => void share()} className="rounded border px-3 py-1.5 text-sm">Share</button>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="rounded border px-3 py-1.5 text-sm">WhatsApp</a>
      <a href={mailto} className="rounded border px-3 py-1.5 text-sm">Email</a>
    </div>
  );
}

function GalleryNavButton({
  direction,
  onClick,
  className = "",
}: {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  const label = direction === "left" ? "Previous media" : "Next media";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white shadow-lg backdrop-blur transition hover:bg-black/70 ${className}`}
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M8 6.5a1 1 0 011.53-.848l8 5a1 1 0 010 1.696l-8 5A1 1 0 018 16.5v-10z" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H3v5" />
      <path d="M16 3h5v5" />
      <path d="M21 16v5h-5" />
      <path d="M3 16v5h5" />
      <path d="M8 8L3 3" />
      <path d="M16 8l5-5" />
      <path d="M16 16l5 5" />
      <path d="M8 16l-5 5" />
    </svg>
  );
}
