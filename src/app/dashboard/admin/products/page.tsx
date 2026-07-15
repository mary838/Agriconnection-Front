"use client";

import { useEffect, useState } from "react";
import { Search, Menu } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  products as productsApi,
  ApiError,
  categoryName,
  resolveImageUrl,
  totalStock,
  type Product,
} from "@/lib/api";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await productsApi.list();
        setProducts(allProducts);
      } catch (err: unknown) {
        setError(err instanceof ApiError || err instanceof Error ? err.message : "Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    const farmName = p.farmer?.farmName || p.farmer?.farmerCode || "";
    return p.name.toLowerCase().includes(q) || farmName.toLowerCase().includes(q);
  });

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">
      <AdminSidebar active="Products" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
              Products
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
                  All products
                </h2>
                <p className="text-[13px] text-[#9aaa8a]">
                  {loading ? "Loading..." : `${products.length} product${products.length === 1 ? "" : "s"}`}
                </p>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aaa8a]" />
                <input
                  type="text"
                  placeholder="Search products or farms"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-[13px] bg-[#faf9f6] border border-[#e0dbd0] rounded-full focus:outline-none focus:border-[#2d5a1b] transition-colors w-56"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#f0ece4]">
                    {["PRODUCT", "FARM", "CATEGORY", "PRICE", "STOCK"].map((h) => (
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
                        Loading products…
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-[13px] text-[#9aaa8a]">
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => {
                      const image = resolveImageUrl(
                        p.images?.find((img) => img.isPrimary)?.imageUrl || p.images?.[0]?.imageUrl || p.imageUrl
                      );
                      const stock = totalStock(p);
                      const threshold = p.inventory?.length
                        ? Number(p.inventory[0].lowStockThreshold)
                        : 15;
                      const low = stock <= threshold;

                      return (
                        <tr key={p.id} className="border-b border-[#f8f6f2] last:border-0 hover:bg-[#faf9f6] transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-10 h-10 rounded-lg bg-[#ede8df] bg-cover bg-center shrink-0"
                                style={image ? { backgroundImage: `url(${image})` } : undefined}
                              />
                              <p className="text-[14px] font-semibold text-[#1c2b1a]">{p.name}</p>
                            </div>
                          </td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">
                            {p.farmer?.farmName || p.farmer?.farmerCode || "—"}
                          </td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap capitalize">
                            {categoryName(p.category) || "—"}
                          </td>
                          <td className="py-4 pr-4 text-[13px] font-semibold text-[#1c2b1a] whitespace-nowrap">
                            ${Number(p.priceUsd).toFixed(2)} <span className="text-[#9aaa8a] font-normal">/ {p.unit}</span>
                          </td>
                          <td className="py-4 pr-4 whitespace-nowrap">
                            <span className={`text-[13px] font-medium ${low ? "text-red-500" : "text-[#5a6a52]"}`}>
                              {stock}
                            </span>
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
