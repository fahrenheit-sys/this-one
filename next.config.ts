import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      { source: "/revenue-tool", destination: "/revenue-tool/index.html" },
      { source: "/revenue-tool/", destination: "/revenue-tool/index.html" },
    ];
  },
};

export default nextConfig;
