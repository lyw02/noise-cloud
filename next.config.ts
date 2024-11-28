import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/_not-found', // 捕获 /_not-found 路径
        destination: '/', // 将其重定向到首页（或其他页面）
        permanent: false, // 使用临时重定向，非永久
      },
    ];
  },
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
