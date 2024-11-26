import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/open-api/data",
        destination: "https://data.smartdublin.ie/sonitus-api/api/data",
      },
      {
        source: "/open-api/hourly-averages",
        destination: "https://data.smartdublin.ie/sonitus-api/api/hourly-averages",
      },
    ];
  },
};

export default nextConfig;
