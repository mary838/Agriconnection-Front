"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { orders as ordersApi, payments as paymentsApi, ApiError } from "@/lib/api";

const DELIVERY_FEE = 4.5;

const deliveryWindows = [
  { label: "Tomorrow, 8–10am" },
  { label: "Tomorrow, 2–4pm" },
  { label: "Saturday, 9–11am" },
];

const labelClass = "block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#888] mb-1.5 font-sans";
const inputClass =
  "w-full px-5 py-3 bg-[#f5f3ee] border border-[#e5e2d8] rounded-full text-[14px] text-[#333] outline-none focus:border-[#2d5a1b] transition-colors box-border";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { cart, loading: cartLoading } = useCart();
  const { showToast } = useToast();

  const [selectedWindow, setSelectedWindow] = useState(0);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
  });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login?redirect=/checkout");
    } else if (user.role !== "customer") {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  const items = cart?.items || [];

  useEffect(() => {
    if (!isLoading && !cartLoading && user?.role === "customer" && items.length === 0 && !orderId) {
      router.replace("/cart");
    }
  }, [isLoading, cartLoading, user, items.length, orderId, router]);

  if (isLoading || !user || user.role !== "customer" || cartLoading || (items.length === 0 && !orderId)) return null;

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.product?.priceUsd || 0) * i.quantity,
    0
  );
  const total = subtotal + DELIVERY_FEE;

  const handlePlaceOrder = async () => {
    try {
      setPlacing(true);
      setError("");
      let id = orderId;
      if (!id) {
        const destinationAddress = `${address.street}, ${address.city} ${address.zip}`.trim();
        const order = await ordersApi.checkout({ destinationAddress });
        id = order.id;
        setOrderId(id);
      }
      const session = await paymentsApi.createCheckoutSession(id);
      window.location.href = session.url;
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error ? err.message : "Failed to place order.";
      setError(message);
      showToast(message, "error");
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2]" style={{ fontFamily: "Georgia, serif" }}>
      <Navbar />

      {/* Page content */}
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[14px] text-[#555] hover:text-[#2d5a1b] transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          Back to basket
        </Link>

        <h1 className="text-[32px] sm:text-[42px] font-normal text-[#1a1a1a] mb-8">Checkout</h1>

        {error && (
          <div className="animate-fade-in-up mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* LEFT — steps */}
          <div className="flex flex-col gap-5">

            {/* Step 01 — Delivery address */}
            <div className="animate-fade-in-up bg-white rounded-2xl p-6 border border-[#e8e4da]">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#e8f5e0] flex items-center justify-center text-[16px] shrink-0">
                  📍
                </div>
                <div>
                  <span className="text-[11px] text-[#999] tracking-[0.1em] uppercase font-sans">Step 01</span>
                  <h2 className="text-[20px] sm:text-[22px] font-normal text-[#1a1a1a] leading-tight">Delivery address</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input className={inputClass} value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input className={inputClass} value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                </div>
              </div>

              <div className="mb-4">
                <label className={labelClass}>Street Address</label>
                <input className={inputClass} value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City</label>
                  <input className={inputClass} value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>ZIP</label>
                  <input className={inputClass} value={address.zip}
                    onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Step 02 — Delivery window */}
            <div className="animate-fade-in-up bg-white rounded-2xl p-6 border border-[#e8e4da]" style={{ animationDelay: "80ms" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#e8f5e0] flex items-center justify-center text-[16px] shrink-0">
                  🚚
                </div>
                <div>
                  <span className="text-[11px] text-[#999] tracking-[0.1em] uppercase font-sans">Step 02</span>
                  <h2 className="text-[20px] sm:text-[22px] font-normal text-[#1a1a1a] leading-tight">Delivery window</h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {deliveryWindows.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedWindow(i)}
                    className={`px-5 py-3.5 rounded-xl text-[14px] cursor-pointer transition-all active:scale-95 ${
                      selectedWindow === i
                        ? "border-2 border-[#2d5a1b] bg-[#e8f5e0] text-[#2d5a1b] font-semibold scale-105"
                        : "border border-[#d8d4c8] bg-white text-[#444] hover:border-[#2d5a1b]/50"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 03 — Payment */}
            <div className="animate-fade-in-up bg-white rounded-2xl p-6 border border-[#e8e4da]" style={{ animationDelay: "160ms" }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#e8f5e0] flex items-center justify-center text-[16px] shrink-0">
                  💳
                </div>
                <div>
                  <span className="text-[11px] text-[#999] tracking-[0.1em] uppercase font-sans">Step 03</span>
                  <h2 className="text-[20px] sm:text-[22px] font-normal text-[#1a1a1a] leading-tight">Payment</h2>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-relaxed">
                Payment is handled securely by Stripe. After placing your order, you&apos;ll be
                redirected to Stripe Checkout to enter your card details.
              </p>
            </div>

          </div>

          {/* RIGHT — order summary */}
          <div className="animate-fade-in-up bg-white rounded-2xl p-6 border border-[#e8e4da] lg:sticky lg:top-20" style={{ animationDelay: "240ms" }}>
            <h3 className="text-[20px] font-normal text-[#1a1a1a] mb-5">Order</h3>

            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-[14px] text-[#444] mb-3">
                <span>
                  {item.product?.name || "Product"} ({item.quantity} {item.product?.unit})
                </span>
                <span className="shrink-0 ml-4">
                  ${(Number(item.product?.priceUsd || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between text-[14px] text-[#888] pt-3 border-t border-[#eee] mb-5">
              <span>Delivery</span>
              <span>${DELIVERY_FEE.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-[11px] tracking-[0.12em] uppercase text-[#888] font-sans">Total</span>
              <span className="text-[30px] sm:text-[32px] font-normal text-[#1a1a1a]">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full py-4 bg-[#1e4d14] text-white rounded-full text-[15px] sm:text-[16px] font-semibold hover:bg-[#2d5a1b] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {placing ? "Redirecting to Stripe..." : "Continue to payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
