export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
  { href: "/fitting", label: "Jadwal Fitting" },
  { href: "/cek-pesanan", label: "Cek Pesanan" },
  { href: "/syarat-ketentuan", label: "Syarat & Ketentuan" },
];

export const SITE = {
  nama: "SEWANYA.ID",
  tagline: "Sewa fashion premium, tampil tanpa harus memiliki.",
  whatsapp: "+62 812-9000-1122",
  whatsappLink:
    "https://wa.me/6281290001122?text=Halo%20SEWANYA.ID%2C%20saya%20ingin%20bertanya%20tentang%20sewa%20fashion.",
  email: "halo@sewanya.id",
  alamat: "Jl. Kemang Raya No. 24, Jakarta Selatan",
  jamOperasional: "Setiap hari, 09.00 – 18.00 WIB",
  instagram: "https://instagram.com/sewanya.id",
};
