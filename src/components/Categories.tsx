"use client";

import { useEffect, useRef, useState } from "react";

const categories = [
  { id: "guppy", name: "구피류", icon: "🐠", color: "from-orange-400 to-red-500" },
  { id: "tetra", name: "카라신", icon: "🐟", color: "from-blue-400 to-cyan-500" },
  { id: "cichlid", name: "시클리드", icon: "🐡", color: "from-purple-400 to-pink-500" },
  { id: "platy", name: "플래티/몰리", icon: "🎏", color: "from-green-400 to-teal-500" },
  { id: "tank", name: "수조/용품", icon: "🏠", color: "from-slate-400 to-gray-600" },
  { id: "plant", name: "수초", icon: "🌿", color: "from-emerald-400 to-green-600" },
];

export default function Categories() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">카테고리</span>
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg">
            다양한 종류의 열대어와 용품을 만나보세요
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href="#"
              className={`group relative p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] card-hover text-center transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              />
              <div className="relative">
                <span className="text-4xl md:text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {category.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
