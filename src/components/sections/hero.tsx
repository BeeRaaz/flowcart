"use client";

import { useEffect, useRef } from "react";
import Container from "../ui/container";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "../ui/button";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, subRef.current, ctaRef.current],
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
        },
      );
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out", delay: 0.2 },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-[92vh] flex items-center bg-background pt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <div>
            <h1
              ref={headingRef}
              className="text-5xl lg:text-7xl text-text-primary leading-[1.08] mb-6"
            >
              Objects that
              <br />
              <span className="text-accent">earn their place.</span>
            </h1>
            <p
              ref={subRef}
              className="text-text-secondary text-lg leading-relaxed mb-10 max-w-md"
            >
              FlowCart curates fewer, better things — built to last and designed
              to fit the life you actually live.
            </p>
            <div ref={ctaRef} className="flex items-center gap-4">
              <Button size="lg">Shop the edit</Button>
              <Button size="lg" variant="ghost">
                Our story →
              </Button>
            </div>
          </div>

          {/* Right — image */}
          <div
            ref={imageRef}
            className="relative aspect-4/5 rounded-xl overflow-hidden bg-accent-light"
          >
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?"
              alt="FlowCart curated lifestyle products"
              fill
              sizes="(max-width: 768px) 100vh, 50vw"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Floating stat badge */}
            <div className="absolute bottom-6 left-6 bg-surface/90 backdrop-blur-sm rounded-lg px-4 py-3">
              <p className="text-xs text-text-muted uppercase tracking-widest mb-0.5">
                trusted by
              </p>
              <p className="text-text-primary font-medium text-sm">
                12,400+ customers
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
