"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { auth, ApiError } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return setError("Please enter your email.");

    try {
      setLoading(true);
      setError("");

      const data = await auth.forgotPassword({ email });

      setResetToken(data.resetToken || "");
      setSent(true);
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
        <div>
          <Link
            href="/"
            className="text-white text-[18px] font-medium"
            style={{ fontFamily: "Georgia, serif" }}
          >
            AgriConnect
          </Link>
        </div>

        <div className="max-w-[420px]">
          <h1
            className="text-white text-[48px] leading-tight mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Don&apos;t worry.{" "}
            <em className="font-normal italic text-[#a8c898]">It happens.</em>
          </h1>

          <p className="text-white/60 text-[15px] leading-relaxed">
            Enter your email and get a secure token to reset your password.
          </p>

          <div className="flex flex-col gap-4 mt-10">
            {[
              {
                step: "01",
                title: "Enter your email",
                desc: "Use the email registered with AgriConnect.",
              },
              {
                step: "02",
                title: "Get reset token",
                desc: "Your backend generates a reset token.",
              },
              {
                step: "03",
                title: "Set new password",
                desc: "Use the token to create a new password.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex items-start gap-4 bg-white/5 rounded-xl px-4 py-3"
              >
                <span className="text-[#a8c898] text-[12px] font-semibold tracking-widest mt-0.5 shrink-0">
                  {s.step}
                </span>
                <div>
                  <p className="text-white text-[13px] font-semibold">
                    {s.title}
                  </p>
                  <p className="text-white/50 text-[12px]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
            href="/login"
            className="inline-flex items-center gap-2 text-[13px] text-[#7a8a6a] hover:text-[#2d5a1b] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to sign in
          </Link>

          {!sent ? (
            <>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2">
                Account recovery
              </p>

              <h2
                className="text-[38px] font-normal text-[#1c2b1a] mb-3 leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Forgot password?
              </h2>

              <p className="text-[14px] text-[#7a8a6a] mb-8 leading-relaxed">
                Enter your email address below and we&apos;ll generate a reset
                token for your account.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2">
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9aaa8a]"
                    />

                    <input
                      type="email"
                      placeholder="admin@agriconnect.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  {loading ? "Sending..." : "Generate reset token"}
                </button>
              </form>

              <p className="text-center text-[13px] text-[#9aaa8a] mt-6">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#1c2b1a] hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#eaf2e4] flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} className="text-[#2d5a1b]" />
              </div>

              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2">
                Reset token generated
              </p>

              <h2
                className="text-[34px] font-normal text-[#1c2b1a] mb-3 leading-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Use this token
              </h2>

              <p className="text-[14px] text-[#7a8a6a] leading-relaxed mb-5">
                Token generated for{" "}
                <span className="font-semibold text-[#1c2b1a]">{email}</span>.
              </p>

              <div className="bg-white border border-[#e0dbd0] rounded-2xl p-4 text-left mb-6">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2">
                  Reset Token
                </p>
                <p className="text-[12px] text-[#1c2b1a] break-all">
                  {resetToken}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/reset-password?token=${resetToken}`}
                  className="w-full bg-[#1e3d18] text-white text-[14px] font-semibold py-3.5 rounded-full hover:bg-[#2d5a1b] transition-colors text-center"
                >
                  Continue to reset password
                </Link>

                <button
                  onClick={() => {
                    setSent(false);
                    setResetToken("");
                  }}
                  className="w-full bg-white border border-[#e0dbd0] text-[#1c2b1a] text-[14px] font-medium py-3.5 rounded-full hover:bg-[#f5f2eb] transition-colors"
                >
                  Try a different email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}