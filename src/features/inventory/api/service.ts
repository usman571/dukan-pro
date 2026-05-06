import type { AddProductInput, InventoryFilters, Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Tapal Danedar 200g',
    category: 'Tea',
    brand: 'Tapal',
    buyPrice: 220,
    sellPrice: 260,
    stock: 45,
    lowStockThreshold: 10
  },
  {
    id: 2,
    name: 'Tarang Tea Whitener 200g',
    category: 'Tea',
    brand: 'Tarang',
    buyPrice: 130,
    sellPrice: 160,
    stock: 8,
    lowStockThreshold: 10
  },
  {
    id: 3,
    name: 'Sufi Cooking Oil 1L',
    category: 'Oil',
    brand: 'Sufi',
    buyPrice: 380,
    sellPrice: 420,
    stock: 22,
    lowStockThreshold: 15
  },
  {
    id: 4,
    name: 'Dalda Banaspati 1kg',
    category: 'Oil',
    brand: 'Dalda',
    buyPrice: 430,
    sellPrice: 480,
    stock: 0,
    lowStockThreshold: 10
  },
  {
    id: 5,
    name: 'Olpers Milk 1L',
    category: 'Dairy',
    brand: 'Olpers',
    buyPrice: 175,
    sellPrice: 200,
    stock: 30,
    lowStockThreshold: 20
  },
  {
    id: 6,
    name: 'National Salt 800g',
    category: 'Spices',
    brand: 'National',
    buyPrice: 55,
    sellPrice: 70,
    stock: 60,
    lowStockThreshold: 10
  },
  {
    id: 7,
    name: 'Shan Biryani Masala 65g',
    category: 'Spices',
    brand: 'Shan',
    buyPrice: 85,
    sellPrice: 105,
    stock: 7,
    lowStockThreshold: 10
  },
  {
    id: 8,
    name: 'Lays Masala 34g',
    category: 'Snacks',
    brand: 'Lays',
    buyPrice: 30,
    sellPrice: 40,
    stock: 120,
    lowStockThreshold: 25
  },
  {
    id: 9,
    name: 'Coca Cola 1.5L',
    category: 'Drinks',
    brand: 'Coca Cola',
    buyPrice: 110,
    sellPrice: 135,
    stock: 18,
    lowStockThreshold: 15
  },
  {
    id: 10,
    name: 'Surf Excel 500g',
    category: 'Cleaning',
    brand: 'Surf Excel',
    buyPrice: 280,
    sellPrice: 330,
    stock: 9,
    lowStockThreshold: 10
  },
  {
    id: 11,
    name: 'Peek Freans Sooper 112g',
    category: 'Biscuits',
    brand: 'Peek Freans',
    buyPrice: 75,
    sellPrice: 95,
    stock: 50,
    lowStockThreshold: 20
  },
  {
    id: 12,
    name: 'Nestle Pure Life 1.5L',
    category: 'Drinks',
    brand: 'Nestle',
    buyPrice: 60,
    sellPrice: 80,
    stock: 25,
    lowStockThreshold: 20
  }
];

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export async function getProducts(filters: InventoryFilters): Promise<ProductsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const selectedCategories = filters.categories
    ? filters.categories
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchesSearch =
      !filters.search ||
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.brand.toLowerCase().includes(filters.search.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);

    return matchesSearch && matchesCategory;
  });

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { products: paginated, total: filtered.length };
}

export async function createProduct(input: AddProductInput): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const newProduct: Product = {
    ...input,
    id: Math.max(...MOCK_PRODUCTS.map((p) => p.id)) + 1
  };

  MOCK_PRODUCTS.push(newProduct);

  return newProduct;
}

export async function deleteProduct(id: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
  if (index !== -1) {
    MOCK_PRODUCTS.splice(index, 1);
  }
}
