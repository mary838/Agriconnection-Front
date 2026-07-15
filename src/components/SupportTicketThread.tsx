"use client";

import type { SupportTicket } from "@/lib/api";

type ThreadLabels = {
  noRepliesYet: string;
  replyPlaceholder: string;
  sendReply: string;
  sending: string;
  you: string;
  support: string;
};

type SupportTicketThreadProps = {
  ticket?: SupportTicket;
  loading: boolean;
  currentUserId?: string;
  draft: string;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  error?: string;
  labels: ThreadLabels;
};

function replyAuthorLabel(
  reply: NonNullable<SupportTicket["replies"]>[number],
  currentUserId: string | undefined,
  labels: ThreadLabels
) {
  if (currentUserId && reply.authorId === currentUserId) return labels.you;
  if (reply.author?.role === "admin") return labels.support;
  return reply.author?.name || labels.support;
}

export default function SupportTicketThread({
  ticket,
  loading,
  currentUserId,
  draft,
  onDraftChange,
  onSubmit,
  submitting,
  error,
  labels,
}: SupportTicketThreadProps) {
  return (
    <div className="mt-4 pt-4 border-t border-[#f0ece4]">
      {loading ? (
        <p className="text-[13px] text-[#9aaa8a]">...</p>
      ) : (
        <div className="flex flex-col gap-3 mb-4">
          {!ticket?.replies || ticket.replies.length === 0 ? (
            <p className="text-[13px] text-[#9aaa8a]">{labels.noRepliesYet}</p>
          ) : (
            ticket.replies.map((reply) => (
              <div key={reply.id} className="bg-[#faf9f6] rounded-xl px-4 py-3">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <p className="text-[12px] font-semibold text-[#1c2b1a]">
                    {replyAuthorLabel(reply, currentUserId, labels)}
                  </p>
                  <p className="text-[11px] text-[#9aaa8a] whitespace-nowrap">
                    {new Date(reply.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-[13px] text-[#5a6a52] whitespace-pre-wrap">{reply.message}</p>
              </div>
            ))
          )}
        </div>
      )}

      {error && <p className="text-[12px] text-red-600 mb-2">{error}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <textarea
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          placeholder={labels.replyPlaceholder}
          rows={2}
          className="flex-1 rounded-xl border border-[#e1d8ca] px-3 py-2 text-[13px] focus:outline-none focus:border-[#2d5a1b] resize-none"
        />
        <button
          type="submit"
          disabled={submitting || !draft.trim()}
          className="shrink-0 rounded-full bg-[#174832] text-white px-5 py-2 text-[13px] font-semibold hover:bg-[#123a27] disabled:opacity-50"
        >
          {submitting ? labels.sending : labels.sendReply}
        </button>
      </form>
    </div>
  );
}
