"use client";

import { useSyncExternalStore } from "react";

function tanpaLangganan() {
  return () => {};
}

/**
 * Tahun berjalan dibaca di klien melalui useSyncExternalStore agar nilai
 * dinamis `new Date()` tidak memblokir prerender statis di server.
 */
export function TahunBerjalan() {
  const tahun = useSyncExternalStore(
    tanpaLangganan,
    () => new Date().getFullYear(),
    () => 2026,
  );

  return <>{tahun}</>;
}
