"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  icon?: string;
  id?: string;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  icon = "🐠",
  id,
}: ProductSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (products.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id={id}
      className="py-16 md:py-24 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{icon}</span>
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="gradient-text">{title}</span>
              </h2>
            </div>
            {subtitle && (
              <p className="text-[var(--muted-foreground)] text-lg">{subtitle}</p>
            )}
          </div>

          <a
            href="#"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[var(--primary)] font-medium hover:underline group"
          >
            전체보기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${Math.min(index * 100, 400)}ms` }}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
