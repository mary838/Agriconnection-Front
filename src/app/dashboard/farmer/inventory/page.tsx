"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function FarmerInventoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [inventoryByProduct, setInventoryByProduct] = useState<Map<string, Inventory>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        const [allProducts, allInventory] = await Promise.all([
          productsApi.list(),
          inventoryApi.list(),
        ]);

        const farmerProducts = allProducts.filter((p) => p.farmerId === currentFarmer.id);
        setProducts(farmerProducts);

        const map = new Map<string, Inventory>();
        for (const record of allInventory) {
          if (farmerProducts.some((p) => p.id === record.productId)) {
            map.set(record.productId, record);
          }
        }
        setInventoryByProduct(map);
      } catch (err: unknown) {
        const message =
          err instanceof ApiError || err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaved = (record: Inventory) => {
    setInventoryByProduct((prev) => {
      const next = new Map(prev);
      next.set(record.productId, record);
      return next;
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        Loading inventory...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <FarmerSidebar active="Inventory" user={user} farmer={farmer} />

      <section className="flex-1 px-12 py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="flex items-start justify-between gap-8 mb-12">
          <div>
            <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
              Stock
            </p>
            <h1 className="text-[42px] leading-[0.95]" style={{ fontFamily: "Georgia, serif" }}>
              Inventory
            </h1>
          </div>
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
          <div className="flex flex-col gap-4">
            {products.map((product) => (
              <InventoryRow
                key={product.id}
                product={product}
                inventoryRecord={inventoryByProduct.get(product.id) || null}
                farmer={farmer}
                onSaved={handleSaved}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function statusBadgeClass(status?: string) {
  if (status === "low_stock") return "bg-[#fff0cf] text-[#b17400]";
  if (status === "out_of_stock") return "bg-[#fde2e2] text-[#c0362c]";
  return "bg-[#dff7ea] text-[#008454]";
}

function InventoryRow({
  product,
  inventoryRecord,
  farmer,
  onSaved,
}: {
  product: Product;
  inventoryRecord: Inventory | null;
  farmer: Farmer | null;
  onSaved: (record: Inventory) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [stockQty, setStockQty] = useState(String(inventoryRecord?.stockQty ?? ""));
  const [threshold, setThreshold] = useState(String(inventoryRecord?.lowStockThreshold ?? "20"));
  const [saving, setSaving] = useState(false);
  const [rowError, setRowError] = useState("");

  const image = resolveImageUrl(
    product.images?.find((img) => img.isPrimary)?.imageUrl ||
      product.images?.[0]?.imageUrl ||
      product.imageUrl
  );

  const startEditing = () => {
    setStockQty(String(inventoryRecord?.stockQty ?? ""));
    setThreshold(String(inventoryRecord?.lowStockThreshold ?? "20"));
    setRowError("");
    setEditing(true);
  };

  const handleSave = async () => {
    if (!stockQty || !threshold) {
      setRowError("Both fields are required.");
      return;
    }

    try {
      setSaving(true);
      setRowError("");

      if (inventoryRecord) {
        const updated = await inventoryApi.update(inventoryRecord.id, {
          stockQty: Number(stockQty),
          lowStockThreshold: Number(threshold),
        });
        onSaved(updated);
      } else {
        if (!farmer?.provinceId) {
          setRowError("Your farmer profile has no province set.");
          return;
        }
        const created = await inventoryApi.create({
          productId: product.id,
          provinceId: farmer.provinceId,
          stockQty: Number(stockQty),
          lowStockThreshold: Number(threshold),
        });
        onSaved(created);
      }

      setEditing(false);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error ? err.message : "Failed to save inventory.";
      setRowError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#e6dfd2] p-5 flex items-center gap-5">
      <div
        className="w-16 h-16 rounded-2xl bg-cover bg-center bg-[#e6dfd2] shrink-0"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      />

      <div className="flex-1 min-w-0">
        <h3 style={{ fontFamily: "Georgia, serif" }} className="truncate">
          {product.name}
        </h3>
        <p className="text-[#8a8174] text-xs mt-1">
          {inventoryRecord?.province?.name || farmer?.province?.name || "Province not set"}
        </p>
        {rowError && <p className="text-red-500 text-xs mt-1">{rowError}</p>}
      </div>

      {editing ? (
        <div className="flex items-center gap-3">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.14em] text-[#7a8a6a] mb-1">
              Stock qty
            </label>
            <input
              type="number"
              value={stockQty}
              onChange={(e) => setStockQty(e.target.value)}
              className="w-24 px-3 py-2 rounded-full border border-[#e0dbd0] text-sm outline-none focus:border-[#2d5a1b]"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.14em] text-[#7a8a6a] mb-1">
              Low stock at
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-24 px-3 py-2 rounded-full border border-[#e0dbd0] text-sm outline-none focus:border-[#2d5a1b]"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[#174832] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#216343] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => setEditing(false)}
            disabled={saving}
            className="rounded-full border border-[#e0dbd0] px-5 py-2.5 text-sm font-semibold hover:border-[#174832]"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          {inventoryRecord ? (
            <>
              <div className="text-right">
                <p className="font-semibold">{inventoryRecord.stockQty} units</p>
                <p className="text-[#8a8174] text-xs mt-1">Low at {inventoryRecord.lowStockThreshold}</p>
              </div>
              <span
                className={`text-[10px] font-bold rounded-full px-3 py-1 uppercase ${statusBadgeClass(
                  inventoryRecord.status
                )}`}
              >
                {inventoryRecord.status?.replace("_", " ") || "in stock"}
              </span>
            </>
          ) : (
            <p className="text-[#8a8174] text-sm">No inventory record</p>
          )}

          <button
            onClick={startEditing}
            className="rounded-full border border-[#e0dbd0] px-5 py-2.5 text-sm font-semibold hover:border-[#174832]"
          >
            {inventoryRecord ? "Edit" : "Add stock"}
          </button>
        </div>
      )}
    </div>
  );
}
