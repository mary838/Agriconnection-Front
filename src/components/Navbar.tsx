"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X, Bell, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationContext";
import { LANGUAGES } from "@/lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { count: cartCount } = useCart();
  const { language, setLanguage, dict } = useLanguage();
  const { unreadCount } = useNotifications();

  const navLinks = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.marketplace, href: "/marketplace" },
    { label: dict.nav.farmerPortal, href: "/dashboard/farmer", role: "farmer" },
    { label: dict.nav.admin, href: "/dashboard/admin", role: "admin" },
    { label: dict.nav.myAccount, href: "/dashboard/customer", role: "customer" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

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
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-[52px] gap-3 sm:gap-8">
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
                  className={`relative text-[13.5px] px-4 py-1.5 transition-colors whitespace-nowrap after:absolute after:left-4 after:right-4 after:-bottom-px after:h-[2px] after:bg-[#2d5a1b] after:origin-left after:transition-transform after:duration-300 ${
                    pathname === link.href
                      ? "text-[#2d5a1b] font-medium after:scale-x-100"
                      : "text-[#4a5568] hover:text-[#2d5a1b] after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {(!user || user.role === "customer") && (
              <Link
                href="/cart"
                onClick={handleCartClick}
                className="relative text-[#4a5568] hover:text-[#2d5a1b] hover:scale-110 transition-all"
                aria-label={`Cart, ${cartCount} items`}
              >
                <ShoppingCart size={22} strokeWidth={1.8} />
                {cartCount > 0 && (
                  <span key={cartCount} className="animate-pop-in absolute -top-1.5 -right-1.5 bg-[#2d5a1b] text-white text-[10px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1 text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
                aria-label={dict.nav.language}
                title={dict.nav.language}
              >
                <Globe size={20} strokeWidth={1.8} className="transition-transform duration-300" style={{ transform: langOpen ? "rotate(90deg)" : "none" }} />
                <span className="hidden sm:inline text-[12.5px] font-medium uppercase">
                  {language}
                </span>
              </button>

              {langOpen && (
                <div className="animate-scale-in origin-top-right absolute right-0 top-full mt-2 w-40 bg-white/95 backdrop-blur-md border border-[#dce4d3] shadow-sm rounded-lg z-50 overflow-hidden">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-[#e8eed8] ${
                        language === l.code
                          ? "text-[#2d5a1b] font-medium bg-[#f4faee]"
                          : "text-[#4a5568]"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user && (
              <Link
                href="/notifications"
                className="relative text-[#4a5568] hover:text-[#2d5a1b] hover:scale-110 transition-all"
                aria-label={`${dict.nav.notifications}, ${unreadCount} unread`}
              >
                <Bell size={22} strokeWidth={1.8} />
                {unreadCount > 0 && (
                  <span key={unreadCount} className="animate-pop-in absolute -top-1.5 -right-1.5 bg-[#2d5a1b] text-white text-[10px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center leading-none">
                    {unreadCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="w-[34px] h-[34px] rounded-full bg-[#b8cfa8] ring-2 ring-[#c8d8b8] shrink-0 flex items-center justify-center text-[#2d5a1b] text-[13px] font-semibold overflow-hidden hover:scale-110 hover:ring-[#2d5a1b] transition-all"
                  title={dict.nav.profile}
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name || user.email}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="hidden sm:block text-[13.5px] text-[#4a5568] hover:text-[#2d5a1b] transition-colors px-1"
                >
                  {dict.nav.logOut}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:block text-[13.5px] text-[#4a5568] hover:text-[#2d5a1b] transition-colors px-1"
                >
                  {dict.nav.signIn}
                </Link>

                <div className="w-[34px] h-[34px] rounded-full bg-[#e8eed8] ring-2 ring-[#c8d8b8] shrink-0" />
              </>
            )}

            <button
              className="md:hidden p-1.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={dict.nav.toggleMenu}
            >
              <span className="animate-scale-in inline-flex" key={mobileOpen ? "close" : "open"}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-slide-down md:hidden border-t border-[#dce4d3] bg-white/90 backdrop-blur-md px-4 sm:px-6 py-3 flex flex-col">
          {navLinks.map((link, i) => {
            if (link.role && user?.role !== link.role) return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`animate-fade-in-up text-sm py-2.5 border-b border-[#e8eed8] last:border-0 transition-colors ${
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
                {dict.nav.profile} ({user.email})
              </Link>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="text-sm py-2.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors text-left"
              >
                {dict.nav.logOut}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm py-2.5 text-[#4a5568] hover:text-[#2d5a1b] transition-colors"
            >
              {dict.nav.signIn}
            </Link>
          )}

          <div className="py-2.5 border-t border-[#e8eed8] mt-1">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#7a8a6a] mb-2">
              {dict.nav.language}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-3 py-1.5 rounded-full text-[13px] transition-colors ${
                    language === l.code
                      ? "bg-[#1e3d18] text-white"
                      : "bg-[#f0ece4] text-[#4a5568]"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}