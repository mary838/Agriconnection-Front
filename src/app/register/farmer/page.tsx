"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, farmers, provinces as provincesApi, ApiError, type Province } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function FarmerRegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    farmerCode: "",
    phone: "",
    telegramPhone: "",
    provinceId: "",
  });

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [provinceLoading, setProvinceLoading] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setProvinceLoading(true);
        setError("");

        const data = await provincesApi.list();
        setProvinces(data);
      } catch (err: unknown) {
        const message =
          err instanceof ApiError || err instanceof Error
            ? err.message
            : "Failed to load provinces.";
        setError(message);
      } finally {
        setProvinceLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|com\.kh|kh)$/;

    if (!emailRegex.test(cleanEmail)) {
      return "Please enter a valid email address, for example farmer@gmail.com.";
    }

    return "";
  };

  const validatePhone = (phone: string) => {
    if (!/^[0-9]+$/.test(phone)) {
      return "Phone number must contain numbers only.";
    }

    if (phone.length < 8 || phone.length > 10) {
      return "Phone number must be between 8 and 10 digits.";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(form.email);
    if (emailError) return setError(emailError);

    const phoneError = validatePhone(form.phone);
    if (phoneError) return setError(phoneError);

    if (form.telegramPhone) {
      const telegramPhoneError = validatePhone(form.telegramPhone);
      if (telegramPhoneError) return setError(telegramPhoneError);
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (!form.provinceId) {
      return setError("Please select a province.");
    }

    try {
      setLoading(true);
      setError("");

      const registerData = await auth.register({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: "farmer",
        phone: form.phone,
      });

      const token = registerData.accessToken;
      const user = registerData.user;

      if (!token) throw new Error("No access token returned.");
      if (!user?.id) throw new Error("No user ID returned.");

      login(user, token);

      // /auth/register already creates the Farmer row (with a generated
      // farmerCode and no province) when role is "farmer" — update that
      // row instead of creating a second one, which would conflict on
      // the unique userId constraint.
      const existingFarmers = await farmers.list();
      const createdFarmer = existingFarmers.find((item) => item.userId === user.id);

      if (!createdFarmer) {
        throw new Error("Farmer profile was not created. Please contact support.");
      }

      const farmerData = await farmers.update(createdFarmer.id, {
        farmerCode: form.farmerCode.trim(),
        provinceId: Number(form.provinceId),
      });

      localStorage.setItem("farmer", JSON.stringify(farmerData));

      router.push("/dashboard/farmer");
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
            Start selling{" "}
            <em className="font-normal italic text-[#a8c898]">
              your harvest online.
            </em>
          </h1>

          <p className="text-white/60 text-[15px] leading-relaxed">
            Create your farmer account to list products, manage inventory, and
            receive orders.
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
            href="/register"
            className="text-[13px] text-[#7a8a6a] hover:text-[#2d5a1b]"
          >
            ← Back
          </Link>

          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#2d5a1b] uppercase mb-2 mt-8">
            Farmer Registration
          </p>

          <h2
            className="text-[38px] font-normal text-[#1c2b1a] mb-8"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Create farmer account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              value={form.name}
              onChange={(v) => update("name", v)}
              placeholder="Chan Dara"
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => update("email", v)}
              placeholder="farmer@gmail.com"
            />

            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(v) => update("password", v)}
              placeholder="123456"
            />

            <Input
              label="Farmer Code"
              value={form.farmerCode}
              onChange={(v) => update("farmerCode", v)}
              placeholder="FM-014"
            />

            <Input
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              placeholder="012345678"
            />

            <Input
              label="Telegram Phone (optional)"
              type="tel"
              required={false}
              value={form.telegramPhone}
              onChange={(v) => update("telegramPhone", v)}
              placeholder="012345670"
            />

            <div>
              <label className={labelClass}>Province</label>
              <select
                value={form.provinceId}
                onChange={(e) => update("provinceId", e.target.value)}
                required
                className={inputClass}
              >
                <option value="">
                  {provinceLoading ? "Loading provinces..." : "Select province"}
                </option>

                {provinces.map((province) => (
                  <option key={province.id} value={province.id}>
                    {province.name}
                    {province.region ? ` - ${province.region}` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl bg-white/70 border border-[#e0dbd0] px-5 py-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-1">
                Account Type
              </p>
              <p className="text-[#1c2b1a] text-[14px] font-semibold">
                Farmer
              </p>
              <p className="text-[#7a8a6a] text-[12px] mt-1">
                Farmer accounts are created with pending status.
              </p>
            </div>

            {error && (
              <p className="text-red-500 text-[13px] text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || provinceLoading}
              className="w-full bg-[#1e3d18] text-white text-[15px] font-semibold py-4 rounded-full hover:bg-[#2d5a1b] transition-colors disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create farmer account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <input
        type={type}
        inputMode={type === "tel" ? "numeric" : undefined}
        pattern={type === "tel" ? "[0-9]*" : undefined}
        maxLength={type === "tel" ? 10 : undefined}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          let nextValue = e.target.value;

          if (type === "tel") {
            nextValue = nextValue.replace(/[^0-9]/g, "");
          }

          onChange(nextValue);
        }}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

const labelClass =
  "block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2";

const inputClass =
  "w-full px-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors";