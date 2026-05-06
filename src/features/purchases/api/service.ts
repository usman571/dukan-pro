import type { AddPurchaseInput, Purchase, PurchaseFilters, PurchasesResponse } from './types';

let MOCK_PURCHASES: Purchase[] = [
  {
    id: 1,
    supplier: 'Hassan Distributors',
    items: [
      { productName: 'Tapal Danedar 475g', qty: 24, costEach: 720 },
      { productName: 'Olpers Milk 1L', qty: 48, costEach: 175 },
      { productName: 'Lays Masala 35g', qty: 120, costEach: 38 }
    ],
    total: 30360,
    paidAmount: 30360,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
  },
  {
    id: 2,
    supplier: 'Ahmed Traders',
    items: [
      { productName: 'Sufi Cooking Oil 5L', qty: 12, costEach: 2350 },
      { productName: 'Dalda Banaspati 1kg', qty: 24, costEach: 430 }
    ],
    total: 38520,
    paidAmount: 25000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: 3,
    supplier: 'National Foods Depot',
    items: [
      { productName: 'National Salt 800g', qty: 60, costEach: 55 },
      { productName: 'Shan Biryani Masala', qty: 36, costEach: 110 },
      { productName: 'National Biryani Masala', qty: 48, costEach: 85 }
    ],
    total: 11430,
    paidAmount: 11430,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
  },
  {
    id: 4,
    supplier: 'Metro Cash & Carry',
    items: [
      { productName: 'Surf Excel 1kg', qty: 24, costEach: 580 },
      { productName: 'Ariel 900g', qty: 12, costEach: 520 },
      { productName: 'Brite 1kg', qty: 24, costEach: 280 }
    ],
    total: 27120,
    paidAmount: 20000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString()
  },
  {
    id: 5,
    supplier: 'Hassan Distributors',
    items: [
      { productName: 'Coca Cola 1.5L', qty: 24, costEach: 175 },
      { productName: 'Pepsi 1.5L', qty: 24, costEach: 165 },
      { productName: 'Nestle Pure Life 1.5L', qty: 48, costEach: 80 }
    ],
    total: 12720,
    paidAmount: 12720,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString()
  }
];

let nextId = 6;

export async function getPurchases(filters: PurchaseFilters): Promise<PurchasesResponse> {
  await new Promise((r) => setTimeout(r, 150));

  let results = [...MOCK_PURCHASES];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter((p) => p.supplier.toLowerCase().includes(q));
  }

  const total = results.length;
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const start = (page - 1) * limit;

  return { items: results.slice(start, start + limit), total };
}

export async function createPurchase(input: AddPurchaseInput): Promise<Purchase> {
  await new Promise((r) => setTimeout(r, 200));

  const total = input.items.reduce((sum, i) => sum + i.qty * i.costEach, 0);
  const purchase: Purchase = {
    id: nextId++,
    supplier: input.supplier,
    items: input.items,
    total,
    paidAmount: input.paidAmount,
    createdAt: new Date(input.date).toISOString()
  };

  MOCK_PURCHASES = [purchase, ...MOCK_PURCHASES];
  return purchase;
}

export async function deletePurchase(id: number): Promise<void> {
  await new Promise((r) => setTimeout(r, 150));
  MOCK_PURCHASES = MOCK_PURCHASES.filter((p) => p.id !== id);
}
