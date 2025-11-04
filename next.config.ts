import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const withPWACustom = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: `
    default-src 'self';
    script-src 'self' ${
      process.env.NODE_ENV === "development" ? "'unsafe-eval' 'unsafe-inline'" : ""
    }  https://accounts.google.com https://apis.google.com https://oauth2.googleapis.com https://www.googleapis.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    img-src 'self' blob: data:;
    object-src 'none';
    base-uri 'self';
    frame-ancestors 'none';
  `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)", // 全ルートに適用
        headers: securityHeaders,
      },
    ];
  },
};

export default withPWACustom(nextConfig);
