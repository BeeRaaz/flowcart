"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const links = {
  Shop: [
    { label: "New arrivals", href: "#products" },
    { label: "Best sellers", href: "#products" },
    { label: "Home & living", href: "#products" },
    { label: "Apparel", href: "#products" },
    { label: "Accessories", href: "#products" },
  ],
  Help: [
    { label: "FAQ", href: "#faq" },
    { label: "Shipping & returns", href: "#faq" },
    { label: "Order tracking", href: "#" },
    { label: "Contact us", href: "#" },
    { label: "Size guide", href: "#" },
  ],
  Company: [
    { label: "Our story", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Dashboard", href: "/dashboard" },
  ],
};

const socials = [
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTwitter, label: "Twitter / X", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!email || submitted) return;
    setLoading(true);
    // simulate async submission
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="bg-text-primary text-text-inverted">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <Container>
          <div className="py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl text-white mb-1">
                Stay in the loop
              </h3>
              <p className="text-sm text-white/50">
                New arrivals, restocks, and stories — no noise.
              </p>
            </div>

            {submitted ? (
              <div className="flex items-center gap-2 text-sm text-accent-muted font-medium">
                <span className="size-5 rounded-full bg-accent/20 flex items-center justify-center">
                  ✓
                </span>
                You&apos;re on the list. Talk soon.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-0 w-full md:w-auto md:min-w-95"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={cn(
                    "flex-1 h-11 px-4 text-sm bg-white/8 border border-white/15",
                    "text-white placeholder:text-white/35",
                    "focus:outline-none focus:border-accent focus:bg-white/12",
                    "transition-colors",
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "h-11 px-5 rounded-none",
                    "flex items-center gap-2 shrink-0",
                    "transition-colors disabled:opacity-60 cursor-pointer",
                  )}
                >
                  {loading ? (
                    <span className="size-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={14} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </div>

      {/* Main links grid */}
      <Container>
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl text-white tracking-tight block mb-4"
            >
              Flow<span className="text-accent">Cart</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-55">
              Fewer, better things. Built to last and designed to fit the life
              you actually live.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="size-8 rounded-md bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
            <p>© {new Date().getFullYear()} FlowCart. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-white/60 transition-colors">
                Privacy policy
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Terms of use
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Cookie settings
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
