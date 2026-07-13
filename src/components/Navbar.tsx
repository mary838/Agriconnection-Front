"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { notifications as notificationsApi, type Notification } from "@/lib/api";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Farmer Portal", href: "/dashboard/farmer", role: "farmer" },
  { label: "Admin", href: "/dashboard/admin", role: "admin" },
  { label: "My Account", href: "/dashboard/customer", role: "customer" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { count: cartCount } = useCart();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifItems, setNotifItems] = useState<Notification[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      setNotifItems([]);
      return;
    }

    let cancelled = false;

    notificationsApi
      .mine()
      .then((data) => {
        if (!cancelled) setNotifItems(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const unreadCount = notifItems.filter((n) => !n.isRead).length;

  const handleNotifClick = async (notif: Notification) => {
    if (!notif.isRead) {
      setNotifItems((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, isRead: true } : n))
      );
      try {
        await notificationsApi.markRead(notif.id);
      } catch {}
    }
  };

  const handleMarkAllRead = async () => {
    setNotifItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await notificationsApi.markAllRead();
    } catch {}
  };

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      router.push("/login?redirect=/cart");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const initials = user?.email ? user.email[0].toUpperCase() : "?";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#dce4d3] shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex items-center h-[52px] gap-8">
          <Link
            href="/"
            className="text-[#2d5a1b] font-semibold text-[17px] italic tracking-tight shrink-0 select-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            AgriConnect
          </Link>

          <div className="hidden md:flex items-center gap-0 flex-1">
            {navLinks.map((link) => {
              if (link.role && user?.role !== link.role) return null;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13.5px] px-4 py-1.5 transition-colors whitespace-nowrap ${
                    pathname === link.href
                      ? "text-[#2d5a1b] font-medium"
                      : "text-[#4a5568] hover:text-[#2d5a1b]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex-1 hidden md:block" />

          <div className="flex items-center gap-3 shrink-0">
            {(!user || user.role === "customer") && (
              <Link
                href="/cart"
                onClick={handleCartClick}
                className="relative text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
                aria-label={`Cart, ${cartCount} items`}
              >
                <ShoppingCart size={22} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#2d5a1b] text-white text-[10px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {user && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
                  aria-label={`Notifications, ${unreadCount} unread`}
                >
                  <Bell size={22} strokeWidth={1.8} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#2d5a1b] text-white text-[10px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-white/95 backdrop-blur-md border border-[#dce4d3] shadow-sm rounded-lg z-50">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#e8eed8]">
                      <span className="text-[13.5px] font-medium text-[#2d5a1b]">
                        Notifications
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-[12px] text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    {notifItems.length === 0 ? (
                      <p className="px-4 py-6 text-[13px] text-[#4a5568] text-center">
                        No notifications yet.
                      </p>
                    ) : (
                      notifItems.map((notif) => (
                        <button
                          key={notif.id}
                          onClick={() => handleNotifClick(notif)}
                          className={`w-full text-left px-4 py-2.5 border-b border-[#e8eed8] last:border-0 transition-colors hover:bg-[#e8eed8] ${
                            notif.isRead ? "bg-white" : "bg-[#f4faee]"
                          }`}
                        >
                          <p className="text-[13px] font-medium text-[#2d5a1b]">
                            {notif.title}
                          </p>
                          <p className="text-[12.5px] text-[#4a5568] mt-0.5">
                            {notif.message}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="w-[34px] h-[34px] rounded-full bg-[#b8cfa8] ring-2 ring-[#c8d8b8] shrink-0 flex items-center justify-center text-[#2d5a1b] text-[13px] font-semibold"
                  title="Profile"
                >
                  {initials}
                </Link>

                <button
                  onClick={handleLogout}
                  className="hidden sm:block text-[13.5px] text-[#4a5568] hover:text-[#2d5a1b] transition-colors px-1"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:block text-[13.5px] text-[#4a5568] hover:text-[#2d5a1b] transition-colors px-1"
                >
                  Sign in
                </Link>

                <div className="w-[34px] h-[34px] rounded-full bg-[#e8eed8] ring-2 ring-[#c8d8b8] shrink-0" />
              </>
            )}

            <button
              className="md:hidden p-1.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#dce4d3] bg-white/90 backdrop-blur-md px-6 py-3 flex flex-col">
          {navLinks.map((link) => {
            if (link.role && user?.role !== link.role) return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm py-2.5 border-b border-[#e8eed8] last:border-0 transition-colors ${
                  pathname === link.href
                    ? "text-[#2d5a1b] font-medium"
                    : "text-[#4a5568] hover:text-[#2d5a1b]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="text-sm py-2.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
              >
                Profile ({user.email})
              </Link>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="text-sm py-2.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors text-left"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm py-2.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}