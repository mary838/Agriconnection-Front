"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationContext";

export default function NotificationBell() {
  const { user } = useAuth();
  const { dict } = useLanguage();
  const { unreadCount } = useNotifications();

  if (!user) return null;

  return (
    <Link
      href="/notifications"
      className="relative text-white/80 hover:text-white transition-colors"
      aria-label={`${dict.nav.notifications}, ${unreadCount} unread`}
    >
      <Bell size={20} strokeWidth={1.8} />
      {unreadCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#dff7ea] text-[#174832] text-[10px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
