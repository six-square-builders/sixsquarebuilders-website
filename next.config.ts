  import type { NextConfig } from "next";
  import path from "node:path";

  const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

  const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
        {
          protocol: 'http',
          hostname: '**',
        },
      ],
    },
    // Enable static export so the app can be hosted on GitHub Pages/Netlify without a Node server
    outputFileTracingRoot: path.resolve(__dirname, '../../'),
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [LOADER]
        }
      }
    }
  };

  export default nextConfig;