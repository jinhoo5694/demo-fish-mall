"use client";

import { useState, useEffect, useRef } from "react";
import { Product } from "@/lib/types";
import { searchProducts, formatPrice } from "@/lib/utils";
import productsData from "@/data/products.json";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchProducts(productsData as Product[], query);
      setResults(searchResults.slice(0, 8));
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 md:pt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-[var(--background)] rounded-2xl shadow-2xl animate-slide-down overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-4 p-4 border-b border-[var(--border)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-[var(--muted-foreground)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="상품명을 검색하세요..."
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-[var(--muted-foreground)]"
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--muted)] rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length >= 2 && results.length === 0 ? (
            <div className="p-8 text-center text-[var(--muted-foreground)]">
              <p>&apos;{query}&apos;에 대한 검색 결과가 없습니다.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="p-4 space-y-2">
              {results.map((product, index) => (
                <a
                  key={index}
                  href={product.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[var(--muted)] shrink-0">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/100x100?text=Fish";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate group-hover:text-[var(--primary)] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[var(--primary)] font-bold">
                        {formatPrice(product.price)}
                      </span>
                      {product.original_price && (
                        <span className="text-sm text-[var(--muted-foreground)] line-through">
                          {formatPrice(product.original_price)}
                        </span>
                      )}
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </a>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-[var(--muted-foreground)]">
              <p>검색어를 입력하세요 (2글자 이상)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
