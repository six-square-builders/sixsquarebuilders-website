"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/site";

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

const ProjectModal = dynamic(() => import("@/components/projects/ProjectModal"));

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
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Link
                  href={`/contact?interest=${encodeURIComponent(flat.id)}`}
                  className="w-full sm:w-auto text-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Enquire
                </Link>
                <button
                  onClick={() => openProject(flat.id)}
                  className="w-full sm:w-auto text-center rounded-md border px-4 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
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
