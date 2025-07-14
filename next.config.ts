import type { NextConfig } from "next";
import withPWA from "next-pwa";

const withPWACustom = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

export default withPWACustom(nextConfig as any);
