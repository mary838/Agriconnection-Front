"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import type { Role } from "@/lib/api";

export default function RoleGuard({
  allowedRole,
  children,
}: {
  allowedRole: Role;
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role?.toLowerCase() !== allowedRole) {
      router.replace(`/dashboard/${user.role?.toLowerCase()}`);
    }
  }, [isLoading, user, allowedRole, router]);

  if (isLoading || !user || user.role?.toLowerCase() !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}
