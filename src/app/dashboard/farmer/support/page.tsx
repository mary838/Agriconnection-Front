"use client";

import { useEffect, useState } from "react";
import { LifeBuoy } from "lucide-react";
import {
  profile as profileApi,
  farmers as farmersApi,
  supportTickets as supportTicketsApi,
  getToken,
  ApiError,
  type User,
  type Farmer,
  type SupportTicket,
} from "@/lib/api";
import FarmerSidebar from "@/components/FarmerSidebar";

function statusBadgeClass(status: string) {
  const s = status.toLowerCase();
  if (s === "resolved" || s === "closed") return "bg-[#dff7ea] text-[#008454]";
  if (s === "in_progress") return "bg-[#fff0cf] text-[#b17400]";
  return "bg-[#eef2ff] text-[#4338ca]";
}

export default function FarmerSupportPage() {
  const [user, setUser] = useState<User | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fetchTickets = async () => {
    const mine = await supportTicketsApi.mine();
    setTickets(mine);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);

        const farmersData = await farmersApi.list();
        const currentFarmer = farmersData.find((item) => item.userId === profileData.id);
        if (currentFarmer) setFarmer(currentFarmer);

        await fetchTickets();
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    try {
      setSubmitting(true);
      setSubmitError("");
      await supportTicketsApi.create({ subject: subject.trim(), message: message.trim() });
      setSubject("");
      setMessage("");
      await fetchTickets();
    } catch (err: unknown) {
      const errMessage =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Failed to submit ticket.";
      setSubmitError(errMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        Loading support tickets...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <FarmerSidebar active="Support" user={user} farmer={farmer} />

      <section className="flex-1 px-12 py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
          Farmer Portal
        </p>
        <h1 className="text-[42px] leading-[0.95] mb-10" style={{ fontFamily: "Georgia, serif" }}>
          Support
        </h1>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8">
          <section className="bg-white rounded-3xl p-8 border border-[#e6dfd2] h-fit">
            <h2 className="text-2xl mb-6" style={{ fontFamily: "Georgia, serif" }}>
              New ticket
            </h2>

            {submitError && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-sm">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-semibold uppercase tracking-wide text-[#7a8a6a] mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Payout hasn't arrived yet"
                  className="w-full rounded-xl border border-[#e1d8ca] px-4 py-3 text-sm focus:outline-none focus:border-[#1e6b42]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold uppercase tracking-wide text-[#7a8a6a] mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Describe the issue..."
                  className="w-full rounded-xl border border-[#e1d8ca] px-4 py-3 text-sm focus:outline-none focus:border-[#1e6b42] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-full bg-[#174832] text-white px-6 py-3 text-sm font-semibold hover:bg-[#123a27] disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit ticket"}
              </button>
            </form>
          </section>

          <section>
            <h2 className="text-2xl mb-6" style={{ fontFamily: "Georgia, serif" }}>
              Your tickets
            </h2>

            {tickets.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-[#e6dfd2] flex flex-col items-center text-center">
                <LifeBuoy size={28} className="text-[#c9cdbf] mb-3" />
                <p className="text-[#8a8174] text-sm">You haven&apos;t opened any tickets yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-3xl p-6 border border-[#e6dfd2]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#102615]">{ticket.subject}</p>
                        <p className="text-[#8a8174] text-sm mt-1">{ticket.message}</p>
                      </div>
                      <span
                        className={`shrink-0 text-[11px] font-bold rounded-full px-3 py-1 capitalize ${statusBadgeClass(
                          ticket.status
                        )}`}
                      >
                        {ticket.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-[#8a8174] text-xs mt-4">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
