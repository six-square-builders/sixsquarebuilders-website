import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // ✅ This enables static export
  basePath: isProd ? "/six-square-builders" : "",
  assetPrefix: isProd ? "/six-square-builders/" : "",
  images: {
    unoptimized: true, // since GH Pages doesn't support Next image optimization
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" }
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, "../../"),
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;
