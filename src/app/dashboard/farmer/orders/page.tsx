"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  profile as profileApi,
  farmers as farmersApi,
  orders as ordersApi,
  getToken,
  ApiError,
  groupFarmerOrderItems,
  type User,
  type Farmer,
  type FarmerOrderGroup,
} from "@/lib/api";
import FarmerSidebar from "@/components/FarmerSidebar";
import { useLanguage } from "@/context/LanguageContext";

const STATUS_OPTIONS = ["pending", "processing", "completed", "delivered", "cancelled"];

export default function FarmerOrdersPage() {
  const { dict } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [orders, setOrders] = useState<FarmerOrderGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
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
        if (currentFarmer) setFarmer(currentFarmer);

        const myOrderItems = await ordersApi.myFarmerItems();
        setOrders(groupFarmerOrderItems(myOrderItems));
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

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      setUpdatingId(orderId);
      await ordersApi.updateStatus(orderId, { status });
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
      );
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : dict.dashboard.farmerOrders.failedToUpdateOrder;
      setError(message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        {dict.dashboard.farmerOrders.loading}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <FarmerSidebar
        active="Orders"
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
          {dict.dashboard.farmerOrders.eyebrow}
        </p>
        <h1 className="text-[32px] sm:text-[42px] leading-[0.95] mb-10" style={{ fontFamily: "Georgia, serif" }}>
          {dict.dashboard.farmerOrders.title}
        </h1>

        {orders.length === 0 ? (
          <p className="text-[#8a8174] text-sm">{dict.dashboard.farmerOrders.noOrdersYet}</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onStatusChange={(status) => handleStatusChange(order.orderId, status)}
                updating={updatingId === order.orderId}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function OrderCard({
  order,
  onStatusChange,
  updating,
}: {
  order: FarmerOrderGroup;
  onStatusChange: (status: string) => void;
  updating: boolean;
}) {
  const { dict } = useLanguage();
  const customer = order.customer?.name || null;
  const total = order.items.reduce((sum, item) => sum + Number(item.subtotalUsd), 0);

  return (
    <div className="bg-white rounded-3xl p-6 border border-[#e6dfd2] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#102615]">
          {dict.dashboard.farmerOrders.orderPrefix}{order.orderId.slice(0, 8)}
        </p>
        <p className="text-[#8a8174] text-sm mt-1">
          {customer &&
            (order.customer?.id ? (
              <Link
                href={`/customers/${order.customer.id}`}
                className="font-medium text-[#1e6b42] hover:underline"
              >
                {customer}
              </Link>
            ) : (
              customer
            ))}
          {customer ? " · " : ""}
          {order.destinationAddress || dict.dashboard.farmerOrders.noDestination}
        </p>
        <p className="text-[#8a8174] text-xs mt-1">
          {new Date(order.placedAt).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6">
        <p className="text-sm font-semibold text-[#102615]">${total.toFixed(2)}</p>

        <select
          value={order.status}
          disabled={updating}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-full border border-[#e1d8ca] px-4 py-2 text-sm font-semibold capitalize disabled:opacity-60"
        >
          {!STATUS_OPTIONS.includes(order.status) && (
            <option value={order.status}>{order.status}</option>
          )}
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
