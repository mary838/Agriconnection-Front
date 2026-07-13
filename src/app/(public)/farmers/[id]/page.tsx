"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Send, ShieldCheck, ArrowLeft } from "lucide-react";
import {
  farmers as farmersApi,
  products as productsApi,
  getToken,
  ApiError,
  resolveImageUrl,
  categoryName,
  type Farmer,
  type Product,
} from "@/lib/api";

export default function FarmerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const farmerId = params.id as string;

  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!getToken()) {
          router.push(`/login?redirect=/farmers/${farmerId}`);
          return;
        }

        const [farmerData, allProducts] = await Promise.all([
          farmersApi.get(farmerId),
          productsApi.list(),
        ]);

        setFarmer(farmerData);
        setProducts(allProducts.filter((p) => p.farmerId === farmerId));
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
  }, [farmerId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-[#1c2b1a]">
        Loading farmer profile...
      </div>
    );
  }

  if (error || !farmer) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center text-red-500">
        {error || "Farmer not found."}
      </div>
    );
  }

  const displayName = farmer.farmName || farmer.user?.name || farmer.farmerCode;
  const isVerified = Boolean(farmer.verifiedAt) || farmer.status === "verified";

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#7a8a6a] hover:text-[#2d5a1b] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start mb-14">
          <div className="lg:col-span-2 flex items-start gap-5">
            <div className="w-16 h-16 shrink-0 rounded-full bg-[#b8cfa8] flex items-center justify-center text-[#1e3d18] text-[22px] font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1
                  className="text-[28px] sm:text-[36px] font-semibold text-[#1c2b1a] leading-tight"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {displayName}
                </h1>
                {isVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#eaf2e4] text-[#1e6b42]">
                    <ShieldCheck size={12} />
                    Verified
                  </span>
                )}
              </div>

              {farmer.farmName && (
                <p className="text-[14px] text-[#7a8a6a] mb-3">
                  Grown by {farmer.user?.name || "a local farmer"}
                </p>
              )}

              {farmer.bio && (
                <p className="text-[14.5px] text-[#5a6a52] leading-relaxed max-w-xl mb-3">
                  {farmer.bio}
                </p>
              )}

              <div className="flex items-center gap-4 flex-wrap text-[13.5px] text-[#7a8a6a]">
                {farmer.province?.name && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} />
                    {farmer.province.name}
                  </span>
                )}
                <span className="text-[#9aaa8a]">{farmer.farmerCode}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#ede8df] rounded-2xl p-6 flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#9aaa8a] mb-1">
              Contact
            </p>

            <div className="flex items-center gap-2.5 text-[14px] text-[#1c2b1a]">
              <Phone size={15} className="text-[#2d5a1b] shrink-0" />
              {farmer.phone}
            </div>

            {farmer.telegramPhone && (
              <div className="flex items-center gap-2.5 text-[14px] text-[#1c2b1a]">
                <Send size={15} className="text-[#2d5a1b] shrink-0" />
                {farmer.telegramPhone}
              </div>
            )}

            {farmer.address && (
              <div className="flex items-start gap-2.5 text-[13.5px] text-[#5a6a52] pt-1 border-t border-[#ede8df] mt-1">
                <MapPin size={14} className="text-[#9aaa8a] shrink-0 mt-0.5" />
                {farmer.address}
              </div>
            )}
          </div>
        </div>

        <div>
          <p
            className="text-[20px] font-medium text-[#1c2b1a] mb-5"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Produce from {displayName}
          </p>

          {products.length === 0 ? (
            <p className="text-[14px] text-[#9aaa8a]">
              No products listed yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/marketplace/${product.id}`}
                  className="group bg-white border border-[#ede8df] rounded-2xl overflow-hidden hover:shadow-md transition-shadow block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e0d0]">
                    <img
                      src={
                        resolveImageUrl(
                          product.images?.find((img) => img.isPrimary)?.imageUrl ||
                            product.images?.[0]?.imageUrl ||
                            product.imageUrl
                        ) ||
                        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.1em] px-3 py-1 rounded-full bg-[#1e3d18] text-white uppercase">
                      {categoryName(product.category).replace("_", " ")}
                    </span>
                  </div>

                  <div className="px-4 py-4">
                    <p
                      className="text-[15px] font-medium text-[#1c2b1a] mb-1"
                      style={{ fontFamily: "Georgia, serif" }}
                    >
                      {product.name}
                    </p>
                    <p className="text-[14px] font-semibold text-[#1c2b1a]">
                      ${Number(product.priceUsd).toFixed(2)}/{product.unit}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
