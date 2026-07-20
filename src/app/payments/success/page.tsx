"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f6f2]" style={{ fontFamily: "Georgia, serif" }}>
      <Navbar />

      <div className="max-w-screen-sm mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="animate-pop-in w-16 h-16 rounded-full bg-[#e8f5e0] text-[#2d5a1b] flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} />
        </div>

        <h1 className="animate-fade-in-up text-[32px] sm:text-[42px] font-normal text-[#1a1a1a] mb-4" style={{ animationDelay: "100ms" }}>
          Payment successful
        </h1>

        <p className="animate-fade-in-up text-[15px] text-[#666] leading-relaxed mb-2" style={{ animationDelay: "160ms" }}>
          Thanks for your order! Stripe has confirmed your payment and we&apos;re getting
          it ready for delivery.
        </p>

        {sessionId && (
          <p className="animate-fade-in-up text-[12px] text-[#999] mb-8 font-sans break-all" style={{ animationDelay: "200ms" }}>
            Reference: {sessionId}
          </p>
        )}

        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-3 justify-center mt-8" style={{ animationDelay: "240ms" }}>
          <Link
            href="/dashboard/customer/orders"
            className="px-6 py-3 bg-[#1e4d14] text-white rounded-full text-[14px] font-semibold hover:bg-[#2d5a1b] active:scale-95 transition-all"
          >
            View my orders
          </Link>
          <Link
            href="/marketplace"
            className="px-6 py-3 border border-[#d8d4c8] text-[#444] rounded-full text-[14px] font-semibold hover:border-[#2d5a1b] hover:text-[#2d5a1b] active:scale-95 transition-all"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
