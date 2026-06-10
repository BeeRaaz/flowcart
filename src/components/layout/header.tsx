"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import Container from "../ui/container";
import Link from "next/link";
import { Button } from "../ui/button";
import { useHydrated } from "@/hooks/useHydrated";

const navLinks = [
  { label: "Shop", href: "#products" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

function Nav({
  scrolled,
  mobileOpen,
  setMobileOpen,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean | ((p: boolean) => boolean)) => void;
}) {
  const hydrated = useHydrated();

  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <div
      className={cn(
        "bg-background/90 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-sm",
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl text-text-primary tracking-tight"
          >
            Flow<span className="text-accent">Cart</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Wishlist */}
            <Button
              aria-label="Wishlist"
              variant="outline"
              size="sm"
              className="p-2 relative"
            >
              <Heart size={18} />
              {hydrated && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 size-4.5 z-99 rounded-full bg-accent text-white text-[10px] font-medium grid place-items-center">
                  {wishlistCount}
                </span>
              )}
            </Button>

            {/* Cart */}
            <Button
              onClick={openCart}
              aria-label="Open cart"
              variant="outline"
              size="sm"
              className="p-2 relative"
            >
              <ShoppingBag size={18} />
              {hydrated && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 size-4.5 z-99 rounded-full bg-accent text-white text-[10px] font-medium grid place-items-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Button>

            {/* Mobile toggle */}
            <Button
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-border/60 transition-colors cursor-pointer ml-1"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-48 border-t border-border" : "max-h-0",
        )}
      >
        <Container>
          <ul className="py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
}

// at the top of Header.tsx, add this component
function PromoBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="bg-accent text-white text-xs text-center py-2.5 px-4 relative">
      <span>
        Free shipping on orders over <strong>$75</strong> — limited time.{" "}
        <Link
          href="#products"
          className="underline underline-offset-2 font-medium hover:opacity-80 transition-opacity"
        >
          Shop now
        </Link>
      </span>
      <Button
        onClick={onDismiss}
        aria-label="Dismiss banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity cursor-pointer"
      >
        <X size={13} />
      </Button>
    </div>
  );
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // entrance animation — whole header drops in together
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
    );
  }, []);

  // shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 inset-x-0 z-50">
        {showBanner && <PromoBanner onDismiss={() => setShowBanner(false)} />}
        <Nav
          scrolled={scrolled}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </header>
    </>
  );
}
