const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const siteBasePath =
  envBasePath === "/" ? "" : envBasePath.replace(/\/$/, "");

export function withBasePath(path: string) {
  if (!path) return siteBasePath || "/";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}
