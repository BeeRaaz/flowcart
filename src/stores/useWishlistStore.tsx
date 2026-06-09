import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.find((p) => p.id === product.id);
        set({
          items: exists
            ? get().items.filter((p) => p.id !== product.id)
            : [...get().items, product],
        });
      },
      isWishlisted: (productId) => get().items.some((p) => p.id === productId),
    }),
    { name: "flowcart-wishlist" },
  ),
);
