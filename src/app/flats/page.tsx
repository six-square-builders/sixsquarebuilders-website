"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/site";
import ProjectModal from "@/components/projects/ProjectModal";

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
    img: withBasePath("/flats/ganesha_tower.png"),
  }
];

import { getProjectById } from "@/lib/projects";
import type { ProjectDetail } from "@/types";

export default function FlatsPage() {
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

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">Flats For Sale</h1>
        <p className="mt-2 max-w-prose text-base leading-7 text-muted-foreground">
          Explore available units across our premium developments. Transparent pricing and detailed specifications.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {FLATS.map((flat) => (
          <article key={flat.id} className="overflow-hidden rounded-lg border">
            <div className="relative aspect-[16/10]">
              <Image src={flat.img} alt={flat.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{flat.title}</h3>
              {flat.address ? (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{flat.address}</p>
              ) : null}
              <div className="mt-1 text-sm leading-6 text-muted-foreground">
                {flat.beds} Beds • {flat.baths} Baths • {flat.area}
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/contact?interest=${encodeURIComponent(flat.id)}`}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity sm:w-auto"
                >
                  Enquire
                </Link>
                <button
                  type="button"
                  onClick={() => openProject(flat.id)}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors sm:w-auto"
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
