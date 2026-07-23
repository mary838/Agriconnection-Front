"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  profile as profileApi,
  farmers as farmersApi,
  products as productsApi,
  inventory as inventoryApi,
  orders as ordersApi,
  payouts as payoutsApi,
  getToken,
  ApiError,
  resolveImageUrl,
  groupFarmerOrderItems,
  provinceName,
  type User,
  type Farmer,
  type Product,
  type FarmerOrderGroup,
  type Inventory,
} from "@/lib/api";
import FarmerSidebar from "@/components/FarmerSidebar";
import { useLanguage } from "@/context/LanguageContext";

export default function FarmerDashboardPage() {
  const { dict } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [inventoryByProduct, setInventoryByProduct] = useState<Map<string, Inventory>>(new Map());
  const [recentOrders, setRecentOrders] = useState<FarmerOrderGroup[]>([]);
  const [revenue, setRevenue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);
        localStorage.setItem("user", JSON.stringify(profileData));

        const farmersData = await farmersApi.list();
        const currentFarmer = farmersData.find(
          (item) => item.userId === profileData.id
        );

        if (currentFarmer) {
          setFarmer(currentFarmer);
          localStorage.setItem("farmer", JSON.stringify(currentFarmer));

          const [allProducts, allInventory] = await Promise.all([
            productsApi.list(),
            inventoryApi.list(),
          ]);
          const farmerProducts = allProducts.filter(
            (product) => product.farmerId === currentFarmer.id
          );
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
            setRevenue(
              farmerPayouts.reduce((sum, payout) => sum + Number(payout.amountUsd || 0), 0)
            );
          } catch {
            setRevenue(null);
          }
        }

        try {
          const myOrderItems = await ordersApi.myFarmerItems();
          setRecentOrders(groupFarmerOrderItems(myOrderItems).slice(0, 4));
        } catch {
          setRecentOrders([]);
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

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        {dict.dashboard.farmerHome.loading}
      </main>
    );
  }

  const activeOrders = recentOrders.filter(
    (order) => order.status !== "delivered" && order.status !== "cancelled"
  ).length;

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? dict.dashboard.farmerHome.greetingMorning
      : hour < 18
      ? dict.dashboard.farmerHome.greetingAfternoon
      : dict.dashboard.farmerHome.greetingEvening;

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <FarmerSidebar
        active="Overview"
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

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 sm:gap-8 mb-12">
          <div>
            <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
              {greeting}, {user?.name?.split(" ")[0] || dict.dashboard.farmerHome.defaultFarmerName}
            </p>

            <h1
              className="text-[32px] sm:text-[50px] leading-[0.95]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {user?.name || dict.dashboard.farmerHome.defaultFarmerName}
              <br />
              <em className="text-[#857d74] font-normal">
                {dict.dashboard.farmerHome.performanceOverview}
              </em>
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/farmer/reports"
              className="rounded-full bg-white border border-[#e1d8ca] px-7 py-4 text-sm font-semibold hover:border-[#174832]"
            >
              {dict.dashboard.farmerHome.viewReports}
            </Link>

            <Link
              href="/dashboard/farmer/products/new"
              className="rounded-full bg-[#174832] px-7 py-4 text-sm font-semibold text-white hover:bg-[#216343]"
            >
              {dict.dashboard.farmerHome.newProduct}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-14">
          <StatCard
            title={dict.dashboard.farmerHome.totalRevenue}
            value={revenue !== null ? `$${revenue.toFixed(2)}` : dict.dashboard.shared.na}
            note={dict.dashboard.farmerHome.fromPayouts}
            href="/dashboard/farmer/reports"
          />
          <StatCard
            title={dict.dashboard.farmerHome.recentOrders}
            value={String(recentOrders.length)}
            note={`${activeOrders} ${dict.dashboard.farmerHome.activeSuffix}`}
          />
          <StatCard
            title={dict.dashboard.farmerHome.productsListed}
            value={String(products.length)}
            note={dict.dashboard.farmerHome.inYourCatalog}
          />
          <div className="rounded-[26px] bg-[#174832] text-white p-8 shadow-md">
            <p className="text-[#9db79d] text-sm mb-5">{dict.dashboard.farmerHome.platformHealth}</p>
            <p
              className="text-[38px]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {farmer?.status === "active" ? dict.dashboard.farmerHome.optimal : dict.dashboard.farmerHome.pendingWord}
            </p>
            <p className="text-[#c6dcc6] text-sm mt-2">
              {farmer?.status === "active"
                ? dict.dashboard.farmerHome.verifiedFarmer
                : farmer?.status || dict.dashboard.farmerHome.pendingFarmer}
            </p>
          </div>
        </div>

        {farmer && (
          <div className="grid md:grid-cols-4 gap-5 mb-12">
            <InfoCard title={dict.dashboard.farmerHome.farmerCodeLabel} value={farmer.farmerCode} />
            <InfoCard title={dict.dashboard.farmerHome.phoneLabel} value={farmer.phone || dict.dashboard.shared.na} />
            <InfoCard
              title={dict.dashboard.farmerHome.provinceLabel}
              value={provinceName(farmer.province) || `${dict.dashboard.farmerHome.provinceIdPrefix} ${farmer.provinceId}`}
            />
            <InfoCard title={dict.dashboard.farmerHome.statusLabel} value={farmer.status} />
          </div>
        )}

        <div className="grid lg:grid-cols-[1.6fr_0.8fr] gap-12">
          <section>
            <div className="flex items-center justify-between mb-7">
              <h2
                className="text-[28px]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {dict.dashboard.farmerHome.currentInventory}
              </h2>

              <Link
                href="/dashboard/farmer/products"
                className="text-[#1e6b42] text-sm font-semibold"
              >
                {dict.dashboard.farmerHome.viewCatalog}
              </Link>
            </div>

            {products.length === 0 ? (
              <p className="text-[#8a8174] text-sm">
                {dict.dashboard.farmerHome.noProductsYet}{" "}
                <Link href="/dashboard/farmer/products/new" className="text-[#1e6b42] font-semibold">
                  {dict.dashboard.farmerHome.addFirstProduct}
                </Link>
                .
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {products.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    inventoryRecord={inventoryByProduct.get(product.id) || null}
                  />
                ))}
              </div>
            )}
          </section>

          <aside>
            <h2
              className="text-[28px] mb-7"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {dict.dashboard.farmerHome.incomingOrders}
            </h2>

            <div className="flex flex-col gap-4 mb-10">
              {recentOrders.length === 0 ? (
                <p className="text-[#8a8174] text-sm">{dict.dashboard.farmerHome.noOrdersYet}</p>
              ) : (
                recentOrders.map((order) => <OrderRow key={order.orderId} order={order} />)
              )}
            </div>

            <Link
              href="/dashboard/farmer/reports"
              className="mt-6 flex items-center justify-center rounded-full bg-white border border-[#d8d0c3] py-4 text-sm font-semibold hover:border-[#174832]"
            >
              {dict.dashboard.farmerHome.seeFullAnalytics}
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
  note,
  href,
}: {
  title: string;
  value: string;
  note: string;
  href?: string;
}) {
  return (
    <div className="rounded-[26px] bg-white p-8 border border-[#e6dfd2] shadow-sm">
      <p className="text-[#9b9188] text-sm mb-5">{title}</p>
      <p
        className="text-[38px] text-[#2b160c]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {value}
      </p>
      {href ? (
        <Link
          href={href}
          className="text-[#009b5a] text-sm font-semibold mt-2 inline-block hover:underline"
        >
          {note}
        </Link>
      ) : (
        <p className="text-[#009b5a] text-sm font-semibold mt-2">{note}</p>
      )}
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white border border-[#e0dbd0] p-5">
      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#7a8a6a] mb-2">
        {title}
      </p>
      <p className="text-[#1c2b1a] font-semibold capitalize">{value}</p>
    </div>
  );
}

function ProductCard({
  product,
  inventoryRecord,
}: {
  product: Product;
  inventoryRecord: Inventory | null;
}) {
  const { dict } = useLanguage();

  const image = resolveImageUrl(
    product.images?.find((img) => img.isPrimary)?.imageUrl ||
      product.images?.[0]?.imageUrl ||
      product.imageUrl
  );

  const categoryLabel =
    typeof product.category === "string" ? product.category : product.category?.name;

  const stock = inventoryRecord?.stockQty;
  const low =
    typeof stock === "number" &&
    stock <= (inventoryRecord?.lowStockThreshold ?? 15);

  return (
    <Link
      href="/dashboard/farmer/products"
      className="bg-white rounded-3xl overflow-hidden border border-[#e6dfd2] block hover:border-[#174832] transition-colors"
    >
      <div
        className="h-[170px] bg-cover bg-center bg-[#e6dfd2]"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      />

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 style={{ fontFamily: "Georgia, serif" }}>{product.name}</h3>
            <p
              className={`text-sm mt-2 ${
                low ? "text-red-500 font-semibold" : "text-[#8a8174]"
              }`}
            >
              {typeof stock === "number"
                ? dict.dashboard.farmerHome.inStockUnits.replace("{n}", String(stock))
                : categoryLabel || "—"}
            </p>
          </div>

          <p className="text-sm">${Number(product.priceUsd).toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}

function OrderRow({ order }: { order: FarmerOrderGroup }) {
  const { dict } = useLanguage();

  const customer = order.customer?.name || dict.dashboard.farmerHome.defaultCustomerName;
  const items = order.items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );
  const productNames = order.items
    .map((item) => item.product?.name)
    .filter((name): name is string => Boolean(name));
  const title =
    productNames.length > 0
      ? productNames.join(", ")
      : `${dict.dashboard.farmerHome.orderPrefix}${order.orderId.slice(0, 8)}`;
  const total = order.items.reduce(
    (sum, item) => sum + Number(item.subtotalUsd),
    0
  );

  return (
    <Link
      href="/dashboard/farmer/orders"
      className="bg-white rounded-3xl p-4 flex items-center gap-4 border border-[#e6dfd2] hover:border-[#174832] transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-[#d8f5df] flex items-center justify-center text-[#174832] font-semibold">
        {customer.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#102615] truncate">{title}</p>
        <p className="text-[#8a8174] text-sm">
          {customer} · {items} {items === 1 ? dict.dashboard.farmerHome.itemWord : dict.dashboard.farmerHome.itemWordPlural} · $
          {total.toFixed(2)}
        </p>
      </div>

      <span
        className={`text-[10px] font-bold rounded-full px-3 py-1 uppercase ${
          order.status === "paid" || order.status === "delivered"
            ? "bg-[#dff7ea] text-[#008454]"
            : order.status === "pending"
            ? "bg-[#fff0cf] text-[#b17400]"
            : "bg-[#e6edf7] text-[#244e7a]"
        }`}
      >
        {order.status}
      </span>
    </Link>
  );
}
