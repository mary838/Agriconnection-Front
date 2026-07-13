"use client";

import Link from "next/link";
import { Sprout, MapPin, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [ShieldCheck, Sprout, MapPin];

export default function OurFarmersPage() {
  const { dict } = useLanguage();
  const { ourFarmersPage } = dict;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            {ourFarmersPage.eyebrow}
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {ourFarmersPage.title}
          </h1>

          <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
            {ourFarmersPage.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {ourFarmersPage.principles.map(({ title, body }, i) => {
            const Icon = icons[i];
            return (
              <div
                key={title}
                className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center">
                  <Icon size={18} />
                </div>
                <p
                  className="text-[16px] font-medium text-[#1c2b1a]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {title}
                </p>
                <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">{body}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-[#1e3d18] rounded-3xl px-8 py-10 sm:px-14 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-lg">
            <p
              className="text-[24px] sm:text-[28px] font-semibold text-white leading-tight mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {ourFarmersPage.ctaTitle}
            </p>
            <p className="text-[14px] text-white/70 leading-relaxed">
              {ourFarmersPage.ctaDescription}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/register/farmer"
              className="bg-white text-[#1e3d18] text-[14px] font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              {ourFarmersPage.becomeFarmer}
            </Link>
            <Link
              href="/marketplace"
              className="text-[14px] font-medium text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {ourFarmersPage.browseProduce}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
