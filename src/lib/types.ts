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
  properties?: Record<string, string>;
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

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderWithItems extends Order {
  items: (OrderItem & {
    products?: {
      name: string;
      images: string[];
      slug: string;
    };
  })[];
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  compare_at_price?: number;
  category_id?: string;
  images: string[];
  stock: number;
  featured: boolean;
  active: boolean;
  properties?: Record<string, string>;
}
