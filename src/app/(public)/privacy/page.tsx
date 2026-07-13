const sections = [
  {
    title: "What we collect",
    body: "We collect the information you give us directly — your name, email, phone number, delivery address, and payment details — along with order and browsing activity needed to run the marketplace.",
  },
  {
    title: "How we use it",
    body: "Your information is used to process orders, connect you with the right farmer or customer, send order and account notifications, and improve the marketplace experience. We do not sell your personal data.",
  },
  {
    title: "Sharing with farmers and customers",
    body: "When you place an order, the farmer fulfilling it can see your name, delivery address, and order details. Farmers' business details are visible to customers browsing the marketplace.",
  },
  {
    title: "Data retention",
    body: "We keep account and order records for as long as your account is active, and for a limited period afterward to meet accounting and legal obligations.",
  },
  {
    title: "Your choices",
    body: "You can review and update your profile information at any time from your dashboard, or contact support to request deletion of your account.",
  },
];

export default function PrivacyPage() {
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
            Privacy Policy
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
