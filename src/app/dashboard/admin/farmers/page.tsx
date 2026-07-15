"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, CheckCircle, Clock, XCircle } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { farmers as farmersApi, ApiError, type Farmer } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  VERIFIED: { color: "bg-[#eaf2e4] text-[#2d5a1b]", icon: <CheckCircle size={11} className="text-[#2d5a1b]" /> },
  ACTIVE: { color: "bg-[#eaf2e4] text-[#2d5a1b]", icon: <CheckCircle size={11} className="text-[#2d5a1b]" /> },
  PENDING: { color: "bg-[#fef3e2] text-[#b45309]", icon: <Clock size={11} className="text-[#b45309]" /> },
  SUSPENDED: { color: "bg-[#fee2e2] text-[#b91c1c]", icon: <XCircle size={11} className="text-[#b91c1c]" /> },
  REJECTED: { color: "bg-[#fee2e2] text-[#b91c1c]", icon: <XCircle size={11} className="text-[#b91c1c]" /> },
};

const defaultStatusStyle = { color: "bg-[#f0ece4] text-[#5a6a52]", icon: <Clock size={11} className="text-[#5a6a52]" /> };

const FILTERS = ["All", "Verified", "Pending", "Suspended"];

export default function AdminFarmersPage() {
  const { dict } = useLanguage();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filterLabels: Record<string, string> = {
    All: dict.dashboard.adminFarmers.filterAll,
    Verified: dict.dashboard.adminFarmers.filterVerified,
    Pending: dict.dashboard.adminFarmers.filterPending,
    Suspended: dict.dashboard.adminFarmers.filterSuspended,
  };

  useEffect(() => {
    farmersApi
      .list()
      .then(setFarmers)
      .catch((err) => setError(err instanceof ApiError ? err.message : dict.dashboard.adminFarmers.failedToLoadFarmers))
      .finally(() => setLoading(false));
  }, [dict]);

  const filteredFarmers = farmers.filter((f) => {
    const farmName = f.farmName || f.farmerCode;
    const ownerName = f.user?.name || "";
    const q = search.toLowerCase();
    const matchesSearch = farmName.toLowerCase().includes(q) || ownerName.toLowerCase().includes(q);

    if (filter === "All") return matchesSearch;
    const status = f.status?.toUpperCase();
    if (filter === "Verified") return matchesSearch && (status === "VERIFIED" || status === "ACTIVE");
    return matchesSearch && status === filter.toUpperCase();
  });

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">
      <AdminSidebar active="Farmers" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
              {dict.dashboard.shared.adminConsoleLabel}
            </p>
            <h1 className="text-[28px] sm:text-[38px] font-semibold text-[#1c2b1a] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              {dict.dashboard.adminFarmers.title}
            </h1>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
                      filter === f ? "bg-[#1e3d18] text-white" : "bg-[#faf9f6] text-[#5a6a52] border border-[#e0dbd0]"
                    }`}
                  >
                    {filterLabels[f]}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aaa8a]" />
                <input
                  type="text"
                  placeholder={dict.dashboard.adminFarmers.searchFarmersPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-[13px] bg-[#faf9f6] border border-[#e0dbd0] rounded-full focus:outline-none focus:border-[#2d5a1b] transition-colors w-52"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#f0ece4]">
                    {[
                      dict.dashboard.adminFarmers.colFarm,
                      dict.dashboard.adminFarmers.colRegion,
                      dict.dashboard.adminFarmers.colPhone,
                      dict.dashboard.adminFarmers.colJoined,
                      dict.dashboard.adminFarmers.colStatus,
                      dict.dashboard.adminFarmers.colActions,
                    ].map((h) => (
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
                        {dict.dashboard.adminFarmers.loadingFarmers}
                      </td>
                    </tr>
                  ) : filteredFarmers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-[13px] text-[#9aaa8a]">
                        {dict.dashboard.adminFarmers.noFarmersFound}
                      </td>
                    </tr>
                  ) : (
                    filteredFarmers.map((f) => {
                      const s = statusConfig[f.status?.toUpperCase()] || defaultStatusStyle;
                      return (
                        <tr key={f.id} className="border-b border-[#f8f6f2] last:border-0 hover:bg-[#faf9f6] transition-colors">
                          <td className="py-4 pr-4">
                            <p className="text-[14px] font-semibold text-[#1c2b1a]">{f.farmName || f.farmerCode}</p>
                            <p className="text-[12px] text-[#9aaa8a]">{f.user?.name || "—"}</p>
                          </td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">{f.province?.name || "—"}</td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">{f.phone || "—"}</td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">
                            {f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "—"}
                          </td>
                          <td className="py-4 pr-4">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wide px-3 py-1 rounded-full whitespace-nowrap ${s.color}`}>
                              {s.icon}
                              {f.status?.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 pr-4 text-[13px] font-medium whitespace-nowrap">
                            <Link
                              href={`/dashboard/admin/farmers/${f.id}`}
                              className="text-[#2d5a1b] hover:underline"
                            >
                              {dict.dashboard.adminFarmers.viewLink}
                            </Link>
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
