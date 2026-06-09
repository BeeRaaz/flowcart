"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFAQs } from "@/hooks/useFAQs";
import type { FAQ } from "@/types";
import { Button } from "../ui/button";
import Container from "../ui/container";

function FAQSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-5 border-b border-border">
          <div className="h-4 bg-border rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

function FAQItem({ faq }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  function toggle() {
    const body = bodyRef.current;
    if (!body) return;

    if (!isOpen) {
      // opening — measure then animate
      body.style.display = "block";
      const height = body.scrollHeight;
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        {
          height,
          opacity: 1,
          duration: 0.35,
          ease: "power3.out",
          onComplete: () => {
            body.style.height = "auto";
          },
        },
      );
      gsap.to(iconRef.current, {
        rotate: 45,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // closing
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          body.style.display = "none";
        },
      });
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }

    setIsOpen((p) => !p);
  }

  return (
    <div className="border-b border-border last:border-0">
      <Button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
        aria-expanded={isOpen}
        variant="ghost"
      >
        <span className={cn("font-medium transition-colors")}>
          {faq.question}
        </span>
        <Plus
          ref={iconRef}
          size={16}
          className={cn("shrink-0 transition-colors")}
        />
      </Button>

      <div
        ref={bodyRef}
        style={{ display: "none", height: 0, overflow: "hidden" }}
      >
        <div className="px-5 py-3">
          <p className="text-sm text-text-secondary leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const { data: faqs, isLoading } = useFAQs();

  return (
    <section id="faq" className="py-24 bg-background">
      <Container narrow>
        <div className="text-center mb-12">
          <p className="text-accent text-xs uppercase tracking-widest mb-2">
            Got questions
          </p>
          <h2 className="text-4xl text-text-primary">
            We have answers
          </h2>
        </div>

        {isLoading ? (
          <FAQSkeleton />
        ) : (
          <div>
            {faqs?.map((faq, i) => (
              <FAQItem key={faq.id} faq={faq} index={i} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
