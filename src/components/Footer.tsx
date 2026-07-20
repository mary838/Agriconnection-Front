"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { user } = useAuth();
  const { dict } = useLanguage();

  const marketplace = [
    { label: dict.footer.freshHarvest, href: "/marketplace" },
    { label: dict.footer.ourFarmers, href: "/marketplace/farmers" },
    { label: dict.footer.seasonalBoxes, href: "/marketplace/seasonal" },
    { label: dict.footer.wholesale, href: "/marketplace/wholesale" },
  ];

  const platform = [
    { label: dict.footer.farmerPortal, href: "/dashboard/farmer", role: "farmer" },
    { label: dict.footer.adminConsole, href: "/dashboard/admin", role: "admin" },
    { label: dict.footer.apiDocs, href: "/docs" },
    { label: dict.footer.support, href: "/support" },
  ];

  const bottomLinks = [
    { label: dict.footer.privacy, href: "/privacy" },
    { label: dict.footer.terms, href: "/terms" },
    { label: dict.footer.sustainability, href: "/sustainability" },
  ];

  const visiblePlatformLinks = platform.filter(
    (link) => !link.role || !user || user.role === link.role
  );

  return (
    <footer className="bg-[#3b2d1f]">
      {/* Main footer content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand column */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link
              href="/"
              className="text-white text-[22px] font-semibold italic tracking-tight w-fit"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              AgriConnect
            </Link>
            <p className="text-[14px] text-white/50 leading-[1.75] max-w-[280px]">
              {dict.footer.description}
            </p>
          </div>

          {/* Marketplace column */}
          <div className="flex flex-col gap-5">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40">
              {dict.footer.marketplaceTitle}
            </p>
            <ul className="flex flex-col gap-3">
              {marketplace.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform column */}
          <div className="flex flex-col gap-5">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/40">
              {dict.footer.platformTitle}
            </p>
            <ul className="flex flex-col gap-3">
              {visiblePlatformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/35">
            {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            {bottomLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}