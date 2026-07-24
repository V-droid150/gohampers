import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Diperlukan agar logo SVG lokal (public/logo-mark.svg) bisa dirender
    // melalui next/image.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
