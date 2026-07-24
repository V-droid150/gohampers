import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buildWaUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Cara Pemesanan & FAQ",
  description:
    "Panduan lengkap cara memesan hampers di Gohampers beserta jawaban atas pertanyaan yang paling sering diajukan.",
};

const steps = [
  {
    title: "Pilih atau rangkai hampers",
    description:
      "Jelajahi katalog kami, atau buat hampers Anda sendiri melalui halaman Custom Hampers.",
  },
  {
    title: "Masukkan ke keranjang & checkout",
    description:
      "Lengkapi data penerima, alamat, tanggal pengiriman, dan pesan kartu ucapan Anda.",
  },
  {
    title: "Lakukan pembayaran",
    description:
      "Bayar melalui transfer bank/VA, e-wallet, atau QRIS. Pesanan juga bisa diselesaikan langsung via WhatsApp.",
  },
  {
    title: "Hampers dikirim",
    description:
      "Kami mengemas dengan pelindung berlapis dan mengirim sesuai jadwal — lengkap dengan nomor resi.",
  },
];

const faqs = [
  {
    q: "Berapa lama waktu pemrosesan pesanan?",
    a: "Pesanan reguler diproses 1–2 hari kerja. Untuk custom hampers atau jumlah besar (di atas 20 box), waktu produksi 3–5 hari kerja. Kami sarankan memesan lebih awal menjelang musim ramai seperti Lebaran dan Natal.",
  },
  {
    q: "Apakah bisa same-day delivery?",
    a: "Bisa, untuk wilayah Jabodetabek melalui Gojek/Grab dengan pesanan yang dikonfirmasi sebelum pukul 12.00 WIB.",
  },
  {
    q: "Apakah bisa request isi hampers sendiri?",
    a: "Tentu — gunakan halaman Custom Hampers untuk memilih box, isi, packaging, dan pita sesuai keinginan Anda. Untuk permintaan khusus di luar pilihan yang tersedia, hubungi admin via WhatsApp.",
  },
  {
    q: "Apakah melayani pengiriman ke luar kota?",
    a: "Ya, kami mengirim ke seluruh Indonesia melalui JNE, J&T, dan SiCepat. Untuk isi yang mudah rusak (kue basah, cake jar), kami sarankan pengiriman dalam Jabodetabek saja.",
  },
  {
    q: "Apakah ada harga khusus untuk pesanan korporat?",
    a: "Ada. Pemesanan di atas 20 box mendapatkan harga khusus, gratis kartu ucapan dengan logo perusahaan, dan opsi pengiriman ke banyak alamat. Hubungi admin untuk penawaran.",
  },
  {
    q: "Bagaimana jika hampers tiba dalam kondisi rusak?",
    a: "Dokumentasikan dengan foto/video saat paket diterima dan laporkan maksimal 1×24 jam. Kami akan mengganti item yang rusak sesuai kebijakan pengembalian kami.",
  },
];

export default function FaqPage() {
  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Bantuan
        </p>
        <h1 className="mt-2 font-serif text-4xl text-brand">
          Cara Pemesanan & FAQ
        </h1>
        <div className="gold-rule mt-4 w-24" />

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-brand">Cara Pemesanan</h2>
          <ol className="mt-6 space-y-5">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-serif text-gold">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-brand">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-2xl text-brand">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-lg border border-brand/10 bg-white p-5 open:border-gold/50"
              >
                <summary className="cursor-pointer list-none font-medium text-brand marker:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {faq.q}
                    <span
                      className="text-gold-dark transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-lg border border-gold/40 bg-white p-8 text-center">
          <p className="font-serif text-xl text-brand">
            Masih ada pertanyaan lain?
          </p>
          <a
            href={buildWaUrl(`Halo ${siteConfig.name}, saya ingin bertanya.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("whatsapp", "md", "mt-4")}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Tanya Admin via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
