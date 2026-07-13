const sections = [
  {
    title: "Using AgriConnect",
    body: "By creating an account, you agree to provide accurate information and to use the marketplace only for lawful buying and selling of produce.",
  },
  {
    title: "Farmer accounts",
    body: "Farmers are responsible for the accuracy of their product listings, including pricing, availability, and quality. Listings that misrepresent a product may be removed.",
  },
  {
    title: "Orders and payment",
    body: "Placing an order is a commitment to purchase at the listed price. Payments are processed through AgriConnect and released to farmers once a delivery is confirmed.",
  },
  {
    title: "Cancellations and disputes",
    body: "Cancellation windows vary by farmer and order status. If an order arrives damaged, incomplete, or not as described, open a support ticket and our team will help resolve it.",
  },
  {
    title: "Account suspension",
    body: "We may suspend or remove accounts that violate these terms, misuse the platform, or repeatedly fail to fulfill orders.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms as the platform evolves. Continued use of AgriConnect after an update means you accept the revised terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            Legal
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Terms of Service
          </h1>

          <p className="text-[14px] text-[#9aaa8a] mb-10">Last updated July 2026</p>

          <div className="flex flex-col gap-8">
            {sections.map((section) => (
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
