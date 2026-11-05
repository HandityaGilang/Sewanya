import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CreditCard,
  Heart,
  HelpCircle,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  KATEGORI_LIST,
  MEREK_LIST,
  PRODUK_FEATURED,
  PRODUK_LIST,
} from "@/lib/data";
import { rupiah } from "@/lib/utils";

const FEATURES = [
  { ikon: Truck, label: "Pengiriman Cepat", sub: "Jangkauan seluruh Jakarta" },
  { ikon: RefreshCcw, label: "Retur Mudah", sub: "30 hari garansi" },
  { ikon: ShieldCheck, label: "Bayar Aman", sub: "Enkripsi SSL" },
  { ikon: HelpCircle, label: "Bantuan CS", sub: "Siap melayani" },
];

export default function HomePage() {
  const sorotan = PRODUK_FEATURED[0];
  const arrivals = PRODUK_LIST.slice(0, 4);
  const curated = PRODUK_LIST.slice(4, 8);

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="bg-sand/30">
        <div className="container-editorial grid min-h-[500px] gap-8 py-12 lg:min-h-[700px] lg:grid-cols-2 lg:items-center lg:py-0">
          <div className="max-w-xl">
            <h1 className="font-display text-4xl leading-[1.1] font-medium tracking-tight sm:text-6xl lg:text-7xl">
              Modern Essentials. <br />
              Effortless Every Day.
            </h1>
            <p className="mt-6 text-lg text-ink-soft">
              Koleksi premium yang dikurasi untuk momen terbaik Anda.
              Tampil percaya diri dengan pilihan fashion terbaik.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-none px-8">
                <Link href="/katalog">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="link"
                size="lg"
                className="group rounded-none px-0 font-semibold tracking-wider uppercase"
              >
                <Link href="/katalog" className="flex items-center gap-2">
                  New Arrivals
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] lg:aspect-square">
            <div className="h-full w-full overflow-hidden border border-line">
              <ProductImage
                merek={sorotan.merek}
                kategori={sorotan.kategori}
                kode={sorotan.kode}
                className="h-full w-full object-cover"
                tampilan="model"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="container-editorial py-16 lg:py-24">
        <SectionHeading
          title="Shop By Category"
          href="/katalog"
          hrefLabel="View all"
          className="mb-10"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {KATEGORI_LIST.slice(0, 6).map((kategori) => (
            <Link
              key={kategori.nama}
              href={{ pathname: "/katalog", query: { kategori: kategori.nama } }}
              className="group flex flex-col items-center gap-4"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-white">
                <ProductImage
                  merek="SEWANYA"
                  kategori={kategori.nama}
                  kode="CAT"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <span className="text-sm font-semibold tracking-wide text-ink-soft group-hover:text-brand">
                {kategori.nama}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CURATED LOOKS */}
      <section className="bg-sage/20 py-16 lg:py-24">
        <div className="container-editorial grid gap-12 lg:grid-cols-[300px_1fr]">
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-4xl leading-tight font-medium sm:text-5xl">
              Curated <br /> Looks
            </h2>
            <p className="mt-6 text-ink-soft">
              Outfits designed for <br /> how you live.
            </p>
            <Link
              href="/katalog"
              className="mt-8 flex items-center gap-2 text-sm font-semibold tracking-widest uppercase hover:text-brand"
            >
              Explore Looks <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {curated.map((produk) => (
              <Link
                key={produk.id}
                href={`/produk/${produk.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden border border-line bg-white">
                  <ProductImage
                    merek={produk.merek}
                    kategori={produk.kategori}
                    kode={produk.kode}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[13px] font-medium text-ink group-hover:text-brand">
                    {produk.nama}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold tracking-widest text-ink-soft underline uppercase underline-offset-4">
                    SHOP THE LOOK
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-editorial py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[250px_1fr]">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              New Arrivals
            </h2>
            <p className="mt-4 text-sm text-ink-soft">
              Outfits the latest pieces just added.
            </p>
            <Link
              href="/katalog"
              className="mt-6 block text-sm font-semibold tracking-widest text-ink underline uppercase underline-offset-8 hover:text-brand"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {arrivals.map((produk) => (
              <ProductCard key={produk.id} produk={produk} />
            ))}
          </div>
        </div>
      </section>

      {/* SEASONAL EDIT / PROMO */}
      <section className="container-editorial py-16 lg:py-24">
        <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
          <div className="flex flex-col justify-center bg-sand/30 p-8 lg:p-16">
            <p className="label-eyebrow text-ink-soft">Seasonal Edit</p>
            <h2 className="mt-6 font-display text-4xl leading-tight font-medium sm:text-5xl lg:text-6xl">
              Spring Refresh
            </h2>
            <p className="mt-6 text-ink-soft">
              Light layers. Fresh tones. <br />
              New season. New perspective.
            </p>
            <div className="mt-10">
              <span className="font-display text-5xl font-medium sm:text-6xl">
                20% Off
              </span>
              <p className="mt-2 text-sm text-ink-soft">
                Selected styles for a limited time.
              </p>
            </div>
            <Button asChild size="lg" className="mt-10 w-fit rounded-none px-8">
              <Link href="/katalog" className="flex items-center gap-2">
                Shop The Edit <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-square lg:aspect-auto">
            <ProductImage
              merek="PROMO"
              kategori="Dress"
              kode="SPRING"
              className="h-full w-full object-cover"
              tampilan="model"
            />
          </div>
        </div>
      </section>

      {/* MEREK */}
      <section className="border-t border-line bg-white">
        <div className="container-editorial py-16 lg:py-20">
          <SectionHeading
            title="Our Brands"
            description="Merek resmi pilihan yang tersedia untuk disewa."
            className="mb-10"
          />
          <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-8">
            {MEREK_LIST.map((merek) => (
              <li
                key={merek.nama}
                className="flex min-h-20 items-center justify-center bg-white px-4 py-4"
              >
                <BrandLogo merek={merek} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="border-y border-line bg-sand/10">
        <div className="container-editorial grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
          {FEATURES.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 text-center lg:flex-row lg:text-left"
            >
              <item.ikon className="size-6 shrink-0 text-ink-soft" />
              <div>
                <p className="text-sm font-bold tracking-wide text-ink">
                  {item.label}
                </p>
                <p className="text-[11px] text-ink-soft">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
