export type ProductCategory =
  | 'Tea'
  | 'Oil'
  | 'Dairy'
  | 'Spices'
  | 'Snacks'
  | 'Drinks'
  | 'Cleaning'
  | 'Biscuits';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Tea',
  'Oil',
  'Dairy',
  'Spices',
  'Snacks',
  'Drinks',
  'Cleaning',
  'Biscuits'
];

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  brand: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  lowStockThreshold: number;
}

export interface AddProductInput {
  name: string;
  category: ProductCategory;
  brand: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  lowStockThreshold: number;
}

export interface InventoryFilters {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string;
}

export type StockStatus = 'ok' | 'low' | 'out';

export function getStockStatus(product: Product): StockStatus {
  if (product.stock === 0) return 'out';
  if (product.stock <= product.lowStockThreshold) return 'low';
  return 'ok';
}
