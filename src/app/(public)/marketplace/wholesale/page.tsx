import Link from "next/link";
import { Boxes, Truck, ReceiptText } from "lucide-react";

const steps = [
  {
    icon: Boxes,
    title: "Tell us your volume",
    body: "Restaurants, markets, and co-ops can order in bulk quantities beyond what's listed for individual customers.",
  },
  {
    icon: ReceiptText,
    title: "Get a standing rate",
    body: "Wholesale accounts get a fixed price per unit for the season instead of per-order marketplace pricing.",
  },
  {
    icon: Truck,
    title: "Recurring delivery",
    body: "Set a weekly or monthly delivery schedule directly with the farm supplying your order.",
  },
];

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            Wholesale
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Bulk produce, straight from the farm
          </h1>

          <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
            AgriConnect works with restaurants, grocers, and community kitchens that need
            more than a weekly grocery order. Wholesale accounts buy directly from our
            farmers at volume pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1e3d18] text-white text-[11px] font-semibold flex items-center justify-center">
                  {i + 1}
                </span>
                <Icon size={16} className="text-[#2d5a1b]" />
              </div>
              <p
                className="text-[16px] font-medium text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {title}
              </p>
              <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1e3d18] rounded-3xl px-8 py-10 sm:px-14 sm:py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-lg">
            <p
              className="text-[24px] sm:text-[28px] font-semibold text-white leading-tight mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Ready to set up a wholesale account?
            </p>
            <p className="text-[14px] text-white/70 leading-relaxed">
              Reach out with your business name, expected volume, and delivery area, and
              our team will match you with farmers who can fulfill it.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="mailto:wholesale@agriconnect.example?subject=Wholesale%20inquiry"
              className="bg-white text-[#1e3d18] text-[14px] font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Email wholesale team
            </a>
            <Link
              href="/support"
              className="text-[14px] font-medium text-white border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
