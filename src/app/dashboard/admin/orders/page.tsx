"use client";

import { useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { orders as ordersApi, ApiError, type Order } from "@/lib/api";

const STATUS_OPTIONS = ["pending", "paid", "shipped", "delivered", "cancelled"];

function statusBadgeClass(status: string) {
  const s = status.toLowerCase();
  if (s === "delivered") return "bg-[#eaf2e4] text-[#2d5a1b]";
  if (s === "cancelled") return "bg-[#fee2e2] text-[#b91c1c]";
  if (s === "shipped" || s === "paid") return "bg-[#eef2ff] text-[#4338ca]";
  return "bg-[#fef3e2] text-[#b45309]";
}

function orderTotal(order: Order): number | null {
  const raw = order as Record<string, unknown>;
  const total =
    (raw.totalAmountUsd as number | string | undefined) ??
    (raw.totalUsd as number | string | undefined) ??
    (raw.amountUsd as number | string | undefined) ??
    null;
  return total === null ? null : Number(total);
}

function orderCustomerName(order: Order): string {
  const raw = order as Record<string, unknown>;
  const customer = raw.customer as { name?: string } | undefined;
  return customer?.name || "—";
}

function orderPlacedAt(order: Order): string {
  const raw = order as Record<string, unknown>;
  return (raw.placedAt as string | undefined) ?? order.createdAt;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    ordersApi
      .list()
      .then(setOrders)
      .catch((err) => setError(err instanceof ApiError || err instanceof Error ? err.message : "Failed to load orders."))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      setUpdatingId(orderId);
      const updated = await ordersApi.updateStatus(orderId, { status });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, ...updated } : o)));
    } catch (err: unknown) {
      setError(err instanceof ApiError || err instanceof Error ? err.message : "Failed to update order.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      orderCustomerName(o).toLowerCase().includes(q) ||
      (o.destinationAddress || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">
      <AdminSidebar active="Orders" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
              Orders
            </h1>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                  All orders
                </h2>
                <p className="text-[13px] text-[#9aaa8a]">
                  {loading ? "Loading..." : `${orders.length} order${orders.length === 1 ? "" : "s"}`}
                </p>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aaa8a]" />
                <input
                  type="text"
                  placeholder="Search orders"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-[13px] bg-[#faf9f6] border border-[#e0dbd0] rounded-full focus:outline-none focus:border-[#2d5a1b] transition-colors w-52"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#f0ece4]">
                    {["ORDER", "CUSTOMER", "PLACED", "TOTAL", "STATUS"].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold tracking-[0.15em] text-[#9aaa8a] pb-3 pr-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[13px] text-[#9aaa8a]">
                        Loading orders…
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[13px] text-[#9aaa8a]">
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((o) => {
                      const total = orderTotal(o);
                      return (
                        <tr key={o.id} className="border-b border-[#f8f6f2] last:border-0 hover:bg-[#faf9f6] transition-colors">
                          <td className="py-4 pr-4">
                            <p className="text-[14px] font-semibold text-[#1c2b1a]">#{o.id.slice(0, 8)}</p>
                            <p className="text-[12px] text-[#9aaa8a] truncate max-w-[220px]">{o.destinationAddress || "—"}</p>
                          </td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">{orderCustomerName(o)}</td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">
                            {new Date(orderPlacedAt(o)).toLocaleDateString()}
                          </td>
                          <td className="py-4 pr-4 text-[13px] font-semibold text-[#1c2b1a] whitespace-nowrap">
                            {total !== null ? `$${total.toFixed(2)}` : "—"}
                          </td>
                          <td className="py-4 pr-4">
                            <select
                              value={o.status}
                              disabled={updatingId === o.id}
                              onChange={(e) => handleStatusChange(o.id, e.target.value)}
                              className={`text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap capitalize border-0 focus:outline-none disabled:opacity-60 ${statusBadgeClass(
                                o.status
                              )}`}
                            >
                              {!STATUS_OPTIONS.includes(o.status) && <option value={o.status}>{o.status}</option>}
                              {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
