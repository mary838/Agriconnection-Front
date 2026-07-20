"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#f7f6f2]" style={{ fontFamily: "Georgia, serif" }}>
      <Navbar />

      <div className="max-w-screen-sm mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="animate-pop-in w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
          <XCircle size={32} />
        </div>

        <h1 className="animate-fade-in-up text-[32px] sm:text-[42px] font-normal text-[#1a1a1a] mb-4" style={{ animationDelay: "100ms" }}>
          Payment canceled
        </h1>

        <p className="animate-fade-in-up text-[15px] text-[#666] leading-relaxed mb-8" style={{ animationDelay: "160ms" }}>
          Your payment was canceled and you have not been charged. Your order is still
          waiting — you can pick up checkout again whenever you&apos;re ready.
        </p>

        <div className="animate-fade-in-up flex flex-col sm:flex-row gap-3 justify-center" style={{ animationDelay: "220ms" }}>
          <Link
            href="/checkout"
            className="px-6 py-3 bg-[#1e4d14] text-white rounded-full text-[14px] font-semibold hover:bg-[#2d5a1b] active:scale-95 transition-all"
          >
            Try again
          </Link>
          <Link
            href="/cart"
            className="px-6 py-3 border border-[#d8d4c8] text-[#444] rounded-full text-[14px] font-semibold hover:border-[#2d5a1b] hover:text-[#2d5a1b] active:scale-95 transition-all"
          >
            Back to basket
          </Link>
        </div>
      </div>
    </div>
  );
}
