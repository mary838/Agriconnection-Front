"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";
import { auth, ApiError } from "@/lib/api";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState(searchParams.get("token") || "");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return setError("Reset token is required.");
    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      setLoading(true);
      setError("");

      await auth.resetPassword({ token, newPassword });

      setSuccess(true);
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
      <div className="hidden lg:flex lg:w-[52%] bg-[#1e3d18] flex-col justify-between p-10 overflow-hidden">
        <Link
          href="/"
          className="text-white text-[18px] font-medium"
          style={{ fontFamily: "Georgia, serif" }}
        >
          AgriConnect
        </Link>

        <div className="max-w-[420px]">
          <h1
            className="text-white text-[48px] leading-tight mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Set a new{" "}
            <em className="font-normal italic text-[#a8c898]">password.</em>
          </h1>

          <p className="text-white/60 text-[15px] leading-relaxed">
            Use your reset token to create a new password for your AgriConnect
            account.
          </p>
        </div>

        <p className="text-white/30 text-[12px]">
          © 2026 AgriConnect Collective
        </p>
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
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-[13px] text-[#7a8a6a] hover:text-[#2d5a1b] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back
          </Link>

          {!success ? (
            <>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2">
                Password reset
              </p>

              <h2
                className="text-[38px] font-normal text-[#1c2b1a] mb-3 leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Create new password
              </h2>

              <p className="text-[14px] text-[#7a8a6a] mb-8 leading-relaxed">
                Paste your reset token and enter your new password.
              </p>

              <form onSubmit={handleReset} className="flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2">
                    Reset Token
                  </label>

                  <textarea
                    placeholder="Paste reset token here"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2">
                    New Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9aaa8a]"
                    />

                    <input
                      type="password"
                      placeholder="newpassword123"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full pl-12 pr-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-[13px] text-center">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full text-white text-[15px] font-semibold py-4 rounded-full transition-colors ${
                    loading
                      ? "bg-[#2d5a1b]/60 cursor-not-allowed"
                      : "bg-[#1e3d18] hover:bg-[#2d5a1b]"
                  }`}
                >
                  {loading ? "Resetting..." : "Reset password"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#eaf2e4] flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-[#2d5a1b]" />
              </div>

              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2">
                Password updated
              </p>

              <h2
                className="text-[34px] font-normal text-[#1c2b1a] mb-3 leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                You can sign in now
              </h2>

              <p className="text-[14px] text-[#7a8a6a] leading-relaxed mb-8">
                Your password has been reset successfully.
              </p>

              <button
                onClick={() => router.push("/login")}
                className="w-full bg-[#1e3d18] text-white text-[14px] font-semibold py-3.5 rounded-full hover:bg-[#2d5a1b] transition-colors text-center"
              >
                Go to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}