import { CartDrawer } from "@/components/cart/cart-drawer";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { QuickViewModal } from "@/components/product/quick-view-modal";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <CartDrawer />
      <QuickViewModal />
    </>
  );
}
