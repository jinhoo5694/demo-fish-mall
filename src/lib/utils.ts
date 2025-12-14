import { Product } from "./types";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price) + "원";
}

export function filterProductsByBadge(products: Product[], badge: string): Product[] {
  return products.filter((product) =>
    product.badges.some((b) => b.toUpperCase().includes(badge.toUpperCase()))
  );
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      (product.description && product.description.toLowerCase().includes(lowerQuery))
  );
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
