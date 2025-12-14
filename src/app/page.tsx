import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductSection from "@/components/ProductSection";
import Footer from "@/components/Footer";
import { Product } from "@/lib/types";
import { filterProductsByBadge } from "@/lib/utils";
import productsData from "@/data/products.json";

export default function Home() {
  const products = productsData as Product[];

  // Filter products by badges
  const hotProducts = filterProductsByBadge(products, "HOT").slice(0, 8);
  const bestProducts = filterProductsByBadge(products, "BEST").slice(0, 4);
  const newProducts = filterProductsByBadge(products, "NEW").slice(0, 4);
  const mdProducts = filterProductsByBadge(products, "MD").slice(0, 4);

  // Time sale products (all products with TIME SALE badge, limit 8)
  const timeSaleProducts = products
    .filter((p) => p.badges.some((b) => b.includes("TIME")))
    .slice(0, 8);

  return (
    <>
      <Header />

      <main>
        <Hero />

        <Categories />

        <div id="products">
          <ProductSection
            id="time-sale"
            title="타임세일"
            subtitle="지금 바로 할인된 가격에 만나보세요!"
            icon="⏰"
            products={timeSaleProducts}
          />

          {hotProducts.length > 0 && (
            <div className="bg-[var(--muted)]">
              <ProductSection
                id="hot"
                title="인기 상품"
                subtitle="고객님들이 많이 찾는 베스트셀러"
                icon="🔥"
                products={hotProducts}
              />
            </div>
          )}

          {bestProducts.length > 0 && (
            <ProductSection
              id="best"
              title="베스트 상품"
              subtitle="검증된 품질의 추천 상품"
              icon="⭐"
              products={bestProducts}
            />
          )}

          {newProducts.length > 0 && (
            <div className="bg-[var(--muted)]">
              <ProductSection
                id="new"
                title="신상품"
                subtitle="새롭게 입고된 물고기들을 만나보세요"
                icon="✨"
                products={newProducts}
              />
            </div>
          )}

          {mdProducts.length > 0 && (
            <ProductSection
              id="md-pick"
              title="MD 추천"
              subtitle="전문가가 직접 선정한 추천 상품"
              icon="💎"
              products={mdProducts}
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
