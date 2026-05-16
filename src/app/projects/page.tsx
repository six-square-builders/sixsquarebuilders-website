"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/site";
import ProjectModal from "@/components/projects/ProjectModal";

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

const GALLERIES: Record<TabKey, { id: string; title: string; src: string; badge?: string; address?: string }[]> = {
  ongoing: [
    {
      title: "Ganesha Tower",
      id: "ganesha-tower",
      src: withBasePath("/flats/ganesha_tower.png"),
      badge: "On Sale",
      address: "Sadasivam Nagar, Madipakkam, Chennai 600091",
    }

  ],
  past: [
    {
      title: "Ganesh Castle",
      id: slugify("Riverview Residency"),
      src: withBasePath("/flats/balaiah_garden.png"),
      address: "Balaiah Garden, Madipakkam, Chennai 600091.",
    },
    {
      title: "Ganapathi Enclave",
      id: slugify("Maple Grove Villas"),
      src: withBasePath("/flats/ganapathi_enclave.png"),
      address: "Sadasivam Nagar, Madipakkam, Chennai 600091",
    },

  ],
  future: [
    {
      title: "Coming Soon",
      id: slugify("Tech Park Central"),
      src: withBasePath("/flats/coming_soon.png"),
    },

  ],
};

import { getProjectById } from "@/lib/projects";
import type { ProjectDetail } from "@/types";

export default function ProjectsPage() {
  const [active, setActive] = useState<TabKey>("ongoing");
  const [openId, setOpenId] = useState<string | null>(null);
  const [data, setData] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closingFromPopRef = useRef(false);

  const resetModalState = useCallback(() => {
    setOpenId(null);
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  // Open modal and fetch from /projects.json for all projects.
  const openProject = async (id: string) => {
    if (typeof window !== "undefined" && window.history.state?.projectModalId !== id) {
      window.history.pushState(
        { ...(window.history.state || {}), projectModalId: id },
        "",
        window.location.href
      );
    }

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

  // Prevent body scroll when modal open
  useEffect(() => {
    if (!openId) return;

    const scrollY = window.scrollY;
    const original = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = original.overflow;
      document.body.style.position = original.position;
      document.body.style.top = original.top;
      document.body.style.width = original.width;
      window.scrollTo(0, scrollY);
    };
  }, [openId]);

  useEffect(() => {
    const onPopState = () => {
      if (!openId) return;
      closingFromPopRef.current = true;
      resetModalState();
      window.setTimeout(() => {
        closingFromPopRef.current = false;
      }, 0);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [openId, resetModalState]);

  const close = () => {
    if (
      typeof window !== "undefined" &&
      window.history.state?.projectModalId &&
      !closingFromPopRef.current
    ) {
      window.history.back();
      return;
    }

    resetModalState();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Our Projects</h1>
        <p className="mt-2 max-w-prose text-base leading-7 text-muted-foreground">
          Explore our portfolio across ongoing developments, completed landmarks, and upcoming visions.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:inline-grid">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(t.key)}
            aria-pressed={active === t.key}
            className={`min-h-11 rounded-md border px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
              active === t.key ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {GALLERIES[active].map((item) => (
          <article
            key={item.id}
            onClick={() => openProject(item.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                void openProject(item.id);
              }
            }}
            role="button"
            tabIndex={0}
            className="group cursor-pointer overflow-hidden rounded-lg border transition shadow-sm hover:shadow"
          >
            <div className="relative aspect-[16/10]">
              <Image src={item.src} alt={item.title} loading="lazy" fill className="object-cover transition-transform group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {item.badge ? (
                <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                  {item.badge}
                </div>
              ) : null}
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              {item.address ? (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.address}</p>
              ) : null}
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Premium location • Quality materials • Timely delivery</p>
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
