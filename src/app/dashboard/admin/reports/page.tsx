"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  farmers as farmersApi,
  products as productsApi,
  orders as ordersApi,
  payouts as payoutsApi,
  ApiError,
  categoryName,
  type Farmer,
  type Product,
  type Order,
  type Payout,
} from "@/lib/api";

function orderTotal(order: Order): number {
  const raw = order as Record<string, unknown>;
  const total =
    (raw.totalAmountUsd as number | string | undefined) ??
    (raw.totalUsd as number | string | undefined) ??
    (raw.amountUsd as number | string | undefined) ??
    0;
  return Number(total) || 0;
}

export default function AdminReportsPage() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [farmersData, productsData, ordersData] = await Promise.all([
          farmersApi.list(),
          productsApi.list(),
          ordersApi.list(),
        ]);
        setFarmers(farmersData);
        setProducts(productsData);
        setOrders(ordersData);

        try {
          setPayouts(await payoutsApi.list());
        } catch {
          setPayouts([]);
        }
      } catch (err: unknown) {
        setError(err instanceof ApiError || err instanceof Error ? err.message : "Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + orderTotal(o), 0);
  const totalPayouts = payouts.reduce((sum, p) => sum + Number(p.amountUsd || 0), 0);

  const ordersByStatus = orders.reduce<Record<string, number>>((acc, o) => {
    const status = o.status || "unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const productsByCategory = products.reduce<Record<string, number>>((acc, p) => {
    const name = categoryName(p.category) || "Uncategorized";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
  const topCategories = Object.entries(productsByCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const maxCategoryCount = Math.max(1, ...topCategories.map(([, count]) => count));

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">
      <AdminSidebar active="Reports" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="md:hidden flex items-center gap-3 mb-6">
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-[#4a5568] hover:text-[#1c2b1a] transition-colors">
              <Menu size={22} />
            </button>
            <p className="text-[17px] font-semibold italic text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
              AgriConnect
            </p>
          </div>

          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mb-1">
              Admin Console
            </p>
            <h1 className="text-[28px] sm:text-[38px] font-semibold text-[#1c2b1a] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Reports
            </h1>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatCard label="TOTAL FARMERS" value={loading ? "…" : String(farmers.length)} />
            <StatCard label="TOTAL PRODUCTS" value={loading ? "…" : String(products.length)} />
            <StatCard label="TOTAL ORDERS" value={loading ? "…" : String(orders.length)} />
            <StatCard label="TOTAL REVENUE" value={loading ? "…" : `$${totalRevenue.toFixed(2)}`} featured />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1c2b1a] mb-1" style={{ fontFamily: "Georgia, serif" }}>
                Orders by status
              </h2>
              <p className="text-[12px] text-[#9aaa8a] mb-5">Breakdown across the platform</p>

              {Object.keys(ordersByStatus).length === 0 ? (
                <p className="text-[13px] text-[#9aaa8a] py-4 text-center">No orders yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {Object.entries(ordersByStatus).map(([status, count]) => (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[13px] font-medium text-[#1c2b1a] capitalize">{status}</p>
                        <p className="text-[13px] font-semibold text-[#1c2b1a]">{count}</p>
                      </div>
                      <div className="h-1.5 bg-[#f0ece4] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#1e3d18] rounded-full"
                          style={{ width: `${(count / orders.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
              <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1c2b1a] mb-1" style={{ fontFamily: "Georgia, serif" }}>
                Top categories
              </h2>
              <p className="text-[12px] text-[#9aaa8a] mb-5">Products listed by category</p>

              {topCategories.length === 0 ? (
                <p className="text-[13px] text-[#9aaa8a] py-4 text-center">No products yet.</p>
              ) : (
                <div className="flex items-end gap-2 sm:gap-4 h-40">
                  {topCategories.map(([name, count]) => (
                    <div key={name} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-medium text-[#7a8a6a]">{count}</span>
                      <div
                        className="w-full rounded-t-lg bg-[#c8e6c0]"
                        style={{ height: `${Math.round((count / maxCategoryCount) * 120)}px` }}
                      />
                      <span className="text-[9px] sm:text-[10px] font-semibold tracking-wide text-[#9aaa8a] capitalize text-center leading-tight">
                        {name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1c2b1a] mb-1" style={{ fontFamily: "Georgia, serif" }}>
              Farmer payouts
            </h2>
            <p className="text-[12px] text-[#9aaa8a] mb-5">Total disbursed to growers</p>
            <p className="text-[28px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
              ${totalPayouts.toFixed(2)}
            </p>
            <p className="text-[12px] text-[#9aaa8a] mt-1">
              across {payouts.length} payout{payouts.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, featured }: { label: string; value: string; featured?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 sm:p-5 flex flex-col gap-2 ${featured ? "bg-[#1e3d18]" : "bg-white border border-[#ede8df]"}`}>
      <p className={`text-[10px] font-semibold tracking-[0.12em] ${featured ? "text-white/50" : "text-[#9aaa8a]"}`}>
        {label}
      </p>
      <p
        className={`text-[24px] sm:text-[28px] font-semibold leading-none ${featured ? "text-white" : "text-[#1c2b1a]"}`}
        style={{ fontFamily: "Georgia, serif" }}
      >
        {value}
      </p>
    </div>
  );
}
