import type { Metadata } from "next";
import { AtSign, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { buildWaUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi tim Gohampers untuk konsultasi hampers, pesanan korporat, atau pertanyaan lainnya — via WhatsApp, email, atau Instagram.",
};

export default function KontakPage() {
  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Kontak
        </p>
        <h1 className="mt-2 font-serif text-4xl text-brand">Hubungi Kami</h1>
        <div className="gold-rule mt-4 w-24" />
        <p className="mt-4 leading-relaxed text-muted">
          Tim kami siap membantu Anda memilih hampers, menghitung penawaran
          korporat, atau sekadar berdiskusi tentang ide hadiah. Cara tercepat:
          WhatsApp.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-brand/10 bg-white p-6">
            <MessageCircle className="h-6 w-6 text-gold-dark" aria-hidden />
            <h2 className="mt-3 font-semibold text-brand">WhatsApp</h2>
            <p className="mt-1 text-sm text-muted">
              Respons tercepat — Senin–Sabtu, 09.00–18.00 WIB
            </p>
            <a
              href={buildWaUrl(`Halo ${siteConfig.name}, saya ingin bertanya.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("whatsapp", "sm", "mt-4")}
            >
              Chat Sekarang
            </a>
          </div>
          <div className="rounded-lg border border-brand/10 bg-white p-6">
            <Mail className="h-6 w-6 text-gold-dark" aria-hidden />
            <h2 className="mt-3 font-semibold text-brand">Email</h2>
            <p className="mt-1 text-sm text-muted">
              Untuk penawaran korporat & kerja sama
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm font-medium text-gold-dark underline underline-offset-4"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="rounded-lg border border-brand/10 bg-white p-6">
            <AtSign className="h-6 w-6 text-gold-dark" aria-hidden />
            <h2 className="mt-3 font-semibold text-brand">Instagram</h2>
            <p className="mt-1 text-sm text-muted">
              Inspirasi hampers & info promo terbaru
            </p>
            <p className="mt-4 text-sm font-medium text-brand">
              @{siteConfig.instagram}
            </p>
          </div>
          <div className="rounded-lg border border-brand/10 bg-white p-6">
            <MapPin className="h-6 w-6 text-gold-dark" aria-hidden />
            <h2 className="mt-3 font-semibold text-brand">Basis Pengiriman</h2>
            <p className="mt-1 text-sm text-muted">
              {siteConfig.address} — melayani pengiriman ke seluruh Indonesia
            </p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-brand">
              <Clock className="h-4 w-4 text-gold-dark" aria-hidden />
              Senin–Sabtu, 09.00–18.00 WIB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
