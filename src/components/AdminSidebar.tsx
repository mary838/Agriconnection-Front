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
  X,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard/admin" },
  { icon: Users, label: "Farmers", href: "/dashboard/admin/farmers" },
  { icon: Package, label: "Products", href: "/dashboard/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/dashboard/admin/orders" },
  { icon: BarChart2, label: "Reports", href: "/dashboard/admin/reports" },
  { icon: LifeBuoy, label: "Support", href: "/dashboard/admin/support" },
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
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
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
              Admin Portal
            </p>
          </Link>
        </div>

        <nav className="flex flex-col gap-1 px-3 flex-1">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
                active === label
                  ? "bg-white text-[#1e3d18]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}

          <Link
            href="/profile"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
              active === "Your Profile"
                ? "bg-white text-[#1e3d18]"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <Settings size={16} />
            Your Profile
          </Link>
        </nav>

        <div className="mx-3 mb-4 bg-white/10 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#b8cfa8] shrink-0 flex items-center justify-center text-[#1e3d18] font-bold">
              A
            </div>
            <div className="min-w-0">
              <p className="text-white text-[13px] font-medium leading-tight">Admin</p>
              <p className="text-white/50 text-[11px] truncate">Platform Admin</p>
            </div>
          </div>
          <button className="flex items-center gap-2 text-white/50 hover:text-white text-[12px] transition-colors">
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
