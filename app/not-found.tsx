import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-luxe flex flex-col items-center py-24 text-center">
      <p className="font-serif text-7xl text-gold">404</p>
      <h1 className="mt-4 font-serif text-3xl text-brand">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted">
        Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada.
        Mari kembali menjelajahi koleksi kami.
      </p>
      <Link href="/" className={buttonClasses("primary", "lg", "mt-8")}>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
