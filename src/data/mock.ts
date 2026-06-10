import { FAQ, Product, Review } from "@/types";

// DELAY TIME
export const DELAY = 600; // 600ms

// Products

export const products: Product[] = [
  {
    id: "p1",
    name: "Linen Throw Pillow — Dune",
    price: 48,
    category: "home",
    tag: "bestseller",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    ],
    description:
      "A textured linen pillow in warm dune — pairs effortlessly with neutral interiors.",
    details: [
      "100% European linen",
      "18×18 inch insert included",
      "Machine washable cover",
      "Hidden zip closure",
    ],
    rating: 4.8,
    reviewCount: 214,
    inStock: true,
  },
  {
    id: "p2",
    name: "Ceramic Pour-Over Set",
    price: 72,
    originalPrice: 95,
    category: "home",
    tag: "sale",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=600&q=80",
    ],
    description:
      "Hand-thrown ceramic dripper and server. Brew slowly, taste fully.",
    details: [
      "Food-safe glaze",
      "Fits 1–4 cups",
      "Dishwasher safe",
      "Includes stainless filter",
    ],
    rating: 4.9,
    reviewCount: 98,
    inStock: true,
  },
  {
    id: "p3",
    name: "Merino Wool Overshirt",
    price: 138,
    category: "apparel",
    tag: "new",
    image:
      "https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1588099768531-a72d4a198538?w=600&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4869?w=600&q=80",
    ],
    description:
      "Lightweight 150gsm merino. Wears as a shirt in summer, a layer in winter.",
    details: [
      "100% Merino wool",
      "Relaxed fit",
      "Sizes XS–XXL",
      "Hand wash cold",
    ],
    rating: 4.7,
    reviewCount: 61,
    inStock: true,
  },
  {
    id: "p4",
    name: "Leather Card Wallet",
    price: 55,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    ],
    description:
      "Slim full-grain leather wallet. Holds 6 cards and folds flat in any pocket.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Ages with use",
      "6 card slots",
      "3.5 × 4 inches flat",
    ],
    rating: 4.6,
    reviewCount: 183,
    inStock: true,
  },
  {
    id: "p5",
    name: "Soy Candle — Cedar + Amber",
    price: 34,
    category: "wellness",
    tag: "bestseller",
    image:
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80",
    ],
    description:
      "Hand-poured soy wax with a cedar and amber scent profile. 50-hour burn.",
    details: [
      "100% soy wax",
      "Cotton wick",
      "8oz glass vessel",
      "Phthalate-free fragrance",
    ],
    rating: 4.9,
    reviewCount: 412,
    inStock: true,
  },
  {
    id: "p6",
    name: "Ribbed Cotton Tee — Chalk",
    price: 42,
    originalPrice: 56,
    category: "apparel",
    tag: "sale",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    ],
    description:
      "A heavyweight 240gsm ribbed tee with structure. The kind you keep forever.",
    details: ["240gsm ribbed cotton", "Boxy fit", "Pre-washed", "Sizes XS–XL"],
    rating: 4.5,
    reviewCount: 77,
    inStock: true,
  },
  {
    id: "p7",
    name: "Brass Desk Lamp",
    price: 165,
    category: "home",
    tag: "new",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    ],
    description:
      "Solid brass with a white fabric shade. Adjustable arm, inline dimmer switch.",
    details: [
      "Solid brass body",
      "E27 bulb socket",
      "40W max",
      "Cord: 180cm cotton braided",
    ],
    rating: 4.8,
    reviewCount: 29,
    inStock: false,
  },
  {
    id: "p8",
    name: "Canvas Tote — Natural",
    price: 28,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    ],
    description:
      "12oz waxed canvas with leather base. Gets better with every use.",
    details: [
      "12oz canvas",
      "Leather bottom",
      "Interior zip pocket",
      "38cm handles",
    ],
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
  },
];

// FAQs

export const faqs: FAQ[] = [
  {
    id: "f1",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3–5 business days within the US. Express (1–2 days) is available at checkout. International orders typically arrive in 7–14 business days depending on destination.",
  },
  {
    id: "f2",
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery. Items must be unused and in original packaging. Start a return from your order page — we'll email a prepaid label within 24 hours.",
  },
  {
    id: "f3",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to 40+ countries. International orders over $150 qualify for free shipping. Duties and taxes may apply at customs and are the responsibility of the recipient.",
  },
  {
    id: "f4",
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 2 hours of placement. After that, your order enters our fulfilment queue and cannot be changed. Contact support immediately if you need help.",
  },
  {
    id: "f5",
    question: "Are your products sustainably sourced?",
    answer:
      "We work exclusively with suppliers who meet our material standards. All textiles are OEKO-TEX certified. Our packaging is 100% recycled and plastic-free. We publish a full supplier list on our sustainability page.",
  },
  {
    id: "f6",
    question: "How do I care for linen and merino items?",
    answer:
      "Linen: machine wash cold, tumble dry low, iron while damp. Merino: hand wash or machine wool cycle, lay flat to dry — never tumble. Both fabrics soften with each wash.",
  },
];

// Reviews

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Mara L.",
    location: "Portland, OR",
    rating: 5,
    text: "The pour-over set changed my morning routine. The ceramic feels substantial and the brew clarity is noticeably better than my old plastic dripper.",
    productName: "Ceramic Pour-Over Set",
    date: "2025-03-12",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: "r2",
    name: "James K.",
    location: "London, UK",
    rating: 5,
    text: "Bought the merino overshirt in slate. It's been my go-to for three months — office, weekends, flights. Holds its shape and zero pilling so far.",
    productName: "Merino Wool Overshirt",
    date: "2025-04-02",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    id: "r3",
    name: "Soo-Yeon P.",
    location: "Toronto, CA",
    rating: 4,
    text: "The linen pillow covers are exactly the texture I wanted — not too stiff, not limp. Colour is very accurate to the photos. Quick shipping too.",
    productName: "Linen Throw Pillow",
    date: "2025-04-18",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: "r4",
    name: "Rafael M.",
    location: "São Paulo, BR",
    rating: 5,
    text: "Cedar + Amber candle fills the whole room without being overwhelming. Already on my third order. The glass vessel is beautiful enough to keep after.",
    productName: "Soy Candle — Cedar + Amber",
    date: "2025-05-01",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
  },
  {
    id: "r5",
    name: "Nina W.",
    location: "Berlin, DE",
    rating: 5,
    text: "The leather wallet arrived beautifully packaged. It's slim, the leather is genuine quality, and it fits in my front pocket without a bulge. Exactly what I wanted.",
    productName: "Leather Card Wallet",
    date: "2025-05-14",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    id: "r6",
    name: "Tom H.",
    location: "Melbourne, AU",
    rating: 4,
    text: "Canvas tote is well made and the waxed finish repels water better than expected. The leather bottom is a nice touch. Gets admiring looks everywhere.",
    productName: "Canvas Tote — Natural",
    date: "2025-05-22",
    avatar:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&q=80",
  },
];