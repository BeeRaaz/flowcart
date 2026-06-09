import { FeaturedProducts } from "@/components/sections/featured-products";
import Hero from "@/components/sections/hero";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";

export default function StorePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <FAQ />
    </>
  );
}
