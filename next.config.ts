import type { NextConfig } from "next";
import path from "node:path";

const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] || path.basename(process.cwd());
const computedBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" ? `/${repoName}` : "");
const basePath =
  computedBasePath === "/" ? "" : computedBasePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export", // static export
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
