"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, Mail, MapPin, Menu, Phone, Send, XCircle } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  farmers as farmersApi,
  products as productsApi,
  ApiError,
  resolveImageUrl,
  categoryName,
  type Farmer,
  type Product,
} from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  VERIFIED: { color: "bg-[#eaf2e4] text-[#2d5a1b]", icon: <CheckCircle size={11} className="text-[#2d5a1b]" /> },
  ACTIVE: { color: "bg-[#eaf2e4] text-[#2d5a1b]", icon: <CheckCircle size={11} className="text-[#2d5a1b]" /> },
  PENDING: { color: "bg-[#fef3e2] text-[#b45309]", icon: <Clock size={11} className="text-[#b45309]" /> },
  SUSPENDED: { color: "bg-[#fee2e2] text-[#b91c1c]", icon: <XCircle size={11} className="text-[#b91c1c]" /> },
  REJECTED: { color: "bg-[#fee2e2] text-[#b91c1c]", icon: <XCircle size={11} className="text-[#b91c1c]" /> },
};

const defaultStatusStyle = { color: "bg-[#f0ece4] text-[#5a6a52]", icon: <Clock size={11} className="text-[#5a6a52]" /> };

export default function AdminFarmerDetailPage() {
  const { dict } = useLanguage();
  const params = useParams();
  const router = useRouter();
  const farmerId = params.id as string;

  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const [farmerData, allProducts] = await Promise.all([
          farmersApi.get(farmerId),
          productsApi.list(),
        ]);
        setFarmer(farmerData);
        setProducts(allProducts.filter((p) => p.farmerId === farmerId));
      } catch (err) {
        setError(err instanceof ApiError ? err.message : dict.dashboard.shared.somethingWrong);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [farmerId, dict]);

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

          <button
            onClick={() => router.push("/dashboard/admin/farmers")}
            className="inline-flex items-center gap-1.5 text-[13px] text-[#7a8a6a] hover:text-[#2d5a1b] transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            {dict.dashboard.adminFarmerDetail.backToFarmers}
          </button>

          {loading ? (
            <div className="bg-white border border-[#ede8df] rounded-2xl p-10 text-center text-[13px] text-[#9aaa8a]">
              {dict.dashboard.adminFarmerDetail.loadingFarmer}
            </div>
          ) : error || !farmer ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
              {error || dict.dashboard.adminFarmerDetail.farmerNotFound}
            </div>
          ) : (
            <>
              {(() => {
                const displayName = farmer.farmName || farmer.farmerCode;
                const s = statusConfig[farmer.status?.toUpperCase()] || defaultStatusStyle;
                return (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 shrink-0 rounded-full bg-[#b8cfa8] flex items-center justify-center text-[#1e3d18] text-[20px] font-semibold">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mb-1">
                          {farmer.farmerCode}
                        </p>
                        <h1
                          className="text-[26px] sm:text-[32px] font-semibold text-[#1c2b1a] leading-tight"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {displayName}
                        </h1>
                        <p className="text-[13px] text-[#7a8a6a] mt-1">{farmer.user?.name || "—"}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 self-start text-[11px] font-bold tracking-wide px-3.5 py-1.5 rounded-full whitespace-nowrap ${s.color}`}>
                      {s.icon}
                      {farmer.status?.toUpperCase()}
                    </span>
                  </div>
                );
              })()}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                <div className="lg:col-span-2 bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
                  <h2 className="text-[14px] font-semibold tracking-[0.1em] uppercase text-[#9aaa8a] mb-4">
                    Farm details
                  </h2>
                  {farmer.bio ? (
                    <p className="text-[14.5px] text-[#3a4a34] leading-relaxed mb-4">{farmer.bio}</p>
                  ) : (
                    <p className="text-[13.5px] text-[#9aaa8a] italic mb-4">No bio provided.</p>
                  )}
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13.5px]">
                    <div>
                      <dt className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#9aaa8a] mb-1">Province</dt>
                      <dd className="text-[#1c2b1a] flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#9aaa8a]" />
                        {farmer.province?.name || "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#9aaa8a] mb-1">Joined</dt>
                      <dd className="text-[#1c2b1a]">
                        {farmer.createdAt ? new Date(farmer.createdAt).toLocaleDateString() : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#9aaa8a] mb-1">Verified at</dt>
                      <dd className="text-[#1c2b1a]">
                        {farmer.verifiedAt ? new Date(farmer.verifiedAt).toLocaleDateString() : "Not verified"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[10px] font-semibold tracking-[0.1em] uppercase text-[#9aaa8a] mb-1">Address</dt>
                      <dd className="text-[#1c2b1a]">{farmer.address || "—"}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6 flex flex-col gap-3">
                  <h2 className="text-[14px] font-semibold tracking-[0.1em] uppercase text-[#9aaa8a] mb-1">
                    Contact
                  </h2>
                  <div className="flex items-center gap-2.5 text-[14px] text-[#1c2b1a]">
                    <Phone size={15} className="text-[#2d5a1b] shrink-0" />
                    {farmer.phone || "—"}
                  </div>
                  {farmer.telegramPhone && (
                    <div className="flex items-center gap-2.5 text-[14px] text-[#1c2b1a]">
                      <Send size={15} className="text-[#2d5a1b] shrink-0" />
                      {farmer.telegramPhone}
                    </div>
                  )}
                  {farmer.user?.email && (
                    <div className="flex items-center gap-2.5 text-[14px] text-[#1c2b1a] pt-2 border-t border-[#ede8df] mt-1">
                      <Mail size={15} className="text-[#2d5a1b] shrink-0" />
                      {farmer.user.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                    Products
                  </h2>
                  <p className="text-[13px] text-[#9aaa8a]">
                    {products.length} product{products.length === 1 ? "" : "s"}
                  </p>
                </div>

                {products.length === 0 ? (
                  <p className="text-[13.5px] text-[#9aaa8a]">No products listed yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/marketplace/${product.id}`}
                        className="group border border-[#ede8df] rounded-xl overflow-hidden hover:shadow-md transition-shadow block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e0d0]">
                          <img
                            src={
                              resolveImageUrl(
                                product.images?.find((img) => img.isPrimary)?.imageUrl ||
                                  product.images?.[0]?.imageUrl ||
                                  product.imageUrl
                              ) || "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80"
                            }
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 text-[9px] font-semibold tracking-[0.1em] px-2.5 py-1 rounded-full bg-[#1e3d18] text-white uppercase">
                            {categoryName(product.category).replace("_", " ")}
                          </span>
                        </div>
                        <div className="px-3 py-3">
                          <p className="text-[13.5px] font-medium text-[#1c2b1a] mb-0.5 truncate" style={{ fontFamily: "Georgia, serif" }}>
                            {product.name}
                          </p>
                          <p className="text-[13px] font-semibold text-[#1c2b1a]">
                            ${Number(product.priceUsd).toFixed(2)}/{product.unit}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
