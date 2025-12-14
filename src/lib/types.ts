export interface Product {
  name: string;
  price: number;
  original_price: number | null;
  discount_rate: string | null;
  quantity: string | null;
  description: string | null;
  badges: string[];
  product_url: string;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
