/**
 * Generator ilustrasi hampers SVG (rasio 4:5) untuk seed catalog.
 * Setiap produk digambar berbeda: gaya wadah (box/crate/basket), warna box,
 * warna pita, dan isi (botol, toples, lilin, kukis, cokelat, bunga, mug).
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
const INK = "#26251f";

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

/* ---------- Bentuk isi hampers (digambar dengan dasar di y≈560) ---------- */

function bottle(x, c) {
  return `
  <rect x="${x - 16}" y="228" width="32" height="30" rx="5" fill="${GOLD}"/>
  <rect x="${x - 13}" y="250" width="26" height="70" fill="${c}"/>
  <rect x="${x - 38}" y="300" width="76" height="260" rx="18" fill="${c}"/>
  <rect x="${x - 26}" y="382" width="52" height="88" rx="6" fill="${CREAM}" opacity="0.92"/>
  <line x1="${x - 16}" y1="408" x2="${x + 16}" y2="408" stroke="${GOLD}" stroke-width="3"/>
  <line x1="${x - 12}" y1="430" x2="${x + 12}" y2="430" stroke="${INK}" stroke-width="2" opacity="0.5"/>`;
}

function jar(x, c) {
  return `
  <rect x="${x - 52}" y="378" width="104" height="28" rx="9" fill="#7a5a28"/>
  <rect x="${x - 48}" y="400" width="96" height="160" rx="12" fill="${c}"/>
  <rect x="${x - 34}" y="440" width="68" height="76" rx="6" fill="${CREAM}" opacity="0.92"/>
  <line x1="${x - 20}" y1="466" x2="${x + 20}" y2="466" stroke="${GOLD}" stroke-width="3"/>
  <line x1="${x - 16}" y1="488" x2="${x + 16}" y2="488" stroke="${INK}" stroke-width="2" opacity="0.5"/>`;
}

function candle(x, c) {
  return `
  <rect x="${x - 42}" y="420" width="84" height="140" rx="9" fill="${c}"/>
  <ellipse cx="${x}" cy="422" rx="42" ry="11" fill="${CREAM}"/>
  <line x1="${x}" y1="404" x2="${x}" y2="422" stroke="${INK}" stroke-width="3"/>
  <rect x="${x - 30}" y="470" width="60" height="52" rx="5" fill="${CREAM}" opacity="0.9"/>
  <line x1="${x - 16}" y1="492" x2="${x + 16}" y2="492" stroke="${GOLD}" stroke-width="3"/>`;
}

function cookies(x, c) {
  const dot = (cx, cy) =>
    `<circle cx="${cx}" cy="${cy}" r="4.5" fill="${INK}" opacity="0.35"/>`;
  const disc = (cy) => `
  <ellipse cx="${x}" cy="${cy}" rx="42" ry="26" fill="${c}" stroke="#8a6435" stroke-width="2"/>
  ${dot(x - 14, cy - 6)}${dot(x + 10, cy - 10)}${dot(x + 4, cy + 6)}`;
  return disc(526) + disc(488) + disc(450);
}

function chocolate(x, c) {
  return `
  <rect x="${x - 40}" y="350" width="80" height="210" rx="6" fill="${c}"/>
  <rect x="${x - 40}" y="350" width="80" height="44" rx="6" fill="${GOLD}"/>
  <line x1="${x}" y1="400" x2="${x}" y2="552" stroke="${CREAM}" stroke-width="2" opacity="0.4"/>
  <line x1="${x - 32}" y1="440" x2="${x + 32}" y2="440" stroke="${CREAM}" stroke-width="2" opacity="0.4"/>
  <line x1="${x - 32}" y1="486" x2="${x + 32}" y2="486" stroke="${CREAM}" stroke-width="2" opacity="0.4"/>
  <line x1="${x - 32}" y1="530" x2="${x + 32}" y2="530" stroke="${CREAM}" stroke-width="2" opacity="0.4"/>`;
}

function flowers(x) {
  const heads = [
    [x - 58, 336, "#c9a227"],
    [x - 28, 300, "#b98a4a"],
    [x + 2, 282, "#c98a8a"],
    [x + 32, 302, "#e3c566"],
    [x + 60, 340, "#8a5a3f"],
  ];
  const stems = heads
    .map(
      ([hx, hy]) =>
        `<line x1="${x}" y1="560" x2="${hx}" y2="${hy + 10}" stroke="#7a6a45" stroke-width="4"/>`
    )
    .join("");
  const blooms = heads
    .map(
      ([hx, hy, hc]) => `
  <circle cx="${hx}" cy="${hy}" r="17" fill="${hc}"/>
  <circle cx="${hx}" cy="${hy}" r="7" fill="${CREAM}" opacity="0.85"/>`
    )
    .join("");
  const leaves = `
  <ellipse cx="${x - 34}" cy="430" rx="9" ry="26" fill="#5d7a5a" transform="rotate(-28 ${x - 34} 430)"/>
  <ellipse cx="${x + 30}" cy="440" rx="9" ry="26" fill="#5d7a5a" transform="rotate(24 ${x + 30} 440)"/>`;
  return stems + leaves + blooms;
}

function mug(x, c) {
  return `
  <circle cx="${x + 48}" cy="496" r="26" fill="none" stroke="${c}" stroke-width="13"/>
  <rect x="${x - 40}" y="438" width="80" height="122" rx="10" fill="${c}"/>
  <ellipse cx="${x}" cy="442" rx="38" ry="9" fill="${INK}" opacity="0.25"/>
  <rect x="${x - 26}" y="478" width="52" height="44" rx="5" fill="${CREAM}" opacity="0.9"/>
  <line x1="${x - 12}" y1="500" x2="${x + 12}" y2="500" stroke="${GOLD}" stroke-width="3"/>`;
}

const shapes = { bottle, jar, candle, cookies, chocolate, flowers, mug };

/* ------------------------- Wadah (box/crate/basket) ------------------------- */

function containerSvg(style, boxColor, ribbonColor, withBow) {
  const body = `<rect x="190" y="520" width="420" height="320" rx="14" fill="${boxColor}"/>`;
  let texture = "";
  if (style === "crate") {
    texture = `
  <line x1="190" y1="600" x2="610" y2="600" stroke="${INK}" stroke-width="4" opacity="0.25"/>
  <line x1="190" y1="680" x2="610" y2="680" stroke="${INK}" stroke-width="4" opacity="0.25"/>
  <line x1="190" y1="760" x2="610" y2="760" stroke="${INK}" stroke-width="4" opacity="0.25"/>
  <rect x="216" y="520" width="18" height="320" fill="${INK}" opacity="0.18"/>
  <rect x="566" y="520" width="18" height="320" fill="${INK}" opacity="0.18"/>`;
  } else if (style === "basket") {
    const rows = [575, 630, 685, 740, 795]
      .map(
        (y) =>
          `<line x1="196" y1="${y}" x2="604" y2="${y}" stroke="${INK}" stroke-width="5" opacity="0.22"/>`
      )
      .join("");
    const cols = [250, 320, 390, 460, 530]
      .map(
        (x) =>
          `<line x1="${x}" y1="528" x2="${x}" y2="836" stroke="${CREAM}" stroke-width="4" opacity="0.18"/>`
      )
      .join("");
    texture = rows + cols;
  }
  const lid = `
  <rect x="172" y="495" width="456" height="62" rx="10" fill="${boxColor}"/>
  <rect x="172" y="495" width="456" height="62" rx="10" fill="${INK}" opacity="0.18"/>`;
  const ribbon = `
  <rect x="382" y="495" width="36" height="345" fill="${ribbonColor}"/>
  <rect x="382" y="495" width="36" height="345" fill="${CREAM}" opacity="0.12"/>`;
  const bow = withBow
    ? `
  <ellipse cx="362" cy="492" rx="40" ry="22" fill="${ribbonColor}" transform="rotate(-22 362 492)"/>
  <ellipse cx="438" cy="492" rx="40" ry="22" fill="${ribbonColor}" transform="rotate(22 438 492)"/>
  <path d="M392 512 L378 566 L402 556 Z" fill="${ribbonColor}"/>
  <path d="M408 512 L422 566 L398 556 Z" fill="${ribbonColor}"/>
  <circle cx="400" cy="492" r="15" fill="${ribbonColor}" stroke="${CREAM}" stroke-width="2.5"/>`
    : "";
  return body + texture + lid + ribbon + bow;
}

/* ------------------------------- Satu adegan ------------------------------- */

function hampersScene(cfg) {
  const positions =
    cfg.items.length === 4 ? [258, 353, 448, 543] : [292, 400, 508];
  const drawn = cfg.items
    .map((it, i) => shapes[it.shape](positions[i], it.color ?? GOLD))
    .join("");
  return `
  <ellipse cx="400" cy="852" rx="266" ry="26" fill="${INK}" opacity="0.14"/>
  ${drawn}
  ${containerSvg(cfg.style, cfg.boxColor, cfg.ribbonColor, cfg.bow !== false)}`;
}

function productSvg(cfg, name, category, dark) {
  const bgA = dark ? GREEN : CREAM;
  const bgB = dark ? GREEN_LIGHT : "#eee5d0";
  const text = dark ? CREAM : GREEN;
  // Varian kedua: latar terang + susunan isi dibalik agar terlihat berbeda
  const items = dark ? cfg.items : [...cfg.items].reverse();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bgA}"/>
      <stop offset="1" stop-color="${bgB}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#bg)"/>
  <circle cx="400" cy="560" r="270" fill="${dark ? CREAM : GREEN}" opacity="0.05"/>
  <rect x="40" y="40" width="720" height="920" fill="none" stroke="${GOLD}" stroke-width="2"/>
  <rect x="52" y="52" width="696" height="896" fill="none" stroke="${GOLD}" stroke-width="0.75" opacity="0.6"/>
  <g transform="translate(0,-40)">${hampersScene({ ...cfg, items })}</g>
  <text x="400" y="900" text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="${text}">${esc(name)}</text>
  <text x="400" y="940" text-anchor="middle" font-family="Georgia, serif" font-size="19" letter-spacing="5" fill="${GOLD}">${esc(category.toUpperCase())}</text>
</svg>`;
}

/* --------------------- Konfigurasi unik untuk tiap produk --------------------- */

const items = [
  {
    slug: "syawal-elegance", name: "Syawal Elegance", category: "Lebaran",
    style: "box", boxColor: GREEN, ribbonColor: GOLD,
    items: [
      { shape: "bottle", color: "#6d1f2c" },
      { shape: "jar", color: "#c9812e" },
      { shape: "cookies", color: "#c9974a" },
    ],
  },
  {
    slug: "ramadan-nights", name: "Ramadan Nights", category: "Lebaran",
    style: "crate", boxColor: "#8a6435", ribbonColor: GOLD,
    items: [
      { shape: "candle", color: "#3d3a52" },
      { shape: "jar", color: "#c9812e" },
      { shape: "chocolate", color: "#4a3427" },
    ],
  },
  {
    slug: "fitri-petite", name: "Fitri Petite", category: "Lebaran",
    style: "box", boxColor: "#e8dcc0", ribbonColor: GOLD,
    items: [
      { shape: "cookies", color: "#e0c8a0" },
      { shape: "jar", color: "#4a7a5f" },
      { shape: "candle", color: "#c9b8d8" },
    ],
  },
  {
    slug: "noel-classique", name: "Noel Classique", category: "Natal & Tahun Baru",
    style: "box", boxColor: "#6d1f2c", ribbonColor: GOLD,
    items: [
      { shape: "chocolate", color: "#3d2b1f" },
      { shape: "cookies", color: "#b9793f" },
      { shape: "candle", color: "#8a3040" },
    ],
  },
  {
    slug: "midnight-celebration", name: "Midnight Celebration", category: "Natal & Tahun Baru",
    style: "box", boxColor: "#10241f", ribbonColor: GOLD,
    items: [
      { shape: "bottle", color: "#2e4a44" },
      { shape: "jar", color: "#a3742f" },
      { shape: "chocolate", color: "#26251f" },
    ],
  },
  {
    slug: "eternal-vow", name: "Eternal Vow", category: "Wedding",
    style: "box", boxColor: "#efe3cf", ribbonColor: "#c98a8a",
    items: [
      { shape: "candle", color: "#e8d8c8" },
      { shape: "flowers" },
      { shape: "chocolate", color: "#8a5a3f" },
    ],
  },
  {
    slug: "rosewood-union", name: "Rosewood Union", category: "Wedding",
    style: "crate", boxColor: "#5d3a35", ribbonColor: "#c98a8a",
    items: [
      { shape: "bottle", color: "#8a4a55" },
      { shape: "flowers" },
      { shape: "jar", color: "#4a7a5f" },
    ],
  },
  {
    slug: "executive-suite", name: "Executive Suite", category: "Corporate",
    style: "box", boxColor: "#23241f", ribbonColor: GOLD,
    items: [
      { shape: "mug", color: "#6f7a82" },
      { shape: "jar", color: "#4a3427" },
      { shape: "chocolate", color: "#2e3440" },
    ],
  },
  {
    slug: "grand-partnership", name: "Grand Partnership", category: "Corporate",
    style: "crate", boxColor: "#6b4a2f", ribbonColor: GOLD,
    items: [
      { shape: "bottle", color: "#28504a" },
      { shape: "jar", color: "#4a3427" },
      { shape: "chocolate", color: "#3d2b1f" },
      { shape: "candle", color: "#a3742f" },
    ],
  },
  {
    slug: "welcome-aboard", name: "Welcome Aboard", category: "Corporate",
    style: "box", boxColor: "#b98d5f", ribbonColor: GREEN,
    items: [
      { shape: "mug", color: "#4a7a5f" },
      { shape: "jar", color: "#8a6435" },
      { shape: "cookies", color: "#d8b880" },
    ],
  },
  {
    slug: "golden-hour", name: "Golden Hour", category: "Birthday",
    style: "box", boxColor: GOLD, ribbonColor: GREEN,
    items: [
      { shape: "jar", color: "#a34a5f" },
      { shape: "chocolate", color: "#6d4a8a" },
      { shape: "candle", color: "#e3c566" },
    ],
  },
  {
    slug: "sweet-celebration", name: "Sweet Celebration", category: "Birthday",
    style: "box", boxColor: "#d8a7a0", ribbonColor: "#6d1f2c",
    items: [
      { shape: "cookies", color: "#c98a5f" },
      { shape: "chocolate", color: "#5d3a35" },
      { shape: "jar", color: "#c96a7a" },
    ],
  },
  {
    slug: "blooming-wishes", name: "Blooming Wishes", category: "Birthday",
    style: "basket", boxColor: "#a3742f", ribbonColor: "#c98a8a",
    items: [
      { shape: "flowers" },
      { shape: "jar", color: "#c9812e" },
      { shape: "mug", color: "#4a6a8a" },
    ],
  },
];

for (const cfg of items) {
  writeFileSync(
    join(outDir, `${cfg.slug}-1-v2.svg`),
    productSvg(cfg, cfg.name, cfg.category, true)
  );
  writeFileSync(
    join(outDir, `${cfg.slug}-2-v2.svg`),
    productSvg(cfg, cfg.name, cfg.category, false)
  );
}

/* --------------------------------- Hero 16:9 --------------------------------- */

const heroScene = hampersScene({
  style: "basket",
  boxColor: "#a3742f",
  ribbonColor: GOLD,
  items: [
    { shape: "bottle", color: "#6d1f2c" },
    { shape: "flowers" },
    { shape: "jar", color: "#c9812e" },
    { shape: "chocolate", color: "#4a3427" },
  ],
});

const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${GREEN}"/>
      <stop offset="1" stop-color="#0c231d"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="800" cy="520" r="330" fill="${CREAM}" opacity="0.05"/>
  <circle cx="800" cy="520" r="410" fill="none" stroke="${GOLD}" stroke-width="1.2" opacity="0.5"/>
  <rect x="40" y="40" width="1520" height="820" fill="none" stroke="${GOLD}" stroke-width="1.5" opacity="0.8"/>
  <text x="800" y="130" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="10" fill="${GOLD}">GOHAMPERS</text>
  <g transform="translate(400,-10)">${heroScene}</g>
</svg>`;
writeFileSync(join(process.cwd(), "public", "hero-v2.svg"), hero);

console.log(`Selesai: ${items.length * 2} ilustrasi produk + hero.svg`);
