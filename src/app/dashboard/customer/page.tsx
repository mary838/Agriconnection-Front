"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, MapPin, Package, ShoppingBag } from "lucide-react";
import {
  profile as profileApi,
  customers as customersApi,
  orders as ordersApi,
  wishlists as wishlistsApi,
  carts as cartsApi,
  getToken,
  resolveImageUrl,
  ApiError,
  type User,
  type Customer,
  type Order,
  type Wishlist,
} from "@/lib/api";
import CustomerSidebar from "@/components/CustomerSidebar";
import { useCart } from "@/context/CartContext";

const STEPS = ["pending", "paid", "shipped", "delivered"];
const STEP_LABELS = ["Placed", "Paid", "Shipped", "Delivered"];

function orderTotal(order: Order): number | null {
  const raw = order as Record<string, unknown>;
  const total =
    (raw.totalAmountUsd as number | string | undefined) ??
    (raw.totalUsd as number | string | undefined) ??
    (raw.amountUsd as number | string | undefined) ??
    null;
  return total === null ? null : Number(total);
}

function statusBadgeClass(status: string) {
  const s = status.toLowerCase();
  if (s === "delivered") return "bg-[#dff7ea] text-[#008454]";
  if (s === "cancelled") return "bg-red-50 text-red-500";
  return "bg-[#fff0cf] text-[#b17400]";
}

export default function CustomerDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [movingToCart, setMovingToCart] = useState(false);
  const { refresh: refreshCart } = useCart();

  useEffect(() => {
    const fetchCustomerDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);
        localStorage.setItem("user", JSON.stringify(profileData));

        const customersData = await customersApi.list();
        const currentCustomer = customersData.find(
          (item) => item.userId === profileData.id
        );

        if (currentCustomer) {
          setCustomer(currentCustomer);
          localStorage.setItem("customer", JSON.stringify(currentCustomer));
        }

        const [myOrders, myWishlist] = await Promise.all([
          ordersApi.mine(),
          wishlistsApi.mine(),
        ]);
        setOrders(myOrders);
        setWishlist(myWishlist);
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

    fetchCustomerDashboard();
  }, []);

  const handleMoveAllToCart = async () => {
    if (wishlist.length === 0) return;
    try {
      setMovingToCart(true);
      for (const item of wishlist) {
        await cartsApi.addItem({ productId: item.productId, quantity: 1 });
        await wishlistsApi.remove(item.id);
      }
      setWishlist([]);
      await refreshCart();
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Failed to move items to basket.";
      setError(message);
    } finally {
      setMovingToCart(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        Loading customer dashboard...
      </main>
    );
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const activeOrder =
    sortedOrders.find((o) => !["delivered", "cancelled"].includes(o.status.toLowerCase())) ||
    sortedOrders[0];
  const recentOrders = sortedOrders.slice(0, 4);
  const wishlistPreview = wishlist.slice(0, 3);

  const activeStepIndex = activeOrder
    ? STEPS.indexOf(activeOrder.status.toLowerCase())
    : -1;

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <CustomerSidebar active="Overview" user={user} customer={customer} />

      <section className="flex-1 px-12 py-10">
        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
          Welcome Back
        </p>

        <h1
          className="text-[48px] leading-tight mb-10"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Hello, {user?.name || "Customer"}.{" "}
          <em className="text-[#857d74] font-normal">Hungry?</em>
        </h1>

        {customer && (
          <div className="grid md:grid-cols-4 gap-5 mb-8">
            <InfoCard title="Customer Name" value={customer.name} />
            <InfoCard title="Phone" value={customer.phone || "N/A"} />
            <InfoCard title="District" value={customer.district || "N/A"} />
            <InfoCard
              title="Province"
              value={
                customer.province?.name ||
                (customer.provinceId ? `Province ID ${customer.provinceId}` : "N/A")
              }
            />
          </div>
        )}

        {!customer && !error && (
          <div className="mb-8 rounded-3xl border border-[#e0dbd0] bg-white p-6">
            <h2 className="text-xl font-semibold text-[#1c2b1a] mb-2">
              Customer profile not found
            </h2>
            <p className="text-[#7a8a6a] text-sm">
              Your account exists, but no customer profile is connected yet.
            </p>
          </div>
        )}

        {activeOrder ? (
          <div className="bg-[#174832] rounded-[28px] p-8 text-white mb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Package size={28} />
                </div>

                <div>
                  <p className="text-[#9db79d] text-xs tracking-[0.18em] uppercase font-bold">
                    Order #{activeOrder.id.slice(0, 8)} — {activeOrder.status}
                  </p>
                  <h2
                    className="text-2xl mt-1 capitalize"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {activeOrder.status.toLowerCase() === "delivered"
                      ? "Delivered"
                      : activeOrder.status.toLowerCase() === "cancelled"
                      ? "Order cancelled"
                      : "Order in progress"}
                  </h2>

                  <p className="flex items-center gap-1 text-[#b8c9b3] text-sm mt-2">
                    <MapPin size={14} />
                    {activeOrder.destinationAddress || customer?.address || "No address yet"}
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/customer/orders"
                className="rounded-full border border-white/30 px-6 py-3 text-sm hover:bg-white/10"
              >
                Track order
              </Link>
            </div>

            {activeStepIndex >= 0 && (
              <div className="grid grid-cols-4 gap-2 mt-9 text-xs text-[#b8c9b3]">
                {STEP_LABELS.map((step, i) => (
                  <div key={step}>
                    <div
                      className={`h-1 rounded-full mb-3 ${
                        i <= activeStepIndex ? "bg-white" : "bg-white/20"
                      }`}
                    />
                    <p className={i <= activeStepIndex ? "text-white" : "text-white/40"}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-[28px] p-8 border border-[#e6dfd2] mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-1" style={{ fontFamily: "Georgia, serif" }}>
                No orders yet
              </h2>
              <p className="text-[#8a8174] text-sm">
                Browse the marketplace to place your first order.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="rounded-full bg-[#174832] text-white px-6 py-3 text-sm font-semibold hover:bg-[#123a27]"
            >
              Go to marketplace
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <section className="bg-white rounded-[28px] p-8 border border-[#e6dfd2]">
            <div className="flex items-center justify-between mb-7">
              <h2
                className="text-2xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Recent orders
              </h2>

              <Link href="/dashboard/customer/orders" className="text-[#1e6b42] text-sm font-semibold">
                View all
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-[#8a8174] text-sm">You haven&apos;t placed any orders yet.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {recentOrders.map((order, i) => {
                  const total = orderTotal(order);
                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-2xl border border-[#eee7dc] p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#f1eadf] flex items-center justify-center text-[#7c715f] text-sm">
                          #{i + 1}
                        </div>

                        <div>
                          <p className="font-semibold text-[#102615]">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-[#8a8174] text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {total !== null && (
                        <p className="text-[#102615]">${total.toFixed(2)}</p>
                      )}

                      <span
                        className={`text-[11px] font-bold rounded-full px-3 py-1 capitalize ${statusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="bg-white rounded-[28px] p-8 border border-[#e6dfd2]">
            <div className="flex items-center justify-between mb-7">
              <h2
                className="text-2xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Wishlist
              </h2>

              <Heart size={18} className="text-[#1e6b42]" />
            </div>

            {wishlistPreview.length === 0 ? (
              <div className="flex flex-col items-center text-center py-8">
                <ShoppingBag size={28} className="text-[#c9cdbf] mb-3" />
                <p className="text-[#8a8174] text-sm">Nothing saved yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {wishlistPreview.map((item) => {
                  const product = item.product;
                  const image =
                    product?.images?.find((img) => img.isPrimary)?.imageUrl ||
                    product?.imageUrl;

                  return (
                    <div key={item.id} className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-full bg-cover bg-center bg-[#f1eadf]"
                        style={
                          image
                            ? { backgroundImage: `url(${resolveImageUrl(image)})` }
                            : undefined
                        }
                      />

                      <div className="flex-1">
                        <p className="font-semibold text-[#102615]">
                          {product?.name || "Product"}
                        </p>
                        <p className="text-[#8a8174] text-sm italic">
                          {product?.farmer?.user?.name || product?.farmer?.farmerCode || ""}
                        </p>
                      </div>

                      {product && (
                        <p className="text-sm">${Number(product.priceUsd).toFixed(2)}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={handleMoveAllToCart}
              disabled={wishlist.length === 0 || movingToCart}
              className="w-full mt-8 rounded-full border border-[#d8d0c3] py-3 text-sm font-semibold hover:border-[#1e6b42] disabled:opacity-50"
            >
              {movingToCart ? "Moving..." : "Move all to basket"}
            </button>
          </section>
        </div>
      </section>
    </main>
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
