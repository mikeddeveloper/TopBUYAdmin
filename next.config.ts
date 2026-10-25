import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Every page in this admin dashboard reads live data per request, so
  // static prerendering / Cache Components would just fight that.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
