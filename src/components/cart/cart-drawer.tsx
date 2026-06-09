"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { Button } from "../ui/button";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function EmptyCart() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-16 text-center px-6">
      <div className="size-16 rounded-full bg-accent-light flex items-center justify-center">
        <ShoppingBag size={24} className="text-accent" />
      </div>
      <div>
        <p className="text-sm font-medium text-text-primary mb-1">
          Your cart is empty
        </p>
        <p className="text-xs text-text-muted">
          Add something you love to get started.
        </p>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

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
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.35, ease: "power3.out" },
      );
    }
  }, [isOpen]);

  function handleClose() {
    document.body.style.overflow = "";

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(drawerRef.current, {
      x: "100%",
      duration: 0.3,
      ease: "power3.in",
      onComplete: closeCart,
    });
  }

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  if (!isOpen) return null;

  const count = totalItems();
  const total = totalPrice();
  const FREE_SHIPPING_THRESHOLD = 75;
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  return (
    <div className="fixed inset-0 z-60 flex">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm"
      />

      {/* Drawer — slides in from right */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 inset-y-0 w-full max-w-md bg-surface shadow-2xl flex flex-col"
        style={{ transform: "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-text-primary" />
            <h2 className="font-medium text-text-primary text-sm">
              Cart
              {count > 0 && (
                <span className="ml-2 text-text-muted font-normal">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <Button
                onClick={clearCart}
                variant="ghost"
              >
                Clear all
              </Button>
            )}
            <Button
              onClick={handleClose}
              aria-label="Close cart"
              variant="outline"
              size="sm"
              className="p-2"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Free shipping progress */}
        {total > 0 && (
          <div className="px-6 py-3 bg-accent-light border-b border-border/50">
            {remaining > 0 ? (
              <p className="text-xs text-accent">
                Add <strong>{formatPrice(remaining)}</strong> more for free
                shipping
              </p>
            ) : (
              <p className="text-xs text-accent font-medium">
                You qualify for free shipping!
              </p>
            )}
            <div className="mt-2 h-1 bg-accent/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <ul className="space-y-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="size-20 relative shrink-0 rounded-md overflow-hidden bg-accent-light">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="30vw"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-muted uppercase tracking-widest mb-0.5">
                      {product.category}
                    </p>
                    <p className="text-sm font-medium text-text-primary leading-snug truncate mb-2">
                      {product.name}
                    </p>

                    {/* Quantity + remove */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 border border-border rounded-md">
                        <Button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          variant="ghost"
                          size="sm"
                          className="p-2"
                        >
                          <Minus size={12} />
                        </Button>
                        <span className="text-xs font-medium text-text-primary w-6 text-center">
                          {quantity}
                        </span>
                        <Button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          aria-label="Increase quantity"
                          variant="ghost"
                          size="sm"
                          className="p-2"
                        >
                          <Plus size={12} />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-text-primary">
                          {formatPrice(product.price * quantity)}
                        </span>
                        <Button
                          onClick={() => removeItem(product.id)}
                          aria-label="Remove item"
                          variant="outline"
                          size="sm"
                          className="p-2"
                        >
                          <Trash2 size={13} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Subtotal</span>
              <span className="text-sm font-medium text-text-primary">
                {formatPrice(total)}
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Taxes and shipping calculated at checkout.
            </p>
            <Button fullWidth size="lg">
              Checkout — {formatPrice(total)}
            </Button>
            <Button
              onClick={handleClose}
              fullWidth
              variant="secondary"
            >
              Continue shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
