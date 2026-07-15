"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const images = [
  {
    src: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80",
    alt: "Fresh strawberries in a wooden basket",
    className: "row-start-1 col-start-1",
  },
  {
    src: "https://images.unsplash.com/photo-1582169505937-b9992bd01ed9?w=600&q=80",
    alt: "Brown eggs in a carton",
    className: "row-start-1 col-start-2 mt-6",
  },
  {
    src: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
    alt: "Jar of wildflower honey",
    className: "row-start-2 col-start-1",
  },
  {
    src: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&q=80",
    alt: "Rainbow carrots in a basket",
    className: "row-start-2 col-start-2 mt-6",
  },
];

export default function RealFarmsSection() {
  const { dict } = useLanguage();

  return (
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: 2x2 staggered image grid */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden bg-[#e8e0d0] aspect-[4/3] ${
                  i % 2 === 1 ? "mt-6" : ""
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right: Text */}
          <div className="flex flex-col gap-5">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7a8a6a]">
              {dict.realFarms.eyebrow}
            </p>

            <h2
              className="text-[32px] sm:text-[44px] font-semibold leading-[1.1] text-[#1c2b1a]"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {dict.realFarms.titleMain}{" "}
              <span className="font-normal italic text-[#4a5a42]">{dict.realFarms.titleItalic}</span>
            </h2>

            <p className="text-[15px] text-[#5a6a52] leading-[1.75] max-w-[420px]">
              {dict.realFarms.description}
            </p>

            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#2d5a1b] underline underline-offset-4 hover:text-[#1e3d18] transition-colors w-fit mt-2"
            >
              {dict.realFarms.cta}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}