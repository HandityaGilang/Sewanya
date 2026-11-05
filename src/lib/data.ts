/**
 * Data contoh (placeholder) hingga database terhubung.
 * Semua konten produk di bawah ini bersifat sementara dan aman untuk diganti
 * dengan hasil query database tanpa mengubah komponen UI.
 */

export type Kategori =
  | "Dress"
  | "Kebaya"
  | "Blazer"
  | "Outer"
  | "Set"
  | "Batik"
  | "Suit"
  | "Aksesori";

export type Produk = {
  id: string;
  slug: string;
  kode: string;
  nama: string;
  merek: string;
  kategori: Kategori;
  ukuran: string[];
  warna: string[];
  /** Harga sewa untuk durasi standar 3 hari */
  hargaSewa: number;
  /** Deposit yang dikembalikan setelah item kembali lengkap */
  deposit: number;
  deskripsi: string;
  bahan: string;
  featured: boolean;
  rating: number;
  jumlahUlasan: number;
};

export type Merek = {
  nama: string;
  /** Path logo resmi bila tersedia; kosong berarti memakai fallback teks */
  logo?: string;
};

export const MEREK_LIST: Merek[] = [
  {
    nama: "Zara",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
  },
  {
    nama: "H&M",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
  },
  {
    nama: "Mango",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Mango_logo.svg",
  },
  {
    nama: "COS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/COS_logo.svg",
  },
  {
    nama: "Uniqlo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/UNIQLO_logo.svg",
  },
  {
    nama: "Massimo Dutti",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Massimo_Dutti_logo.svg",
  },
  {
    nama: "Bershka",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Bershka_logo.svg",
  },
  {
    nama: "& Other Stories",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/And_Other_Stories_logo.svg",
  },
];

export const KATEGORI_LIST: { nama: Kategori; deskripsi: string }[] = [
  { nama: "Dress", deskripsi: "Midi, maxi, dan gaun pesta" },
  { nama: "Kebaya", deskripsi: "Kebaya modern & tradisional" },
  { nama: "Blazer", deskripsi: "Blazer kerja dan formal" },
  { nama: "Outer", deskripsi: "Cardigan, coat, dan trench" },
  { nama: "Set", deskripsi: "Setelan senada siap pakai" },
  { nama: "Batik", deskripsi: "Batik tulis dan cap premium" },
  { nama: "Suit", deskripsi: "Jas dan tuxedo formal" },
  { nama: "Aksesori", deskripsi: "Tas, selendang, dan pelengkap" },
];

export const UKURAN_LIST = ["XS", "S", "M", "L", "XL", "XXL", "All Size"];

/** Pengaturan jadwal fitting di studio SEWANYA.ID */
export const FITTING = {
  biaya: 50_000,
  durasiSesiMenit: 90,
  batch: [
    {
      id: "batch-1",
      nama: "Batch 1",
      jam: "09.00 – 12.00 WIB",
      deskripsi: "Sesi pagi, cocok untuk fitting sebelum jam kerja.",
    },
    {
      id: "batch-2",
      nama: "Batch 2",
      jam: "13.00 – 18.00 WIB",
      deskripsi: "Sesi siang hingga sore, tersedia setelah jam kantor.",
    },
  ],
} as const;

export const PRODUK_LIST: Produk[] = [
  {
    id: "1",
    slug: "dress-satin-midi-terracotta",
    kode: "SWN-DR-001",
    nama: "Dress Satin Midi Terracotta",
    merek: "Zara",
    kategori: "Dress",
    ukuran: ["S", "M", "L"],
    warna: ["Terracotta", "Hitam"],
    hargaSewa: 385_000,
    deposit: 500_000,
    deskripsi:
      "Dress satin potongan midi dengan siluet A-line yang jatuh sempurna di badan. Pilihan aman untuk acara semi-formal, lamaran, maupun dinner.",
    bahan: "Satin premium dengan lining",
    featured: true,
    rating: 4.9,
    jumlahUlasan: 128,
  },
  {
    id: "2",
    slug: "kebaya-modern-brokat-ivory",
    kode: "SWN-KB-002",
    nama: "Kebaya Modern Brokat Ivory",
    merek: "Mango",
    kategori: "Kebaya",
    ukuran: ["S", "M", "L", "XL"],
    warna: ["Ivory", "Dusty Rose"],
    hargaSewa: 650_000,
    deposit: 750_000,
    deskripsi:
      "Kebaya brokat dengan aksen payet tangan pada bagian lengan. Dilengkapi kain bawahan dan selendang senada.",
    bahan: "Brokat Prancis, payet tangan",
    featured: true,
    rating: 5.0,
    jumlahUlasan: 96,
  },
  {
    id: "3",
    slug: "blazer-oversize-charcoal",
    kode: "SWN-BZ-003",
    nama: "Blazer Oversize Charcoal",
    merek: "COS",
    kategori: "Blazer",
    ukuran: ["S", "M", "L", "XL"],
    warna: ["Charcoal", "Navy"],
    hargaSewa: 320_000,
    deposit: 400_000,
    deskripsi:
      "Blazer oversize dengan bantalan bahu lembut. Cocok dipadukan dengan celana palazzo untuk tampilan kantor yang tegas.",
    bahan: "Wool blend",
    featured: true,
    rating: 4.8,
    jumlahUlasan: 74,
  },
  {
    id: "4",
    slug: "trench-coat-krem-panjang",
    kode: "SWN-OT-004",
    nama: "Trench Coat Krem Panjang",
    merek: "Massimo Dutti",
    kategori: "Outer",
    ukuran: ["M", "L"],
    warna: ["Krem", "Camel"],
    hargaSewa: 475_000,
    deposit: 600_000,
    deskripsi:
      "Trench coat panjang dengan sabuk pinggang dan kancing horn. Memberi kesan editorial pada gaya sehari-hari.",
    bahan: "Gabardine katun",
    featured: true,
    rating: 4.9,
    jumlahUlasan: 51,
  },
  {
    id: "5",
    slug: "setelan-linen-sage",
    kode: "SWN-ST-005",
    nama: "Setelan Linen Sage",
    merek: "H&M",
    kategori: "Set",
    ukuran: ["S", "M", "L"],
    warna: ["Sage", "Off White"],
    hargaSewa: 355_000,
    deposit: 450_000,
    deskripsi:
      "Setelan linen dua potong dengan atasan lengan pendek dan celana wide leg. Ringan untuk acara siang hari.",
    bahan: "Linen 100%",
    featured: true,
    rating: 4.7,
    jumlahUlasan: 63,
  },
  {
    id: "6",
    slug: "batik-tulis-parang-sogan",
    kode: "SWN-BT-006",
    nama: "Batik Tulis Parang Sogan",
    merek: "Uniqlo",
    kategori: "Batik",
    ukuran: ["S", "M", "L", "XL"],
    warna: ["Sogan", "Cokelat"],
    hargaSewa: 295_000,
    deposit: 350_000,
    deskripsi:
      "Kemeja batik tulis motif parang dengan warna sogan klasik. Dibuat oleh perajin lokal Solo.",
    bahan: "Katun primisima",
    featured: true,
    rating: 4.9,
    jumlahUlasan: 88,
  },
  {
    id: "7",
    slug: "tuxedo-hitam-slim-fit",
    kode: "SWN-SU-007",
    nama: "Tuxedo Hitam Slim Fit",
    merek: "Massimo Dutti",
    kategori: "Suit",
    ukuran: ["M", "L", "XL"],
    warna: ["Hitam"],
    hargaSewa: 725_000,
    deposit: 900_000,
    deskripsi:
      "Tuxedo slim fit dengan kerah satin dan celana senada. Termasuk dasi kupu-kupu untuk acara formal malam.",
    bahan: "Wool satin",
    featured: true,
    rating: 5.0,
    jumlahUlasan: 42,
  },
  {
    id: "8",
    slug: "tas-tote-kulit-cokelat",
    kode: "SWN-AK-008",
    nama: "Tas Tote Kulit Cokelat",
    merek: "& Other Stories",
    kategori: "Aksesori",
    ukuran: ["All Size"],
    warna: ["Cokelat", "Hitam"],
    hargaSewa: 180_000,
    deposit: 300_000,
    deskripsi:
      "Tas tote kulit dengan ruang luas dan tali bahu yang nyaman. Pelengkap wajib untuk tampilan kerja.",
    bahan: "Kulit sapi lembut",
    featured: false,
    rating: 4.6,
    jumlahUlasan: 37,
  },
  {
    id: "9",
    slug: "dress-slip-black-tie",
    kode: "SWN-DR-009",
    nama: "Dress Slip Black Tie",
    merek: "Zara",
    kategori: "Dress",
    ukuran: ["XS", "S", "M"],
    warna: ["Hitam"],
    hargaSewa: 340_000,
    deposit: 450_000,
    deskripsi:
      "Dress slip dengan tali spaghetti dan potongan bias cut. Tampil elegan dengan sepatu hak tinggi.",
    bahan: "Satin stretch",
    featured: false,
    rating: 4.8,
    jumlahUlasan: 57,
  },
  {
    id: "10",
    slug: "kebaya-lengan-panjang-gold",
    kode: "SWN-KB-010",
    nama: "Kebaya Lengan Panjang Gold",
    merek: "Mango",
    kategori: "Kebaya",
    ukuran: ["S", "M", "L"],
    warna: ["Gold", "Champagne"],
    hargaSewa: 690_000,
    deposit: 800_000,
    deskripsi:
      "Kebaya lengan panjang dengan bordir emas pada bagian dada. Pilihan favorit untuk acara resepsi.",
    bahan: "Sifon bordir",
    featured: false,
    rating: 4.9,
    jumlahUlasan: 45,
  },
  {
    id: "11",
    slug: "blazer-monokrom-putih",
    kode: "SWN-BZ-011",
    nama: "Blazer Monokrom Putih",
    merek: "COS",
    kategori: "Blazer",
    ukuran: ["S", "M", "L"],
    warna: ["Putih"],
    hargaSewa: 310_000,
    deposit: 400_000,
    deskripsi:
      "Blazer putih dengan kancing satu dan potongan lurus. Bersih dan minimalis untuk foto profil profesional.",
    bahan: "Katun twill",
    featured: false,
    rating: 4.7,
    jumlahUlasan: 29,
  },
  {
    id: "12",
    slug: "cardigan-rajut-oatmeal",
    kode: "SWN-OT-012",
    nama: "Cardigan Rajut Oatmeal",
    merek: "Bershka",
    kategori: "Outer",
    ukuran: ["M", "L", "XL"],
    warna: ["Oatmeal", "Abu"],
    hargaSewa: 195_000,
    deposit: 250_000,
    deskripsi:
      "Cardigan rajut tebal dengan saku depan. Hangat dan tetap rapi untuk kegiatan luar ruang.",
    bahan: "Akrilik rajut",
    featured: false,
    rating: 4.5,
    jumlahUlasan: 33,
  },
  {
    id: "13",
    slug: "setelan-kemeja-celana-navy",
    kode: "SWN-ST-013",
    nama: "Setelan Kemeja & Celana Navy",
    merek: "H&M",
    kategori: "Set",
    ukuran: ["S", "M", "L", "XL"],
    warna: ["Navy"],
    hargaSewa: 365_000,
    deposit: 450_000,
    deskripsi:
      "Setelan navy dengan kemeja lengan panjang dan celana lurus. Serbaguna untuk meeting maupun acara keluarga.",
    bahan: "Katun stretch",
    featured: false,
    rating: 4.7,
    jumlahUlasan: 41,
  },
  {
    id: "14",
    slug: "kemeja-batik-kawung-biru",
    kode: "SWN-BT-014",
    nama: "Kemeja Batik Kawung Biru",
    merek: "Uniqlo",
    kategori: "Batik",
    ukuran: ["M", "L", "XL", "XXL"],
    warna: ["Biru", "Indigo"],
    hargaSewa: 265_000,
    deposit: 350_000,
    deskripsi:
      "Kemeja batik cap motif kawung dengan warna indigo. Terlihat formal tanpa kehilangan sentuhan tradisional.",
    bahan: "Katun cap",
    featured: false,
    rating: 4.8,
    jumlahUlasan: 52,
  },
  {
    id: "15",
    slug: "jas-abu-abu-kerja",
    kode: "SWN-SU-015",
    nama: "Jas Abu-abu Kerja",
    merek: "Massimo Dutti",
    kategori: "Suit",
    ukuran: ["S", "M", "L"],
    warna: ["Abu-abu"],
    hargaSewa: 540_000,
    deposit: 700_000,
    deskripsi:
      "Jas abu-abu dua kancing dengan potongan rapi. Pilihan aman untuk wawancara dan presentasi klien.",
    bahan: "Wool blend",
    featured: false,
    rating: 4.9,
    jumlahUlasan: 38,
  },
  {
    id: "16",
    slug: "selendang-sutra-motif-bunga",
    kode: "SWN-AK-016",
    nama: "Selendang Sutra Motif Bunga",
    merek: "& Other Stories",
    kategori: "Aksesori",
    ukuran: ["All Size"],
    warna: ["Merah", "Ivory"],
    hargaSewa: 150_000,
    deposit: 200_000,
    deskripsi:
      "Selendang sutra dengan cetakan motif bunga. Sentuhan akhir yang mengangkat keseluruhan penampilan.",
    bahan: "Sutra",
    featured: false,
    rating: 4.6,
    jumlahUlasan: 24,
  },
  {
    id: "17",
    slug: "dress-sequin-malam",
    kode: "SWN-DR-017",
    nama: "Dress Sequin Malam",
    merek: "Zara",
    kategori: "Dress",
    ukuran: ["XS", "S", "M"],
    warna: ["Silver", "Hitam"],
    hargaSewa: 520_000,
    deposit: 650_000,
    deskripsi:
      "Dress penuh sequin untuk pesta malam. Berkilau di bawah lampu tanpa terasa berat saat dipakai.",
    bahan: "Sequin berlapis lining",
    featured: false,
    rating: 4.8,
    jumlahUlasan: 61,
  },
  {
    id: "18",
    slug: "setelan-kebaya-pesta-modern",
    kode: "SWN-KB-018",
    nama: "Setelan Kebaya Pesta Modern",
    merek: "Mango",
    kategori: "Kebaya",
    ukuran: ["S", "M", "L"],
    warna: ["Maroon", "Emerald"],
    hargaSewa: 710_000,
    deposit: 850_000,
    deskripsi:
      "Setelan kebaya modern dengan rok lipit dan obi pinggang. Dibuat untuk tampil memukau di pesta pernikahan.",
    bahan: "Crepe premium",
    featured: false,
    rating: 5.0,
    jumlahUlasan: 33,
  },
];

export const PRODUK_FEATURED = PRODUK_LIST.filter((p) => p.featured);

export function getProdukBySlug(slug: string): Produk | undefined {
  return PRODUK_LIST.find((p) => p.slug === slug);
}

export function getProdukByKode(kode: string): Produk | undefined {
  return PRODUK_LIST.find((p) => p.kode === kode);
}

export const HARGA_MIN = Math.min(...PRODUK_LIST.map((p) => p.hargaSewa));
export const HARGA_MAX = Math.max(...PRODUK_LIST.map((p) => p.hargaSewa));

/**
 * Detail pesanan contoh untuk halaman Cek Pesanan.
 * Nilai ini hanya pratinjau tampilan sampai database pesanan terhubung.
 */
export type DetailPesanan = {
  kodePesanan: string;
  nama: string;
  whatsapp: string;
  status: "Menunggu Konfirmasi" | "Terkonfirmasi" | "Selesai";
  tanggalSewa: string;
  tanggalKembali: string;
  fitting?: {
    tanggal: string;
    batch: string;
    biaya: number;
    jadiSewa: boolean;
  };
  items: {
    kodeProduk: string;
    nama: string;
    merek: string;
    ukuran: string;
    durasiHari: number;
    hargaSewa: number;
    deposit: number;
  }[];
};

export const CONTOH_PESANAN: DetailPesanan = {
  kodePesanan: "SWN-2026-0001",
  nama: "Nadira Prameswari",
  whatsapp: "0812-3456-7890",
  status: "Terkonfirmasi",
  tanggalSewa: "2026-11-14",
  tanggalKembali: "2026-11-17",
  fitting: {
    tanggal: "2026-11-09",
    batch: "Batch 2",
    biaya: 50_000,
    jadiSewa: false,
  },
  items: [
    {
      kodeProduk: "SWN-KB-002",
      nama: "Kebaya Modern Brokat Ivory",
      merek: "Mango",
      ukuran: "M",
      durasiHari: 3,
      hargaSewa: 650_000,
      deposit: 750_000,
    },
    {
      kodeProduk: "SWN-AK-016",
      nama: "Selendang Sutra Motif Bunga",
      merek: "& Other Stories",
      ukuran: "All Size",
      durasiHari: 3,
      hargaSewa: 150_000,
      deposit: 200_000,
    },
  ],
};
