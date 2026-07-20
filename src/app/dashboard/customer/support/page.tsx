"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, LifeBuoy, Menu } from "lucide-react";
import {
  profile as profileApi,
  customers as customersApi,
  supportTickets as supportTicketsApi,
  getToken,
  ApiError,
  type User,
  type Customer,
  type SupportTicket,
} from "@/lib/api";
import CustomerSidebar from "@/components/CustomerSidebar";
import SupportTicketThread from "@/components/SupportTicketThread";
import { useLanguage } from "@/context/LanguageContext";

function statusBadgeClass(status: string) {
  const s = status.toLowerCase();
  if (s === "resolved" || s === "closed") return "bg-[#dff7ea] text-[#008454]";
  if (s === "in_progress") return "bg-[#fff0cf] text-[#b17400]";
  return "bg-[#eef2ff] text-[#4338ca]";
}

export default function CustomerSupportPage() {
  const { dict } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [ticketDetails, setTicketDetails] = useState<Record<string, SupportTicket>>({});
  const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [sendingReplyId, setSendingReplyId] = useState<string | null>(null);
  const [replyErrors, setReplyErrors] = useState<Record<string, string>>({});

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

        const customersData = await customersApi.list();
        const currentCustomer = customersData.find((item) => item.userId === profileData.id);
        if (currentCustomer) setCustomer(currentCustomer);

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

  const toggleTicket = async (ticketId: string) => {
    if (expandedId === ticketId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(ticketId);
    if (!ticketDetails[ticketId]) {
      try {
        setLoadingDetailId(ticketId);
        const detail = await supportTicketsApi.get(ticketId);
        setTicketDetails((prev) => ({ ...prev, [ticketId]: detail }));
      } catch (err: unknown) {
        const errMessage =
          err instanceof ApiError || err instanceof Error
            ? err.message
            : "Failed to load conversation.";
        setReplyErrors((prev) => ({ ...prev, [ticketId]: errMessage }));
      } finally {
        setLoadingDetailId(null);
      }
    }
  };

  const handleReply = async (ticketId: string) => {
    const text = (replyDrafts[ticketId] || "").trim();
    if (!text) return;

    try {
      setSendingReplyId(ticketId);
      setReplyErrors((prev) => ({ ...prev, [ticketId]: "" }));
      const reply = await supportTicketsApi.reply(ticketId, { message: text });
      setTicketDetails((prev) => {
        const existing = prev[ticketId];
        if (!existing) return prev;
        return { ...prev, [ticketId]: { ...existing, replies: [...(existing.replies || []), reply] } };
      });
      setReplyDrafts((prev) => ({ ...prev, [ticketId]: "" }));
      await fetchTickets();
    } catch (err: unknown) {
      const errMessage =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Failed to send reply.";
      setReplyErrors((prev) => ({ ...prev, [ticketId]: errMessage }));
    } finally {
      setSendingReplyId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        {dict.dashboard.customerSupport.loading}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <CustomerSidebar
        active="Support"
        user={user}
        customer={customer}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <section className="flex-1 px-5 sm:px-8 md:px-12 py-6 sm:py-10">
        <div className="md:hidden flex items-center gap-3 mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#102615] hover:text-[#1e6b42] transition-colors"
          >
            <Menu size={22} />
          </button>
          <p className="text-lg" style={{ fontFamily: "Georgia, serif" }}>
            AgriConnect
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
          {dict.dashboard.shared.customerPortalLabel}
        </p>
        <h1 className="text-[32px] sm:text-[42px] leading-[0.95] mb-10" style={{ fontFamily: "Georgia, serif" }}>
          {dict.dashboard.customerSupport.title}
        </h1>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8">
          <section className="bg-white rounded-3xl p-8 border border-[#e6dfd2] h-fit">
            <h2 className="text-2xl mb-6" style={{ fontFamily: "Georgia, serif" }}>
              {dict.dashboard.shared.newTicket}
            </h2>

            {submitError && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-sm">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12px] font-semibold uppercase tracking-wide text-[#7a8a6a] mb-2">
                  {dict.dashboard.shared.subjectLabel}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder={dict.dashboard.customerSupport.subjectPlaceholder}
                  className="w-full rounded-xl border border-[#e1d8ca] px-4 py-3 text-sm focus:outline-none focus:border-[#1e6b42]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold uppercase tracking-wide text-[#7a8a6a] mb-2">
                  {dict.dashboard.shared.messageLabel}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder={dict.dashboard.shared.describeIssuePlaceholder}
                  className="w-full rounded-xl border border-[#e1d8ca] px-4 py-3 text-sm focus:outline-none focus:border-[#1e6b42] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 rounded-full bg-[#174832] text-white px-6 py-3 text-sm font-semibold hover:bg-[#123a27] disabled:opacity-50"
              >
                {submitting ? dict.dashboard.shared.submitting : dict.dashboard.shared.submitTicket}
              </button>
            </form>
          </section>

          <section>
            <h2 className="text-2xl mb-6" style={{ fontFamily: "Georgia, serif" }}>
              {dict.dashboard.shared.yourTickets}
            </h2>

            {tickets.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-[#e6dfd2] flex flex-col items-center text-center">
                <LifeBuoy size={28} className="text-[#c9cdbf] mb-3" />
                <p className="text-[#8a8174] text-sm">{dict.dashboard.shared.noTicketsYet}</p>
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
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-[#8a8174] text-xs">
                        {new Date(ticket.createdAt).toLocaleString()}
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleTicket(ticket.id)}
                        className="flex items-center gap-1 text-[12px] font-semibold text-[#1e6b42] hover:text-[#123a27] transition-colors"
                      >
                        {expandedId === ticket.id ? (
                          <>
                            {dict.dashboard.shared.hideConversation}
                            <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            {dict.dashboard.shared.viewConversation}
                            <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    {expandedId === ticket.id && (
                      <SupportTicketThread
                        ticket={ticketDetails[ticket.id]}
                        loading={loadingDetailId === ticket.id}
                        currentUserId={user?.id}
                        draft={replyDrafts[ticket.id] || ""}
                        onDraftChange={(value) =>
                          setReplyDrafts((prev) => ({ ...prev, [ticket.id]: value }))
                        }
                        onSubmit={() => handleReply(ticket.id)}
                        submitting={sendingReplyId === ticket.id}
                        error={replyErrors[ticket.id]}
                        labels={{
                          noRepliesYet: dict.dashboard.shared.noRepliesYet,
                          replyPlaceholder: dict.dashboard.shared.replyPlaceholder,
                          sendReply: dict.dashboard.shared.sendReply,
                          sending: dict.dashboard.shared.sending,
                          you: dict.dashboard.shared.you,
                          support: dict.dashboard.shared.support,
                        }}
                      />
                    )}
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
