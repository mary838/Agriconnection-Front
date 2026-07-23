"use client";

import Link from "next/link";
import {
  BarChart2,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { auth, clearToken } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { icon: LayoutDashboard, key: "Overview", href: "/dashboard/admin" },
  { icon: Users, key: "Farmers", href: "/dashboard/admin/farmers" },
  { icon: Package, key: "Products", href: "/dashboard/admin/products" },
  { icon: ShoppingBag, key: "Orders", href: "/dashboard/admin/orders" },
  { icon: Wallet, key: "Payouts", href: "/dashboard/admin/payouts" },
  { icon: BarChart2, key: "Reports", href: "/dashboard/admin/reports" },
  { icon: LifeBuoy, key: "Support", href: "/dashboard/admin/support" },
];

export default function AdminSidebar({
  active,
  sidebarOpen,
  onClose,
}: {
  active: string;
  sidebarOpen: boolean;
  onClose: () => void;
}) {
  const { dict } = useLanguage();
  const { user } = useAuth();

  const navLabels: Record<string, string> = {
    Overview: dict.dashboard.shared.navOverview,
    Farmers: dict.dashboard.shared.navFarmers,
    Products: dict.dashboard.shared.navProducts,
    Orders: dict.dashboard.shared.navOrders,
    Payouts: "Payouts",
    Reports: dict.dashboard.shared.navReports,
    Support: dict.dashboard.shared.navSupport,
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="animate-fade-in-up fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[220px] bg-[#1e3d18] flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:z-auto md:shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <div className="px-6 pt-7 pb-6">
          <Link href="/" onClick={onClose}>
            <p
              className="text-white text-[17px] font-semibold italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              AgriConnect
            </p>
            <p className="text-white/40 text-[10px] font-semibold tracking-[0.18em] uppercase mt-0.5">
              {dict.dashboard.shared.adminPortalLabel}
            </p>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 px-3 flex-1">
          {navItems.map(({ icon: Icon, key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 hover:translate-x-1 ${
                active === key
                  ? "bg-white text-[#1e3d18]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {navLabels[key]}
            </Link>
          ))}

          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-200 hover:translate-x-1 ${
              active === "Your Profile"
                ? "bg-white text-[#1e3d18]"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <Settings size={16} />
            {dict.dashboard.shared.yourProfile}
          </Link>
        </nav>

        <div className="mx-3 mb-4 bg-white/10 rounded-xl px-4 py-3">
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#b8cfa8] shrink-0 flex items-center justify-center text-[#1e3d18] font-bold">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name || dict.dashboard.shared.adminFallbackName}
                  className="w-full h-full object-cover"
                />
              ) : (
                (user?.name || dict.dashboard.shared.adminFallbackName).charAt(0).toUpperCase()
              )}
            </div>
            <div className="min-w-0">
              <p className="text-white text-[13px] font-medium leading-tight truncate">
                {user?.name || dict.dashboard.shared.adminFallbackName}
              </p>
              <p className="text-white/50 text-[11px] truncate">{dict.dashboard.shared.platformAdminLabel}</p>
            </div>
          </Link>
          <button
            onClick={async () => {
              await auth.logout().catch(() => {});
              clearToken();
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="flex items-center gap-2 text-white/50 hover:text-white text-[12px] transition-colors"
          >
            <LogOut size={13} />
            {dict.dashboard.shared.signOut}
          </button>
        </div>
      </aside>
    </>
  );
}
