"use client";

import Link from "next/link";
import {
  BarChart3,
  Box,
  Grid2X2,
  LifeBuoy,
  LogOut,
  Settings,
  ShoppingBag,
  Warehouse,
  X,
} from "lucide-react";
import { auth, clearToken, type User, type Farmer } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const navItemDefs = [
  { icon: Grid2X2, id: "Overview", href: "/dashboard/farmer" },
  { icon: Box, id: "Products", href: "/dashboard/farmer/products" },
  { icon: Warehouse, id: "Inventory", href: "/dashboard/farmer/inventory" },
  { icon: ShoppingBag, id: "Orders", href: "/dashboard/farmer/orders" },
  { icon: BarChart3, id: "Reports", href: "/dashboard/farmer/reports" },
  { icon: LifeBuoy, id: "Support", href: "/dashboard/farmer/support" },
];

export default function FarmerSidebar({
  active,
  user,
  farmer,
  sidebarOpen,
  onClose,
}: {
  active: string;
  user: User | null;
  farmer: Farmer | null;
  sidebarOpen: boolean;
  onClose: () => void;
}) {
  const { dict } = useLanguage();

  const navItems = [
    { icon: navItemDefs[0].icon, id: navItemDefs[0].id, label: dict.dashboard.shared.navOverview, href: navItemDefs[0].href },
    { icon: navItemDefs[1].icon, id: navItemDefs[1].id, label: dict.dashboard.shared.navProducts, href: navItemDefs[1].href },
    { icon: navItemDefs[2].icon, id: navItemDefs[2].id, label: dict.dashboard.shared.navInventory, href: navItemDefs[2].href },
    { icon: navItemDefs[3].icon, id: navItemDefs[3].id, label: dict.dashboard.shared.navOrders, href: navItemDefs[3].href },
    { icon: navItemDefs[4].icon, id: navItemDefs[4].id, label: dict.dashboard.shared.navReports, href: navItemDefs[4].href },
    { icon: navItemDefs[5].icon, id: navItemDefs[5].id, label: dict.dashboard.shared.navSupport, href: navItemDefs[5].href },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="animate-fade-in-up fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[270px] bg-[#174832] min-h-screen p-7 flex flex-col justify-between transition-transform duration-300 md:sticky md:top-0 md:translate-x-0 md:shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <button
        className="md:hidden absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        onClick={onClose}
      >
        <X size={18} />
      </button>

      <div>
        <Link
          href="/"
          onClick={onClose}
          className="text-white text-2xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          AgriConnect
        </Link>

        <p className="text-[#9db79d] text-[11px] tracking-[0.22em] uppercase mt-2 font-semibold">
          {dict.dashboard.shared.farmerPortalLabel}
        </p>

        <nav className="mt-12 flex flex-col gap-2">
          {navItems.map(({ icon: Icon, id, label, href }) => (
            <Link
              key={id}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200 hover:translate-x-1 ${
                active === id
                  ? "bg-white text-[#174832]"
                  : "text-[#b8c9b3] hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}

          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition-all duration-200 hover:translate-x-1 ${
              active === "Your Profile"
                ? "bg-white text-[#174832]"
                : "text-[#b8c9b3] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings size={16} />
            {dict.dashboard.shared.yourProfile}
          </Link>
        </nav>
      </div>

      <div className="rounded-2xl bg-white/10 p-4">
        <Link href="/profile" onClick={onClose} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-11 h-11 rounded-full bg-[#dce8d4] flex items-center justify-center text-[#174832] font-bold overflow-hidden shrink-0">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || "Farmer"}
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.charAt(0).toUpperCase() || "F"
            )}
          </div>

          <div>
            <p className="text-white text-sm font-semibold">
              {user?.name || dict.dashboard.farmerHome.defaultFarmerName}
            </p>
            <p className="text-[#b8c9b3] text-xs">
              {farmer?.province?.name || farmer?.farmerCode || dict.dashboard.shared.viewProfileFallback}
            </p>
          </div>
        </Link>

        <button
          onClick={async () => {
            await auth.logout().catch(() => {});
            clearToken();
            localStorage.removeItem("user");
            localStorage.removeItem("farmer");
            window.location.href = "/login";
          }}
          className="mt-4 flex items-center gap-2 text-[#b8c9b3] text-sm hover:text-white transition-colors"
        >
          <LogOut size={14} />
          {dict.dashboard.shared.signOut}
        </button>
      </div>
    </aside>
    </>
  );
}
