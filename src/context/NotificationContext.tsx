"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { notifications as notificationsApi, type Notification } from "@/lib/api";

const POLL_INTERVAL_MS = 20000;

type NotificationCtx = {
  items: Notification[];
  unreadCount: number;
  loading: boolean;
  markRead: (id: string) => Promise<void>;
  markAllRead: () => Promise<void>;
  remove: (id: string) => Promise<void>;
};

const NotificationContext = createContext<NotificationCtx>({
  items: [],
  unreadCount: 0,
  loading: true,
  markRead: async () => {},
  markAllRead: async () => {},
  remove: async () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const load = () => {
      notificationsApi
        .mine()
        .then((data) => {
          if (!cancelled) setItems(data);
        })
        .catch(() => {})
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user]);

  const markRead = useCallback(async (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    try {
      await notificationsApi.markRead(id);
    } catch {}
  }, []);

  const markAllRead = useCallback(async () => {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await notificationsApi.markAllRead();
    } catch {}
  }, []);

  const remove = useCallback(async (id: string) => {
    const removed = items.find((n) => n.id === id);
    setItems((prev) => prev.filter((n) => n.id !== id));
    try {
      await notificationsApi.remove(id);
    } catch {
      if (removed) {
        setItems((prev) =>
          [...prev, removed].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      }
    }
  }, [items]);

  const effectiveItems = user ? items : [];
  const unreadCount = effectiveItems.filter((n) => !n.isRead).length;
  const effectiveLoading = user ? loading : false;

  return (
    <NotificationContext.Provider
      value={{ items: effectiveItems, unreadCount, loading: effectiveLoading, markRead, markAllRead, remove }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
