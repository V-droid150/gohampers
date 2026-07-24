/**
 * Perhitungan ongkir sederhana berbasis tabel zona.
 *
 * TODO integrasi nyata: ganti implementasi getShippingOptions() dengan
 * panggilan API ongkir (RajaOngkir / Biteship) — bentuk datanya sudah
 * disamakan (courier + cost + eta) sehingga UI tidak perlu berubah.
 * Simpan API key di environment variable (mis. BITESHIP_API_KEY),
 * jangan pernah hardcode di kode.
 */

export type Zone = "jabodetabek" | "jawa" | "luar-jawa";

export interface CourierOption {
  id: string;
  name: string;
  service: string;
  eta: string;
  /** Tarif per zona; undefined berarti kurir tidak melayani zona itu */
  rates: Partial<Record<Zone, number>>;
}

export const PROVINCES = [
  "DKI Jakarta",
  "Banten",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bangka Belitung",
  "Bengkulu",
  "Lampung",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
] as const;

const JABODETABEK_PROVINCES = new Set(["DKI Jakarta", "Banten", "Jawa Barat"]);
const JAWA_PROVINCES = new Set([
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
]);

export function getZone(province: string): Zone {
  if (JABODETABEK_PROVINCES.has(province)) return "jabodetabek";
  if (JAWA_PROVINCES.has(province)) return "jawa";
  return "luar-jawa";
}

/** Tabel tarif flat per pengiriman — mudah diganti tanpa menyentuh UI */
export const couriers: CourierOption[] = [
  {
    id: "jne-reg",
    name: "JNE",
    service: "REG",
    eta: "2–3 hari kerja",
    rates: { jabodetabek: 15000, jawa: 25000, "luar-jawa": 45000 },
  },
  {
    id: "jnt-ez",
    name: "J&T Express",
    service: "EZ",
    eta: "2–3 hari kerja",
    rates: { jabodetabek: 14000, jawa: 24000, "luar-jawa": 43000 },
  },
  {
    id: "sicepat-best",
    name: "SiCepat",
    service: "BEST",
    eta: "1–2 hari kerja",
    rates: { jabodetabek: 20000, jawa: 32000, "luar-jawa": 55000 },
  },
  {
    id: "instant",
    name: "Gojek / Grab",
    service: "Same Day (khusus Jabodetabek)",
    eta: "Tiba hari ini",
    rates: { jabodetabek: 35000 },
  },
];

export interface ShippingChoice {
  id: string;
  label: string;
  eta: string;
  cost: number;
}

/** Daftar kurir yang tersedia untuk provinsi tujuan, beserta tarifnya */
export function getShippingOptions(province: string): ShippingChoice[] {
  const zone = getZone(province);
  return couriers
    .filter((c) => c.rates[zone] !== undefined)
    .map((c) => ({
      id: c.id,
      label: `${c.name} ${c.service}`,
      eta: c.eta,
      cost: c.rates[zone]!,
    }));
}

export function getShippingChoice(
  courierId: string,
  province: string
): ShippingChoice | undefined {
  return getShippingOptions(province).find((c) => c.id === courierId);
}
