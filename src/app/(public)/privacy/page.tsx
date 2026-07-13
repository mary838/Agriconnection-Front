"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { dict } = useLanguage();
  const { privacyPage } = dict;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            {privacyPage.eyebrow}
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {privacyPage.title}
          </h1>

          <p className="text-[14px] text-[#9aaa8a] mb-10">{privacyPage.lastUpdated}</p>

          <div className="flex flex-col gap-8">
            {privacyPage.sections.map((section) => (
              <div key={section.title}>
                <p
                  className="text-[18px] font-medium text-[#1c2b1a] mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {section.title}
                </p>
                <p className="text-[14.5px] text-[#5a6a52] leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
