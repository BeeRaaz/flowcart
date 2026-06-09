import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FlowCart — Objects that earn their place",
    template: "%s | FlowCart",
  },
  description:
    "FlowCart curates fewer, better things — built to last and designed to fit the life you actually live.",
  keywords: ["lifestyle", "home goods", "minimalist", "curated"],
  openGraph: {
    title: "FlowCart",
    description: "Fewer, better things.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main" className="sr-only focus-visible:not-sr-only">
          Skip to Main
        </a>
        <div id="wrapper" className="w-full relative overflow-clip">
          <Providers>{children}</Providers>
        </div>
        <a href="#wrapper" className="sr-only focus-visible:not-sr-only">
          Back to Top
        </a>
      </body>
    </html>
  );
}
