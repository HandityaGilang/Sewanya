import type { Metadata } from "next";
import { ShieldCheck, Sparkles, Wallet } from "lucide-react";

import { OrderLookup } from "@/components/order-lookup";

export const metadata: Metadata = {
  title: "Cek Pesanan",
  description:
    "Cek status pesanan, rincian periode sewa, dan pratinjau invoice Anda.",
};

const CATATAN = [
  {
    ikon: Wallet,
    judul: "Deposit dapat dikembalikan",
    deskripsi:
      "Deposit dikembalikan penuh setelah item diperiksa dalam kondisi lengkap dan tanpa kerusakan baru.",
  },
  {
    ikon: ShieldCheck,
    judul: "Konfirmasi resmi",
    deskripsi:
      "Status pesanan hanya berubah setelah tim kami mengonfirmasi melalui WhatsApp resmi.",
  },
];

export default function CekPesananPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="container-editorial py-12 lg:py-16">
          <p className="label-eyebrow text-brand">Cek pesanan</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] font-black tracking-tight sm:text-5xl">
            Lacak pesanan sewa Anda
          </h1>
          <p className="mt-5 max-w-2xl text-base text-ink-soft">
            Masukkan kode pesanan dan nomor WhatsApp untuk melihat status,
            periode sewa, daftar item, serta ringkasan pembayaran Anda.
          </p>
        </div>
      </section>

      <section className="container-editorial py-12 lg:py-16">
        <OrderLookup />
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-editorial py-14 lg:py-16">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
            {CATATAN.map((item) => (
              <li key={item.judul} className="bg-white p-6">
                <item.ikon className="size-5 text-brand" />
                <p className="mt-4 text-base font-semibold">{item.judul}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.deskripsi}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
