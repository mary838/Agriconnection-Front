"use client";

import Link from "next/link";
import { CalendarDays, Package, Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function SeasonalBoxesPage() {
  const { dict } = useLanguage();
  const { seasonalPage } = dict;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            {seasonalPage.eyebrow}
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {seasonalPage.title}
          </h1>

          <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
            {seasonalPage.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {seasonalPage.boxes.map((box) => (
            <div
              key={box.name}
              className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3"
            >
              <span className="inline-flex items-center gap-1.5 w-fit text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1 rounded-full bg-[#1e3d18] text-white">
                <CalendarDays size={11} />
                {box.cadence}
              </span>
              <p
                className="text-[18px] font-medium text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {box.name}
              </p>
              <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">{box.body}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          <div className="flex items-start gap-4 bg-white border border-[#ede8df] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center shrink-0">
              <Package size={18} />
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#1c2b1a] mb-1">
                {seasonalPage.packedTitle}
              </p>
              <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">
                {seasonalPage.packedBody}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-[#ede8df] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center shrink-0">
              <Leaf size={18} />
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#1c2b1a] mb-1">
                {seasonalPage.varietyTitle}
              </p>
              <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">
                {seasonalPage.varietyBody}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#1e3d18] rounded-3xl px-8 py-10 sm:px-14 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-lg">
            <p
              className="text-[24px] sm:text-[28px] font-semibold text-white leading-tight mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {seasonalPage.ctaTitle}
            </p>
            <p className="text-[14px] text-white/70 leading-relaxed">
              {seasonalPage.ctaDescription}
            </p>
          </div>

          <Link
            href="/marketplace"
            className="bg-white text-[#1e3d18] text-[14px] font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap shrink-0"
          >
            {seasonalPage.browseProduce}
          </Link>
        </div>
      </div>
    </div>
  );
}
