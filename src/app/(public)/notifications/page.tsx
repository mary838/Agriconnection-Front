"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationContext";
import { type Notification } from "@/lib/api";

export default function NotificationsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { dict } = useLanguage();
  const { notificationsPage, nav, dashboard } = dict;
  const { items, unreadCount, loading, markRead, markAllRead, remove } = useNotifications();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login?redirect=/notifications");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  const handleItemClick = (notif: Notification) => {
    if (notif.isRead) return;
    markRead(notif.id);
  };

  const handleMarkAllRead = () => {
    markAllRead();
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm(notificationsPage.deleteConfirm)) return;
    setDeletingId(id);
    await remove(id);
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-md mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
              {notificationsPage.eyebrow}
            </p>
            <h1
              className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-3"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {notificationsPage.title}
            </h1>
            <p className="text-[15px] text-[#7a8a6a] leading-relaxed">
              {notificationsPage.description}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="shrink-0 text-[13px] font-medium text-[#2d5a1b] hover:text-[#1c2b1a] transition-colors whitespace-nowrap"
            >
              {nav.markAllRead}
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-[14px] text-[#7a8a6a]">{notificationsPage.loading}</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white border border-[#ede8df] rounded-2xl">
            <Bell size={32} className="text-[#c9cdbf] mb-3" />
            <p className="text-[#7a8a6a] text-sm">{nav.noNotifications}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((notif) => (
              <div
                key={notif.id}
                role="button"
                tabIndex={0}
                onClick={() => handleItemClick(notif)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleItemClick(notif);
                  }
                }}
                className={`text-left border rounded-2xl px-6 py-4 transition-colors cursor-pointer ${
                  notif.isRead
                    ? "bg-white border-[#ede8df]"
                    : "bg-[#eaf2e4] border-[#d7e6cb]"
                }`}
              >
                <div className="flex items-start gap-3">
                  {!notif.isRead && (
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#2d5a1b] shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[14.5px] font-medium text-[#1c2b1a]">{notif.title}</p>
                      <div className="flex items-center gap-3 shrink-0">
                        <p className="text-[12px] text-[#a3a396]">
                          {new Date(notif.createdAt).toLocaleString()}
                        </p>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => handleDelete(e, notif.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              handleDelete(e as unknown as React.MouseEvent, notif.id);
                            }
                          }}
                          aria-label={dashboard.shared.delete}
                          className="text-[#a3a396] hover:text-[#b3261e] transition-colors disabled:opacity-50"
                          aria-disabled={deletingId === notif.id}
                        >
                          <Trash2 size={15} strokeWidth={1.8} />
                        </span>
                      </div>
                    </div>
                    <p className="text-[13.5px] text-[#7a8a6a] leading-relaxed mt-1">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
