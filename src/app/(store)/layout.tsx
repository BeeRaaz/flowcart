import { CartDrawer } from "@/components/cart/cart-drawer";
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
      <CartDrawer />
      <QuickViewModal />
    </>
  );
}
