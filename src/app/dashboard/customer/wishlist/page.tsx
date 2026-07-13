"use client";

import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import {
  profile as profileApi,
  customers as customersApi,
  wishlists as wishlistsApi,
  getToken,
  resolveImageUrl,
  ApiError,
  type User,
  type Customer,
  type Wishlist,
} from "@/lib/api";
import CustomerSidebar from "@/components/CustomerSidebar";
import { useCart } from "@/context/CartContext";

export default function CustomerWishlistPage() {
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const { addItem: addCartItem } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!getToken()) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileApi.get();
        setUser(profileData);

        const customersData = await customersApi.list();
        const currentCustomer = customersData.find((item) => item.userId === profileData.id);
        if (currentCustomer) setCustomer(currentCustomer);

        const myWishlist = await wishlistsApi.mine();
        setItems(myWishlist);
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

  const handleRemove = async (item: Wishlist) => {
    try {
      setBusyId(item.id);
      await wishlistsApi.remove(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error ? err.message : "Failed to remove item.";
      setError(message);
    } finally {
      setBusyId(null);
    }
  };

  const handleMoveToCart = async (item: Wishlist) => {
    try {
      setBusyId(item.id);
      await addCartItem(item.productId, 1);
      await wishlistsApi.remove(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error ? err.message : "Failed to add to cart.";
      setError(message);
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        Loading wishlist...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <CustomerSidebar active="Wishlist" user={user} customer={customer} />

      <section className="flex-1 px-12 py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
          Customer Portal
        </p>
        <h1 className="text-[42px] leading-[0.95] mb-10" style={{ fontFamily: "Georgia, serif" }}>
          Your Wishlist
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-[#e6dfd2]">
            <Heart size={32} className="text-[#c9cdbf] mb-3" />
            <p className="text-[#8a8174] text-sm">Nothing saved yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {items.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                busy={busyId === item.id}
                onRemove={() => handleRemove(item)}
                onMoveToCart={() => handleMoveToCart(item)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function WishlistCard({
  item,
  busy,
  onRemove,
  onMoveToCart,
}: {
  item: Wishlist;
  busy: boolean;
  onRemove: () => void;
  onMoveToCart: () => void;
}) {
  const product = item.product;
  const image = product?.images?.find((img) => img.isPrimary)?.imageUrl || product?.imageUrl;

  return (
    <div className="bg-white rounded-3xl p-5 border border-[#e6dfd2] flex items-center gap-4">
      <div
        className="w-16 h-16 rounded-2xl bg-cover bg-center bg-[#f1eadf] shrink-0"
        style={image ? { backgroundImage: `url(${resolveImageUrl(image)})` } : undefined}
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#102615] truncate">{product?.name || "Product"}</p>
        {product && (
          <p className="text-[#8a8174] text-sm">
            ${Number(product.priceUsd).toFixed(2)} / {product.unit}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onMoveToCart}
        disabled={busy}
        aria-label="Move to cart"
        className="shrink-0 w-9 h-9 rounded-full border border-[#d8d0c3] flex items-center justify-center text-[#1e6b42] hover:border-[#1e6b42] disabled:opacity-50"
      >
        <ShoppingCart size={15} />
      </button>

      <button
        type="button"
        onClick={onRemove}
        disabled={busy}
        aria-label="Remove from wishlist"
        className="shrink-0 w-9 h-9 rounded-full border border-[#d8d0c3] flex items-center justify-center text-[#b45151] hover:border-[#b45151] disabled:opacity-50"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
