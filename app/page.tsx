import Image from "next/image";
import Link from "next/link";
import {
  Gem,
  Gift,
  HeartHandshake,
  MessageCircle,
  Quote,
  Truck,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buildWaUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";

const whyUs = [
  {
    icon: Gem,
    title: "Kurasi Premium",
    description:
      "Setiap isi hampers dipilih dengan teliti dari produsen artisan terpercaya — tidak ada isian asal-asalan.",
  },
  {
    icon: Gift,
    title: "Kemasan Anggun",
    description:
      "Box hardcover, pita satin, dan kartu ucapan eksklusif. Kesan pertama yang tidak terlupakan.",
  },
  {
    icon: Truck,
    title: "Pengiriman Aman",
    description:
      "Dikemas berlapis pelindung, dikirim dari Jakarta ke seluruh Indonesia — tersedia same-day Jabodetabek.",
  },
  {
    icon: HeartHandshake,
    title: "Sentuhan Personal",
    description:
      "Kartu ucapan bisa ditulis sesuai keinginan, dan hampers dapat dikustomisasi sepenuhnya.",
  },
];

const testimonials = [
  {
    quote:
      "Hampers Lebaran untuk 30 kolega kantor semuanya rapi dan tiba tepat waktu. Box-nya benar-benar terlihat mahal.",
    name: "Amelia W.",
    role: "HR Manager, Jakarta",
  },
  {
    quote:
      "Pesan custom hampers untuk bridesmaid, hasilnya melebihi ekspektasi. Semua teman bertanya pesan di mana.",
    name: "Nadya K.",
    role: "Bride-to-be, Tangerang",
  },
  {
    quote:
      "Klien kami sampai mengirim foto saat menerima Grand Partnership. Investasi relasi terbaik tahun ini.",
    name: "Bimo S.",
    role: "Account Director, Jakarta",
  },
];

export default function Home() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand text-cream">
        <div className="container-luxe grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Gohampers · {siteConfig.city}
            </p>
            <h1 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Hampers untuk <span className="text-gold">momen istimewa</span>
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-cream/80">
              Dari Lebaran hingga hari pernikahan, dari apresiasi klien hingga
              kejutan ulang tahun — kami merangkai hadiah yang berbicara lebih
              dalam daripada kata-kata.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className={buttonClasses("gold", "lg")}>
                Jelajahi Katalog
              </Link>
              <Link
                href="/custom"
                className={buttonClasses("outline", "lg", "border-cream/40 text-cream hover:bg-cream/10")}
              >
                Buat Hampers Custom
              </Link>
            </div>
            <p className="mt-6 text-sm text-cream/60">
              Dipercaya 1.000+ pelanggan & 50+ perusahaan di Indonesia
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-gold/40">
            <Image
              src="/hero.svg"
              alt="Rangkaian hampers premium Gohampers dengan nuansa hijau dan emas"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="container-luxe py-16 lg:py-20">
        <SectionHeading
          eyebrow="Kategori"
          title="Untuk Setiap Momen Berharga"
          description="Pilih rangkaian yang sesuai dengan perayaan Anda — semuanya dikemas dengan standar yang sama: anggun dan berkelas."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group rounded-lg border border-brand/10 bg-white p-6 text-center shadow-[0_2px_16px_rgba(20,52,43,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_8px_28px_rgba(20,52,43,0.14)]"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 text-gold-dark transition-colors group-hover:bg-gold group-hover:text-brand-dark">
                <Gift className="h-5 w-5" aria-hidden />
              </span>
              <p className="mt-4 font-serif text-lg text-brand">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Produk pilihan */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Koleksi Pilihan"
            title="Hampers Terpopuler Kami"
            description="Rangkaian yang paling sering dipilih pelanggan — dari yang klasik hingga yang paling mewah."
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/products" className={buttonClasses("primary", "lg")}>
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Kenapa memilih kami */}
      <section className="container-luxe py-16 lg:py-20">
        <SectionHeading
          eyebrow="Kenapa Gohampers"
          title="Detail Kecil, Kesan Besar"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((item) => (
            <div key={item.title} className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-gold">
                <item.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-serif text-xl text-brand">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimoni */}
      <section className="bg-brand py-16 text-cream lg:py-20">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Testimoni"
            title="Apa Kata Mereka"
            className="[&_h2]:text-cream [&_p]:text-gold"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-lg border border-cream/10 bg-brand-light/60 p-6"
              >
                <Quote className="h-6 w-6 text-gold" aria-hidden />
                <blockquote className="mt-4 text-sm leading-relaxed text-cream/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-semibold text-gold-light">{t.name}</p>
                  <p className="text-xs text-cream/60">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA WhatsApp */}
      <section className="container-luxe py-16 lg:py-20">
        <div className="rounded-lg border border-gold/40 bg-white px-6 py-12 text-center shadow-[0_2px_16px_rgba(20,52,43,0.06)] sm:px-12">
          <h2 className="font-serif text-3xl text-brand sm:text-4xl">
            Butuh Rekomendasi?
          </h2>
          <div className="gold-rule mx-auto mt-4 w-24" />
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">
            Ceritakan momen dan budget Anda — tim kami akan membantu memilih
            atau merangkai hampers yang paling tepat, tanpa biaya konsultasi.
          </p>
          <a
            href={buildWaUrl(
              `Halo ${siteConfig.name}, saya butuh rekomendasi hampers. Bisa dibantu?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("whatsapp", "lg", "mt-8")}
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Chat WhatsApp Admin
          </a>
        </div>
      </section>
    </>
  );
}
