import type { NextConfig } from "next";

const computedBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
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
