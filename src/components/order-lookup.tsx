"use client";

import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  FileText,
  Printer,
  Search,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CONTOH_PESANAN, type DetailPesanan } from "@/lib/data";
import { formatTanggalIndo, normalisasiWhatsapp, rupiah } from "@/lib/utils";

function hitungTagihan(pesanan: DetailPesanan) {
  const subtotalSewa = pesanan.items.reduce(
    (total, item) => total + item.hargaSewa,
    0,
  );
  const totalDeposit = pesanan.items.reduce(
    (total, item) => total + item.deposit,
    0,
  );
  return {
    subtotalSewa,
    totalDeposit,
    totalDibayar: subtotalSewa + totalDeposit,
  };
}

export function OrderLookup() {
  const [kode, setKode] = useState(CONTOH_PESANAN.kodePesanan);
  const [whatsapp, setWhatsapp] = useState(CONTOH_PESANAN.whatsapp);
  const [hasil, setHasil] = useState<DetailPesanan | null>(null);
  const [pesanGalat, setPesanGalat] = useState<string | null>(null);
  const [sudahCari, setSudahCari] = useState(false);

  function tanganiCari(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const kodeBersih = kode.trim().toUpperCase();
    const waBersih = normalisasiWhatsapp(whatsapp);

    if (!kodeBersih || waBersih.length < 9) {
      setHasil(null);
      setSudahCari(false);
      setPesanGalat("Lengkapi kode pesanan dan nomor WhatsApp terlebih dahulu.");
      return;
    }

    setPesanGalat(null);
    setSudahCari(true);

    const cocokKode = kodeBersih === CONTOH_PESANAN.kodePesanan;
    const cocokWhatsapp =
      waBersih === normalisasiWhatsapp(CONTOH_PESANAN.whatsapp);

    setHasil(cocokKode && cocokWhatsapp ? CONTOH_PESANAN : null);
  }

  const tagihan = hasil ? hitungTagihan(hasil) : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[20rem_1fr] lg:gap-14">
      <aside className="tanpa-cetak lg:sticky lg:top-32 lg:self-start">
        <form
          onSubmit={tanganiCari}
          noValidate
          className="border border-line bg-white p-6"
        >
          <h2 className="font-display text-xl font-bold">Lacak pesanan</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Masukkan kode pesanan dan nomor WhatsApp yang Anda gunakan saat
            memesan.
          </p>

          <div className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="kode-pesanan">Kode pesanan</Label>
              <Input
                id="kode-pesanan"
                value={kode}
                onChange={(event) => setKode(event.target.value)}
                placeholder="SWN-2026-0001"
                autoComplete="off"
                aria-invalid={Boolean(pesanGalat)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="wa-pesanan">Nomor WhatsApp</Label>
              <Input
                id="wa-pesanan"
                type="tel"
                inputMode="tel"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                placeholder="0812 3456 7890"
                autoComplete="tel"
                aria-invalid={Boolean(pesanGalat)}
                aria-describedby={pesanGalat ? "galat-lacak" : undefined}
              />
            </div>
          </div>

          {pesanGalat ? (
            <p
              id="galat-lacak"
              role="alert"
              className="mt-4 flex items-start gap-2 text-sm font-medium text-brand"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              {pesanGalat}
            </p>
          ) : null}

          <Button type="submit" size="lg" className="mt-6 w-full">
            <Search className="size-4" />
            Cek Pesanan
          </Button>

          <p className="mt-5 border-t border-line pt-5 text-xs text-ink-soft">
            Mode pratinjau: gunakan kode{" "}
            <strong className="font-mono text-ink">
              {CONTOH_PESANAN.kodePesanan}
            </strong>{" "}
            dengan nomor WhatsApp {CONTOH_PESANAN.whatsapp}. Data pesanan asli
            akan tampil setelah database terhubung.
          </p>
        </form>
      </aside>

      <div aria-live="polite">
        {hasil && tagihan ? (
          <article className="border border-line bg-white">
            <header className="flex flex-col gap-4 border-b border-line p-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="label-eyebrow text-ink-soft">
                  Pratinjau invoice
                </p>
                <h2 className="mt-3 font-display text-2xl font-black tracking-tight sm:text-3xl">
                  {hasil.kodePesanan}
                </h2>
              </div>
              <Badge variant="dark" className="w-fit">
                {hasil.status}
              </Badge>
            </header>

            <div className="grid gap-px bg-line sm:grid-cols-2">
              <div className="bg-white p-6">
                <p className="label-eyebrow text-ink-soft">Pemesan</p>
                <p className="mt-3 text-base font-semibold">{hasil.nama}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  WhatsApp {hasil.whatsapp}
                </p>
              </div>
              <div className="bg-white p-6">
                <p className="label-eyebrow text-ink-soft">Periode sewa</p>
                <p className="mt-3 flex items-center gap-2 text-base font-semibold">
                  <CalendarDays className="size-4 text-brand" />
                  {formatTanggalIndo(hasil.tanggalSewa)} –{" "}
                  {formatTanggalIndo(hasil.tanggalKembali)}
                </p>
                {hasil.fitting ? (
                  <p className="mt-2 text-sm text-ink-soft">
                    Fitting {formatTanggalIndo(hasil.fitting.tanggal)} ·{" "}
                    {hasil.fitting.batch}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-ink-soft">
                    Tanpa jadwal fitting
                  </p>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <caption className="sr-only">
                    Daftar item yang disewa
                  </caption>
                  <thead>
                    <tr className="border-b border-line">
                      <th scope="col" className="py-3 pr-4 text-xs font-semibold tracking-widest text-ink-soft uppercase">
                        Item
                      </th>
                      <th scope="col" className="py-3 pr-4 text-xs font-semibold tracking-widest text-ink-soft uppercase">
                        Ukuran
                      </th>
                      <th scope="col" className="py-3 pr-4 text-right text-xs font-semibold tracking-widest text-ink-soft uppercase">
                        Sewa
                      </th>
                      <th scope="col" className="py-3 text-right text-xs font-semibold tracking-widest text-ink-soft uppercase">
                        Deposit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hasil.items.map((item) => (
                      <tr key={item.kodeProduk} className="border-b border-line">
                        <td className="py-4 pr-4">
                          <span className="block text-sm font-semibold">
                            {item.nama}
                          </span>
                          <span className="mt-1 block font-mono text-xs text-ink-soft">
                            {item.merek} · {item.kodeProduk}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-sm">{item.ukuran}</td>
                        <td className="py-4 pr-4 text-right text-sm font-semibold">
                          {rupiah(item.hargaSewa)}
                        </td>
                        <td className="py-4 text-right text-sm">
                          {rupiah(item.deposit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <dl className="mt-6 ml-auto flex max-w-sm flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-ink-soft">Subtotal sewa</dt>
                  <dd className="text-base font-semibold">
                    {rupiah(tagihan.subtotalSewa)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm text-ink-soft">
                    Deposit (dikembalikan)
                  </dt>
                  <dd className="text-base font-semibold">
                    {rupiah(tagihan.totalDeposit)}
                  </dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-sm font-semibold">
                    Total dibayar sekarang
                  </dt>
                  <dd className="font-display text-2xl font-black tracking-tight">
                    {rupiah(tagihan.totalDibayar)}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-xs text-ink-soft">
                Deposit dikembalikan setelah item diperiksa dalam kondisi
                lengkap. Rincian ini merupakan pratinjau tampilan invoice.
              </p>
            </div>

            <footer className="tanpa-cetak border-t border-line p-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.print()}
              >
                <Printer className="size-4" />
                Cetak / Simpan PDF
              </Button>
            </footer>
          </article>
        ) : sudahCari ? (
          <div className="border border-line bg-white p-10">
            <Badge variant="outline">Tidak ditemukan</Badge>
            <h2 className="mt-5 font-display text-2xl font-bold">
              Pesanan tidak ditemukan
            </h2>
            <p className="mt-3 max-w-xl text-base text-ink-soft">
              Periksa kembali kode pesanan dan nomor WhatsApp Anda. Pastikan
              keduanya sama dengan yang digunakan saat memesan. Bila masih tidak
              ditemukan, hubungi tim kami melalui WhatsApp.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4 border border-line bg-white p-10">
            <FileText className="size-8 text-brand" />
            <h2 className="font-display text-2xl font-bold">
              Rincian pesanan Anda tampil di sini
            </h2>
            <p className="max-w-xl text-base text-ink-soft">
              Setelah kode pesanan dan nomor WhatsApp diverifikasi, Anda dapat
              melihat status, periode sewa, daftar item, serta ringkasan
              pembayaran.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
