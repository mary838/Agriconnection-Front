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
} from "lucide-react";
import { auth, clearToken, type User, type Farmer } from "@/lib/api";

const navItems = [
  { icon: Grid2X2, label: "Overview", href: "/dashboard/farmer" },
  { icon: Box, label: "Products", href: "/dashboard/farmer/products" },
  { icon: Warehouse, label: "Inventory", href: "/dashboard/farmer/inventory" },
  { icon: ShoppingBag, label: "Orders", href: "/dashboard/farmer/orders" },
  { icon: BarChart3, label: "Reports", href: "/dashboard/farmer/reports" },
  { icon: LifeBuoy, label: "Support", href: "/dashboard/farmer/support" },
];

export default function FarmerSidebar({
  active,
  user,
  farmer,
}: {
  active: string;
  user: User | null;
  farmer: Farmer | null;
}) {
  return (
    <aside className="w-[270px] bg-[#174832] min-h-screen p-7 flex flex-col justify-between sticky top-0">
      <div>
        <Link
          href="/"
          className="text-white text-2xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          AgriConnect
        </Link>

        <p className="text-[#9db79d] text-[11px] tracking-[0.22em] uppercase mt-2 font-semibold">
          Farmer Portal
        </p>

        <nav className="mt-12 flex flex-col gap-2">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold ${
                active === label
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
            className={`flex items-center gap-3 rounded-full px-4 py-3 text-sm font-semibold ${
              active === "Your Profile"
                ? "bg-white text-[#174832]"
                : "text-[#b8c9b3] hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings size={16} />
            Your Profile
          </Link>
        </nav>
      </div>

      <div className="rounded-2xl bg-white/10 p-4">
        <Link href="/profile" className="flex items-center gap-3 hover:opacity-80">
          <div className="w-11 h-11 rounded-full bg-[#dce8d4] flex items-center justify-center text-[#174832] font-bold">
            {user?.name?.charAt(0).toUpperCase() || "F"}
          </div>

          <div>
            <p className="text-white text-sm font-semibold">
              {user?.name || "Farmer"}
            </p>
            <p className="text-[#b8c9b3] text-xs">
              {farmer?.province?.name || farmer?.farmerCode || "View profile"}
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
          className="mt-4 flex items-center gap-2 text-[#b8c9b3] text-sm hover:text-white"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
