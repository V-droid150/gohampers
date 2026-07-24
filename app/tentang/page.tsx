import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali Gohampers — spesialis hampers premium dari Jakarta yang percaya bahwa hadiah terbaik adalah perhatian yang dikemas dengan keanggunan.",
};

export default function TentangPage() {
  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Tentang Kami
        </p>
        <h1 className="mt-2 font-serif text-4xl text-brand">
          Hadiah yang Berbicara Lebih Dalam
        </h1>
        <div className="gold-rule mt-4 w-24" />

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-gold/30">
          <Image
            src="/hero-v2.svg"
            alt="Nuansa hijau dan emas khas Gohampers"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-5 leading-relaxed text-ink/85">
          <p>
            <strong className="text-brand">Gohampers</strong> lahir dari
            keyakinan sederhana: hadiah terbaik bukanlah yang paling mahal,
            melainkan yang paling diperhatikan detailnya. Berbasis di{" "}
            {siteConfig.city}, kami merangkai hampers untuk momen-momen yang
            layak dikenang — Lebaran bersama keluarga, Natal yang hangat, hari
            pernikahan, apresiasi untuk rekan bisnis, hingga kejutan ulang
            tahun.
          </p>
          <p>
            Setiap isi hampers kami kurasi dari produsen artisan lokal yang
            terpercaya — kue kering yang dipanggang perlahan, kopi single
            origin dari petani Indonesia, lilin soy yang dituang tangan. Lalu
            semuanya dikemas dengan standar yang tidak kami kompromikan: box
            berkualitas, pita satin, dan kartu ucapan yang ditulis rapi.
          </p>
          <p>
            Untuk pesanan korporat dan pernikahan dalam jumlah besar, tim kami
            siap membantu mulai dari pemilihan isi, personalisasi logo, hingga
            pengaturan jadwal pengiriman ke banyak alamat sekaligus.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            ["1.000+", "Hampers terkirim"],
            ["50+", "Klien korporat"],
            ["4.9/5", "Rating pelanggan"],
          ].map(([num, label]) => (
            <div
              key={label}
              className="rounded-lg border border-brand/10 bg-white p-6 text-center"
            >
              <p className="font-serif text-3xl text-gold-dark">{num}</p>
              <p className="mt-1 text-sm text-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/products" className={buttonClasses("primary", "lg")}>
            Lihat Koleksi Kami
          </Link>
        </div>
      </div>
    </div>
  );
}
