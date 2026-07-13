"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  profile as profileApi,
  farmers as farmersApi,
  products as productsApi,
  inventory as inventoryApi,
  getToken,
  ApiError,
  resolveImageUrl,
  type User,
  type Farmer,
  type Product,
  type Inventory,
} from "@/lib/api";
import FarmerSidebar from "@/components/FarmerSidebar";

export default function FarmerProductsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [inventoryByProduct, setInventoryByProduct] = useState<Map<string, Inventory>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadProducts = async (farmerId: string) => {
    const [allProducts, allInventory] = await Promise.all([
      productsApi.list(),
      inventoryApi.list(),
    ]);
    const farmerProducts = allProducts.filter((product) => product.farmerId === farmerId);
    setProducts(farmerProducts);

    const map = new Map<string, Inventory>();
    for (const record of allInventory) {
      if (farmerProducts.some((p) => p.id === record.productId)) {
        map.set(record.productId, record);
      }
    }
    setInventoryByProduct(map);
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
    if (!confirm("Delete this product? This cannot be undone.")) return;

    try {
      setDeletingId(productId);
      await productsApi.remove(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error ? err.message : "Failed to delete product.";
      setError(message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        Loading products...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <FarmerSidebar active="Products" user={user} farmer={farmer} />

      <section className="flex-1 px-12 py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex items-start justify-between gap-8 mb-12">
          <div>
            <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
              Catalog
            </p>
            <h1 className="text-[42px] leading-[0.95]" style={{ fontFamily: "Georgia, serif" }}>
              Your products
            </h1>
          </div>

          <Link
            href="/dashboard/farmer/products/new"
            className="rounded-full bg-[#174832] px-7 py-4 text-sm font-semibold text-white hover:bg-[#216343]"
          >
            + New product
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-[#8a8174] text-sm">
            No products yet.{" "}
            <Link href="/dashboard/farmer/products/new" className="text-[#1e6b42] font-semibold">
              Add your first product
            </Link>
            .
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                inventoryRecord={inventoryByProduct.get(product.id) || null}
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
  inventoryRecord,
  onDelete,
  deleting,
}: {
  product: Product;
  inventoryRecord: Inventory | null;
  onDelete: () => void;
  deleting: boolean;
}) {
  const image = resolveImageUrl(
    product.images?.find((img) => img.isPrimary)?.imageUrl ||
      product.images?.[0]?.imageUrl ||
      product.imageUrl
  );

  const categoryLabel =
    typeof product.category === "string" ? product.category : product.category?.name;

  const stock = inventoryRecord?.stockQty;
  const low =
    typeof stock === "number" &&
    stock <= (inventoryRecord?.lowStockThreshold ?? 15);

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
            <p className="text-[#8a8174] text-xs mt-1 capitalize">{categoryLabel || "Uncategorized"}</p>
            <p className={`text-sm mt-2 ${low ? "text-red-500 font-semibold" : "text-[#8a8174]"}`}>
              {typeof stock === "number" ? `In stock: ${stock} units` : "Stock: N/A"}
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
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
