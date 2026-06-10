"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useQuickViewStore } from "@/stores/useQuickViewStore";
import type { Product } from "@/types";
import Image from "next/image";
import { Button } from "../ui/button";

const tagStyles: Record<NonNullable<Product["tag"]>, string> = {
  new: "bg-text-primary text-white",
  sale: "bg-accent text-white",
  bestseller: "bg-accent-light text-accent",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const openQuickView = useQuickViewStore((s) => s.openQuickView);

  // hover — image scale + actions fade up
  function handleMouseEnter() {
    gsap.to(imageRef.current, {
      visibility: "visible",
      scale: 1.06,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(actionsRef.current, {
      visibility: "visible",
      opacity: 1,
      y: 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }

  function handleMouseLeave() {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.to(actionsRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: "power2.in",
    });
  }

  // add to cart — quick punch animation on the card
  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (!product.inStock) return;
    addItem(product);
    gsap.fromTo(
      cardRef.current,
      { scale: 0.97 },
      { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" },
    );
  }

  function handleWishlist(e: React.MouseEvent) {
    e.stopPropagation();
    toggle(product);
  }

  function handleQuickView(e: React.MouseEvent) {
    e.stopPropagation();
    openQuickView(product);
  }

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => openQuickView(product)}
    >
      {/* Image */}
      <div className="relative aspect-3/4 rounded-lg overflow-hidden bg-accent-light mb-3">
        <Image
          ref={imageRef}
          src={product.image}
          alt={product.name}
          fill
          loading="eager"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="w-full h-full object-cover origin-center"
        />

        {/* Tag badge */}
        {product.tag && (
          <span
            className={cn(
              "absolute top-3 left-3 text-[10px] font-medium uppercase tracking-widest px-2 py-1 rounded-sm",
              tagStyles[product.tag],
            )}
          >
            {product.tag}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-widest">
              Out of stock
            </span>
          </div>
        )}

        {/* Hover actions */}
        <div
          ref={actionsRef}
          className="absolute bottom-3 inset-x-3 flex gap-2 opacity-0 translate-y-2 invisible"
          style={{ transform: "translateY(8px)" }}
        >
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label="Add to cart"
            className="flex-1"
          >
            <ShoppingBag size={13} />
            Add to cart
          </Button>
          <Button
            onClick={handleQuickView}
            aria-label="Quick view"
            size="sm"
            className="p-2"
          >
            <Eye size={14} />
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-xs text-text-muted uppercase tracking-widest">
          {product.category}
        </p>
        <h3 className="text-lg font-medium text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>

      {/* Wishlist — always visible, top right */}
      <Button
        onClick={handleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={cn(
           "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100",
           isWishlisted
             ? "bg-accent text-surface hover:bg-surface hover:text-accent"
             : "bg-surface text-text-primary hover:bg-accent hover:text-surface",
         )}
      >
        <Heart
          size={14}
        />
      </Button>
    </div>
  );
}
