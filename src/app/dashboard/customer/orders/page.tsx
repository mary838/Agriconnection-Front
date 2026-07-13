"use client";

import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import {
  profile as profileApi,
  customers as customersApi,
  orders as ordersApi,
  getToken,
  ApiError,
  type User,
  type Customer,
  type Order,
} from "@/lib/api";
import CustomerSidebar from "@/components/CustomerSidebar";

export default function CustomerOrdersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);

        const customersData = await customersApi.list();
        const currentCustomer = customersData.find((item) => item.userId === profileData.id);
        if (currentCustomer) setCustomer(currentCustomer);

        const myOrders = await ordersApi.mine();
        setOrders(myOrders);
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
        Loading orders...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <CustomerSidebar active="Orders" user={user} customer={customer} />

      <section className="flex-1 px-12 py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
          Customer Portal
        </p>
        <h1 className="text-[42px] leading-[0.95] mb-10" style={{ fontFamily: "Georgia, serif" }}>
          Your Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-[#8a8174] text-sm">You haven&apos;t placed any orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function OrderCard({ order }: { order: Order }) {
  const raw = order as Record<string, unknown>;
  const total =
    (raw.totalAmountUsd as number | string | undefined) ??
    (raw.totalUsd as number | string | undefined) ??
    (raw.amountUsd as number | string | undefined) ??
    null;
  const placedAt = (raw.placedAt as string | undefined) ?? order.createdAt;

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#e6dfd2] flex items-center gap-6">
      <div className="w-12 h-12 rounded-full bg-[#f1eadf] flex items-center justify-center text-[#7c715f] shrink-0">
        <Package size={20} />
      </div>

      <div className="flex-1">
        <p className="font-semibold text-[#102615]">Order #{order.id.slice(0, 8)}</p>
        <p className="text-[#8a8174] text-sm mt-1">
          {order.destinationAddress || "No destination set"}
        </p>
        <p className="text-[#8a8174] text-xs mt-1">
          {new Date(placedAt).toLocaleString()}
        </p>
      </div>

      {total !== null && (
        <p className="text-sm font-semibold text-[#102615]">${Number(total).toFixed(2)}</p>
      )}

      <span className="text-[11px] font-bold rounded-full px-3 py-1 bg-[#dff7ea] text-[#008454] capitalize">
        {order.status}
      </span>
    </div>
  );
}
