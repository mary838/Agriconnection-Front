"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, Plus } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  payouts as payoutsApi,
  farmers as farmersApi,
  ApiError,
  type Payout,
  type Farmer,
} from "@/lib/api";

const STATUS_OPTIONS = ["pending", "paid", "failed"];

function statusBadgeClass(status: string) {
  const s = status.toLowerCase();
  if (s === "paid") return "bg-[#eaf2e4] text-[#2d5a1b]";
  if (s === "failed") return "bg-[#fee2e2] text-[#b91c1c]";
  return "bg-[#fef3e2] text-[#b45309]";
}

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([payoutsApi.list(), farmersApi.list()])
      .then(([payoutsData, farmersData]) => {
        setPayouts(payoutsData);
        setFarmers(farmersData);
      })
      .catch((err) =>
        setError(err instanceof ApiError || err instanceof Error ? err.message : "Failed to load payouts.")
      )
      .finally(() => setLoading(false));
  }, []);

  const farmerLabel = (farmerId: string) => {
    const f = farmers.find((item) => item.id === farmerId);
    return f ? f.farmName || f.farmerCode : farmerId.slice(0, 8);
  };

  const handleStatusChange = async (payoutId: string, status: string) => {
    try {
      setUpdatingId(payoutId);
      const updated = await payoutsApi.updateStatus(payoutId, { status });
      setPayouts((prev) => prev.map((p) => (p.id === payoutId ? { ...p, ...updated } : p)));
    } catch (err: unknown) {
      setError(err instanceof ApiError || err instanceof Error ? err.message : "Failed to update payout.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (payoutId: string) => {
    if (!confirm("Delete this payout? This cannot be undone.")) return;

    try {
      setDeletingId(payoutId);
      await payoutsApi.remove(payoutId);
      setPayouts((prev) => prev.filter((p) => p.id !== payoutId));
    } catch (err: unknown) {
      setError(err instanceof ApiError || err instanceof Error ? err.message : "Failed to delete payout.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPayouts = payouts.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.id.toLowerCase().includes(q) ||
      farmerLabel(p.farmerId).toLowerCase().includes(q) ||
      (p.reference || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">
      <AdminSidebar active="Payouts" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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

          <div className="animate-fade-in-up flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mb-1">
                Admin Console
              </p>
              <h1 className="text-[28px] sm:text-[38px] font-semibold text-[#1c2b1a] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                Payouts
              </h1>
            </div>

            <Link
              href="/dashboard/admin/payouts/new"
              className="inline-flex items-center gap-2 rounded-full bg-[#1e3d18] text-white text-[14px] font-semibold px-6 py-3 hover:bg-[#2d5a1b] active:scale-95 transition-all self-start"
            >
              <Plus size={15} />
              New Payout
            </Link>
          </div>

          {error && (
            <div className="animate-fade-in-up mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="animate-fade-in-up bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6" style={{ animationDelay: "80ms" }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                  All payouts
                </h2>
                <p className="text-[13px] text-[#9aaa8a]">
                  {loading ? "Loading..." : `${payouts.length} payout${payouts.length === 1 ? "" : "s"}`}
                </p>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aaa8a]" />
                <input
                  type="text"
                  placeholder="Search payouts"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-[13px] bg-[#faf9f6] border border-[#e0dbd0] rounded-full focus:outline-none focus:border-[#2d5a1b] transition-colors w-52"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-[#f0ece4]">
                    {["PAYOUT", "FARMER", "DATE", "AMOUNT", "STATUS", ""].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold tracking-[0.15em] text-[#9aaa8a] pb-3 pr-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-[13px] text-[#9aaa8a]">
                        Loading payouts…
                      </td>
                    </tr>
                  ) : filteredPayouts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-[13px] text-[#9aaa8a]">
                        No payouts found.
                      </td>
                    </tr>
                  ) : (
                    filteredPayouts.map((p, i) => (
                      <tr
                        key={p.id}
                        className="animate-fade-in-up border-b border-[#f8f6f2] last:border-0 hover:bg-[#faf9f6] transition-colors"
                        style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
                      >
                        <td className="py-4 pr-4">
                          <p className="text-[14px] font-semibold text-[#1c2b1a]">#{p.id.slice(0, 8)}</p>
                          <p className="text-[12px] text-[#9aaa8a]">{p.reference || "—"}</p>
                        </td>
                        <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">{farmerLabel(p.farmerId)}</td>
                        <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">
                          {new Date(p.payoutDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 pr-4 text-[13px] font-semibold text-[#1c2b1a] whitespace-nowrap">
                          ${Number(p.amountUsd).toFixed(2)}
                          {p.amountKhr ? (
                            <span className="block text-[11px] font-normal text-[#9aaa8a]">
                              ៛{Number(p.amountKhr).toLocaleString()}
                            </span>
                          ) : null}
                        </td>
                        <td className="py-4 pr-4">
                          <select
                            value={p.status}
                            disabled={updatingId === p.id}
                            onChange={(e) => handleStatusChange(p.id, e.target.value)}
                            className={`text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap capitalize border-0 focus:outline-none disabled:opacity-60 ${statusBadgeClass(
                              p.status
                            )}`}
                          >
                            {!STATUS_OPTIONS.includes(p.status) && <option value={p.status}>{p.status}</option>}
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 pr-4">
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deletingId === p.id}
                            className="text-[12px] font-semibold text-red-500 hover:text-red-700 disabled:opacity-60 whitespace-nowrap transition-colors"
                          >
                            {deletingId === p.id ? "Deleting…" : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
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
