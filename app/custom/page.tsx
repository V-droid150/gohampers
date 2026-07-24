import type { Metadata } from "next";
import { CustomBuilder } from "@/components/custom-builder";

export const metadata: Metadata = {
  title: "Custom Hampers",
  description:
    "Rangkai hampers Anda sendiri: pilih ukuran box, isi, packaging, warna pita, dan kartu ucapan. Harga dihitung otomatis secara real-time.",
};

export default function CustomPage() {
  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Custom Hampers
        </p>
        <h1 className="mt-2 font-serif text-4xl text-brand">
          Rangkai Sendiri Hampers Anda
        </h1>
        <div className="gold-rule mt-4 w-24" />
        <p className="mt-4 leading-relaxed text-muted">
          Empat langkah sederhana untuk hadiah yang benar-benar personal: pilih
          box, tentukan isinya, sesuaikan kemasan, dan tuliskan pesan Anda.
        </p>
      </div>
      <CustomBuilder />
    </div>
  );
}
