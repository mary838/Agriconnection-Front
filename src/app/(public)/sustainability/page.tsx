"use client";

import { Leaf, Truck, Recycle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Truck, Leaf, Recycle];

export default function SustainabilityPage() {
  const { dict } = useLanguage();
  const { sustainabilityPage } = dict;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            {sustainabilityPage.eyebrow}
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {sustainabilityPage.title}
          </h1>

          <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
            {sustainabilityPage.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {sustainabilityPage.commitments.map(({ title, body }, i) => {
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
      </div>
    </div>
  );
}
