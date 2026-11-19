import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  reactStrictMode: true,
  devIndicators: false,
  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
