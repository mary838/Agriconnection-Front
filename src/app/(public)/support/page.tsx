"use client";

import Link from "next/link";
import { Mail, LifeBuoy, HelpCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const faqs = [
  {
    q: "How do I track an order?",
    a: "Log in and open Orders from your dashboard. Each order shows its current status, from confirmed through delivered.",
  },
  {
    q: "How do I become a farmer on AgriConnect?",
    a: "Head to the farmer registration page and submit your details. Your account is reviewed before you can list products.",
  },
  {
    q: "What if a delivery arrives damaged or incomplete?",
    a: "Open a support ticket from your dashboard with your order number — our team will follow up directly with you and the farmer.",
  },
  {
    q: "How do farmers get paid?",
    a: "Payouts are processed per order once a delivery is confirmed. Farmers can review payout history from their dashboard.",
  },
];

const dashboardSupportPath: Record<string, string> = {
  farmer: "/dashboard/farmer/support",
  customer: "/dashboard/customer/support",
  admin: "/dashboard/admin/support",
};

export default function SupportPage() {
  const { user } = useAuth();
  const ticketPath = user ? dashboardSupportPath[user.role] : null;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            Support
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            How can we help?
          </h1>

          <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
            Check the answers below, or reach out directly and our team will get back
            to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {faqs.map((item) => (
              <div key={item.q} className="bg-white border border-[#ede8df] rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle size={16} className="text-[#2d5a1b] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[14.5px] font-medium text-[#1c2b1a] mb-1.5">
                      {item.q}
                    </p>
                    <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center">
                <LifeBuoy size={18} />
              </div>
              <p className="text-[15px] font-medium text-[#1c2b1a]">
                Have an account already?
              </p>
              <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">
                Open a ticket from your dashboard and we&apos;ll track it against your
                account and order history.
              </p>
              <Link
                href={ticketPath ?? "/login?redirect=/support"}
                className="mt-1 text-center bg-[#1e3d18] text-white text-[13.5px] font-medium px-5 py-2.5 rounded-full hover:bg-[#2d5a1b] transition-colors"
              >
                {ticketPath ? "Open a support ticket" : "Log in to open a ticket"}
              </Link>
            </div>

            <div className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center">
                <Mail size={18} />
              </div>
              <p className="text-[15px] font-medium text-[#1c2b1a]">Email us directly</p>
              <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">
                For anything else, or if you don&apos;t have an account yet.
              </p>
              <a
                href="mailto:admin@agriconnect.com"
                className="mt-1 text-center border border-[#e0dbd0] text-[#1c2b1a] text-[13.5px] font-medium px-5 py-2.5 rounded-full hover:border-[#2d5a1b] hover:text-[#2d5a1b] transition-colors"
              >
                admin@agriconnect.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
