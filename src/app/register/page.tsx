"use client";

import Link from "next/link";

export default function RegisterChoicePage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[52%] bg-[#1e3d18] flex-col justify-between p-10">
        <div className="text-white text-[18px] font-medium" style={{ fontFamily: "Georgia, serif" }}>
          AgriConnect
        </div>

        <div className="max-w-[430px]">
          <h1 className="text-white text-[48px] leading-tight mb-5" style={{ fontFamily: "Georgia, serif" }}>
            Choose your{" "}
            <em className="font-normal italic text-[#a8c898]">AgriConnect path.</em>
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed">
            Buy fresh produce as a customer or sell your harvest as a farmer.
          </p>
        </div>

        <p className="text-white/30 text-[12px]">© 2026 AgriConnect Collective</p>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#faf8f3]/85" />

        <div className="relative z-10 w-full max-w-[620px]">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2">
            Get started
          </p>

          <h2
            className="text-[28px] sm:text-[38px] font-normal text-[#1c2b1a] mb-8"
            style={{ fontFamily: "Georgia, serif" }}
          >
            What do you want to do?
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <Link
              href="/register/customer"
              className="bg-white border border-[#e0dbd0] rounded-3xl p-6 hover:border-[#2d5a1b] transition-colors"
            >
              <div className="text-[36px] mb-4">🛒</div>
              <h3 className="text-[#1c2b1a] text-[22px] font-semibold mb-2">
                I want to buy
              </h3>
              <p className="text-[#7a8a6a] text-[14px] leading-relaxed mb-6">
                Create a customer account to shop fresh products from local farmers.
              </p>
              <span className="inline-block bg-[#1e3d18] text-white text-[14px] font-semibold px-5 py-3 rounded-full">
                Continue as Customer
              </span>
            </Link>

            <Link
              href="/register/farmer"
              className="bg-white border border-[#e0dbd0] rounded-3xl p-6 hover:border-[#2d5a1b] transition-colors"
            >
              <div className="text-[36px] mb-4">🌾</div>
              <h3 className="text-[#1c2b1a] text-[22px] font-semibold mb-2">
                I want to sell
              </h3>
              <p className="text-[#7a8a6a] text-[14px] leading-relaxed mb-6">
                Create a farmer account to list products and manage farm orders.
              </p>
              <span className="inline-block bg-[#1e3d18] text-white text-[14px] font-semibold px-5 py-3 rounded-full">
                Continue as Farmer
              </span>
            </Link>
          </div>

          <p className="text-center text-[13px] text-[#9aaa8a] mt-7">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-[#1c2b1a] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}