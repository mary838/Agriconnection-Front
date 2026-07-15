"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Mail, Phone, Send, Check, X, MapPin, Camera } from "lucide-react";
import {
  profile as profileApi,
  farmers as farmersApi,
  provinces as provincesApi,
  getToken,
  ApiError,
  type User,
  type Farmer,
  type Province,
} from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

type Profile = User;

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [telegramPhone, setTelegramPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [provinceList, setProvinceList] = useState<Province[]>([]);
  const [editingProvince, setEditingProvince] = useState(false);
  const [provinceDraft, setProvinceDraft] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftPhone, setDraftPhone] = useState("");
  const [draftTelegramPhone, setDraftTelegramPhone] = useState("");

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!getToken()) { router.push("/login"); return; }

        const data = await profileApi.get();

        setProfile(data);
        setName(data.name);
        setPhone(data.phone || "");
        setTelegramPhone(data.telegramPhone || "");
        localStorage.setItem("user", JSON.stringify(data));

        if (data.role === "farmer") {
          const [farmersData, provincesData] = await Promise.all([
            farmersApi.list(),
            provincesApi.list(),
          ]);

          const currentFarmer = farmersData.find((item) => item.userId === data.id) || null;
          setFarmer(currentFarmer);
          setProvinceList(provincesData);
        }
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
    fetchProfile();
  }, [router]);

  const startEditProvince = () => {
    setError("");
    setSuccess("");
    setProvinceDraft(farmer?.provinceId ? String(farmer.provinceId) : "");
    setEditingProvince(true);
  };

  const cancelEditProvince = () => {
    setEditingProvince(false);
    setProvinceDraft("");
  };

  const saveProvince = async () => {
    if (!farmer) return;
    if (!provinceDraft) {
      setError("Please select a province.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const updated = await farmersApi.update(farmer.id, {
        provinceId: Number(provinceDraft),
      });

      setFarmer(updated);
      setSuccess("Province updated successfully.");
      setEditingProvince(false);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Something went wrong.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const getDashboardHref = () => {
    if (profile?.role === "farmer") return "/dashboard/farmer";
    if (profile?.role === "admin") return "/dashboard/admin";
    return "/dashboard/customer";
  };

  const startEditProfile = () => {
    setError("");
    setSuccess("");
    setDraftName(name);
    setDraftPhone(phone);
    setDraftTelegramPhone(telegramPhone);
    setIsEditing(true);
  };

  const cancelEditProfile = () => {
    setIsEditing(false);
  };

  const saveProfile = async () => {
    if (!draftName.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!getToken()) { router.push("/login"); return; }

      const data = await profileApi.update({
        name: draftName,
        phone: draftPhone,
        telegramPhone: draftTelegramPhone,
      });

      setProfile(data);
      setName(data.name);
      setPhone(data.phone || "");
      setTelegramPhone(data.telegramPhone || "");
      localStorage.setItem("user", JSON.stringify(data));
      setSuccess("Profile updated successfully.");
      setIsEditing(false);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Something went wrong.";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    try {
      setUploadingAvatar(true);
      setError("");
      setSuccess("");

      const data = await profileApi.uploadAvatar(file);

      setProfile(data);
      localStorage.setItem("user", JSON.stringify(data));
      setSuccess("Profile photo updated.");
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Something went wrong.";
      setError(message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e8f0e8]">
        <div className="w-8 h-8 border-4 border-[#1a3d1a] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const avatarLetter = profile?.name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-[#e8f0e8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[420px] rounded-[32px] overflow-hidden shadow-2xl shadow-green-200">

        {/* Green header */}
        <div className="bg-[#1a3d1a] px-6 pt-6 pb-16 flex items-center justify-between">
          <Link
            href={getDashboardHref()}
            className="text-white/70 hover:text-white text-[13px] transition-colors"
          >
            ← Back
          </Link>
          <h1 className="text-white text-[17px] font-semibold tracking-wide">
            My Profile
          </h1>
          {isEditing ? (
            <span className="w-[68px]" />
          ) : (
            <button
              type="button"
              onClick={startEditProfile}
              className="flex items-center gap-1 text-white/70 hover:text-white text-[13px] transition-colors"
            >
              <Pencil size={14} />
              Edit
            </button>
          )}
        </div>

        {/* White body */}
        <div className="bg-white px-6 pb-8">
          {/* Avatar — overlapping the header */}
          <div className="flex flex-col items-center -mt-10 mb-4">
            <div className="relative w-20 h-20">
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#1a3d1a] flex items-center justify-center text-white text-[32px] font-bold shadow-lg ring-4 ring-white">
                  {avatarLetter}
                </div>
              )}

              {uploadingAvatar && (
                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <button
                type="button"
                aria-label="Change profile photo"
                onClick={() => avatarInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1a3d1a] ring-2 ring-white flex items-center justify-center text-white hover:bg-[#153215] transition-colors disabled:opacity-50"
              >
                <Camera size={13} />
              </button>

              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </div>
            <h2 className="mt-3 text-[#1a3d1a] text-[20px] font-bold">
              {profile?.name}
            </h2>
            <p className="text-gray-400 text-[13px] mt-0.5 capitalize">
              {profile?.role}
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">

            {/* Name */}
            <EditableField
              label="Your Name"
              icon={<Pencil size={15} className="text-gray-300" />}
              value={name}
              editing={isEditing}
              draftValue={draftName}
              onDraftChange={setDraftName}
              type="text"
            />

            {/* Email */}
            <Field label="Your Email" icon={<Mail size={15} className="text-gray-300" />}>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="flex-1 bg-transparent text-[14px] text-gray-700 outline-none cursor-not-allowed"
              />
            </Field>

            {/* Phone */}
            <EditableField
              label="Phone Number"
              icon={<Phone size={15} className="text-gray-300" />}
              value={phone}
              editing={isEditing}
              draftValue={draftPhone}
              onDraftChange={setDraftPhone}
              type="tel"
              placeholder="Not set"
            />

            {/* Telegram */}
            <EditableField
              label="Telegram Number"
              icon={<Send size={15} className="text-gray-300" />}
              value={telegramPhone}
              editing={isEditing}
              draftValue={draftTelegramPhone}
              onDraftChange={setDraftTelegramPhone}
              type="tel"
              placeholder="Not set"
            />

            {/* Province — farmers only */}
            {profile?.role === "farmer" && farmer && (
              editingProvince ? (
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
                    Province
                  </label>
                  <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-[#1a3d1a] gap-2">
                    <select
                      value={provinceDraft}
                      onChange={(e) => setProvinceDraft(e.target.value)}
                      autoFocus
                      className="flex-1 bg-transparent text-[14px] text-gray-700 outline-none"
                    >
                      <option value="">Select province</option>
                      {provinceList.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                          {province.region ? ` - ${province.region}` : ""}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      aria-label="Cancel"
                      onClick={cancelEditProvince}
                      disabled={saving}
                      className="shrink-0 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <X size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Save"
                      onClick={saveProvince}
                      disabled={saving}
                      className="shrink-0 text-gray-400 hover:text-[#1a3d1a] transition-colors disabled:opacity-50"
                    >
                      <Check size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
                    Province
                  </label>
                  <button
                    type="button"
                    onClick={startEditProvince}
                    className="w-full flex items-center bg-gray-50 hover:bg-gray-100 rounded-2xl px-4 py-3 border border-gray-100 gap-2 text-left transition-colors"
                  >
                    <span className={`flex-1 text-[14px] ${farmer.province?.name ? "text-gray-700" : "text-red-400"}`}>
                      {farmer.province?.name || "Not set — required to create products"}
                    </span>
                    <span className="shrink-0 text-gray-300">
                      <MapPin size={15} />
                    </span>
                  </button>
                </div>
              )
            )}

            {isEditing && (
              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={cancelEditProfile}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-2xl border border-gray-200 text-gray-500 text-[14px] font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveProfile}
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-2xl bg-[#1a3d1a] text-white text-[14px] font-medium hover:bg-[#153215] transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-[13px] text-center">{error}</p>
            )}
            {success && (
              <p className="text-[#1a3d1a] text-[13px] text-center">{success}</p>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-red-400 hover:text-red-500 text-[14px] font-medium transition-colors mt-1"
            >
              Log out
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
        {label}
      </label>
      <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 gap-2">
        {children}
        <span className="shrink-0">{icon}</span>
      </div>
    </div>
  );
}

function EditableField({
  label,
  icon,
  value,
  editing,
  draftValue,
  onDraftChange,
  type,
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  editing: boolean;
  draftValue: string;
  onDraftChange: (value: string) => void;
  type: string;
  placeholder?: string;
}) {
  if (editing) {
    return (
      <div>
        <label className="block text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
          {label}
        </label>
        <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-[#1a3d1a] gap-2">
          <input
            type={type}
            value={draftValue}
            onChange={(e) => onDraftChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-[14px] text-gray-700 outline-none placeholder-gray-300"
          />
          <span className="shrink-0">{icon}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-1.5">
        {label}
      </label>
      <div className="flex items-center bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100 gap-2">
        <span className={`flex-1 text-[14px] ${value ? "text-gray-700" : "text-gray-300"}`}>
          {value || placeholder}
        </span>
        <span className="shrink-0 text-gray-300">{icon}</span>
      </div>
    </div>
  );
}
