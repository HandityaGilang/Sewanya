"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HARGA_MAX,
  HARGA_MIN,
  KATEGORI_LIST,
  MEREK_LIST,
  PRODUK_LIST,
  UKURAN_LIST,
} from "@/lib/data";
import { cn, rupiah } from "@/lib/utils";

type Urutan = "populer" | "harga-asc" | "harga-desc" | "nama";

const OPSI_URUTAN: { value: Urutan; label: string }[] = [
  { value: "populer", label: "Paling populer" },
  { value: "harga-asc", label: "Harga terendah" },
  { value: "harga-desc", label: "Harga tertinggi" },
  { value: "nama", label: "Nama A–Z" },
];

type CatalogClientProps = {
  initialKategori?: string[];
  initialMerek?: string[];
  initialQuery?: string;
};

function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function CatalogClient({
  initialKategori = [],
  initialMerek = [],
  initialQuery = "",
}: CatalogClientProps) {
  const [q, setQ] = useState(initialQuery);
  const [kategori, setKategori] = useState<string[]>(initialKategori);
  const [merek, setMerek] = useState<string[]>(initialMerek);
  const [ukuran, setUkuran] = useState<string[]>([]);
  const [hargaMax, setHargaMax] = useState<number>(HARGA_MAX);
  const [urutan, setUrutan] = useState<Urutan>("populer");
  const [panelTerbuka, setPanelTerbuka] = useState(false);

  const hasil = useMemo(() => {
    const kata = q.trim().toLowerCase();
    const tersaring = PRODUK_LIST.filter((produk) => {
      const cocokKata =
        !kata ||
        [produk.nama, produk.merek, produk.kode, produk.kategori].some((nilai) =>
          nilai.toLowerCase().includes(kata),
        );
      const cocokKategori =
        kategori.length === 0 || kategori.includes(produk.kategori);
      const cocokMerek = merek.length === 0 || merek.includes(produk.merek);
      const cocokUkuran =
        ukuran.length === 0 ||
        produk.ukuran.some((item) => ukuran.includes(item));
      const cocokHarga = produk.hargaSewa <= hargaMax;
      return cocokKata && cocokKategori && cocokMerek && cocokUkuran && cocokHarga;
    });

    switch (urutan) {
      case "harga-asc":
        return [...tersaring].sort((a, b) => a.hargaSewa - b.hargaSewa);
      case "harga-desc":
        return [...tersaring].sort((a, b) => b.hargaSewa - a.hargaSewa);
      case "nama":
        return [...tersaring].sort((a, b) => a.nama.localeCompare(b.nama, "id"));
      default:
        return [...tersaring].sort(
          (a, b) => b.rating - a.rating || b.jumlahUlasan - a.jumlahUlasan,
        );
    }
  }, [q, kategori, merek, ukuran, hargaMax, urutan]);

  const adaFilter =
    q.trim() !== "" ||
    kategori.length > 0 ||
    merek.length > 0 ||
    ukuran.length > 0 ||
    hargaMax < HARGA_MAX;

  function resetFilter() {
    setQ("");
    setKategori([]);
    setMerek([]);
    setUkuran([]);
    setHargaMax(HARGA_MAX);
    setUrutan("populer");
  }

  const chipAktif: { label: string; hapus: () => void }[] = [
    ...kategori.map((item) => ({
      label: `Kategori: ${item}`,
      hapus: () => setKategori((prev) => prev.filter((v) => v !== item)),
    })),
    ...merek.map((item) => ({
      label: `Merek: ${item}`,
      hapus: () => setMerek((prev) => prev.filter((v) => v !== item)),
    })),
    ...ukuran.map((item) => ({
      label: `Ukuran: ${item}`,
      hapus: () => setUkuran((prev) => prev.filter((v) => v !== item)),
    })),
    ...(hargaMax < HARGA_MAX
      ? [
          {
            label: `Maks ${rupiah(hargaMax)}`,
            hapus: () => setHargaMax(HARGA_MAX),
          },
        ]
      : []),
  ];

  const panelFilter = (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="label-eyebrow mb-4 text-ink-soft">Kategori</legend>
        <div className="flex flex-col gap-3">
          {KATEGORI_LIST.map((item) => (
            <div key={item.nama} className="flex items-center gap-3">
              <Checkbox
                id={`kategori-${item.nama}`}
                checked={kategori.includes(item.nama)}
                onCheckedChange={() =>
                  setKategori((prev) => toggleValue(prev, item.nama))
                }
              />
              <Label
                htmlFor={`kategori-${item.nama}`}
                className="cursor-pointer font-normal"
              >
                {item.nama}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-eyebrow mb-4 text-ink-soft">Merek</legend>
        <div className="flex flex-col gap-3">
          {MEREK_LIST.map((item) => (
            <div key={item.nama} className="flex items-center gap-3">
              <Checkbox
                id={`merek-${item.nama}`}
                checked={merek.includes(item.nama)}
                onCheckedChange={() =>
                  setMerek((prev) => toggleValue(prev, item.nama))
                }
              />
              <Label
                htmlFor={`merek-${item.nama}`}
                className="cursor-pointer font-normal"
              >
                {item.nama}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label-eyebrow mb-4 text-ink-soft">Ukuran</legend>
        <div className="flex flex-wrap gap-2">
          {UKURAN_LIST.map((item) => {
            const aktif = ukuran.includes(item);
            return (
              <button
                key={item}
                type="button"
                aria-pressed={aktif}
                onClick={() => setUkuran((prev) => toggleValue(prev, item))}
                className={cn(
                  "h-10 min-w-11 rounded-sm border px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
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
      </fieldset>

      <fieldset>
        <legend className="label-eyebrow mb-4 text-ink-soft">
          Harga maksimal (per 3 hari)
        </legend>
        <input
          id="filter-harga"
          type="range"
          min={HARGA_MIN}
          max={HARGA_MAX}
          step={10_000}
          value={hargaMax}
          onChange={(event) => setHargaMax(Number(event.target.value))}
          aria-label="Harga maksimal sewa"
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-ivory-dark accent-brand"
        />
        <p className="mt-3 text-sm font-semibold">
          {rupiah(HARGA_MIN)} – {rupiah(hargaMax)}
        </p>
      </fieldset>

      <Button variant="outline" onClick={resetFilter} disabled={!adaFilter}>
        <X className="size-4" />
        Bersihkan filter
      </Button>
    </div>
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
      {/* PANEL FILTER DESKTOP */}
      <aside aria-label="Filter produk" className="hidden lg:block">
        <div className="sticky top-32">{panelFilter}</div>
      </aside>

      <div>
        <div className="flex flex-col gap-4 border-b border-line pb-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" />
              <Input
                type="search"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Cari nama item, merek, atau kode…"
                aria-label="Cari produk"
                className="pl-11"
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="lg:hidden"
                onClick={() => setPanelTerbuka((prev) => !prev)}
                aria-expanded={panelTerbuka}
                aria-controls="panel-filter-seluler"
              >
                <SlidersHorizontal className="size-4" />
                Filter
                {chipAktif.length > 0 ? ` (${chipAktif.length})` : ""}
              </Button>

              <Select
                value={urutan}
                onValueChange={(value) => setUrutan(value as Urutan)}
              >
                <SelectTrigger
                  aria-label="Urutkan produk"
                  className="w-full sm:w-52"
                >
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  {OPSI_URUTAN.map((opsi) => (
                    <SelectItem key={opsi.value} value={opsi.value}>
                      {opsi.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {panelTerbuka ? (
            <div
              id="panel-filter-seluler"
              className="border border-line bg-white p-6 lg:hidden"
            >
              {panelFilter}
            </div>
          ) : null}

          {chipAktif.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-2">
              {chipAktif.map((chip) => (
                <li key={chip.label}>
                  <button
                    type="button"
                    onClick={chip.hapus}
                    className="inline-flex items-center gap-2 rounded-sm bg-ivory-dark px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    {chip.label}
                    <X className="size-3.5" />
                    <span className="sr-only">Hapus filter {chip.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <p aria-live="polite" className="text-sm text-ink-soft">
            Menampilkan <strong className="text-ink">{hasil.length}</strong> dari{" "}
            {PRODUK_LIST.length} item
          </p>
        </div>

        {hasil.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
            {hasil.map((produk) => (
              <ProductCard key={produk.id} produk={produk} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-4 border border-line bg-white p-10">
            <Badge variant="outline">Tidak ada hasil</Badge>
            <h2 className="font-display text-2xl font-bold">
              Item tidak ditemukan
            </h2>
            <p className="max-w-md text-sm text-ink-soft">
              Coba ubah kata kunci, longgarkan filter harga, atau pilih kategori
              lain. Tim kami juga siap membantu mencari item melalui WhatsApp.
            </p>
            <Button onClick={resetFilter}>Bersihkan filter</Button>
          </div>
        )}
      </div>
    </div>
  );
}
