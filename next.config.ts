import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Gambar produk saat ini berupa SVG placeholder lokal (public/products).
    // Saat foto produk asli (JPG/WebP) tersedia, opsi ini boleh dihapus.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
