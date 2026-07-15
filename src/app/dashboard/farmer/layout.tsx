import RoleGuard from "@/components/RoleGuard";

export default function FarmerLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRole="farmer">{children}</RoleGuard>;
}