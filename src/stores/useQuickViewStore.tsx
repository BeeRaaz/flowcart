import { create } from "zustand";
import type { Product } from "@/types";

interface QuickViewStore {
  isOpen: boolean;
  product: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useQuickViewStore = create<QuickViewStore>((set) => ({
  isOpen: false,
  product: null,
  openQuickView: (product) => set({ isOpen: true, product }),
  closeQuickView: () => set({ isOpen: false }),
  // product stays in state until next open — prevents
  // content flashing to empty during close animation
}));
