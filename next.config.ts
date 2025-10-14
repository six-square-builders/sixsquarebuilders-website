import type { NextConfig } from "next";
import path from "node:path";

const isProd = process.env.NEXT_PUBLIC_DEPLOY === "true";

const nextConfig: NextConfig = {
  output: "export", // static export
  // remove basePath and assetPrefix entirely
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
