export interface Product {
  id: string;
  title: string;
  priceCents: number;
  tags: string[];
  rating: number;
  images: string[];
  specs: Record<string, string>;
  stock: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  body: string;
  stars: number;
  createdAt: Date;
  helpful: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  preferences: UserPreferences;
  starredProducts: string[]; // Array of product IDs
  createdAt: Date;
}

export interface UserPreferences {
  favoriteCategories: string[];
  notifications: boolean;
  theme: "light" | "dark" | "system";
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  priceAtAddCents: number;
  addedAt: Date;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ActionState<T = any> {
  ok: boolean;
  error?: string;
  data?: T;
}
