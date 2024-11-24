import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/open-api/data",
        destination: "https://data.smartdublin.ie/sonitus-api/api/data",
      },
    ];
  },
};

export default nextConfig;
