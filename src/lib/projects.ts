import type { ProjectDetail } from "@/types";
import { withBasePath } from "@/lib/site";

function normalizeProject(project: ProjectDetail): ProjectDetail {
  return {
    ...project,
    media: project.media?.map((item) => ({
      ...item,
      url: withBasePath(item.url),
    })),
    flats: project.flats?.map((flat) => ({
      ...flat,
      floorPlans: flat.floorPlans?.map((plan) => ({
        ...plan,
        url: withBasePath(plan.url),
      })),
    })),
    legal: project.legal
      ? {
          ...project.legal,
          documents: project.legal.documents?.map((document) => ({
            ...document,
            url: withBasePath(document.url),
          })),
        }
      : project.legal,
  };
}

export async function getProjects(): Promise<ProjectDetail[]> {
  const res = await fetch(withBasePath("/projects.json"), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load project data");
  const all: ProjectDetail[] = await res.json();
  return all.map(normalizeProject);
}

export async function getProjectById(id: string): Promise<ProjectDetail | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}
