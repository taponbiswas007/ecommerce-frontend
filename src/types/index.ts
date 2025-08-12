// src/types/index.ts

// Product Types
export interface Product {
  [x: string]: any;
  id: number;
  name: string;
  unit: string;
  short_description: string;
  description: string;
  price: number;
  discount: number;
  net_price: number;
  main_image: string;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  image_4: string | null;
  image_5: string | null;
  video_url: string | null;
  is_active: boolean;
  category_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export interface CategoryWithProducts extends Category {
  category: Category;
  products: Product[];
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  avatar?: string | null;
  phone?: string | null;
  address?: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// Cart Types
export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  items: CartItem[];
}

// Order Types
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  discount: number;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Order {
  id: number;
  user_id: number;
  order_number: string;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  shipping_address: string;
  billing_address: string;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  user: User;
}

// Payment Types
export interface Payment {
  id: number;
  order_id: number;
  transaction_id: string;
  amount: number;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// Form/Component Props
export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

export interface CategorySectionProps {
  category: CategoryWithProducts;
  showAllLink?: boolean;
}

export interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Search/Sorting Types
export interface ProductFilterParams {
  search?: string;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  sort_by?: 'price' | 'name' | 'created_at';
  sort_order?: 'asc' | 'desc';
  page?: number;
  per_page?: number;
}

// Auth Types
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// Navigation Types
export interface NavLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavLink[];
}

// Settings Types
export interface SiteSettings {
  site_name: string;
  site_logo: string;
  currency: string;
  currency_symbol: string;
  tax_rate: number;
  shipping_cost: number;
  free_shipping_threshold: number;
}