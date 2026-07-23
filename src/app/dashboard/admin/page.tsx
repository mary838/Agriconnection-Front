"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { farmers as farmersApi, orders as ordersApi, farmerName, ApiError, type Farmer, type Order } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const stats = [
  { key: "products",  value: "2,418",  sub: "+126 vs last month", featured: false },
  { key: "customers", value: "8.4k",   sub: "+412 vs last month", featured: false },
  { key: "orders",    value: "3,212",  sub: "+18% vs last month", featured: false },
  { key: "revenue",   value: "$84.2k", sub: "+22% vs last month", featured: true  },
];

const MONTH_LABELS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

type SalesRange = "last3" | "last6" | "year";

function orderTotal(order: Order): number {
  const raw = order as Record<string, unknown>;
  const total =
    (raw.totalAmountUsd as number | string | undefined) ??
    (raw.totalUsd as number | string | undefined) ??
    (raw.amountUsd as number | string | undefined) ??
    0;
  return Number(total) || 0;
}

function buildMonthlySales(orders: Order[], range: SalesRange) {
  const now = new Date();
  const monthsBack = range === "last3" ? 3 : range === "year" ? now.getMonth() + 1 : 6;

  const buckets = Array.from({ length: monthsBack }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1 - i), 1);
    return { key: `${d.getFullYear()}-${d.getMonth()}`, month: MONTH_LABELS[d.getMonth()], value: 0 };
  });
  const bucketByKey = new Map(buckets.map((b) => [b.key, b]));

  orders.forEach((o) => {
    const dateStr = o.createdAt || (o as Record<string, unknown>).placedAt as string | undefined;
    if (!dateStr) return;
    const d = new Date(dateStr);
    const bucket = bucketByKey.get(`${d.getFullYear()}-${d.getMonth()}`);
    if (bucket) bucket.value += orderTotal(o);
  });

  return buckets;
}

function buildTopPerformers(orders: Order[]) {
  const totals = new Map<string, { id: string; name: string; farm: string; total: number }>();

  orders.forEach((order) => {
    order.items?.forEach((item) => {
      const productId = item.productId;
      const name = item.product?.name ?? "";
      const farm = item.farmer ? item.farmer.farmName || farmerName(item.farmer) : item.product?.farmer ? farmerName(item.product.farmer) : "";
      const subtotal = Number(item.subtotalUsd) || 0;

      const existing = totals.get(productId);
      if (existing) {
        existing.total += subtotal;
      } else {
        totals.set(productId, { id: productId, name, farm, total: subtotal });
      }
    });
  });

  const top = Array.from(totals.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);

  const maxTotal = Math.max(1, ...top.map((p) => p.total));

  return top.map((p) => ({
    id: p.id,
    name: p.name,
    farm: p.farm,
    revenue: `$${p.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
    pct: Math.round((p.total / maxTotal) * 100),
  }));
}

export default function AdminDashboard() {
  const { dict } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [salesRange, setSalesRange] = useState<SalesRange>("last6");

  const statLabels: Record<string, string> = {
    products: dict.dashboard.shared.statTotalProducts,
    customers: dict.dashboard.shared.statTotalCustomers,
    orders: dict.dashboard.shared.statTotalOrders,
    revenue: dict.dashboard.shared.statTotalRevenue,
  };

  useEffect(() => {
    farmersApi
      .list()
      .then(setFarmers)
      .catch((err) => setError(err instanceof ApiError ? err.message : dict.dashboard.adminFarmers.failedToLoadFarmers))
      .finally(() => setLoading(false));
  }, [dict]);

  useEffect(() => {
    ordersApi
      .list()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  const salesData = buildMonthlySales(orders, salesRange);
  const maxSales = Math.max(1, ...salesData.map((d) => d.value));
  const topPerformers = buildTopPerformers(orders);

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">
      <AdminSidebar
        active="Overview"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-6 sm:py-10">

          {/* Mobile top bar */}
          <div className="md:hidden flex items-center gap-3 mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-[#4a5568] hover:text-[#1c2b1a] transition-colors"
            >
              <Menu size={22} />
            </button>
            <p className="text-[17px] font-semibold italic text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
              AgriConnect
            </p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mb-1">
              {dict.dashboard.shared.adminConsoleLabel}
            </p>
            <h1 className="text-[28px] sm:text-[38px] font-semibold text-[#1c2b1a] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              {dict.dashboard.adminHome.title}{" "}
              <span className="font-normal italic text-[#7a8a6a]">{dict.dashboard.adminHome.titleSuffix}</span>
            </h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            <div className="rounded-2xl p-4 sm:p-5 flex flex-col gap-2 bg-white border border-[#ede8df]">
              <p className="text-[10px] font-semibold tracking-[0.12em] text-[#9aaa8a]">
                {dict.dashboard.shared.statTotalFarmers}
              </p>
              <p
                className="text-[24px] sm:text-[28px] font-semibold leading-none text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {loading ? "…" : farmers.length}
              </p>
              <p className="text-[11px] font-medium text-[#2d5a1b]">
                {error ? dict.dashboard.adminHome.failedToLoad : dict.dashboard.adminHome.liveCount}
              </p>
            </div>
            {stats.map((s) => (
              <div
                key={s.key}
                className={`rounded-2xl p-4 sm:p-5 flex flex-col gap-2 ${
                  s.featured ? "bg-[#1e3d18]" : "bg-white border border-[#ede8df]"
                }`}
              >
                <p className={`text-[10px] font-semibold tracking-[0.12em] ${s.featured ? "text-white/50" : "text-[#9aaa8a]"}`}>
                  {statLabels[s.key]}
                </p>
                <p
                  className={`text-[24px] sm:text-[28px] font-semibold leading-none ${s.featured ? "text-white" : "text-[#1c2b1a]"}`}
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {s.value}
                </p>
                <p className={`text-[11px] font-medium ${s.featured ? "text-white/60" : "text-[#2d5a1b]"}`}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Chart + Top performers */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 mb-6">

            {/* Bar chart card */}
            <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                    {dict.dashboard.adminHome.monthlySales}
                  </h2>
                  <p className="text-[13px] text-[#9aaa8a]">{dict.dashboard.adminHome.revenueAcrossFarms}</p>
                </div>
                <select
                  value={salesRange}
                  onChange={(e) => setSalesRange(e.target.value as SalesRange)}
                  className="text-[12px] border border-[#e0dbd0] rounded-full px-4 py-1.5 text-[#4a5568] bg-[#faf9f6] focus:outline-none cursor-pointer self-start"
                >
                  <option value="last6">{dict.dashboard.adminHome.last6Months}</option>
                  <option value="last3">{dict.dashboard.adminHome.last3Months}</option>
                  <option value="year">{dict.dashboard.adminHome.thisYear}</option>
                </select>
              </div>

              <div className="flex items-end gap-2 sm:gap-4 h-40 sm:h-44">
                {salesData.map((d, i) => {
                  const isCurrent = i === salesData.length - 1;
                  const barH = Math.round((d.value / maxSales) * 160);
                  return (
                    <div key={d.key} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-medium text-[#7a8a6a]">
                        ${d.value.toFixed(0)}
                      </span>
                      <div
                        className={`w-full rounded-t-lg ${isCurrent ? "bg-[#1e3d18]" : "bg-[#c8e6c0]"}`}
                        style={{ height: `${Math.max(barH, d.value > 0 ? 4 : 0)}px` }}
                      />
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest text-[#9aaa8a]">{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top performers */}
            <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1c2b1a] mb-1" style={{ fontFamily: "Georgia, serif" }}>
                {dict.dashboard.adminHome.topPerformers}
              </h2>
              <p className="text-[12px] text-[#9aaa8a] mb-5">{dict.dashboard.adminHome.bestsellingProducts}</p>

              <div className="flex flex-col gap-5">
                {topPerformers.length === 0 ? (
                  <p className="text-[13px] text-[#9aaa8a]">{dict.dashboard.adminHome.noSalesData}</p>
                ) : (
                  topPerformers.map((p) => (
                    <div key={p.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <p className="text-[14px] font-semibold text-[#1c2b1a]">{p.name}</p>
                          <p className="text-[11px] italic text-[#9aaa8a]">{p.farm}</p>
                        </div>
                        <p className="text-[13px] font-semibold text-[#1c2b1a]">{p.revenue}</p>
                      </div>
                      <div className="h-1.5 bg-[#f0ece4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1e3d18] rounded-full"
                          style={{ width: `${p.pct}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
