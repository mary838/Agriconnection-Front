"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, Leaf, Truck, ShieldCheck, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  products as productsApi,
  wishlists as wishlistsApi,
  getToken,
  ApiError,
  categoryName,
  resolveImageUrl,
  totalStock,
  type Product,
} from "@/lib/api";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80";

function TrustIcon({ icon }: { icon: string }) {
  const cls = "text-[#2d5a1b]";
  if (icon === "leaf") return <Leaf size={16} className={cls} />;
  if (icon === "truck") return <Truck size={16} className={cls} />;
  return <ShieldCheck size={16} className={cls} />;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [wishlistBusy, setWishlistBusy] = useState(false);

  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        if (!getToken()) {
          router.push(`/login?redirect=/marketplace/${productId}`);
          return;
        }

        const data = await productsApi.get(productId);
        setProduct(data);
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

    fetchProduct();
  }, [productId, router]);

  useEffect(() => {
    if (!user || user.role !== "customer") {
      setWishlisted(false);
      return;
    }

    wishlistsApi
      .mine()
      .then((items) => {
        setWishlisted(items.some((item) => item.productId === productId));
      })
      .catch(() => {});
  }, [user, productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-[#1c2b1a]">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  const allImages = [
    product.imageUrl,
    ...(product.images?.map((img) => img.imageUrl) || []),
  ]
    .filter(Boolean)
    .map((img) => resolveImageUrl(img as string));

  const images = Array.from(new Set(allImages.length ? allImages : [FALLBACK_IMAGE]));

  const safeActiveImg = Math.min(activeImg, images.length - 1);

  const farmName =
    product.farmer?.user?.name || product.farmer?.farmerCode || "Local Farmer";

  const total = (Number(product.priceUsd) * qty).toFixed(2);
  const stock = totalStock(product);
  const outOfStock = stock <= 0;

  const handleAddToBasket = async () => {
    if (!user) {
      router.push(`/login?redirect=/marketplace/${product.id}`);
      return;
    }

    if (outOfStock) return;

    try {
      setAdding(true);
      setError("");
      await addItem(product.id, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Failed to add to basket.";
      setError(message);
    } finally {
      setAdding(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      router.push(`/login?redirect=/marketplace/${product.id}`);
      return;
    }

    if (user.role !== "customer") {
      setError("Only customer accounts can use the wishlist.");
      return;
    }

    try {
      setWishlistBusy(true);
      setError("");
      if (wishlisted) {
        await wishlistsApi.removeByProduct(product.id);
        setWishlisted(false);
      } else {
        await wishlistsApi.add({ productId: product.id });
        setWishlisted(true);
      }
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : "Failed to update wishlist.";
      setError(message);
    } finally {
      setWishlistBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8">
        <nav className="flex items-center gap-2 text-[13px] text-[#9aaa8a] mb-8">
          <Link
            href="/marketplace"
            className="hover:text-[#2d5a1b] transition-colors"
          >
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-[#1c2b1a] font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#e8e0d0]">
              <img
                src={images[safeActiveImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  onClick={() => setActiveImg(i)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-colors ${
                    safeActiveImg === i
                      ? "border-[#2d5a1b]"
                      : "border-transparent hover:border-[#c8d8b8]"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:pt-2">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#2d5a1b]">
              {categoryName(product.category).replace("_", " ")} • {product.productCode}
            </p>

            <h1
              className="text-[32px] sm:text-[42px] font-semibold text-[#1c2b1a] leading-tight -mt-2"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {product.name}
            </h1>

            <p className="text-[14px] text-[#7a8a6a] -mt-2">
              Fresh product from{" "}
              {product.farmer?.id ? (
                <Link
                  href={`/farmers/${product.farmer.id}`}
                  className="italic font-medium text-[#1c2b1a] hover:text-[#2d5a1b] transition-colors"
                >
                  {farmName}
                </Link>
              ) : (
                <span className="italic font-medium text-[#1c2b1a]">{farmName}</span>
              )}
            </p>

            <div className="flex items-baseline gap-2">
              <span
                className="text-[36px] sm:text-[44px] font-semibold text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                ${Number(product.priceUsd).toFixed(2)}
              </span>
              <span className="text-[14px] text-[#9aaa8a]">
                per {product.unit}
              </span>
            </div>

            <p className="text-[14px] text-[#5a6a52] leading-[1.75]">
              This product is listed by a verified AgriConnect farmer. Fresh,
              locally sourced, and ready for marketplace orders.
            </p>

            {outOfStock ? (
              <p className="text-[13px] font-semibold text-red-500">
                Out of stock
              </p>
            ) : (
              <p className="text-[13px] text-[#7a8a6a]">
                {stock} {product.unit} available
              </p>
            )}

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 bg-white border border-[#e0dbd0] rounded-full px-4 py-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={outOfStock}
                  className="w-6 h-6 flex items-center justify-center text-[#4a5568] hover:text-[#1c2b1a] transition-colors disabled:opacity-50"
                >
                  <Minus size={14} />
                </button>

                <span className="flex items-center gap-1 text-[14px] font-medium text-[#1c2b1a]">
                  <input
                    type="number"
                    min={1}
                    max={stock}
                    value={outOfStock ? 0 : qty}
                    disabled={outOfStock}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (Number.isNaN(value)) return;
                      setQty(Math.min(stock, Math.max(1, value)));
                    }}
                    onBlur={(e) => {
                      const value = Number(e.target.value);
                      if (!value || Number.isNaN(value)) setQty(1);
                    }}
                    className="w-12 text-center bg-transparent focus:outline-none disabled:opacity-50 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span>{product.unit}</span>
                </span>

                <button
                  onClick={() => setQty((q) => Math.min(stock, q + 1))}
                  disabled={outOfStock || qty >= stock}
                  className="w-6 h-6 flex items-center justify-center text-[#4a5568] hover:text-[#1c2b1a] transition-colors disabled:opacity-50"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={handleAddToBasket}
                disabled={isLoading || adding || outOfStock}
                className="flex-1 bg-[#1e3d18] text-white text-[14px] font-medium px-6 py-3 rounded-full hover:bg-[#2d5a1b] transition-colors disabled:opacity-50"
              >
                {outOfStock
                  ? "Out of stock"
                  : !user
                  ? "Sign in to buy"
                  : added
                  ? "Added to basket ✓"
                  : adding
                  ? "Adding..."
                  : `Add to basket — $${total}`}
              </button>

              <button
                onClick={handleToggleWishlist}
                disabled={wishlistBusy}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`w-11 h-11 shrink-0 rounded-full border flex items-center justify-center transition-colors disabled:opacity-50 ${
                  wishlisted
                    ? "border-[#1e6b42] bg-[#eaf2e4] text-[#1e6b42]"
                    : "border-[#e0dbd0] text-[#4a5568] hover:border-[#1e6b42] hover:text-[#1e6b42]"
                }`}
              >
                <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
              </button>
            </div>

            {error && (
              <p className="text-[13px] text-red-500 -mt-2">{error}</p>
            )}

            <div className="flex items-center gap-6 flex-wrap pt-1">
              {[
                { icon: "leaf", label: "Fresh produce" },
                { icon: "truck", label: "Local delivery" },
                { icon: "shield", label: "Farmer verified" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#eaf2e4] flex items-center justify-center">
                    <TrustIcon icon={t.icon} />
                  </div>
                  <span className="text-[13px] text-[#5a6a52]">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-[#f0ece4] rounded-2xl p-5 flex flex-col gap-2 mt-1">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#7a8a6a]">
                Grown by
              </p>

              <h3
                className="text-[22px] font-semibold text-[#1c2b1a]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {farmName}
              </h3>

              {product.farmer?.id && (
                <Link
                  href={`/farmers/${product.farmer.id}`}
                  className="text-[13px] font-medium text-[#2d5a1b] hover:underline w-fit"
                >
                  View farmer profile
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}