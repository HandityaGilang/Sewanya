import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format angka menjadi Rupiah tanpa dependensi locale (stabil saat SSR & CSR). */
export function rupiah(value: number): string {
  const formatted = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${formatted}`;
}

const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

/** Mengubah tanggal ISO (YYYY-MM-DD) menjadi format Indonesia: 14 November 2026. */
export function formatTanggalIndo(iso: string): string {
  const [tahun, bulan, hari] = iso.split("-").map(Number);
  if (!tahun || !bulan || !hari) return iso;
  return `${hari} ${NAMA_BULAN[bulan - 1]} ${tahun}`;
}

/** Normalisasi nomor WhatsApp Indonesia menjadi format 62xxxxxxxxxx. */
export function normalisasiWhatsapp(input: string): string {
  const angka = input.replace(/\D/g, "");
  if (angka.startsWith("62")) return angka;
  if (angka.startsWith("0")) return `62${angka.slice(1)}`;
  if (angka.startsWith("8")) return `62${angka}`;
  return angka;
}

