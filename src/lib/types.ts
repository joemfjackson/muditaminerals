export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number;
  category_id: string;
  category_slug?: string;
  images: string[];
  stock: number;
  featured: boolean;
  active: boolean;
  properties?: {
    weight?: string;
    origin?: string;
    chakra?: string;
    hardness?: string;
    dimensions?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  stripe_session_id: string;
  status: string;
  customer_email: string;
  customer_name: string;
  shipping_address: Record<string, string>;
  total: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}
