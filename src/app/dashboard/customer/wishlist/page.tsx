"use client";

import { useEffect, useState } from "react";
import { Heart, Menu, ShoppingCart, Trash2 } from "lucide-react";
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
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/context/ToastContext";

export default function CustomerWishlistPage() {
  const { dict } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [items, setItems] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addItem: addCartItem } = useCart();
  const { showToast } = useToast();

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
      showToast(`Added ${item.product?.name || "item"} to basket`, "success");
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error ? err.message : "Failed to add to cart.";
      setError(message);
      showToast(message, "error");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4efe5] flex items-center justify-center text-[#102615]">
        {dict.dashboard.customerWishlist.loading}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe5] flex text-[#102615]">
      <CustomerSidebar
        active="Wishlist"
        user={user}
        customer={customer}
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

        <p className="text-[12px] tracking-[0.28em] uppercase text-[#1e6b42] font-bold mb-2">
          {dict.dashboard.shared.customerPortalLabel}
        </p>
        <h1 className="text-[32px] sm:text-[42px] leading-[0.95] mb-10" style={{ fontFamily: "Georgia, serif" }}>
          {dict.dashboard.customerWishlist.title}
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-3xl border border-[#e6dfd2]">
            <Heart size={32} className="text-[#c9cdbf] mb-3" />
            <p className="text-[#8a8174] text-sm">{dict.dashboard.customerWishlist.nothingSavedYet}</p>
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
  const { dict } = useLanguage();
  const product = item.product;
  const image = product?.images?.find((img) => img.isPrimary)?.imageUrl || product?.imageUrl;

  return (
    <div className="bg-white rounded-3xl p-5 border border-[#e6dfd2] flex items-center gap-4">
      <div
        className="w-16 h-16 rounded-2xl bg-cover bg-center bg-[#f1eadf] shrink-0"
        style={image ? { backgroundImage: `url(${resolveImageUrl(image)})` } : undefined}
      />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[#102615] truncate">{product?.name || dict.dashboard.customerWishlist.defaultProductName}</p>
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
        aria-label={dict.dashboard.customerWishlist.moveToCartAria}
        className="shrink-0 w-9 h-9 rounded-full border border-[#d8d0c3] flex items-center justify-center text-[#1e6b42] hover:border-[#1e6b42] disabled:opacity-50"
      >
        <ShoppingCart size={15} />
      </button>

      <button
        type="button"
        onClick={onRemove}
        disabled={busy}
        aria-label={dict.dashboard.customerWishlist.removeAria}
        className="shrink-0 w-9 h-9 rounded-full border border-[#d8d0c3] flex items-center justify-center text-[#b45151] hover:border-[#b45151] disabled:opacity-50"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
