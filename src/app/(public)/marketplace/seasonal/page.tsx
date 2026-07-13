import Link from "next/link";
import { CalendarDays, Package, Leaf } from "lucide-react";

const boxes = [
  {
    name: "Sunrise Box",
    cadence: "Weekly",
    body: "A rotating mix of whatever's peaking that week — leafy greens, roots, and fruit picked within days of delivery.",
  },
  {
    name: "Harvest Table Box",
    cadence: "Bi-weekly",
    body: "A larger spread built for households cooking most meals at home, sized for four to six people.",
  },
  {
    name: "Single Farm Box",
    cadence: "Monthly",
    body: "Everything sourced from one farmer, so you get to know a single grower's soil, season, and specialties.",
  },
];

export default function SeasonalBoxesPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            Seasonal Boxes
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Let the season pick for you
          </h1>

          <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
            Instead of browsing product by product, a seasonal box brings you whatever
            is freshest right now, curated from nearby farms and delivered on a schedule
            that suits your kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {boxes.map((box) => (
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
              <p className="text-[15px] font-medium text-[#1c2b1a] mb-1">Packed to order</p>
              <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">
                Boxes are assembled after farmers confirm what&apos;s ready to pick, so contents
                shift naturally with the season.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white border border-[#ede8df] rounded-2xl p-6">
            <div className="w-10 h-10 rounded-full bg-[#eaf2e4] text-[#1e6b42] flex items-center justify-center shrink-0">
              <Leaf size={18} />
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#1c2b1a] mb-1">No two weeks alike</p>
              <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">
                Expect variety — a box in spring looks very different from one in late
                summer or harvest season.
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
              Seasonal boxes are coming soon
            </p>
            <p className="text-[14px] text-white/70 leading-relaxed">
              We&apos;re rolling this out with our first group of farmers. In the meantime,
              browse the full marketplace for what&apos;s fresh today.
            </p>
          </div>

          <Link
            href="/marketplace"
            className="bg-white text-[#1e3d18] text-[14px] font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap shrink-0"
          >
            Browse produce
          </Link>
        </div>
      </div>
    </div>
  );
}
