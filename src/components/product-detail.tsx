"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  Info,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FITTING, type Produk } from "@/lib/data";
import { cn, rupiah } from "@/lib/utils";

const TAMPILAN = [
  { id: "depan", label: "Tampak depan" },
  { id: "detail", label: "Detail bahan" },
  { id: "belakang", label: "Tampak belakang" },
];

export function ProductDetail({ produk }: { produk: Produk }) {
  const [tampilanAktif, setTampilanAktif] = useState(TAMPILAN[0].id);
  const [ukuran, setUkuran] = useState(produk.ukuran[0]);

  const labelTampilan =
    TAMPILAN.find((item) => item.id === tampilanAktif)?.label ?? "";

  return (
    <>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* GALERI */}
        <div>
          <div className="border border-line bg-white">
            <ProductImage
              merek={produk.merek}
              kategori={produk.kategori}
              kode={produk.kode}
              tampilan={labelTampilan}
              catatanPlaceholder
            />
          </div>

          <div
            role="group"
            aria-label="Pilih sudut pandang foto"
            className="mt-4 grid grid-cols-3 gap-3"
          >
            {TAMPILAN.map((item) => {
              const aktif = tampilanAktif === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={aktif}
                  onClick={() => setTampilanAktif(item.id)}
                  className={cn(
                    "border bg-white p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    aktif ? "border-brand" : "border-line hover:border-ink/40",
                  )}
                >
                  <ProductImage
                    merek={produk.merek}
                    kategori={produk.kategori}
                    kode={produk.kode}
                    className="aspect-square"
                  />
                  <span className="mt-1 block px-1 pb-1 text-left text-[11px] text-ink-soft">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 flex items-start gap-2 text-xs text-ink-soft">
            <Info className="mt-0.5 size-4 shrink-0" />
            Foto produk resmi belum tersedia. Tim kami dapat mengirimkan foto
            aktual item melalui WhatsApp sebelum Anda memesan.
          </p>
        </div>

        {/* INFORMASI */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="dark">{produk.merek}</Badge>
            <Badge variant="outline">{produk.kategori}</Badge>
            <span className="font-mono text-xs text-ink-soft">{produk.kode}</span>
          </div>

          <h1 className="mt-5 font-display text-3xl leading-[1.05] font-black tracking-tight sm:text-4xl">
            {produk.nama}
          </h1>

          <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
            <Star className="size-4 fill-brand text-brand" />
            <span className="font-semibold text-ink">
              {produk.rating.toFixed(1)}
            </span>
            ({produk.jumlahUlasan} ulasan pelanggan)
          </p>

          <div className="mt-8 border border-line bg-white p-6">
            <dl className="flex flex-col gap-4">
              <div className="flex items-end justify-between gap-4">
                <dt className="text-sm text-ink-soft">Biaya sewa (3 hari)</dt>
                <dd className="font-display text-3xl font-black tracking-tight">
                  {rupiah(produk.hargaSewa)}
                </dd>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <dt className="text-sm text-ink-soft">
                  Deposit (dikembalikan)
                </dt>
                <dd className="text-base font-semibold">
                  {rupiah(produk.deposit)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-line-light pt-3">
                <dt className="text-sm text-ink-soft">Biaya fitting</dt>
                <dd className="text-sm font-bold">{rupiah(FITTING.biaya)}</dd>
              </div>
            </dl>
          </div>

          {/* UKURAN */}
          <fieldset className="mt-8">
            <legend className="label-eyebrow mb-4 text-ink-soft">
              Pilih ukuran
            </legend>
            <div className="flex flex-wrap gap-2">
              {produk.ukuran.map((item) => {
                const aktif = ukuran === item;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={aktif}
                    onClick={() => setUkuran(item)}
                    className={cn(
                      "h-12 min-w-14 rounded-sm border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                      aktif
                        ? "border-ink bg-ink text-white"
                        : "border-ink/25 bg-white text-ink hover:border-ink",
                    )}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Ragu dengan ukuran? Jadwalkan fitting agar stylist kami membantu
              menyesuaikan.
            </p>
          </fieldset>

          {/* AKSI */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="sm:flex-1">
              <Link
                href={{
                  pathname: "/fitting",
                  query: {
                    produk: produk.slug,
                    ukuran,
                    tujuan: "sewa",
                  },
                }}
              >
                <Send className="size-4" />
                Sewa Item Ini
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="sm:flex-1">
              <Link
                href={{
                  pathname: "/fitting",
                  query: {
                    produk: produk.slug,
                    ukuran,
                    tujuan: "fitting",
                  },
                }}
              >
                <CalendarCheck className="size-4" />
                Jadwalkan Fitting
              </Link>
            </Button>
          </div>

          <ul className="mt-8 grid gap-3 border-t border-line pt-6 text-sm text-ink-soft">
            <li className="flex items-center gap-3">
              <BadgeCheck className="size-4 shrink-0 text-brand" />
              Keaslian item diverifikasi sebelum masuk koleksi
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="size-4 shrink-0 text-brand" />
              Dicuci dan disetrika sebelum diserahkan
            </li>
            <li className="flex items-center gap-3">
              <Truck className="size-4 shrink-0 text-brand" />
              Ambil di studio atau kirim via kurir rekanan
            </li>
          </ul>
        </div>
      </div>

      {/* TAB INFORMASI TAMBAHAN */}
      <Tabs defaultValue="deskripsi" className="mt-16">
        <TabsList>
          <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
          <TabsTrigger value="detail">Detail & Bahan</TabsTrigger>
          <TabsTrigger value="ketentuan">Ketentuan Sewa</TabsTrigger>
        </TabsList>

        <TabsContent value="deskripsi" className="max-w-3xl">
          <p className="text-base leading-relaxed text-ink-soft">
            {produk.deskripsi}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Tersedia dalam ukuran {produk.ukuran.join(", ")} dengan pilihan
            warna {produk.warna.join(", ")}. Stylist kami dapat membantu
            memadukan item ini dengan aksesori lain dalam satu jadwal fitting.
          </p>
        </TabsContent>

        <TabsContent value="detail">
          <dl className="grid max-w-3xl gap-px border border-line bg-line sm:grid-cols-2">
            {[
              { label: "Merek", nilai: produk.merek },
              { label: "Kategori", nilai: produk.kategori },
              { label: "Bahan", nilai: produk.bahan },
              { label: "Ukuran tersedia", nilai: produk.ukuran.join(", ") },
              { label: "Pilihan warna", nilai: produk.warna.join(", ") },
              { label: "Kode item", nilai: produk.kode },
            ].map((baris) => (
              <div key={baris.label} className="bg-white p-5">
                <dt className="label-eyebrow text-ink-soft">{baris.label}</dt>
                <dd className="mt-2 text-base">{baris.nilai}</dd>
              </div>
            ))}
          </dl>
        </TabsContent>

        <TabsContent value="ketentuan" className="max-w-3xl">
          <ul className="flex flex-col gap-3 text-base leading-relaxed text-ink-soft">
            <li>
              • Durasi sewa standar 3 hari. Perpanjangan dapat diajukan minimal
              1 hari sebelum jadwal pengembalian.
            </li>
            <li>
              • Deposit dikembalikan penuh setelah item diperiksa dalam kondisi
              lengkap dan tanpa kerusakan baru.
            </li>
            <li>
              • Keterlambatan pengembalian dikenakan biaya tambahan per hari
              sesuai Syarat & Ketentuan.
            </li>
            <li>
              • Perubahan atau pembatalan jadwal fitting dapat dilakukan
              maksimal 24 jam sebelum jadwal.
            </li>
          </ul>
          <Button asChild variant="link" className="mt-4 px-0">
            <Link href="/syarat-ketentuan">
              Baca Syarat & Ketentuan lengkap
            </Link>
          </Button>
        </TabsContent>
      </Tabs>
    </>
  );
}
