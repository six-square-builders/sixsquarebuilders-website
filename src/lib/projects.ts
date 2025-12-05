import type { ProjectDetail } from "@/types";

export async function getProjects(): Promise<ProjectDetail[]> {
  const res = await fetch("/projects.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load project data");
  const all: ProjectDetail[] = await res.json();
  return all;
}

export async function getProjectById(id: string): Promise<ProjectDetail | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.id === id);
}
