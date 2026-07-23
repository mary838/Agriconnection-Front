"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, Heart } from "lucide-react";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  products as productsApi,
  categories as categoriesApi,
  wishlists as wishlistsApi,
  ApiError,
  categoryName,
  categoryId,
  resolveImageUrl,
  isOutOfStock,
  type Product,
  type Category,
} from "@/lib/api";

const ITEMS_PER_PAGE = 8;

type SortOption = "recommended" | "price-asc" | "price-desc" | "newest";

export default function MarketplacePage() {
  const { user } = useAuth();
  const { language, dict } = useLanguage();
  const isCustomer = user?.role === "customer";
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | "all">("all");
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
  const [wishlistBusyId, setWishlistBusyId] = useState<string | null>(null);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsData, categoriesData] = await Promise.all([
          productsApi.list(language),
          categoriesApi.list(language),
        ]);
        setProducts(productsData);
        setCategoryList(categoriesData);
      } catch (err: unknown) {
        const message =
          err instanceof ApiError || err instanceof Error
            ? err.message
            : dict.marketplace.somethingWrong;
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  useEffect(() => {
    if (!isCustomer) {
      setWishlistedIds(new Set());
      return;
    }

    wishlistsApi
      .mine()
      .then((items) => setWishlistedIds(new Set(items.map((item) => item.productId))))
      .catch(() => {});
  }, [isCustomer]);

  const handleToggleWishlist = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isCustomer) {
      setError(dict.marketplace.wishlistOnlyCustomer);
      return;
    }

    try {
      setWishlistBusyId(productId);
      if (wishlistedIds.has(productId)) {
        await wishlistsApi.removeByProduct(productId);
        setWishlistedIds((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        await wishlistsApi.add({ productId });
        setWishlistedIds((prev) => new Set(prev).add(productId));
      }
    } catch (err: unknown) {
      const message =
        err instanceof ApiError || err instanceof Error
          ? err.message
          : dict.marketplace.wishlistUpdateFailed;
      setError(message);
    } finally {
      setWishlistBusyId(null);
    }
  };

  useEffect(() => {
    if (!filtersOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setFiltersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filtersOpen]);

  const categoryOptions = useMemo(
    () => [
      { id: "all" as const, name: dict.marketplace.allProduce },
      ...categoryList.map((c) => ({ id: c.id, name: c.name })),
    ],
    [categoryList, dict.marketplace.allProduce]
  );

  const activeFilterCount = (minPrice ? 1 : 0) + (maxPrice ? 1 : 0);

  const filtered = useMemo(() => {
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    const result = products.filter((p) => {
      if (isOutOfStock(p)) return false;

      const category = categoryName(p.category);
      const matchCat =
        activeCategoryId === "all" || categoryId(p.category) === activeCategoryId;

      const farmName =
        p.farmer?.user?.name || p.farmer?.farmerCode || "Local Farmer";

      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        farmName.toLowerCase().includes(search.toLowerCase()) ||
        category.toLowerCase().includes(search.toLowerCase());

      const price = Number(p.priceUsd);
      const matchPrice = (min === null || price >= min) && (max === null || price <= max);

      return matchCat && matchSearch && matchPrice;
    });

    switch (sortOption) {
      case "price-asc":
        return [...result].sort((a, b) => Number(a.priceUsd) - Number(b.priceUsd));
      case "price-desc":
        return [...result].sort((a, b) => Number(b.priceUsd) - Number(a.priceUsd));
      case "newest":
        // Product has no createdAt field yet; the API returns oldest-first, so reverse as a proxy.
        return [...result].reverse();
      default:
        return result;
    }
  }, [activeCategoryId, search, products, sortOption, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (id: number | "all") => {
    setActiveCategoryId(id);
    setCurrentPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-[#1c2b1a]">
        {dict.marketplace.loading}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#2d5a1b] mb-2">
            {dict.marketplace.eyebrow}
          </p>

          <h1
            className="text-[32px] sm:text-[44px] font-semibold text-[#1c2b1a] leading-tight mb-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {dict.marketplace.title}
          </h1>

          <p className="text-[15px] text-[#7a8a6a]">
            {dict.marketplace.subtitle}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="relative flex flex-wrap items-center gap-3 mb-6" ref={filtersRef}>
          <div className="flex-1 min-w-[200px] relative">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9aaa8a]"
            />

            <input
              type="text"
              placeholder={dict.marketplace.searchPlaceholder}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-[14px] bg-white border border-[#e0dbd0] rounded-xl text-[#1c2b1a] placeholder-[#b0b8a0] focus:outline-none focus:border-[#2d5a1b] transition-colors"
            />
          </div>

          <div>
            <button
              onClick={() => setFiltersOpen((open) => !open)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-[#e0dbd0] rounded-xl text-[14px] text-[#4a5568] hover:border-[#2d5a1b] transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal size={15} />
              {dict.marketplace.filters}
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[11px] font-semibold rounded-full bg-[#2d5a1b] text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {filtersOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-64 max-w-[calc(100vw-3rem)] bg-white border border-[#e0dbd0] rounded-xl shadow-lg p-4">
                <p className="text-[13px] font-semibold text-[#1c2b1a] mb-3">
                  {dict.marketplace.priceRange}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="number"
                    min="0"
                    placeholder={dict.marketplace.min}
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 text-[13px] bg-[#faf9f6] border border-[#e0dbd0] rounded-lg text-[#1c2b1a] focus:outline-none focus:border-[#2d5a1b]"
                  />
                  <span className="text-[#9aaa8a] text-[13px]">{dict.marketplace.to}</span>
                  <input
                    type="number"
                    min="0"
                    placeholder={dict.marketplace.max}
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 text-[13px] bg-[#faf9f6] border border-[#e0dbd0] rounded-lg text-[#1c2b1a] focus:outline-none focus:border-[#2d5a1b]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setMinPrice("");
                      setMaxPrice("");
                      setCurrentPage(1);
                    }}
                    className="text-[13px] text-[#7a8a6a] hover:text-[#2d5a1b] transition-colors"
                  >
                    {dict.marketplace.clear}
                  </button>

                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="px-4 py-2 text-[13px] font-medium rounded-lg bg-[#1e3d18] text-white hover:bg-[#2d5a1b] transition-colors"
                  >
                    {dict.marketplace.apply}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value as SortOption);
                setCurrentPage(1);
              }}
              className="appearance-none pl-4 pr-9 py-3 bg-white border border-[#e0dbd0] rounded-xl text-[14px] text-[#4a5568] hover:border-[#2d5a1b] transition-colors focus:outline-none cursor-pointer"
            >
              <option value="recommended">{dict.marketplace.sortRecommended}</option>
              <option value="price-asc">{dict.marketplace.sortPriceAsc}</option>
              <option value="price-desc">{dict.marketplace.sortPriceDesc}</option>
              <option value="newest">{dict.marketplace.sortNewest}</option>
            </select>

            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aaa8a] pointer-events-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-8">
          {categoryOptions.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-[13.5px] font-medium transition-colors ${
                activeCategoryId === cat.id
                  ? "bg-[#1e3d18] text-white"
                  : "bg-white border border-[#e0dbd0] text-[#4a5568] hover:border-[#2d5a1b] hover:text-[#2d5a1b]"
              }`}
            >
              {cat.name.replace("_", " ")}
            </button>
          ))}
        </div>

        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginated.map((product) => {
              const farmName =
                product.farmer?.user?.name ||
                product.farmer?.farmerCode ||
                dict.marketplace.localFarmer;

              return (
                <Link
                  key={product.id}
                  href={`/marketplace/${product.id}`}
                  className="group bg-white border border-[#ede8df] rounded-2xl overflow-hidden hover:shadow-md transition-shadow block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e0d0]">
                    <img
                      src={resolveImageUrl(
                        product.images?.find((img) => img.isPrimary)?.imageUrl ||
                          product.images?.[0]?.imageUrl ||
                          product.imageUrl
                      ) || "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full bg-[#1e3d18] text-white uppercase">
                      {categoryName(product.category).replace("_", " ")}
                    </span>

                    <button
                      onClick={(e) => handleToggleWishlist(e, product.id)}
                      disabled={wishlistBusyId === product.id}
                      aria-label={
                        wishlistedIds.has(product.id)
                          ? dict.marketplace.removeFromWishlist
                          : dict.marketplace.addToWishlist
                      }
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 ${
                        wishlistedIds.has(product.id)
                          ? "bg-[#eaf2e4] text-[#1e6b42]"
                          : "bg-white/90 text-[#4a5568] hover:text-[#1e6b42]"
                      }`}
                    >
                      <Heart
                        size={14}
                        fill={wishlistedIds.has(product.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <div className="px-4 py-4">
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9aaa8a] mb-1">
                      {product.productCode}
                    </p>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p
                        className="text-[15px] font-medium text-[#1c2b1a]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {product.name}
                      </p>

                      <p className="text-[14px] font-semibold text-[#1c2b1a] shrink-0">
                        ${Number(product.priceUsd).toFixed(2)}/{product.unit}
                      </p>
                    </div>

                    <p className="text-[12px] text-[#9aaa8a]">{farmName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-[#9aaa8a]">
            <p className="text-[16px]">
              {dict.marketplace.noProduceFound.replace("{search}", search)}
            </p>
            <p className="text-[13px] mt-1">
              {dict.marketplace.tryDifferent}
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}