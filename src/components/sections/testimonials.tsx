"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";
import { useReviews } from "@/hooks/useReviews";
import type { Review } from "@/types";
import Image from "next/image";
import Container from "../ui/container";

gsap.registerPlugin(ScrollTrigger);

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className={
            i < rating ? "fill-accent text-accent" : "fill-border text-border"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({ review }: { review: Review }) {
  return (
    <div className="testimonial-card bg-surface rounded-xl p-6 flex flex-col gap-4 border border-border">
      <Stars rating={review.rating} />

      <p className="text-sm text-text-secondary leading-relaxed flex-1">
        {review.text}
      </p>

      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <Image
          src={review.avatar}
          alt={review.name}
          width={80}
          height={80}
          className="size-8 rounded-full bg-accent-light object-cover object-top"
        />
        <div>
          <p className="text-xs font-medium text-text-primary">{review.name}</p>
          <p className="text-[11px] text-text-muted">
            {review.location} · {review.productName}
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="animate-pulse bg-surface rounded-xl p-6 border border-border space-y-3">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="size-2.5 rounded-full bg-border" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-border rounded w-full" />
        <div className="h-3 bg-border rounded w-5/6" />
        <div className="h-3 bg-border rounded w-3/4" />
      </div>
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div className="size-8 rounded-full bg-border" />
        <div className="space-y-1.5">
          <div className="h-2.5 bg-border rounded w-20" />
          <div className="h-2 bg-border rounded w-32" />
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: reviews, isLoading } = useReviews();

  useEffect(() => {
    if (!reviews || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(".testimonial-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [reviews]);

  return (
    <section id="testimonials" className="py-24 bg-accent-light/40">
      <Container>
        <div className="text-center mb-12">
          <p className="text-accent text-xs uppercase tracking-widest mb-2">
            Don&apos;t take our word for it
          </p>
          <h2 className="text-4xl text-text-primary">
            Loved by real people
          </h2>
        </div>

        <div ref={sectionRef}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <TestimonialSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews?.map((review) => (
                <TestimonialCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
