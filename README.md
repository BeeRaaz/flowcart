# FlowCart

A responsive e-commerce landing page built for the Yatri Motorcycles Frontend Engineer assessment.

**Live demo:** [flowcart-self.vercel.app](https://flowcart-self.vercel.app/)  
**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · GSAP · TanStack Query · Zustand

---

## Setup

\`\`\`bash
# Clone the repository
git clone https://github.com/BeeRaaz/flowcart.git
cd flowcart

# Install dependencies
pnpm install

# Start the development server
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

> Requires Node.js 18+ and pnpm. Install pnpm with `npm i -g pnpm` if needed.

---

## GSAP usage

| Component | Animation |
|-----------|-----------|
| `Header` | Full header drops in on load |
| `Hero` | Background image scale + text/CTA stagger on load |
| `FeaturedProducts` | Scroll-triggered card reveal with stagger (ScrollTrigger) |
| `ProductCard` | Image scale + action overlay fade on hover |
| `QuickViewModal` | Scale + fade on open, reverse on close |
| `CartDrawer` | Slides in from right on open, out on close |
| `FAQ` | Height + opacity tween on accordion expand/collapse |
| `Testimonials` | Scroll-triggered stagger reveal |

---

## TanStack Query usage

| Hook | Endpoint | Used in | Stale time |
|------|----------|---------|------------|
| `useProducts` | `/api/products` | `FeaturedProducts` | 5 min |
| `useFAQs` | `/api/faqs` | `FAQ` | 5 min |
| `useReviews` | `/api/reviews` | `Testimonials` | 5 min |

All endpoints simulate 600ms network latency so loading skeletons are visible on first load.

---

## State management

| Store | What it manages | Persisted |
|-------|----------------|-----------|
| `useCartStore` | Cart items, quantities, totals, drawer open state | Yes — localStorage |
| `useQuickViewStore` | Active product, modal open state | No |
| `useWishlistStore` | Wishlisted product IDs | Yes — localStorage |

Cart and wishlist survive page refresh via Zustand `persist` middleware.

---

## Design decision I'm proud of

FlowCart is positioned as an editorial lifestyle brand rather than a generic e-commerce template. The typography pairs Playfair Display (serif) for headings with Inter for body copy, creating an intentional editorial feel. The accent color runs consistently through badges, CTAs, the promo banner, and hover states to build a coherent brand identity. Products and testimonials use TanStack Query loading skeletons that transition into scroll-triggered GSAP stagger animations, giving the page a layered, purposeful feel. The dark footer anchors the page and creates natural visual closure against the warm off-white background.

---

## What I'd improve with more time

Add product detail pages (`/products/[slug]`) with full image galleries and related products. Implement optimistic UI on cart mutations. Replace mock API routes with a real database (Supabase) and add authentication for the dashboard page. Add tests for critical flows like checkout.