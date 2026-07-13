"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  profile as profileApi,
  farmers as farmersApi,
  products as productsApi,
  inventory as inventoryApi,
  payouts as payoutsApi,
  getToken,
  ApiError,
  type User,
  type Farmer,
  type Product,
  type Payout,
  type Inventory,
} from "@/lib/api";
import FarmerSidebar from "@/components/FarmerSidebar";
import { useLanguage } from "@/context/LanguageContext";

export default function FarmerReportsPage() {
  const { dict } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [inventoryByProduct, setInventoryByProduct] = useState<Map<string, Inventory>>(new Map());
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);

        const farmersData = await farmersApi.list();
        const currentFarmer = farmersData.find((item) => item.userId === profileData.id);

        if (!currentFarmer) {
          throw new Error("Farmer profile not found.");
        }
        setFarmer(currentFarmer);

        const [allProducts, allInventory] = await Promise.all([
          productsApi.list(),
          inventoryApi.list(),
        ]);
        const farmerProducts = allProducts.filter((p) => p.farmerId === currentFarmer.id);
        setProducts(farmerProducts);

        const map = new Map<string, Inventory>();
        for (const record of allInventory) {
          if (farmerProducts.some((p) => p.id === record.productId)) {
            map.set(record.productId, record);
          }
        }
        setInventoryByProduct(map);

        try {
          const farmerPayouts = await payoutsApi.byFarmer(currentFarmer.id);
          setPayouts(farmerPayouts);
        } catch {
          setPayouts([]);
        }
      } catch (err: unknown) {
        const message =
          err instanceof ApiError || err instanceof Error
            ? err.message
            : "Something went wrong.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        {dict.dashboard.farmerReports.loading}
      </main>
    );
  }

  const totalRevenue = payouts.reduce((sum, p) => sum + Number(p.amountUsd || 0), 0);
  const paidOut = payouts.filter((p) => p.status === "paid").reduce((sum, p) => sum + Number(p.amountUsd || 0), 0);
  const pending = totalRevenue - paidOut;
  const lowStock = products.filter((p) => {
    const record = inventoryByProduct.get(p.id);
    return record && record.stockQty <= record.lowStockThreshold;
  }).length;

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <FarmerSidebar
        active="Reports"
        user={user}
        farmer={farmer}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <section className="flex-1 px-5 sm:px-8 md:px-12 py-6 sm:py-10">
        <div className="md:hidden flex items-center gap-3 mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#102615] hover:text-[#1e6b42] transition-colors"
          >
            <Menu size={22} />
          </button>
          <p className="text-lg" style={{ fontFamily: "Georgia, serif" }}>
            AgriConnect
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
          {dict.dashboard.farmerReports.eyebrow}
        </p>
        <h1 className="text-[32px] sm:text-[42px] leading-[0.95] mb-10" style={{ fontFamily: "Georgia, serif" }}>
          {dict.dashboard.farmerReports.title}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14">
          <Stat title={dict.dashboard.farmerReports.totalPayouts} value={`$${totalRevenue.toFixed(2)}`} />
          <Stat title={dict.dashboard.farmerReports.paidOut} value={`$${paidOut.toFixed(2)}`} />
          <Stat title={dict.dashboard.farmerReports.pendingLabel} value={`$${pending.toFixed(2)}`} />
          <Stat title={dict.dashboard.farmerReports.productsListed} value={String(products.length)} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-[24px] mb-5" style={{ fontFamily: "Georgia, serif" }}>
              {dict.dashboard.farmerReports.payoutHistory}
            </h2>

            {payouts.length === 0 ? (
              <p className="text-[#8a8174] text-sm">{dict.dashboard.farmerReports.noPayoutsYet}</p>
            ) : (
              <div className="flex flex-col gap-3">
                {payouts.map((payout) => (
                  <div
                    key={payout.id}
                    className="bg-white rounded-2xl p-4 border border-[#e6dfd2] flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-sm">
                        {new Date(payout.payoutDate).toLocaleDateString()}
                      </p>
                      <p className="text-[#8a8174] text-xs mt-1">
                        {payout.reference || payout.id.slice(0, 8)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">${Number(payout.amountUsd).toFixed(2)}</p>
                      <p className="text-[#8a8174] text-xs capitalize">{payout.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-[24px] mb-5" style={{ fontFamily: "Georgia, serif" }}>
              {dict.dashboard.farmerReports.inventoryHealth}
            </h2>

            <div className="bg-white rounded-2xl p-6 border border-[#e6dfd2]">
              <p className="text-[#8a8174] text-sm mb-2">{dict.dashboard.farmerReports.lowStockDescription}</p>
              <p className="text-[38px]" style={{ fontFamily: "Georgia, serif" }}>
                {lowStock}
              </p>
              <p className="text-[#8a8174] text-sm mt-2">
                {dict.dashboard.farmerReports.outOfPrefix} {products.length}{" "}
                {products.length === 1
                  ? dict.dashboard.farmerReports.totalProductWord
                  : dict.dashboard.farmerReports.totalProductWordPlural}
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[26px] bg-white p-8 border border-[#e6dfd2] shadow-sm">
      <p className="text-[#9b9188] text-sm mb-5">{title}</p>
      <p className="text-[32px] text-[#2b160c]" style={{ fontFamily: "Georgia, serif" }}>
        {value}
      </p>
    </div>
  );
}
