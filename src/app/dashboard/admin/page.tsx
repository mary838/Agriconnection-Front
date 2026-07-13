"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search, Plus, CheckCircle, Clock, XCircle, Menu,
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { farmers as farmersApi, ApiError, type Farmer } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const stats = [
  { key: "products",  value: "2,418",  sub: "+126 vs last month", featured: false },
  { key: "customers", value: "8.4k",   sub: "+412 vs last month", featured: false },
  { key: "orders",    value: "3,212",  sub: "+18% vs last month", featured: false },
  { key: "revenue",   value: "$84.2k", sub: "+22% vs last month", featured: true  },
];

const salesData = [
  { month: "APR", value: 404 },
  { month: "MAY", value: 539 },
  { month: "JUN", value: 488 },
  { month: "JUL", value: 690 },
  { month: "AUG", value: 775 },
  { month: "SEP", value: 842 },
];
const maxSales = Math.max(...salesData.map((d) => d.value)); 
const topPerformers = [
  { name: "Heirloom Tomatoes", farm: "Green Valley",    revenue: "$2,840", pct: 100 },
  { name: "Wildflower Honey",  farm: "Blackwood Apiary",revenue: "$2,120", pct: 75  },
  { name: "Pasture Eggs",      farm: "Meadowside",      revenue: "$1,780", pct: 63  },
  { name: "Rainbow Carrots",   farm: "Meadowlark",      revenue: "$1,460", pct: 51  },
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  VERIFIED:  { color: "bg-[#eaf2e4] text-[#2d5a1b]",   icon: <CheckCircle size={11} className="text-[#2d5a1b]" /> },
  ACTIVE:    { color: "bg-[#eaf2e4] text-[#2d5a1b]",   icon: <CheckCircle size={11} className="text-[#2d5a1b]" /> },
  PENDING:   { color: "bg-[#fef3e2] text-[#b45309]",   icon: <Clock size={11} className="text-[#b45309]" /> },
  SUSPENDED: { color: "bg-[#fee2e2] text-[#b91c1c]",   icon: <XCircle size={11} className="text-[#b91c1c]" /> },
  REJECTED:  { color: "bg-[#fee2e2] text-[#b91c1c]",   icon: <XCircle size={11} className="text-[#b91c1c]" /> },
};

const defaultStatusStyle = { color: "bg-[#f0ece4] text-[#5a6a52]", icon: <Clock size={11} className="text-[#5a6a52]" /> };

export default function AdminDashboard() {
  const { dict } = useLanguage();
  const [farmerSearch, setFarmerSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const filteredFarmers = farmers.filter((f) => {
    const farmName = f.farmName || f.farmerCode;
    const ownerName = f.user?.name || "";
    const q = farmerSearch.toLowerCase();
    return farmName.toLowerCase().includes(q) || ownerName.toLowerCase().includes(q);
  });

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
                <select className="text-[12px] border border-[#e0dbd0] rounded-full px-4 py-1.5 text-[#4a5568] bg-[#faf9f6] focus:outline-none cursor-pointer self-start">
                  <option>{dict.dashboard.adminHome.last6Months}</option>
                  <option>{dict.dashboard.adminHome.last3Months}</option>
                  <option>{dict.dashboard.adminHome.thisYear}</option>
                </select>
              </div>

              <div className="flex items-end gap-2 sm:gap-4 h-40 sm:h-44">
                {salesData.map((d, i) => {
                  const isCurrent = i === salesData.length - 1;
                  const barH = Math.round((d.value / maxSales) * 160);
                  return (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-medium text-[#7a8a6a]">${d.value}</span>
                      <div
                        className={`w-full rounded-t-lg ${isCurrent ? "bg-[#1e3d18]" : "bg-[#c8e6c0]"}`}
                        style={{ height: `${barH}px` }}
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
                {topPerformers.map((p) => (
                  <div key={p.name}>
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
                ))}
              </div>
            </div>
          </div>

          {/* Farmer accounts table */}
          <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                  {dict.dashboard.adminHome.farmerAccounts}
                </h2>
                <p className="text-[13px] text-[#9aaa8a]">{dict.dashboard.adminHome.manageGrowers}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aaa8a]" />
                  <input
                    type="text"
                    placeholder={dict.dashboard.adminHome.searchFarmersPlaceholder}
                    value={farmerSearch}
                    onChange={(e) => setFarmerSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 text-[13px] bg-[#faf9f6] border border-[#e0dbd0] rounded-full focus:outline-none focus:border-[#2d5a1b] transition-colors w-44"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 sm:px-5 py-2 bg-[#1e3d18] text-white rounded-full text-[13px] font-medium hover:bg-[#2d5a1b] transition-colors whitespace-nowrap">
                  <Plus size={13} />
                  {dict.dashboard.adminHome.addFarmer}
                </button>
              </div>
            </div>

            {/* Table — scrollable on mobile */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px]">
                <thead>
                  <tr className="border-b border-[#f0ece4]">
                    {[
                      dict.dashboard.adminHome.colFarm,
                      dict.dashboard.adminHome.colRegion,
                      dict.dashboard.adminHome.colPhone,
                      dict.dashboard.adminHome.colStatus,
                      dict.dashboard.adminHome.colActions,
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
                      <td colSpan={5} className="py-6 text-center text-[13px] text-[#9aaa8a]">
                        {dict.dashboard.adminHome.loadingFarmers}
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[13px] text-[#b91c1c]">
                        {error}
                      </td>
                    </tr>
                  ) : filteredFarmers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[13px] text-[#9aaa8a]">
                        {dict.dashboard.adminHome.noFarmersFound}
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
                          <td className="py-4 pr-4">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wide px-3 py-1 rounded-full whitespace-nowrap ${s.color}`}>
                              {s.icon}
                              {f.status?.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 text-[13px] font-medium whitespace-nowrap">
                            <Link
                              href={`/dashboard/admin/farmers/${f.id}`}
                              className="text-[#2d5a1b] hover:underline"
                            >
                              {dict.dashboard.adminHome.viewLink}
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
