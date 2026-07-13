"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const perspectives = [
  {
    number: "01",
    title: "For Consumers",
    description:
      "Browse what's in season this week, follow your favorite farms, and track every order from harvest to doorstep.",
    features: [
      "Search & filter produce",
      "Order tracking",
      "Purchase history",
      "Profile management",
    ],
    cta: "Customer dashboard →",
    href: "/dashboard/customer",
    role: "customer",
    featured: false,
  },
  {
    number: "02",
    title: "For Farmers",
    description:
      "Turn your harvest into a storefront. Manage inventory, fulfill orders, and watch your revenue grow.",
    features: [
      "Inventory management",
      "Order fulfillment",
      "Sales analytics",
      "Pricing tools",
    ],
    cta: "Farmer portal →",
    href: "/dashboard/farmer",
    role: "farmer",
    featured: true,
  },
  {
    number: "03",
    title: "For Administrators",
    description:
      "Govern the platform — verify growers, manage categories, and monitor every transaction in one console.",
    features: [
      "Farmer accounts",
      "Order oversight",
      "Revenue reports",
      "Platform analytics",
    ],
    cta: "Admin console →",
    href: "/dashboard/admin",
    role: "admin",
    featured: false,
  },
];

export default function PerspectivesSection() {
  const { user } = useAuth();
  const visiblePerspectives = user
    ? perspectives.filter((p) => p.role === user.role)
    : perspectives;

  return (
    <section className="bg-[#f5f2eb] py-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7a8a6a] mb-3">
            Built for Three
          </p>
          <h2
            className="text-[28px] sm:text-[40px] font-semibold text-[#1c2b1a] leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            One ecosystem, three perspectives.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {visiblePerspectives.map((p) => (
            <div
              key={p.number}
              className={`rounded-2xl flex flex-col p-8 ${
                p.featured
                  ? "bg-[#1e3d18] text-white"
                  : "bg-white border border-[#e8e2d8] text-[#1c2b1a]"
              }`}
            >
              {/* Number badge */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-medium mb-8 ${
                  p.featured
                    ? "bg-white/15 text-white/80"
                    : "bg-[#f0ece4] text-[#7a8a6a]"
                }`}
              >
                {p.number}
              </div>

              {/* Title */}
              <h3
                className={`text-[24px] font-semibold mb-3 leading-tight ${
                  p.featured ? "text-white" : "text-[#1c2b1a]"
                }`}
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p
                className={`text-[14px] leading-[1.7] mb-6 ${
                  p.featured ? "text-white/75" : "text-[#5a6a52]"
                }`}
              >
                {p.description}
              </p>

              {/* Feature list */}
              <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-3 text-[13.5px] ${
                      p.featured ? "text-white/80" : "text-[#5a6a52]"
                    }`}
                  >
                    <span
                      className={`shrink-0 font-medium ${
                        p.featured ? "text-white/50" : "text-[#9aaa8a]"
                      }`}
                    >
                      —
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <Link
                href={p.href}
                className={`w-full py-3 rounded-full text-[13.5px] font-medium text-center transition-colors ${
                  p.featured
                    ? "bg-white text-[#1e3d18] hover:bg-white/90"
                    : "border border-[#c8d0b8] text-[#1c2b1a] hover:bg-[#f0ece4]"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}