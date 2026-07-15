"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, ApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");

    try {
      setLoading(true);
      setError("");

      const data = await auth.login({ email, password });

      const token = data.accessToken;
      const user = data.user;

      if (!token) throw new Error("No access token returned.");
      if (!user) throw new Error("No user returned.");

      login(user, token, remember);

      const role = user.role?.toLowerCase();

      if (role === "admin") router.push("/dashboard/admin");
      else if (role === "farmer") router.push("/dashboard/farmer");
      else router.push("/dashboard/customer");
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[52%] bg-[#1e3d18] flex-col justify-between p-10">
        <Link href="/" className="text-white text-[18px] font-medium" style={{ fontFamily: "Georgia, serif" }}>
          AgriConnect
        </Link>

        <div className="max-w-[420px]">
          <h1 className="text-white text-[48px] leading-tight mb-5" style={{ fontFamily: "Georgia, serif" }}>
            The market <em className="font-normal italic text-[#a8c898]">opens at dawn.</em>
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed">
            Sign in to your farm, your basket, or your admin console.
          </p>
        </div>

        <p className="text-white/30 text-[12px]">© 2026 AgriConnect Collective</p>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#faf8f3]/80" />

        <div className="relative z-10 w-full max-w-[420px]">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2">
            Welcome back
          </p>

          <h2 className="text-[38px] font-normal text-[#1c2b1a] mb-8" style={{ fontFamily: "Georgia, serif" }}>
            Sign in
          </h2>

          <form onSubmit={handleSignIn} className="flex flex-col gap-5">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                placeholder="farmer@agriconnect.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                placeholder="123456"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#2d5a1b]"
                />
                <span className="text-[13px] text-[#7a8a6a]">Remember me</span>
              </label>

              <Link href="/forgot-password" className="text-[13px] font-semibold text-[#2d5a1b] hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-[13px] text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e3d18] text-white text-[15px] font-semibold py-4 rounded-full hover:bg-[#2d5a1b] transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-[13px] text-[#9aaa8a] mt-6">
            New here?{" "}
            <Link href="/register" className="font-semibold text-[#1c2b1a] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const labelClass =
  "block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2";

const inputClass =
  "w-full px-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors";