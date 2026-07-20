"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { auth as authApi, clearToken, setToken } from "@/lib/api";

export type AuthUser = {
  email: string;
  role: string;
  name?: string;
  avatarUrl?: string | null;
};

type AuthCtx = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser, token: string, remember?: boolean) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx>({
  user: null,
  isLoading: true,
  login: () => {},
  logout: async () => {},
});

const readStoredUser = (): AuthUser | null => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = readStoredUser();
    setUser((prev) => {
      if (prev === stored) return prev;
      if (
        prev &&
        stored &&
        prev.email === stored.email &&
        prev.role === stored.role &&
        prev.name === stored.name &&
        prev.avatarUrl === stored.avatarUrl
      ) {
        return prev;
      }
      return stored;
    });
    setIsLoading(false);
  }, [pathname]);

  const login = (userData: AuthUser, token: string, remember = true) => {
    setToken(token, remember);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {}
    clearToken();
    localStorage.removeItem("user");
    localStorage.removeItem("customer");
    localStorage.removeItem("farmer");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
