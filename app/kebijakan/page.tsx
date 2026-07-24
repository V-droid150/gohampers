import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Pengiriman & Pengembalian",
  description:
    "Ketentuan pengiriman, jadwal, serta kebijakan pengembalian dan penggantian produk Centrepreneur.",
};

export default function KebijakanPage() {
  return (
    <div className="container-luxe py-12 lg:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
          Kebijakan
        </p>
        <h1 className="mt-2 font-serif text-4xl text-brand">
          Pengiriman & Pengembalian
        </h1>
        <div className="gold-rule mt-4 w-24" />

        <div className="mt-8 space-y-8 text-ink/85">
          <section>
            <h2 className="font-serif text-2xl text-brand">Pengiriman</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Seluruh pesanan dikirim dari Jakarta. Jadwal pengiriman
                mengikuti tanggal yang Anda pilih saat checkout.
              </li>
              <li>
                <strong>Jabodetabek:</strong> same-day delivery via Gojek/Grab
                (konfirmasi sebelum 12.00 WIB) atau kurir reguler 1–2 hari.
              </li>
              <li>
                <strong>Pulau Jawa:</strong> 2–3 hari kerja. <strong>Luar Jawa:</strong>{" "}
                3–5 hari kerja tergantung kurir dan tujuan.
              </li>
              <li>
                Setiap hampers dikemas dengan pelindung berlapis (bubble wrap +
                honeycomb) dan ditandai <em>fragile</em>.
              </li>
              <li>
                Nomor resi dikirimkan melalui WhatsApp setelah paket diserahkan
                ke kurir.
              </li>
              <li>
                Untuk isi yang mudah rusak (cake jar, kue basah), pengiriman
                kami batasi hanya untuk wilayah Jabodetabek.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-brand">
              Pengembalian & Penggantian
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Karena bersifat perishable dan dipersonalisasi, hampers yang
                sudah dikirim tidak dapat dibatalkan atau dikembalikan, kecuali
                terjadi kerusakan atau kesalahan dari pihak kami.
              </li>
              <li>
                Jika paket tiba rusak, laporkan maksimal <strong>1×24 jam</strong>{" "}
                sejak diterima, disertai foto/video pembukaan paket. Kami akan
                mengganti item yang rusak tanpa biaya tambahan.
              </li>
              <li>
                Kesalahan isi atau varian dari pihak kami akan diganti
                sepenuhnya, termasuk ongkos kirim.
              </li>
              <li>
                Pembatalan pesanan hanya dapat dilakukan sebelum pesanan masuk
                proses produksi/pengemasan, dengan pengembalian dana penuh.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-brand">Catatan Musim Ramai</h2>
            <p className="mt-3 text-sm leading-relaxed">
              Menjelang Lebaran, Natal, dan Tahun Baru, volume pengiriman
              nasional meningkat tajam. Kami menyarankan pemesanan minimal 7
              hari sebelum tanggal yang diinginkan agar hampers tiba tepat
              waktu.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
