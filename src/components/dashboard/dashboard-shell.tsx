"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { KPICard } from "./kpi-card";
import { RevenueChart } from "./revenue-chart";
import { OrdersTable } from "./orders-table";
import { kpis, orders } from "@/data/mock-dashboard";

export function DashboardShell() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-1.5">
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={14} />
                Back to store
              </Link>
              <span className="text-border">|</span>
              <span className="font-serif text-lg text-text-primary">
                Flow<span className="text-accent">Cart</span>
              </span>
            </div>
            <span className="text-xs text-text-muted uppercase tracking-widest text-right">
              Admin dashboard
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-text-primary mb-1">
            Overview
          </h1>
          <p className="text-sm text-text-muted">
            Last 30 days · All data is mock
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map((kpi) => (
            <KPICard key={kpi.label} {...kpi} />
          ))}
        </div>

        {/* Chart + table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <OrdersTable orders={orders.slice(0, 6)} />
          </div>
        </div>
      </div>
    </div>
  );
}