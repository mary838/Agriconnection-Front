import RoleGuard from "@/components/RoleGuard";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRole="customer">{children}</RoleGuard>;
}