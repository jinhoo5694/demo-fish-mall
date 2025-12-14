"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const getBadgeClass = (badge: string) => {
    const upperBadge = badge.toUpperCase();
    if (upperBadge.includes("TIME") || upperBadge.includes("SALE")) return "badge-sale";
    if (upperBadge.includes("NEW")) return "badge-new";
    if (upperBadge.includes("HOT")) return "badge-hot";
    if (upperBadge.includes("BEST")) return "badge-best";
    if (upperBadge.includes("MD")) return "badge-md";
    return "badge-sale";
  };

  return (
    <a
      href={product.product_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] card-hover"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[var(--muted)]">
        <Image
          src={imageError ? "https://via.placeholder.com/400x400?text=Fish" : product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImageError(true)}
        />

        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {product.badges.slice(0, 2).map((badge, i) => (
              <span key={i} className={`badge ${getBadgeClass(badge)}`}>
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Discount Badge */}
        {product.discount_rate && (
          <div className="absolute top-3 right-3 w-12 h-12 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
            {product.discount_rate}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-3 bg-white text-[var(--primary)] font-bold rounded-full">
            자세히 보기
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-[var(--foreground)] line-clamp-2 min-h-[3rem] group-hover:text-[var(--primary)] transition-colors">
          {product.name}
        </h3>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-bold text-[var(--primary)]">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="text-sm text-[var(--muted-foreground)] line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-[var(--muted-foreground)] truncate">
          {product.quantity || '\u00A0'}
        </p>
      </div>
    </a>
  );
}
