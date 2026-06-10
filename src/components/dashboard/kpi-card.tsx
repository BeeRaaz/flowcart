import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  label: string;
  value: string;
  change: number;
  sub: string;
}

export function KPICard({ label, value, change, sub }: KPICardProps) {
  const positive = change >= 0;

  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <p className="text-xs text-text-muted uppercase tracking-widest mb-3">
        {label}
      </p>
      <p className="font-serif text-3xl text-text-primary mb-2">{value}</p>
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            positive ? "text-green-600" : "text-red-500",
          )}
        >
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {positive ? "+" : ""}
          {change}%
        </span>
        <span className="text-xs text-text-muted">{sub}</span>
      </div>
    </div>
  );
}
