import { Leaf, Truck, Recycle } from "lucide-react";

const commitments = [
  {
    icon: Truck,
    title: "Shorter supply chains",
    body: "Produce moves directly from farmer to customer, cutting out the storage and transport steps that add food miles and spoilage.",
  },
  {
    icon: Leaf,
    title: "Sustainable growing practices",
    body: "We prioritize farmers who grow with soil health in mind — crop rotation, reduced chemical inputs, and water-conscious irrigation.",
  },
  {
    icon: Recycle,
    title: "Less waste",
    body: "Because orders are placed against real, current inventory, farmers harvest closer to what's actually needed instead of overproducing.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            Sustainability
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Grown with intent
          </h1>

          <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
            A direct marketplace is, by design, a lighter footprint — fewer intermediaries,
            fresher produce, and less waste between the field and your table.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {commitments.map(({ icon: Icon, title, body }) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
