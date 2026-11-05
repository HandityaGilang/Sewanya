import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FITTING } from "@/lib/data";
import { SITE } from "@/lib/nav";
import { rupiah } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan layanan sewa dan fitting SEWANYA.ID: ketentuan pemesanan, biaya fitting, deposit, pembatalan, perawatan, dan pengembalian item.",
};

type Bagian = {
  id: string;
  judul: string;
  poin: string[];
};

const BAGIAN: Bagian[] = [
  {
    id: "ketentuan-umum",
    judul: "Ketentuan Umum",
    poin: [
      "SEWANYA.ID menyediakan layanan penyewaan pakaian dan aksesori (selanjutnya disebut \"Item\") beserta layanan fitting di studio.",
      "Dengan mengirimkan permintaan melalui situs ini atau WhatsApp resmi kami, penyewa dianggap telah membaca dan menyetujui seluruh ketentuan pada halaman ini.",
      "Item hanya disewakan kepada penyewa berusia minimal 18 tahun atau yang didampingi wali.",
      "Seluruh harga yang tercantum pada situs adalah harga dalam Rupiah dan dapat berubah sewaktu-waktu sebelum pesanan dikonfirmasi.",
    ],
  },
  {
    id: "pemesanan",
    judul: "Pemesanan & Konfirmasi",
    poin: [
      "Permintaan jadwal yang dikirim melalui situs bersifat pengajuan. Pesanan dinyatakan sah setelah tim SEWANYA.ID mengonfirmasi ketersediaan item dan jadwal melalui WhatsApp resmi.",
      "Setiap pesanan yang dikonfirmasi memperoleh kode pesanan yang dapat digunakan pada halaman Cek Pesanan.",
      "Penyewa wajib memberikan nama dan nomor WhatsApp yang aktif dan benar. Kesalahan data yang menyebabkan kegagalan komunikasi bukan tanggung jawab SEWANYA.ID.",
      "Ketersediaan item bersifat terbatas dan mengikuti urutan konfirmasi.",
    ],
  },
  {
    id: "fitting",
    judul: "Ketentuan Fitting",
    poin: [
      `Biaya fitting sebesar ${rupiah(FITTING.biaya)} dikenakan per sesi kunjungan dan dibayarkan sebelum sesi dimulai.`,
      "Apabila penyewa tidak melanjutkan pemesanan, biaya fitting tidak dapat dikembalikan.",
      "Sesi fitting tersedia dalam dua batch: Batch 1 pukul 09.00–12.00 WIB dan Batch 2 pukul 13.00–18.00 WIB.",
      "Setiap sesi berdurasi kurang lebih 90 menit dengan maksimal 5 Item yang dapat dicoba.",
      "Perubahan atau pembatalan jadwal fitting dapat dilakukan maksimal 24 jam sebelum jadwal yang telah disepakati.",
    ],
  },
  {
    id: "durasi",
    judul: "Durasi Sewa & Perpanjangan",
    poin: [
      "Durasi sewa standar adalah 3 hari terhitung sejak tanggal pengambilan atau pengiriman Item.",
      "Perpanjangan sewa dapat diajukan paling lambat 1 hari sebelum tanggal pengembalian dan bergantung pada ketersediaan Item.",
      "Biaya perpanjangan dihitung secara proporsional terhadap harga sewa harian dan wajib dilunasi sebelum masa sewa diperpanjang.",
    ],
  },
  {
    id: "deposit",
    judul: "Deposit & Pengembalian Dana",
    poin: [
      "Penyewa wajib membayar deposit sebelum Item diserahkan. Besaran deposit tercantum pada halaman setiap Item.",
      "Deposit dikembalikan secara penuh apabila Item dikembalikan tepat waktu, lengkap, dan tanpa kerusakan baru di luar pemakaian wajar.",
      "Pengembalian deposit dilakukan maksimal 3 hari kerja setelah Item diperiksa oleh tim kami.",
      "Sebagian atau seluruh deposit dapat digunakan untuk menutup biaya perbaikan, penggantian, atau denda sesuai ketentuan pada halaman ini.",
    ],
  },
  {
    id: "pembatalan",
    judul: "Pembatalan Pesanan",
    poin: [
      "Pembatalan lebih dari 72 jam sebelum tanggal sewa: biaya sewa dikembalikan penuh.",
      "Pembatalan 24–72 jam sebelum tanggal sewa: dikenakan biaya pembatalan sebesar 50% dari total biaya sewa.",
      "Pembatalan kurang dari 24 jam sebelum tanggal sewa atau tidak melakukan pengambilan: biaya sewa tidak dapat dikembalikan.",
      "Pembatalan oleh SEWANYA.ID karena ketersediaan Item tidak terpenuhi akan dikembalikan penuh.",
    ],
  },
  {
    id: "perawatan",
    judul: "Perawatan, Kerusakan & Kehilangan",
    poin: [
      "Penyewa wajib menjaga Item dari kerusakan, noda permanen, perubahan bentuk, serta kehilangan.",
      "Dilarang melakukan pencucian, penjahitan ulang, pewarnaan, atau perubahan bentuk pada Item tanpa persetujuan tertulis dari SEWANYA.ID.",
      "Kerusakan ringan akibat pemakaian wajar tidak dikenakan biaya. Kerusakan berat, noda permanen, atau sobek dinilai oleh tim kami dan biaya perbaikan dibebankan kepada penyewa.",
      "Item yang hilang atau tidak dapat diperbaiki wajib diganti senilai harga pasar Item pada saat kejadian, dikurangi deposit yang telah dibayarkan.",
    ],
  },
  {
    id: "keterlambatan",
    judul: "Keterlambatan Pengembalian",
    poin: [
      "Keterlambatan pengembalian dikenakan denda sebesar 50% dari biaya sewa harian untuk setiap hari keterlambatan.",
      "Keterlambatan lebih dari 3 hari dianggap sebagai kehilangan Item dan dikenakan ketentuan penggantian penuh.",
      "Tanggal pengembalian yang disepakati tercantum pada kode pesanan Anda dan dapat dilihat pada halaman Cek Pesanan.",
    ],
  },
  {
    id: "pembayaran",
    judul: "Pembayaran",
    poin: [
      "Pembayaran dilakukan melalui transfer bank atau kanal pembayaran resmi yang ditunjuk oleh SEWANYA.ID.",
      "Pesanan diproses setelah pembayaran dikonfirmasi oleh tim kami.",
      "Bukti pembayaran wajib dikirimkan melalui WhatsApp resmi kami agar pesanan dapat diverifikasi.",
      "Situs ini tidak memproses pembayaran secara langsung dan tidak menyimpan data pembayaran apa pun.",
    ],
  },
  {
    id: "pengiriman",
    judul: "Pengambilan & Pengiriman",
    poin: [
      "Item dapat diambil di studio kami atau dikirim menggunakan kurir rekanan dengan biaya sesuai jarak.",
      "Risiko keterlambatan pengiriman akibat pihak ketiga berada di luar kendali SEWANYA.ID, namun kami akan membantu proses penelusuran.",
      "Penyewa wajib memeriksa kondisi Item saat serah terima dan melaporkan ketidaksesuaian maksimal 3 jam setelah Item diterima.",
    ],
  },
  {
    id: "privasi",
    judul: "Privasi Data Pribadi",
    poin: [
      "Data yang kami kumpulkan melalui situs ini, seperti nama dan nomor WhatsApp, hanya digunakan untuk memproses pesanan dan komunikasi layanan.",
      "Kami tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga untuk kepentingan pemasaran.",
      "Permintaan penghapusan data dapat diajukan melalui email resmi kami.",
    ],
  },
  {
    id: "perubahan",
    judul: "Perubahan Ketentuan",
    poin: [
      "SEWANYA.ID dapat memperbarui Syarat & Ketentuan ini sewaktu-waktu. Versi terbaru akan diterbitkan pada halaman ini.",
      "Ketentuan yang berlaku bagi pesanan Anda adalah ketentuan yang tercantum pada saat pesanan dikonfirmasi.",
    ],
  },
];

export default function SyaratKetentuanPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-editorial py-12 lg:py-16">
          <p className="label-eyebrow text-brand">Syarat & Ketentuan</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] font-black tracking-tight sm:text-5xl">
            Ketentuan layanan sewa dan fitting
          </h1>
          <p className="mt-5 max-w-2xl text-base text-ink-soft">
            Dokumen ini mengatur hubungan antara SEWANYA.ID dan penyewa. Mohon
            dibaca sebelum melakukan pemesanan.
          </p>
          <p className="mt-4 font-mono text-xs tracking-wide text-ink-soft uppercase">
            Terakhir diperbarui: 1 November 2026
          </p>
        </div>
      </section>

      <section className="container-editorial py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="Daftar isi" className="lg:sticky lg:top-32 lg:self-start">
            <p className="label-eyebrow text-ink-soft">Daftar isi</p>
            <ol className="mt-5 flex flex-col gap-3 text-sm">
              {BAGIAN.map((bagian, index) => (
                <li key={bagian.id} className="flex gap-3">
                  <span className="font-mono text-xs text-ink-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`#${bagian.id}`}
                    className="text-ink-soft transition-colors hover:text-brand"
                  >
                    {bagian.judul}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12">
            {BAGIAN.map((bagian, index) => (
              <article
                key={bagian.id}
                id={bagian.id}
                className="scroll-mt-32 border-b border-line pb-10 last:border-b-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl font-black text-brand/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight">
                    {bagian.judul}
                  </h2>
                </div>
                <ul className="mt-5 flex flex-col gap-3">
                  {bagian.poin.map((poin) => (
                    <li
                      key={poin}
                      className="flex gap-3 text-base leading-relaxed text-ink-soft"
                    >
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-brand" />
                      <span>{poin}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            <div className="border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold">
                Masih ada pertanyaan?
              </h2>
              <p className="mt-2 max-w-xl text-base text-ink-soft">
                Tim kami siap membantu menjelaskan ketentuan di atas sebelum
                Anda memesan.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a
                    href={SITE.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    Hubungi via WhatsApp
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/fitting">Jadwalkan Fitting</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
