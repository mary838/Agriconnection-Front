"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { resolveImageUrl, totalStock, ApiError, type CartItem } from "@/lib/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&q=80";

const DELIVERY = 4.5;

function farmName(item: CartItem) {
  return item.product?.farmer?.user?.name || item.product?.farmer?.farmerCode || "Local Farmer";
}

export default function CartPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { cart, loading, updateItem, removeItem: removeCartItem } = useCart();
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/login?redirect=/cart");
    } else if (user.role !== "customer") {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "customer" || loading) return null;

  const items = cart?.items || [];

  const runAction = async (id: string, action: () => Promise<void>) => {
    try {
      setBusyId(id);
      setError("");
      await action();
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setBusyId(null);
    }
  };

  const stockFor = (item: CartItem) =>
    item.product ? totalStock(item.product) : item.quantity;

  const updateQty = (item: CartItem, delta: number) => {
    const stock = stockFor(item);
    const nextQty = Math.min(stock, Math.max(1, item.quantity + delta));
    if (nextQty === item.quantity) return;
    runAction(item.id, () => updateItem(item.id, nextQty));
  };

  const setQty = (item: CartItem, quantity: number) => {
    const stock = stockFor(item);
    const nextQty = Math.min(stock, Math.max(1, quantity));
    if (nextQty === item.quantity) return;
    runAction(item.id, () => updateItem(item.id, nextQty));
  };

  const removeItem = (item: CartItem) => {
    runAction(item.id, () => removeCartItem(item.id));
  };

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.product?.priceUsd || 0) * i.quantity,
    0
  );
  const total = subtotal + DELIVERY;
  const farmCount = new Set(items.map((i) => farmName(i))).size;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-[32px] sm:text-[42px] font-semibold text-[#1c2b1a] leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your basket
          </h1>
          <p className="text-[14px] text-[#7a8a6a] mt-1">
            {items.length} items from {farmCount} farm{farmCount !== 1 ? "s" : ""} — ready to harvest tomorrow morning.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[18px] text-[#7a8a6a] mb-4">Your basket is empty.</p>
            <Link
              href="/marketplace"
              className="inline-block bg-[#1e3d18] text-white px-8 py-3 rounded-full text-[14px] font-medium hover:bg-[#2d5a1b] transition-colors"
            >
              Browse the harvest
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

            {/* ── Cart items ── */}
            <div className="flex flex-col gap-3">
              {items.map((item) => {
                const product = item.product;
                const image = resolveImageUrl(
                  product?.images?.find((img) => img.isPrimary)?.imageUrl ||
                    product?.images?.[0]?.imageUrl ||
                    product?.imageUrl
                ) || FALLBACK_IMAGE;
                const isBusy = busyId === item.id;
                const stock = stockFor(item);

                return (
                  <div
                    key={item.id}
                    className={`bg-white border border-[#ede8df] rounded-2xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 ${
                      isBusy ? "opacity-60" : ""
                    }`}
                  >
                    {/* Top row: image + info + mobile remove */}
                    <div className="flex items-center gap-4">
                      <div className="w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden bg-[#e8e0d0] shrink-0">
                        <img
                          src={image}
                          alt={product?.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[15px] font-semibold text-[#1c2b1a]"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {product?.name || "Product"}
                        </p>
                        <p className="text-[12px] text-[#7a8a6a] mt-0.5">{farmName(item)}</p>
                        <p className="text-[12px] text-[#9aaa8a] mt-0.5">{product?.unit}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item)}
                        disabled={isBusy}
                        className="sm:hidden text-[#c8d0b8] hover:text-[#7a8a6a] transition-colors disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Bottom row: qty + price + desktop remove */}
                    <div className="flex items-center gap-3 sm:ml-auto">
                      <div className="flex items-center gap-3 border border-[#e0dbd0] rounded-full px-4 py-2 bg-white">
                        <button
                          onClick={() => updateQty(item, -1)}
                          disabled={isBusy || item.quantity <= 1}
                          className="text-[#7a8a6a] hover:text-[#1c2b1a] transition-colors disabled:opacity-50"
                        >
                          <Minus size={13} />
                        </button>
                        <input
                          key={item.quantity}
                          type="number"
                          min={1}
                          max={stock}
                          defaultValue={item.quantity}
                          disabled={isBusy}
                          onBlur={(e) => {
                            const value = Number(e.target.value);
                            if (!value || Number.isNaN(value)) {
                              e.target.value = String(item.quantity);
                              return;
                            }
                            setQty(item, value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                          }}
                          className="w-10 text-[14px] font-medium text-[#1c2b1a] text-center bg-transparent focus:outline-none disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => updateQty(item, 1)}
                          disabled={isBusy || item.quantity >= stock}
                          className="text-[#7a8a6a] hover:text-[#1c2b1a] transition-colors disabled:opacity-50"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="text-[15px] font-semibold text-[#1c2b1a] min-w-[56px] text-right">
                        ${(Number(product?.priceUsd || 0) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item)}
                        disabled={isBusy}
                        className="hidden sm:block text-[#c8d0b8] hover:text-[#7a8a6a] transition-colors disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Order summary ── */}
            <div className="bg-[#1e3d18] rounded-2xl p-7 lg:sticky lg:top-20">
              <h2
                className="text-[24px] font-semibold text-white mb-6"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Order summary
              </h2>

              <div className="flex flex-col gap-3 mb-5">
                <div className="flex justify-between text-[14px]">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-white/60">Local delivery</span>
                  <span className="text-white font-medium">${DELIVERY.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-white/60">Farmer support</span>
                  <span className="text-white/60 italic">Included</span>
                </div>
              </div>

              <div className="border-t border-white/15 mb-5" />

              <div className="flex justify-between items-baseline mb-6">
                <span className="text-[14px] text-white/70">Total</span>
                <span
                  className="text-[36px] font-semibold text-white leading-none"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-white text-[#1e3d18] text-[15px] font-semibold py-4 rounded-full hover:bg-white/90 transition-colors"
              >
                Proceed to checkout
              </button>

              <p className="text-center text-[12px] text-white/40 mt-4">
                85¢ of every dollar goes directly to farmers.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}