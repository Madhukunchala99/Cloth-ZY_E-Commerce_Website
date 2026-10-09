export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: string;
  subcategory?: string;
  tags: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  discount?: number;
  rating?: number;
  reviews?: ProductReview[];
  stock: number;
};

export type ProductReview = {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
};

export type Address = {
  id: number;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  phone: string;
};

export type PaymentMethod = {
  id: number;
  cardType: string;
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
};

export type Order = {
  id: number;
  userId: number;
  items: CartItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  subcategories?: { name: string; slug: string }[];
};

export type FilterOptions = {
  category?: string;
  subcategory?: string;
  priceRange?: [number, number];
  sizes?: string[];
  colors?: string[];
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
};