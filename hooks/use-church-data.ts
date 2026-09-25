"use client";

import { useCallback, useEffect, useState } from "react";
import { ChurchData, loadChurchData, saveChurchData } from "@/lib/local-data";

export function useChurchData() {
  const [data, setData] = useState<ChurchData | null>(null);

  useEffect(() => {
    const sync = () => setData(loadChurchData());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("church-data-change", sync as EventListener);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("church-data-change", sync as EventListener);
    };
  }, []);

  const update = useCallback((updater: (current: ChurchData) => ChurchData) => {
    setData(current => {
      const base = current ?? loadChurchData();
      const next = updater(base);
      saveChurchData(next);
      return next;
    });
  }, []);

  return { data, update, ready: data !== null };
}
