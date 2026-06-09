"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, ShoppingBag, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQuickViewStore } from "@/stores/useQuickViewStore";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import Image from "next/image";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function QuickViewModal() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { isOpen, product, closeQuickView } = useQuickViewStore();
  const addItem = useCartStore((s) => s.addItem);
  const toggle = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) =>
    product ? s.isWishlisted(product.id) : false,
  );

  // open animation
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.95, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" },
      );
    }
  }, [isOpen]);

  // close with animation — then actually close
  const handleClose = useCallback(() => {
    document.body.style.overflow = "";
  
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
  
    gsap.to(panelRef.current, {
      opacity: 0,
      scale: 0.96,
      y: 12,
      duration: 0.2,
      ease: "power2.in",
      onComplete: closeQuickView,
    });
  }, [closeQuickView]);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, handleClose]);

  // keep panel mounted during close animation
  // product stays in store until next open so content doesn't flash empty
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={product?.name}
        className="relative z-10 bg-surface rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Close button */}
        <Button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2"
        >
          <X size={18} />
        </Button>

        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="aspect-4/5 relative md:aspect-auto md:min-h-120 bg-accent-light rounded-t-xl md:rounded-l-xl md:rounded-tr-none overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="50vw"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-7 flex flex-col">
              {/* Tag + category */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] text-text-muted uppercase tracking-widest">
                  {product.category}
                </span>
                {product.tag && (
                  <span
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-sm",
                      product.tag === "sale" && "bg-accent text-white",
                      product.tag === "new" && "bg-text-primary text-white",
                      product.tag === "bestseller" &&
                        "bg-accent-light text-accent",
                    )}
                  >
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Name */}
              <h2 className="font-serif text-2xl text-text-primary leading-snug mb-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={cn(
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-border fill-border",
                      )}
                    />
                  ))}
                </div>
                <span className="text-xs text-text-muted">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-medium text-text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs font-medium text-accent">
                    Save{" "}
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100,
                    )}
                    %
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Details list */}
              <ul className="space-y-1.5 mb-7">
                {product.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-text-secondary"
                  >
                    <span className="size-1 rounded-full bg-accent shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>

              {/* Stock */}
              {!product.inStock && (
                <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
                  Out of stock
                </p>
              )}

              {/* Actions — pushed to bottom */}
              <div className="flex gap-3 mt-auto">
                <Button
                  onClick={() => {
                    if (product.inStock) {
                      addItem(product);
                      handleClose();
                    }
                  }}
                  disabled={!product.inStock}
                  fullWidth
                  className="gap-2"
                >
                  <ShoppingBag size={15} />
                  {product.inStock ? "Add to cart" : "Out of stock"}
                </Button>
                <button
                  onClick={() => toggle(product)}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className={cn(
                    "p-3 rounded-md border transition-colors shrink-0 cursor-pointer",
                    isWishlisted
                      ? "border-accent bg-accent-light text-accent"
                      : "border-border text-text-muted hover:border-text-muted hover:text-text-primary",
                  )}
                >
                  <Heart
                    size={16}
                    className={cn(isWishlisted && "fill-accent")}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
