"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  payouts as payoutsApi,
  farmers as farmersApi,
  getToken,
  ApiError,
  type Farmer,
} from "@/lib/api";

export default function NewPayoutPage() {
  const router = useRouter();

  const [farmerList, setFarmerList] = useState<Farmer[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    farmerId: "",
    amountUsd: "",
    amountKhr: "",
    payoutDate: "",
    reference: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!getToken()) {
      router.push("/login");
      return;
    }

    farmersApi
      .list()
      .then((data) => {
        setFarmerList(data);
        if (data.length > 0) {
          setForm((prev) => ({ ...prev, farmerId: data[0].id }));
        }
      })
      .catch((err: unknown) =>
        setError(err instanceof ApiError || err instanceof Error ? err.message : "Failed to load farmers.")
      )
      .finally(() => setPageLoading(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.farmerId) return setError("Please select a farmer.");
    if (!form.amountUsd) return setError("Please enter the amount in USD.");
    if (!form.payoutDate) return setError("Please select a payout date.");

    try {
      setLoading(true);
      setError("");

      if (!getToken()) {
        router.push("/login");
        return;
      }

      await payoutsApi.create({
        farmerId: form.farmerId,
        amountUsd: Number(form.amountUsd),
        amountKhr: form.amountKhr ? Number(form.amountKhr) : undefined,
        payoutDate: form.payoutDate,
        reference: form.reference.trim() || undefined,
      });

      router.push("/dashboard/admin/payouts");
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#faf8f3] flex items-center justify-center text-[#1c2b1a]">
        Loading…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 sm:px-8 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/dashboard/admin/payouts" className="text-sm text-[#7a8a6a] hover:text-[#2d5a1b] transition-colors">
          ← Back to payouts
        </Link>

        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mt-8 mb-2">
          Admin Console
        </p>

        <h1 className="text-[32px] sm:text-[42px] text-[#1c2b1a] mb-8" style={{ fontFamily: "Georgia, serif" }}>
          New Payout
        </h1>

        <form
          onSubmit={handleSubmit}
          className="animate-fade-in-up bg-white border border-[#e0dbd0] rounded-3xl p-8 flex flex-col gap-5"
        >
          <div>
            <label className={labelClass}>Farmer</label>
            <select
              value={form.farmerId}
              onChange={(e) => update("farmerId", e.target.value)}
              className={inputClass}
              required
            >
              {farmerList.length === 0 && <option value="">No farmers available</option>}
              {farmerList.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.farmName || f.farmerCode}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Amount (USD)"
            type="number"
            placeholder="100.50"
            value={form.amountUsd}
            onChange={(v) => update("amountUsd", v)}
            required
          />

          <Input
            label="Amount (KHR)"
            type="number"
            placeholder="410000"
            value={form.amountKhr}
            onChange={(v) => update("amountKhr", v)}
          />

          <Input
            label="Payout Date"
            type="date"
            value={form.payoutDate}
            onChange={(v) => update("payoutDate", v)}
            required
          />

          <Input
            label="Reference"
            placeholder="ABA-REF-001"
            value={form.reference}
            onChange={(v) => update("reference", v)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3d18] text-white text-[15px] font-semibold py-4 rounded-full hover:bg-[#2d5a1b] active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading ? "Creating payout…" : "Create Payout"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        step={type === "number" ? "0.01" : undefined}
        className={inputClass}
      />
    </div>
  );
}

const labelClass = "block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2";

const inputClass =
  "w-full px-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors";
