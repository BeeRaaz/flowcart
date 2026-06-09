export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "home" | "apparel" | "accessories" | "wellness";
  tag?: "new" | "sale" | "bestseller";
  image: string;
  images: string[];
  description: string;
  details: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  productName: string;
  date: string;
  avatar: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
