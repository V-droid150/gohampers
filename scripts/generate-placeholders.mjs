/**
 * Generator gambar placeholder SVG (rasio 4:5) untuk seed catalog.
 * Jalankan: node scripts/generate-placeholders.mjs
 * Ganti file di public/products dengan foto asli saat sudah tersedia.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "public", "products");
mkdirSync(outDir, { recursive: true });

const GREEN = "#14342b";
const GREEN_LIGHT = "#1e4a3c";
const GOLD = "#c9a227";
const CREAM = "#f7f3e9";

const items = [
  ["syawal-elegance", "Syawal Elegance", "Lebaran"],
  ["ramadan-nights", "Ramadan Nights", "Lebaran"],
  ["fitri-petite", "Fitri Petite", "Lebaran"],
  ["noel-classique", "Noel Classique", "Natal & Tahun Baru"],
  ["midnight-celebration", "Midnight Celebration", "Natal & Tahun Baru"],
  ["eternal-vow", "Eternal Vow", "Wedding"],
  ["rosewood-union", "Rosewood Union", "Wedding"],
  ["executive-suite", "Executive Suite", "Corporate"],
  ["grand-partnership", "Grand Partnership", "Corporate"],
  ["welcome-aboard", "Welcome Aboard", "Corporate"],
  ["golden-hour", "Golden Hour", "Birthday"],
  ["sweet-celebration", "Sweet Celebration", "Birthday"],
  ["blooming-wishes", "Blooming Wishes", "Birthday"],
];

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function productSvg(name, category, dark) {
  const bgA = dark ? GREEN : CREAM;
  const bgB = dark ? GREEN_LIGHT : "#efe8d6";
  const text = dark ? CREAM : GREEN;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bgA}"/>
      <stop offset="1" stop-color="${bgB}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <rect x="40" y="40" width="720" height="920" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <rect x="52" y="52" width="696" height="896" fill="none" stroke="${GOLD}" stroke-width="0.75" opacity="0.6"/>
  <circle cx="400" cy="420" r="150" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.9"/>
  <text x="400" y="475" text-anchor="middle" font-family="Georgia, serif" font-size="160" fill="${GOLD}">G</text>
  <text x="400" y="660" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="${text}">${esc(name)}</text>
  <text x="400" y="710" text-anchor="middle" font-family="Georgia, serif" font-size="22" letter-spacing="6" fill="${GOLD}">${esc(category.toUpperCase())}</text>
  <line x1="300" y1="745" x2="500" y2="745" stroke="${GOLD}" stroke-width="1"/>
  <text x="400" y="905" text-anchor="middle" font-family="Georgia, serif" font-size="18" letter-spacing="4" fill="${text}" opacity="0.7">GOHAMPERS</text>
</svg>`;
}

for (const [slug, name, category] of items) {
  writeFileSync(join(outDir, `${slug}-1.svg`), productSvg(name, category, true));
  writeFileSync(join(outDir, `${slug}-2.svg`), productSvg(name, category, false));
}

// Hero image 16:9 untuk beranda & Open Graph
const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GREEN}"/>
      <stop offset="1" stop-color="#0c231d"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <rect x="40" y="40" width="1520" height="820" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.8"/>
  <circle cx="800" cy="380" r="170" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
  <text x="800" y="440" text-anchor="middle" font-family="Georgia, serif" font-size="170" fill="${GOLD}">G</text>
  <text x="800" y="640" text-anchor="middle" font-family="Georgia, serif" font-size="64" fill="${CREAM}">Gohampers</text>
  <text x="800" y="700" text-anchor="middle" font-family="Georgia, serif" font-size="26" letter-spacing="8" fill="${GOLD}">HAMPERS UNTUK MOMEN ISTIMEWA</text>
</svg>`;
writeFileSync(join(process.cwd(), "public", "hero.svg"), hero);

console.log(`Selesai: ${items.length * 2} gambar produk + hero.svg`);
