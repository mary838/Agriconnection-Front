"use client";

import { Fragment, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Menu, Search } from "lucide-react";
import {
  profile as profileApi,
  supportTickets as supportTicketsApi,
  ApiError,
  type SupportTicket,
} from "@/lib/api";
import AdminSidebar from "@/components/AdminSidebar";
import SupportTicketThread from "@/components/SupportTicketThread";

const STATUS_OPTIONS = ["open", "in_progress", "closed"];

function statusBadgeClass(status: string) {
  const s = status.toLowerCase();
  if (s === "closed") return "bg-[#eaf2e4] text-[#2d5a1b]";
  if (s === "in_progress") return "bg-[#fef3e2] text-[#b45309]";
  return "bg-[#eef2ff] text-[#4338ca]";
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [ticketDetails, setTicketDetails] = useState<Record<string, SupportTicket>>({});
  const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [sendingReplyId, setSendingReplyId] = useState<string | null>(null);
  const [replyErrors, setReplyErrors] = useState<Record<string, string>>({});

  const fetchTickets = async () => {
    const data = await supportTicketsApi.list();
    setTickets(data);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const profileData = await profileApi.get();
        setCurrentUserId(profileData.id);
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

    load();
  }, []);

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

  const handleStatusChange = async (ticketId: string, status: string) => {
    try {
      setUpdatingId(ticketId);
      const updated = await supportTicketsApi.updateStatus(ticketId, { status });
      setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, ...updated } : t)));
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Failed to update ticket.";
      setError(message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.subject.toLowerCase().includes(q) ||
      t.user?.name?.toLowerCase().includes(q) ||
      t.user?.email?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#f5f2eb]">
      <AdminSidebar
        active="Support"
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-6 sm:py-10">
          <div className="md:hidden flex items-center gap-3 mb-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-[#4a5568] hover:text-[#1c2b1a] transition-colors"
            >
              <Menu size={22} />
            </button>
            <p className="text-[17px] font-semibold italic text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
              AgriConnect
            </p>
          </div>

          <div className="mb-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mb-1">
              Admin Console
            </p>
            <h1 className="text-[28px] sm:text-[38px] font-semibold text-[#1c2b1a] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Support tickets
            </h1>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="bg-white border border-[#ede8df] rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#1c2b1a]" style={{ fontFamily: "Georgia, serif" }}>
                  All tickets
                </h2>
                <p className="text-[13px] text-[#9aaa8a]">
                  {loading ? "Loading..." : `${tickets.length} ticket${tickets.length === 1 ? "" : "s"}`}
                </p>
              </div>
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aaa8a]" />
                <input
                  type="text"
                  placeholder="Search tickets"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-[13px] bg-[#faf9f6] border border-[#e0dbd0] rounded-full focus:outline-none focus:border-[#2d5a1b] transition-colors w-52"
                />
              </div>
            </div>

            {loading ? (
              <p className="text-[13px] text-[#9aaa8a] py-6 text-center">Loading tickets...</p>
            ) : filteredTickets.length === 0 ? (
              <p className="text-[13px] text-[#9aaa8a] py-6 text-center">No support tickets found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-[#f0ece4]">
                      {["SUBJECT", "REQUESTER", "CREATED", "STATUS", ""].map((h) => (
                        <th key={h} className="text-left text-[10px] font-semibold tracking-[0.15em] text-[#9aaa8a] pb-3 pr-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((ticket) => (
                      <Fragment key={ticket.id}>
                        <tr className="border-b border-[#f8f6f2] last:border-0 hover:bg-[#faf9f6] transition-colors">
                          <td className="py-4 pr-4 max-w-[320px]">
                            <p className="text-[14px] font-semibold text-[#1c2b1a]">{ticket.subject}</p>
                            <p className="text-[12px] text-[#9aaa8a] truncate">{ticket.message}</p>
                          </td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">
                            <p>{ticket.user?.name || "Unknown"}</p>
                            <p className="text-[12px] text-[#9aaa8a]">{ticket.user?.email || ""}</p>
                          </td>
                          <td className="py-4 pr-4 text-[13px] text-[#5a6a52] whitespace-nowrap">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 pr-4">
                            <select
                              value={ticket.status}
                              disabled={updatingId === ticket.id}
                              onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                              className={`text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap capitalize border-0 focus:outline-none disabled:opacity-60 ${statusBadgeClass(
                                ticket.status
                              )}`}
                            >
                              {!STATUS_OPTIONS.includes(ticket.status) && (
                                <option value={ticket.status}>{ticket.status}</option>
                              )}
                              {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {status.replace("_", " ")}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-4 pr-2 text-right">
                            <button
                              type="button"
                              onClick={() => toggleTicket(ticket.id)}
                              className="flex items-center gap-1 text-[12px] font-semibold text-[#2d5a1b] hover:text-[#1c2b1a] transition-colors whitespace-nowrap ml-auto"
                            >
                              {expandedId === ticket.id ? (
                                <>
                                  Hide
                                  <ChevronUp size={14} />
                                </>
                              ) : (
                                <>
                                  Reply
                                  <ChevronDown size={14} />
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                        {expandedId === ticket.id && (
                          <tr className="border-b border-[#f8f6f2] last:border-0">
                            <td colSpan={5} className="pb-5 px-1">
                              <SupportTicketThread
                                ticket={ticketDetails[ticket.id]}
                                loading={loadingDetailId === ticket.id}
                                currentUserId={currentUserId}
                                draft={replyDrafts[ticket.id] || ""}
                                onDraftChange={(value) =>
                                  setReplyDrafts((prev) => ({ ...prev, [ticket.id]: value }))
                                }
                                onSubmit={() => handleReply(ticket.id)}
                                submitting={sendingReplyId === ticket.id}
                                error={replyErrors[ticket.id]}
                                labels={{
                                  noRepliesYet: "No replies yet.",
                                  replyPlaceholder: "Write a reply...",
                                  sendReply: "Send reply",
                                  sending: "Sending...",
                                  you: "You",
                                  support: "Support",
                                }}
                              />
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
