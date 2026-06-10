import { Order } from "@/data/mock-dashboard";
import { cn } from "@/lib/utils";

const statusStyles: Record<Order["status"], string> = {
  delivered: "bg-green-50 text-green-700",
  shipped:   "bg-blue-50 text-blue-700",
  pending:   "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-600",
};

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 h-full">
      <div className="mb-5">
        <h2 className="text-sm font-medium text-text-primary">
          Recent orders
        </h2>
        <p className="text-xs text-text-muted mt-0.5">Latest 6 transactions</p>
      </div>
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">
                {order.customer}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5">{order.id}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-3">
              <span className="text-xs font-medium text-text-primary">
                ${order.total}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-full capitalize",
                  statusStyles[order.status],
                )}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}