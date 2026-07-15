"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  profile as profileApi,
  farmers as farmersApi,
  products as productsApi,
  getToken,
  ApiError,
  resolveImageUrl,
  totalStock,
  type User,
  type Farmer,
  type Product,
} from "@/lib/api";
import FarmerSidebar from "@/components/FarmerSidebar";
import { useLanguage } from "@/context/LanguageContext";

export default function FarmerProductsPage() {
  const { dict } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadProducts = async (farmerId: string) => {
    const allProducts = await productsApi.list();
    const farmerProducts = allProducts.filter((product) => product.farmerId === farmerId);
    setProducts(farmerProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);

        const farmersData = await farmersApi.list();
        const currentFarmer = farmersData.find((item) => item.userId === profileData.id);

        if (!currentFarmer) {
          throw new Error("Farmer profile not found.");
        }

        setFarmer(currentFarmer);
        await loadProducts(currentFarmer.id);
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

    fetchData();
  }, []);

  const handleDelete = async (productId: string) => {
    if (!confirm(dict.dashboard.farmerProducts.deleteConfirm)) return;

    try {
      setDeletingId(productId);
      await productsApi.remove(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : dict.dashboard.farmerProducts.failedToDeleteProduct;
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        {dict.dashboard.farmerProducts.loading}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <FarmerSidebar
        active="Products"
        user={user}
        farmer={farmer}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <section className="flex-1 px-5 sm:px-8 md:px-12 py-6 sm:py-10">
        <div className="md:hidden flex items-center gap-3 mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#102615] hover:text-[#1e6b42] transition-colors"
          >
            <Menu size={22} />
          </button>
          <p className="text-lg" style={{ fontFamily: "Georgia, serif" }}>
            AgriConnect
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 sm:gap-8 mb-12">
          <div>
            <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
              {dict.dashboard.farmerProducts.eyebrow}
            </p>
            <h1 className="text-[32px] sm:text-[42px] leading-[0.95]" style={{ fontFamily: "Georgia, serif" }}>
              {dict.dashboard.farmerProducts.title}
            </h1>
          </div>

          <Link
            href="/dashboard/farmer/products/new"
            className="rounded-full bg-[#174832] px-7 py-4 text-sm font-semibold text-white hover:bg-[#216343] self-start"
          >
            {dict.dashboard.farmerProducts.newProduct}
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-[#8a8174] text-sm">
            {dict.dashboard.farmerProducts.noProductsYet}{" "}
            <Link href="/dashboard/farmer/products/new" className="text-[#1e6b42] font-semibold">
              {dict.dashboard.farmerProducts.addFirstProduct}
            </Link>
            .
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onDelete={() => handleDelete(product.id)}
                deleting={deletingId === product.id}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ProductRow({
  product,
  onDelete,
  deleting,
}: {
  product: Product;
  onDelete: () => void;
  deleting: boolean;
}) {
  const { dict } = useLanguage();
  const image = resolveImageUrl(
    product.images?.find((img) => img.isPrimary)?.imageUrl ||
      product.images?.[0]?.imageUrl ||
      product.imageUrl
  );

  const categoryLabel =
    typeof product.category === "string" ? product.category : product.category?.name;

  const hasInventory = !!product.inventory?.length;
  const stock = hasInventory ? totalStock(product) : undefined;
  const lowStockThreshold = product.inventory?.[0]?.lowStockThreshold ?? 15;
  const low = typeof stock === "number" && stock <= lowStockThreshold;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#e6dfd2]">
      <div
        className="h-[170px] bg-cover bg-center bg-[#e6dfd2]"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      />

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 style={{ fontFamily: "Georgia, serif" }}>{product.name}</h3>
            <p className="text-[#8a8174] text-xs mt-1 capitalize">
              {categoryLabel || dict.dashboard.farmerProducts.uncategorized}
            </p>
            <p className={`text-sm mt-2 ${low ? "text-red-500 font-semibold" : "text-[#8a8174]"}`}>
              {typeof stock === "number"
                ? dict.dashboard.farmerProducts.inStockUnits.replace("{n}", String(stock))
                : dict.dashboard.farmerProducts.stockNA}
            </p>
          </div>

          <p className="text-sm font-semibold">${Number(product.priceUsd).toFixed(2)}</p>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={onDelete}
            disabled={deleting}
            className="flex-1 rounded-full border border-red-200 text-red-600 py-2 text-sm font-semibold hover:border-red-400 disabled:opacity-60"
          >
            {deleting ? dict.dashboard.shared.deleting : dict.dashboard.shared.delete}
          </button>
        </div>
      </div>
    </div>
  );
}
