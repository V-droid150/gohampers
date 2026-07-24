import Link from "next/link";
import { AtSign, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buildWaUrl } from "@/lib/whatsapp";
import { categories } from "@/data/categories";

export function Footer() {
  return (
    <footer className="mt-20 bg-brand text-cream">
      <div className="gold-rule" />
      <div className="container-luxe grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl font-semibold">Centrepreneur</p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-gold">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Hampers premium yang dikurasi dengan cita rasa dan dikemas dengan
            keanggunan — dikirim dari {siteConfig.city} untuk momen paling
            berharga Anda.
          </p>
        </div>

        <nav aria-label="Kategori">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Kategori
          </p>
          <ul className="space-y-2.5 text-sm text-cream/80">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="transition-colors hover:text-gold-light"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informasi">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Informasi
          </p>
          <ul className="space-y-2.5 text-sm text-cream/80">
            <li><Link href="/tentang" className="transition-colors hover:text-gold-light">Tentang Kami</Link></li>
            <li><Link href="/faq" className="transition-colors hover:text-gold-light">Cara Pemesanan & FAQ</Link></li>
            <li><Link href="/kebijakan" className="transition-colors hover:text-gold-light">Kebijakan Pengiriman & Pengembalian</Link></li>
            <li><Link href="/kontak" className="transition-colors hover:text-gold-light">Kontak</Link></li>
            <li><Link href="/custom" className="transition-colors hover:text-gold-light">Custom Hampers</Link></li>
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
            Hubungi Kami
          </p>
          <ul className="space-y-3 text-sm text-cream/80">
            <li>
              <a
                href={buildWaUrl(`Halo ${siteConfig.name}, saya ingin bertanya tentang hampers.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-gold-light"
              >
                <MessageCircle className="h-4 w-4 text-gold" aria-hidden />
                WhatsApp Admin
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" aria-hidden />
              {siteConfig.email}
            </li>
            <li className="flex items-center gap-2">
              <AtSign className="h-4 w-4 text-gold" aria-hidden />
              @{siteConfig.instagram}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" aria-hidden />
              {siteConfig.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5">
        <p className="container-luxe text-center text-xs text-cream/50">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
