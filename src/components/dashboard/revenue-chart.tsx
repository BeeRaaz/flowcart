"use client";

import { revenueData } from "@/data/mock-dashboard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RevenueChart() {
  return (
    <div className="bg-surface rounded-xl border border-border p-6 h-full">
      <div className="mb-6">
        <h2 className="text-sm font-medium text-text-primary">Revenue</h2>
        <p className="text-xs text-text-muted mt-0.5">
          Daily revenue over the last 30 days
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={revenueData}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B85C38" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#B85C38" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E0D9" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#A8A29E" }}
            axisLine={false}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#A8A29E" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              background: "#FFFFFF",
              border: "1px solid #E4E0D9",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={
              ((value: unknown) => [`$${value ?? 0}`, "Revenue"]) as never
            }
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#B85C38"
            strokeWidth={2}
            fill="url(#revenueGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
