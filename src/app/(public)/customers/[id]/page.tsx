"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Phone, Send, ArrowLeft } from "lucide-react";
import {
  customers as customersApi,
  getToken,
  ApiError,
  type Customer,
} from "@/lib/api";

export default function CustomerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!getToken()) {
          router.push(`/login?redirect=/customers/${customerId}`);
          return;
        }

        const data = await customersApi.get(customerId);
        setCustomer(data);
      } catch (err: unknown) {
        const message =
          err instanceof ApiError || err instanceof Error
            ? err.message
            : "Something went wrong.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-[#1c2b1a]">
        Loading customer profile...
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-red-500">
        {error || "Customer not found."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-[13px] text-[#7a8a6a] hover:text-[#2d5a1b] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to orders
        </button>

        <div className="max-w-xl">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 shrink-0 rounded-full bg-[#b8cfa8] flex items-center justify-center text-[#1e3d18] text-[22px] font-semibold">
              {customer.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1
                className="text-[28px] sm:text-[32px] font-semibold text-[#1c2b1a] leading-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {customer.name}
              </h1>
              <p className="text-[13.5px] text-[#7a8a6a] mt-1">
                Customer on AgriConnect
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#9aaa8a] mb-1">
              Delivery contact
            </p>

            {customer.phone && (
              <div className="flex items-center gap-2.5 text-[14px] text-[#1c2b1a]">
                <Phone size={15} className="text-[#2d5a1b] shrink-0" />
                {customer.phone}
              </div>
            )}

            {customer.telegramPhone && (
              <div className="flex items-center gap-2.5 text-[14px] text-[#1c2b1a]">
                <Send size={15} className="text-[#2d5a1b] shrink-0" />
                {customer.telegramPhone}
              </div>
            )}

            {(customer.address || customer.district || customer.province?.name) && (
              <div className="flex items-start gap-2.5 text-[13.5px] text-[#5a6a52] pt-2 border-t border-[#ede8df] mt-1">
                <MapPin size={14} className="text-[#9aaa8a] shrink-0 mt-0.5" />
                <span>
                  {[customer.address, customer.district, customer.province?.name]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>
            )}

            {!customer.phone && !customer.telegramPhone && !customer.address && (
              <p className="text-[13.5px] text-[#9aaa8a]">
                No contact details on file yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
