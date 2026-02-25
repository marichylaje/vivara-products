export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  thumbnail?: string;
  images?: string[];
};

export type ProductsPage = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductCreateInput = {
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail?: string;
};

export type ProductUpdateInput = Partial<ProductCreateInput> & { id: number };
