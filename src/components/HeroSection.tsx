"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import heroiage from "@/assets/hero-section.jpg";
import { useAuth } from "@/context/AuthContext";
import api, { PublicStats } from "@/lib/api";

const FALLBACK_STATS: PublicStats = {
  activeFarms: 420,
  ordersFulfilled: 18000,
  organicStandard: 100,
  latestHarvest: null,
};

function formatCount(value: number): string {
  if (value >= 1000) {
    const thousands = value / 1000;
    return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}k+`;
  }
  return `${value}+`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

function formatHarvestTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatHarvestDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function HeroSection() {
  const { user } = useAuth();
  const canSellAsFarmer = !user || user.role === "farmer";

  const [stats, setStats] = useState<PublicStats>(FALLBACK_STATS);

  useEffect(() => {
    let active = true;
    api.stats
      .public()
      .then((data) => {
        if (active) setStats(data);
      })
      .catch(() => {
        // Keep the fallback stats if the request fails.
      });
    return () => {
      active = false;
    };
  }, []);

  const harvest = stats.latestHarvest;
  const harvestedToday = harvest
    ? isSameDay(new Date(harvest.harvestedAt), new Date())
    : false;

  return (
    <section className="min-h-[calc(100vh-52px)] bg-[#f5f2eb] flex items-center">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text content */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow */}
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#7a8a6a] uppercase">
              Est. 2026 — Field to Front Door
            </p>

            {/* Headline */}
            <div>
              <h1
                className="text-[38px] sm:text-[52px] lg:text-[68px] leading-[1.05] font-semibold text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Rooted in honesty.
              </h1>
              <h1
                className="text-[38px] sm:text-[52px] lg:text-[68px] leading-[1.05] font-normal italic text-[#6b7c5a]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Picked at dawn.
              </h1>
            </div>

            {/* Description */}
            <p className="text-[15px] text-[#5a6a52] leading-[1.7] max-w-[480px]">
              A direct marketplace where small-scale farmers meet conscious kitchens.
              Track every harvest from the field to your basket — no warehouses, no middlemen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Link
                href="/marketplace"
                className="flex items-center gap-2 bg-[#2d5a1b] text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#3a7322] transition-colors"
              >
                Shop today's harvest
                <ArrowRight size={15} />
              </Link>
              {canSellAsFarmer && (
                <Link
                  href="/dashboard/farmer"
                  className="text-[14px] font-medium text-[#2d5a1b] border border-[#2d5a1b] px-6 py-3 rounded-full hover:bg-[#2d5a1b]/5 transition-colors"
                >
                  Sell as a farmer
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-start gap-8 sm:gap-12 mt-6 pt-6 border-t border-[#ddd8cc]">
              <div>
                <p
                  className="text-[32px] sm:text-[36px] font-semibold text-[#1c2b1a] leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {formatCount(stats.activeFarms)}
                </p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#7a8a6a] mt-1 font-medium">
                  Active Farms
                </p>
              </div>
              <div>
                <p
                  className="text-[32px] sm:text-[36px] font-semibold text-[#1c2b1a] leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {formatCount(stats.ordersFulfilled)}
                </p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#7a8a6a] mt-1 font-medium">
                  Orders Fulfilled
                </p>
              </div>
              <div>
                <p
                  className="text-[32px] sm:text-[36px] font-semibold text-[#1c2b1a] leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {stats.organicStandard}%
                </p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#7a8a6a] mt-1 font-medium">
                  Organic Standard
                </p>
              </div>
            </div>
          </div>

          {/* Right: Image + floating card */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Main image */}
            <div className="relative w-full max-w-[420px] lg:max-w-[500px]">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#d8e0c8]">
                <img
                           src={heroiage.src}
         alt="Farmer holding a crate of fresh vegetables"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback gradient if image fails
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              {/* Floating harvest card */}
              <div className="absolute bottom-8 left-4 sm:-left-8 lg:-left-12 bg-white rounded-2xl shadow-lg px-5 py-4 min-w-[180px]">
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#7a8a6a] mb-1">
                  {harvest && !harvestedToday ? "Last Harvest" : "Harvested Today"}
                </p>
                <p
                  className="text-[28px] font-semibold text-[#1c2b1a] leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {harvest
                    ? harvestedToday
                      ? formatHarvestTime(harvest.harvestedAt)
                      : formatHarvestDate(harvest.harvestedAt)
                    : "4:12 AM"}
                </p>
                <p className="text-[13px] text-[#5a6a52] mt-1">
                  {harvest ? harvest.farmName : "North Valley Farm"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}