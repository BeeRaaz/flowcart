"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import Container from "../ui/container";
import { ProductCardSkeleton } from "../product/product-card-skeleton";
import { ProductCard } from "../product/product-card";

gsap.registerPlugin(ScrollTrigger);

function ErrorState() {
  return (
    <div className="col-span-full py-20 text-center">
      <p className="text-text-secondary text-sm">
        Failed to load products. Please refresh.
      </p>
    </div>
  );
}

export function FeaturedProducts() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { data: products, isLoading, isError } = useProducts();

  // scroll-triggered stagger reveal
  useEffect(() => {
    if (!products || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".product-card-wrapper");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true, // only fires once — not on scroll back
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [products]); // re-run when products load

  return (
    <section id="products" className="py-24 bg-background">
      <Container>
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent text-xs uppercase tracking-widest mb-2">
              Curated selection
            </p>
            <h2 className="text-4xl text-text-primary">
              Made to be kept
            </h2>
          </div>
          <Link
            href="#"
            className="hidden sm:block text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10"
        >
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}

          {isError && <ErrorState />}

          {products?.map((product) => (
            <div key={product.id} className="relative">
              <div className="product-card-wrapper">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
