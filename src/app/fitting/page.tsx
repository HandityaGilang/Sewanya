import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, MapPin, Ruler, Sparkles } from "lucide-react";

import { FittingForm } from "@/components/fitting-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FITTING, getProdukBySlug } from "@/lib/data";
import { SITE } from "@/lib/nav";
import { rupiah } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Jadwal Fitting",
  description:
    "Pesan sesi fitting di studio SEWANYA.ID. Pilih tanggal dan batch kunjungan untuk mencoba koleksi kami.",
};

type FittingPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const FAQ = [
  {
    tanya: "Berapa biaya sesi fitting?",
    jawab:
      `Biaya fitting sebesar ${rupiah(FITTING.biaya)} per sesi. Pembayaran dilakukan saat konfirmasi jadwal kunjungan.`,
  },
  {
    tanya: "Berapa banyak item yang bisa dicoba dalam satu sesi?",
    jawab:
      "Maksimal 5 item per sesi. Jika Anda ingin mencoba lebih banyak, silakan hubungi tim kami untuk mengatur sesi tambahan.",
  },
  {
    tanya: "Bisakah saya mengubah jadwal fitting?",
    jawab:
      "Bisa, maksimal 24 jam sebelum jadwal. Hubungi tim kami melalui WhatsApp untuk penyesuaian tanggal atau batch.",
  },
  {
    tanya: "Apakah bisa fitting tanpa memesan item tertentu?",
    jawab:
      "Bisa. Pilih tujuan Fitting dulu pada formulir, lalu tim kami akan menyiapkan beberapa pilihan sesuai kebutuhan acara Anda.",
  },
];

async function FittingHasil({ searchParams }: FittingPageProps) {
  const params = await searchParams;
  const slugParam = params.produk;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const ukuranParam = params.ukuran;
  const ukuran = Array.isArray(ukuranParam) ? ukuranParam[0] : ukuranParam;
  const tujuanParam = params.tujuan;
  const tujuanRaw = Array.isArray(tujuanParam) ? tujuanParam[0] : tujuanParam;
  const tujuan = tujuanRaw === "sewa" ? "sewa" : "fitting";

  const produkTerpilih = slug ? getProdukBySlug(slug) : undefined;

  return (
    <FittingForm
      produkTerpilih={produkTerpilih}
      ukuranAwal={ukuran}
      tujuanAwal={tujuan}
    />
  );
}

function FittingMemuat() {
  return (
    <div
      role="status"
      className="flex min-h-64 items-center justify-center border border-line bg-white text-sm text-ink-soft"
    >
      Memuat formulir…
    </div>
  );
}

export default function FittingPage({ searchParams }: FittingPageProps) {
  const info = [
    {
      ikon: Sparkles,
      judul: `Biaya fitting ${rupiah(FITTING.biaya)}`,
      deskripsi: "Sesi fitting privat bersama stylist kami.",
    },
    {
      ikon: Clock,
      judul: `${FITTING.durasiSesiMenit} menit per sesi`,
      deskripsi: "Dua pilihan batch setiap hari, pagi dan siang.",
    },
    {
      ikon: Ruler,
      judul: "Dibantu stylist",
      deskripsi: "Penyesuaian ukuran dan rekomendasi padu padan.",
    },
    {
      ikon: MapPin,
      judul: "Studio Jakarta Selatan",
      deskripsi: SITE.alamat,
    },
  ];

  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-editorial py-12 lg:py-16">
          <p className="label-eyebrow text-brand">Jadwal fitting</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] font-black tracking-tight sm:text-5xl">
            Pesan sesi fitting di studio kami
          </h1>
          <p className="mt-5 max-w-2xl text-base text-ink-soft">
            Pilih tanggal dan batch kunjungan, lalu lengkapi data Anda. Setelah
            formulir dikirim, tim kami mengonfirmasi ketersediaan jadwal melalui
            WhatsApp.
          </p>

          <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {info.map((item) => (
              <li key={item.judul} className="bg-white p-5">
                <item.ikon className="size-5 text-brand" />
                <p className="mt-4 text-base font-semibold">{item.judul}</p>
                <p className="mt-1 text-sm text-ink-soft">{item.deskripsi}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-editorial py-12 lg:py-16">
        <Suspense fallback={<FittingMemuat />}>
          <FittingHasil searchParams={searchParams} />
        </Suspense>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-editorial grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-20">
          <div>
            <p className="label-eyebrow text-brand">Pertanyaan umum</p>
            <h2 className="mt-5 font-display text-3xl leading-tight font-black tracking-tight sm:text-4xl">
              Hal yang sering ditanyakan
            </h2>
            <p className="mt-5 text-base text-ink-soft">
              Belum menemukan jawabannya? Hubungi kami melalui WhatsApp{" "}
              {SITE.whatsapp}.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, index) => (
              <AccordionItem key={item.tanya} value={`faq-${index}`}>
                <AccordionTrigger>{item.tanya}</AccordionTrigger>
                <AccordionContent>{item.jawab}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
