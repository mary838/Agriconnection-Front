"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  profile as profileApi,
  farmers as farmersApi,
  products as productsApi,
  categories as categoriesApi,
  getToken,
  ApiError,
  type Farmer,
  type Category,
  type ProductTranslation,
} from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/lib/i18n";
import { translateProductText } from "@/lib/translate";

export default function NewProductPage() {
  const router = useRouter();
  const { dict, language } = useLanguage();

  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [form, setForm] = useState({
    productCode: "",
    name: "",
    description: "",
    categoryId: "",
    priceUsd: "",
    unit: "kg",
    stockQty: "",
    lowStockThreshold: "20",
  });

  const [images, setImages] = useState<File[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        if (!getToken()) {
          router.push("/login");
          return;
        }

        const profileData = await profileApi.get();
        const [farmersData, categoriesData] = await Promise.all([
          farmersApi.list(),
          categoriesApi.list(),
        ]);

        const currentFarmer = farmersData.find(
          (item) => item.userId === profileData.id
        );

        if (!currentFarmer) {
          throw new Error(dict.dashboard.farmerNewProduct.errFarmerNotFound);
        }

        setFarmer(currentFarmer);
        setCategoryList(categoriesData);
        if (categoriesData.length > 0) {
          setForm((prev) => ({ ...prev, categoryId: String(categoriesData[0].id) }));
        }
      } catch (err: unknown) {
        const message =
          err instanceof ApiError || err instanceof Error
            ? err.message
            : "Something went wrong.";
        setError(message);
      } finally {
        setPageLoading(false);
      }
    };

    fetchFarmer();
  }, [router]);

  const MAX_IMAGES = 6;

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    e.target.value = "";

    setImages((prev) => {
      const combined = [...prev, ...selectedFiles];

      if (combined.length > MAX_IMAGES) {
        setError(dict.dashboard.farmerNewProduct.errMaxImages.replace("{max}", String(MAX_IMAGES)));
        return combined.slice(0, MAX_IMAGES);
      }

      setError("");
      return combined;
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!farmer) return setError(dict.dashboard.farmerNewProduct.errFarmerNotFound);
    if (!farmer.provinceId) {
      return setError(dict.dashboard.farmerNewProduct.errNoProvince);
    }
    if (!form.productCode.trim()) return setError(dict.dashboard.farmerNewProduct.errProductCodeRequired);
    if (!form.name.trim()) return setError(dict.dashboard.farmerNewProduct.errNameRequired);
    if (!form.categoryId) return setError(dict.dashboard.farmerNewProduct.errCategoryRequired);
    if (!form.priceUsd) return setError(dict.dashboard.farmerNewProduct.errPriceRequired);
    if (!form.stockQty) return setError(dict.dashboard.farmerNewProduct.errStockRequired);
    if (images.length === 0) return setError(dict.dashboard.farmerNewProduct.errImageRequired);

    try {
      setLoading(true);
      setError("");

      if (!getToken()) {
        router.push("/login");
        return;
      }

      const targetLangs = LANGUAGES.map((l) => l.code).filter((code) => code !== language);

      let productTranslations: ProductTranslation[] | undefined;
      try {
        setTranslating(true);
        productTranslations = await translateProductText({
          name: form.name.trim(),
          description: form.description.trim() || undefined,
          sourceLang: language,
          targetLangs,
        });
      } catch {
        productTranslations = undefined;
      } finally {
        setTranslating(false);
      }

      const productData = await productsApi.create({
        productCode: form.productCode.trim(),
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        categoryId: Number(form.categoryId),
        farmerId: farmer.id,
        priceUsd: Number(form.priceUsd),
        unit: form.unit,
        images: [],
        translations: productTranslations?.length ? productTranslations : undefined,
        provinceId: farmer.provinceId,
        stockQty: Number(form.stockQty),
        lowStockThreshold: Number(form.lowStockThreshold),
      });

      for (const image of images) {
        await productsApi.uploadImage(productData.id, image);
      }

      router.push(`/marketplace/${productData.id}`);
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

  if (pageLoading) {
    return (
      <main className="min-h-screen bg-[#faf8f3] flex items-center justify-center text-[#1c2b1a]">
        {dict.dashboard.farmerNewProduct.loading}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f3] px-4 sm:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/dashboard/farmer"
          className="text-sm text-[#7a8a6a] hover:text-[#2d5a1b]"
        >
          {dict.dashboard.farmerNewProduct.backToDashboard}
        </Link>

        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b] mt-8 mb-2">
          {dict.dashboard.farmerNewProduct.eyebrow}
        </p>

        <h1
          className="text-[32px] sm:text-[42px] text-[#1c2b1a] mb-8"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {dict.dashboard.farmerNewProduct.title}
        </h1>

        {farmer && !farmer.provinceId && (
          <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-[14px] text-amber-800">
            {dict.dashboard.farmerNewProduct.noProvinceWarningPart1}
            <Link href="/profile" className="font-semibold underline">
              {dict.dashboard.farmerNewProduct.noProvinceWarningLink}
            </Link>
            {dict.dashboard.farmerNewProduct.noProvinceWarningPart2}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#e0dbd0] rounded-3xl p-8 flex flex-col gap-5"
        >
          <Input
            label={dict.dashboard.farmerNewProduct.productCodeLabel}
            placeholder={dict.dashboard.farmerNewProduct.productCodePlaceholder}
            value={form.productCode}
            onChange={(v) => update("productCode", v)}
          />

          <Input
            label={dict.dashboard.farmerNewProduct.productNameLabel}
            placeholder={dict.dashboard.farmerNewProduct.productNamePlaceholder}
            value={form.name}
            onChange={(v) => update("name", v)}
          />

          <div>
            <label className={labelClass}>
              {dict.dashboard.farmerNewProduct.productDescriptionLabel}
            </label>
            <textarea
              value={form.description}
              placeholder={dict.dashboard.farmerNewProduct.productDescriptionPlaceholder}
              onChange={(e) => update("description", e.target.value)}
              rows={3}
              className={`${inputClass} rounded-2xl`}
            />
          </div>

          <div className="rounded-2xl border border-[#e0dbd0] bg-[#faf8f3] p-5">
            <p className={labelClass}>{dict.dashboard.farmerNewProduct.translationsTitle}</p>
            <p className="text-[12px] text-[#7a8a6a]">
              {dict.dashboard.farmerNewProduct.translationsHelpText}
            </p>
          </div>

          <div>
            <label className={labelClass}>{dict.dashboard.farmerNewProduct.categoryLabel}</label>
            <select
              value={form.categoryId}
              onChange={(e) => update("categoryId", e.target.value)}
              className={inputClass}
              required
            >
              {categoryList.length === 0 && (
                <option value="">{dict.dashboard.farmerNewProduct.noCategoriesAvailable}</option>
              )}
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>{dict.dashboard.farmerNewProduct.productImagesLabel}</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              required={images.length === 0}
              disabled={images.length >= MAX_IMAGES}
              className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] outline-none focus:border-[#2d5a1b] transition-colors disabled:opacity-60"
            />
            <p className="text-[12px] text-[#7a8a6a] mt-2">
              {dict.dashboard.farmerNewProduct.uploadHelpText
                .replaceAll("{max}", String(MAX_IMAGES))
                .replace("{count}", String(images.length))}
            </p>
          </div>

          {images.length > 0 && (
            <div className="rounded-2xl border border-[#e0dbd0] bg-[#faf8f3] p-4">
              <p className={labelClass}>{dict.dashboard.farmerNewProduct.imagePreviewLabel}</p>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden bg-white border border-[#e0dbd0] relative"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Product preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-[#1e3d18] text-white text-[10px] px-2 py-1 rounded-full">
                        {dict.dashboard.farmerNewProduct.mainBadge}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      aria-label={dict.dashboard.farmerNewProduct.removeImageAria.replace("{n}", String(index + 1))}
                      className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full bg-black/60 text-white text-[12px] leading-none hover:bg-black/80"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Input
            label={dict.dashboard.farmerNewProduct.priceUsdLabel}
            type="number"
            placeholder="2.5"
            value={form.priceUsd}
            onChange={(v) => update("priceUsd", v)}
          />

          <div>
            <label className={labelClass}>{dict.dashboard.farmerNewProduct.unitLabel}</label>
            <select
              value={form.unit}
              onChange={(e) => update("unit", e.target.value)}
              className={inputClass}
            >
              <option value="kg">{dict.dashboard.farmerNewProduct.unitKg}</option>
              <option value="piece">{dict.dashboard.farmerNewProduct.unitPiece}</option>
              <option value="bunch">{dict.dashboard.farmerNewProduct.unitBunch}</option>
            </select>
          </div>

          <Input
            label={dict.dashboard.farmerNewProduct.stockQuantityLabel}
            type="number"
            placeholder="100"
            value={form.stockQty}
            onChange={(v) => update("stockQty", v)}
          />

          <Input
            label={dict.dashboard.farmerNewProduct.lowStockThresholdLabel}
            type="number"
            placeholder="20"
            value={form.lowStockThreshold}
            onChange={(v) => update("lowStockThreshold", v)}
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3d18] text-white text-[15px] font-semibold py-4 rounded-full hover:bg-[#2d5a1b] transition-colors disabled:opacity-60"
          >
            {loading
              ? translating
                ? dict.dashboard.farmerNewProduct.translatingProduct
                : dict.dashboard.farmerNewProduct.creatingProduct
              : dict.dashboard.farmerNewProduct.createProduct}
          </button>
        </form>
      </div>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required
        step={type === "number" ? "0.01" : undefined}
        className={inputClass}
      />
    </div>
  );
}

const labelClass =
  "block text-[11px] font-semibold tracking-[0.14em] uppercase text-[#7a8a6a] mb-2";

const inputClass =
  "w-full px-5 py-3.5 rounded-full bg-white border border-[#e0dbd0] text-[14px] text-[#1c2b1a] placeholder-[#bbb] outline-none focus:border-[#2d5a1b] transition-colors";