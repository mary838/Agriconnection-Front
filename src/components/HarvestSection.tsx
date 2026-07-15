"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products as productsApi, resolveImageUrl, type Product } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80";

export default function HarvestSection() {
  const { language, dict } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.list(language);
        setProducts(data.slice(0, 4));
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [language]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <h2
              className="text-[32px] font-semibold text-[#1c2b1a] leading-tight"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {dict.harvest.title}
            </h2>
            <p className="text-[14px] text-[#7a8a6a] mt-1">
              {dict.harvest.subtitle}
            </p>
          </div>
          <Link
            href="/marketplace"
            className="text-[13.5px] font-medium text-[#2d5a1b] hover:underline whitespace-nowrap"
          >
            {dict.harvest.viewFullInventory}
          </Link>
        </div>

        {/* Product cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-[#faf8f4] border border-[#ede8df] animate-pulse"
              >
                <div className="aspect-[4/3] bg-[#e8e0d0]" />
                <div className="px-4 py-3 space-y-2">
                  <div className="h-4 bg-[#e8e0d0] rounded w-3/4" />
                  <div className="h-3 bg-[#e8e0d0] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => {
              const farmName =
                product.farmer?.user?.name ||
                product.farmer?.farmerCode ||
                dict.harvest.localFarmer;

              return (
                <Link
                  key={product.id}
                  href={`/marketplace/${product.id}`}
                  className="group rounded-2xl overflow-hidden bg-[#faf8f4] border border-[#ede8df] hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-[#e8e0d0]">
                    <img
                      src={
                        resolveImageUrl(
                          product.images?.find((img) => img.isPrimary)?.imageUrl ||
                            product.images?.[0]?.imageUrl ||
                            product.imageUrl
                        ) || FALLBACK_IMAGE
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
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
                    <p className="text-[12px] text-[#7a8a6a] mt-1">{dict.harvest.by} {farmName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-[14px] text-[#7a8a6a] py-10 text-center">
            {dict.harvest.noProduce}
          </p>
        )}

      </div>
    </section>
  );
}