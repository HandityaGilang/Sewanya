"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  AlertCircle,
  CalendarDays,
  Check,
  Clock,
  MessageCircle,
  Pencil,
  Send,
  Sparkles,
} from "lucide-react";

import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FITTING, type Produk } from "@/lib/data";
import { SITE } from "@/lib/nav";
import {
  cn,
  formatTanggalIndo,
  normalisasiWhatsapp,
  rupiah,
} from "@/lib/utils";

type Tujuan = "fitting" | "sewa";

type FittingFormProps = {
  produkTerpilih?: Produk;
  ukuranAwal?: string;
  tujuanAwal?: Tujuan;
};

type Kesalahan = Partial<Record<"tanggal" | "batch" | "nama" | "whatsapp" | "setuju", string>>;

function tanggalHariIni() {
  const sekarang = new Date();
  const bulan = String(sekarang.getMonth() + 1).padStart(2, "0");
  const hari = String(sekarang.getDate()).padStart(2, "0");
  return `${sekarang.getFullYear()}-${bulan}-${hari}`;
}

function tanpaLangganan() {
  return () => {};
}

export function FittingForm({
  produkTerpilih,
  ukuranAwal,
  tujuanAwal = "fitting",
}: FittingFormProps) {
  const [tujuan, setTujuan] = useState<Tujuan>(tujuanAwal);
  const [tanggal, setTanggal] = useState("");
  const [batch, setBatch] = useState("");
  const [nama, setNama] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [catatan, setCatatan] = useState("");
  const [setuju, setSetuju] = useState(false);
  const [kesalahan, setKesalahan] = useState<Kesalahan>({});
  const [terkirim, setTerkirim] = useState(false);

  const minTanggal = useSyncExternalStore(tanpaLangganan, tanggalHariIni, () => "");

  const batchTerpilih = FITTING.batch.find((item) => item.id === batch);

  const ringkasan = useMemo(() => {
    const baris: { label: string; nilai: string }[] = [
      { label: "Tujuan", nilai: tujuan === "fitting" ? "Fitting di studio" : "Langsung sewa" },
      {
        label: "Tanggal",
        nilai: tanggal ? formatTanggalIndo(tanggal) : "Belum dipilih",
      },
      {
        label: "Batch",
        nilai: batchTerpilih
          ? `${batchTerpilih.nama} · ${batchTerpilih.jam}`
          : "Belum dipilih",
      },
    ];

    if (produkTerpilih) {
      baris.push({
        label: "Item",
        nilai: `${produkTerpilih.nama}${ukuranAwal ? ` (${ukuranAwal})` : ""}`,
      });
    }

    return baris;
  }, [tujuan, tanggal, batchTerpilih, produkTerpilih, ukuranAwal]);

  const pesanWhatsapp = useMemo(() => {
    const isi = [
      "Halo SEWANYA.ID, saya ingin mengajukan jadwal.",
      "",
      `Nama: ${nama || "-"}`,
      `Tujuan: ${tujuan === "fitting" ? "Fitting di studio" : "Langsung sewa"}`,
      `Tanggal: ${tanggal ? formatTanggalIndo(tanggal) : "-"}`,
      `Batch: ${batchTerpilih ? `${batchTerpilih.nama} (${batchTerpilih.jam})` : "-"}`,
      produkTerpilih
        ? `Item: ${produkTerpilih.nama}${ukuranAwal ? ` ukuran ${ukuranAwal}` : ""} (${produkTerpilih.kode})`
        : null,
      tujuan === "fitting"
        ? `Biaya fitting: ${rupiah(FITTING.biaya)}`
        : null,
      catatan ? `Catatan: ${catatan}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `${SITE.whatsappLink.split("?")[0]}?text=${encodeURIComponent(isi)}`;
  }, [nama, tujuan, tanggal, batchTerpilih, produkTerpilih, ukuranAwal, catatan]);

  function validasi() {
    const baru: Kesalahan = {};

    if (!tanggal) {
      baru.tanggal = "Silakan pilih tanggal kunjungan.";
    } else if (minTanggal && tanggal < minTanggal) {
      baru.tanggal = "Tanggal tidak boleh sebelum hari ini.";
    }

    if (!batch) {
      baru.batch = "Silakan pilih batch kunjungan.";
    }

    if (nama.trim().length < 3) {
      baru.nama = "Nama minimal 3 karakter.";
    }

    const nomor = normalisasiWhatsapp(whatsapp);
    if (!/^62\d{8,13}$/.test(nomor)) {
      baru.whatsapp = "Masukkan nomor WhatsApp Indonesia yang valid.";
    }

    if (!setuju) {
      baru.setuju = "Anda perlu menyetujui Syarat & Ketentuan.";
    }

    setKesalahan(baru);
    return Object.keys(baru).length === 0;
  }

  function tanganiKirim(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validasi()) {
      setTerkirim(false);
      return;
    }
    setTerkirim(true);
  }

  if (terkirim) {
    return (
      <div className="border border-line bg-white p-6 sm:p-10">
        <Badge variant="dark" className="gap-1.5">
          <Check className="size-3.5" />
          Permintaan siap dikirim
        </Badge>
        <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
          Periksa kembali permintaan Anda
        </h2>
        <p className="mt-3 max-w-2xl text-base text-ink-soft">
          Data di bawah akan dikirim ke tim SEWANYA.ID melalui WhatsApp resmi.
          Kode pesanan diterbitkan setelah tim kami mengonfirmasi ketersediaan
          jadwal.
        </p>

        <dl className="mt-8 max-w-xl">
          {ringkasan.map((baris) => (
            <div
              key={baris.label}
              className="flex items-start justify-between gap-6 border-b border-line py-4"
            >
              <dt className="text-sm text-ink-soft">{baris.label}</dt>
              <dd className="text-right text-base font-semibold">
                {baris.nilai}
              </dd>
            </div>
          ))}
          <div className="flex items-start justify-between gap-6 py-4">
            <dt className="text-sm text-ink-soft">Nama</dt>
            <dd className="text-right text-base font-semibold">{nama}</dd>
          </div>
          <div className="flex items-start justify-between gap-6 py-4">
            <dt className="text-sm text-ink-soft">WhatsApp</dt>
            <dd className="text-right text-base font-semibold">
              {normalisasiWhatsapp(whatsapp)}
            </dd>
          </div>
          {tujuan === "fitting" ? (
            <div className="flex items-start justify-between gap-6 py-4">
              <dt className="text-sm text-ink-soft">Biaya fitting</dt>
              <dd className="text-right text-base font-semibold">
                {rupiah(FITTING.biaya)}
              </dd>
            </div>
          ) : null}
        </dl>

        {tujuan === "fitting" ? (
          <p className="mt-6 flex max-w-xl items-start gap-3 border border-brand/25 bg-brand/5 p-4 text-sm">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-brand" />
            <span>
              Silakan lakukan pembayaran biaya fitting {rupiah(FITTING.biaya)} saat konfirmasi jadwal kunjungan.
            </span>
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a
              href={pesanWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" />
              Kirim via WhatsApp
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            type="button"
            onClick={() => setTerkirim(false)}
          >
            <Pencil className="size-4" />
            Ubah permintaan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={tanganiKirim}
      noValidate
      className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14"
    >
      <div className="flex flex-col gap-10">
        {/* TUJUAN */}
        <fieldset className="border border-line bg-white p-6">
          <legend className="label-eyebrow px-1 text-ink-soft">
            Tujuan kunjungan
          </legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                value: "fitting" as Tujuan,
                judul: "Fitting dulu",
                deskripsi:
                  "Coba beberapa item, ukuran disesuaikan, lalu putuskan.",
              },
              {
                value: "sewa" as Tujuan,
                judul: "Langsung sewa",
                deskripsi:
                  "Sudah yakin dengan ukuran dan item yang dipilih.",
              },
            ].map((opsi) => (
              <label
                key={opsi.value}
                className={cn(
                  "flex cursor-pointer gap-4 border p-4 transition-colors",
                  tujuan === opsi.value
                    ? "border-brand bg-brand/5"
                    : "border-line hover:border-ink/40",
                )}
              >
                <input
                  type="radio"
                  name="tujuan"
                  value={opsi.value}
                  checked={tujuan === opsi.value}
                  onChange={() => setTujuan(opsi.value)}
                  className="mt-1 size-5 shrink-0 accent-brand"
                />
                <span>
                  <span className="block text-base font-semibold">
                    {opsi.judul}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    {opsi.deskripsi}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* JADWAL */}
        <fieldset className="border border-line bg-white p-6">
          <legend className="label-eyebrow px-1 text-ink-soft">
            Jadwal kunjungan
          </legend>

          <div className="mt-4 flex flex-col gap-2">
            <Label htmlFor="tanggal">
              <CalendarDays className="size-4 text-brand" />
              Tanggal kunjungan
            </Label>
            <Input
              id="tanggal"
              type="date"
              value={tanggal}
              min={minTanggal || undefined}
              onChange={(event) => setTanggal(event.target.value)}
              aria-invalid={Boolean(kesalahan.tanggal)}
              aria-describedby={kesalahan.tanggal ? "galat-tanggal" : undefined}
              className="sm:max-w-xs"
            />
            {kesalahan.tanggal ? (
              <p
                id="galat-tanggal"
                role="alert"
                className="flex items-center gap-2 text-sm font-medium text-brand"
              >
                <AlertCircle className="size-4" />
                {kesalahan.tanggal}
              </p>
            ) : null}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Clock className="size-4 text-brand" />
              Pilih batch
            </p>
            <div
              className="grid gap-3 sm:grid-cols-2"
              aria-describedby={kesalahan.batch ? "galat-batch" : undefined}
            >
              {FITTING.batch.map((item) => (
                <label
                  key={item.id}
                  className={cn(
                    "flex cursor-pointer gap-4 border p-4 transition-colors",
                    batch === item.id
                      ? "border-brand bg-brand/5"
                      : "border-line hover:border-ink/40",
                  )}
                >
                  <input
                    type="radio"
                    name="batch"
                    value={item.id}
                    checked={batch === item.id}
                    onChange={() => setBatch(item.id)}
                    className="mt-1 size-5 shrink-0 accent-brand"
                  />
                  <span>
                    <span className="block font-display text-lg font-bold">
                      {item.nama}
                    </span>
                    <span className="mt-1 block font-mono text-xs tracking-wide text-ink-soft">
                      {item.jam}
                    </span>
                    <span className="mt-2 block text-sm text-ink-soft">
                      {item.deskripsi}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            {kesalahan.batch ? (
              <p
                id="galat-batch"
                role="alert"
                className="flex items-center gap-2 text-sm font-medium text-brand"
              >
                <AlertCircle className="size-4" />
                {kesalahan.batch}
              </p>
            ) : null}
          </div>
        </fieldset>

        {/* DATA DIRI */}
        <fieldset className="border border-line bg-white p-6">
          <legend className="label-eyebrow px-1 text-ink-soft">
            Data pemesan
          </legend>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nama">Nama lengkap</Label>
              <Input
                id="nama"
                value={nama}
                onChange={(event) => setNama(event.target.value)}
                placeholder="Contoh: Nadira Prameswari"
                autoComplete="name"
                aria-invalid={Boolean(kesalahan.nama)}
                aria-describedby={kesalahan.nama ? "galat-nama" : undefined}
              />
              {kesalahan.nama ? (
                <p
                  id="galat-nama"
                  role="alert"
                  className="flex items-center gap-2 text-sm font-medium text-brand"
                >
                  <AlertCircle className="size-4" />
                  {kesalahan.nama}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
              <Input
                id="whatsapp"
                type="tel"
                inputMode="tel"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
                placeholder="0812 3456 7890"
                autoComplete="tel"
                aria-invalid={Boolean(kesalahan.whatsapp)}
                aria-describedby={
                  kesalahan.whatsapp ? "galat-whatsapp" : "bantuan-whatsapp"
                }
              />
              {kesalahan.whatsapp ? (
                <p
                  id="galat-whatsapp"
                  role="alert"
                  className="flex items-center gap-2 text-sm font-medium text-brand"
                >
                  <AlertCircle className="size-4" />
                  {kesalahan.whatsapp}
                </p>
              ) : (
                <p id="bantuan-whatsapp" className="text-xs text-ink-soft">
                  Kami mengirim konfirmasi melalui nomor ini.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Label htmlFor="catatan">Catatan tambahan (opsional)</Label>
            <Textarea
              id="catatan"
              value={catatan}
              onChange={(event) => setCatatan(event.target.value)}
              placeholder="Contoh: ingin mencoba dress dan blazer sekaligus."
            />
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Checkbox
              id="setuju"
              checked={setuju}
              onCheckedChange={(nilai) => setSetuju(nilai === true)}
              aria-invalid={Boolean(kesalahan.setuju)}
              aria-describedby={kesalahan.setuju ? "galat-setuju" : undefined}
            />
            <Label htmlFor="setuju" className="font-normal leading-relaxed">
              Saya menyetujui{" "}
              <Link
                href="/syarat-ketentuan"
                className="font-semibold text-brand underline underline-offset-4"
              >
                Syarat & Ketentuan
              </Link>{" "}
              SEWANYA.ID.
            </Label>
          </div>
          {kesalahan.setuju ? (
            <p
              id="galat-setuju"
              role="alert"
              className="mt-2 flex items-center gap-2 text-sm font-medium text-brand"
            >
              <AlertCircle className="size-4" />
              {kesalahan.setuju}
            </p>
          ) : null}
        </fieldset>
      </div>

      {/* RINGKASAN */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="border border-line bg-white p-6">
          <p className="label-eyebrow text-ink-soft">Ringkasan</p>

          <dl className="mt-5 flex flex-col">
            {ringkasan.map((baris) => (
              <div
                key={baris.label}
                className="flex items-start justify-between gap-4 border-b border-line py-3"
              >
                <dt className="text-sm text-ink-soft">{baris.label}</dt>
                <dd className="text-right text-sm font-semibold">
                  {baris.nilai}
                </dd>
              </div>
            ))}
          </dl>

          {produkTerpilih ? (
            <div className="mt-6 flex gap-4 border border-line p-4">
              <div className="w-16 shrink-0">
                <ProductImage
                  merek={produkTerpilih.merek}
                  kategori={produkTerpilih.kategori}
                  kode={produkTerpilih.kode}
                />
              </div>
              <div>
                <p className="text-sm font-semibold">{produkTerpilih.nama}</p>
                <p className="mt-1 text-xs text-ink-soft">
                  {produkTerpilih.merek}
                  {ukuranAwal ? ` · Ukuran ${ukuranAwal}` : ""}
                </p>
                <p className="mt-2 text-sm font-bold">
                  {rupiah(produkTerpilih.hargaSewa)}
                  <span className="ml-1 text-xs font-normal text-ink-soft">
                    / 3 hari
                  </span>
                </p>
              </div>
            </div>
          ) : null}

          <Separator className="my-6" />

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-ink-soft">Biaya fitting</p>
            <p className="font-display text-2xl font-black">
              {tujuan === "fitting" ? rupiah(FITTING.biaya) : "Tanpa biaya"}
            </p>
          </div>

          <p className="mt-4 flex items-start gap-3 border border-brand/25 bg-brand/5 p-4 text-sm">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-brand" />
            <span>
              {tujuan === "fitting"
                ? `Biaya fitting ${rupiah(FITTING.biaya)} per sesi kunjungan.`
                : "Anda memilih langsung sewa. Jadwal fitting tetap dapat ditambahkan kemudian."}
            </span>
          </p>

          <Button type="submit" size="lg" className="mt-6 w-full">
            <Send className="size-4" />
            Lanjutkan Permintaan
          </Button>

          <p className="mt-4 text-xs text-ink-soft">
            Permintaan diteruskan ke tim kami melalui WhatsApp resmi{" "}
            {SITE.whatsapp}. Tidak ada pembayaran yang diproses di halaman ini.
          </p>
        </div>
      </aside>
    </form>
  );
}
