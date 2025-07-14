import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const withPWACustom = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  reactStrictMode: true,
  output: "standalone",
};

export default withPWACustom(nextConfig);
