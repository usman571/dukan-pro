import type { CreateSaleInput, Sale, SalesFilters, SalesResponse } from './types';

const MOCK_SALES: Sale[] = [
  {
    id: 1,
    items: [
      { productId: 1, productName: 'Tapal Danedar 475g', qty: 2, sellPrice: 820, buyPrice: 720 },
      { productId: 3, productName: 'Olpers Milk 1L', qty: 1, sellPrice: 320, buyPrice: 280 }
    ],
    total: 1960,
    profit: 240,
    paymentMode: 'cash',
    customerName: 'Walk-in',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 2,
    items: [
      { productId: 2, productName: 'Sufi Cooking Oil 5L', qty: 1, sellPrice: 2580, buyPrice: 2350 },
      { productId: 5, productName: 'Lays Masala 35g', qty: 3, sellPrice: 50, buyPrice: 38 }
    ],
    total: 2730,
    profit: 266,
    paymentMode: 'udhaar',
    customerId: 1,
    customerName: 'Ahmed Khan',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
  },
  {
    id: 3,
    items: [
      { productId: 8, productName: 'Peek Freans Sooper', qty: 4, sellPrice: 30, buyPrice: 22 }
    ],
    total: 120,
    profit: 32,
    paymentMode: 'cash',
    customerName: 'Walk-in',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  },
  {
    id: 4,
    items: [
      { productId: 1, productName: 'Tapal Danedar 475g', qty: 1, sellPrice: 820, buyPrice: 720 },
      { productId: 2, productName: 'Sufi Cooking Oil 5L', qty: 1, sellPrice: 2580, buyPrice: 2350 },
      { productId: 4, productName: 'National Salt 800g', qty: 2, sellPrice: 120, buyPrice: 95 }
    ],
    total: 3640,
    profit: 380,
    paymentMode: 'udhaar',
    customerId: 2,
    customerName: 'Sara Ali',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: 5,
    items: [
      { productId: 9, productName: 'Coca Cola 1.5L', qty: 2, sellPrice: 220, buyPrice: 175 },
      { productId: 5, productName: 'Lays Masala 35g', qty: 5, sellPrice: 50, buyPrice: 38 }
    ],
    total: 690,
    profit: 150,
    paymentMode: 'cash',
    customerName: 'Walk-in',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: 6,
    items: [
      { productId: 3, productName: 'Olpers Milk 1L', qty: 3, sellPrice: 320, buyPrice: 280 },
      { productId: 7, productName: 'Shan Biryani Masala', qty: 2, sellPrice: 140, buyPrice: 110 }
    ],
    total: 1240,
    profit: 180,
    paymentMode: 'udhaar',
    customerId: 3,
    customerName: 'Bilal Ahmad',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: 7,
    items: [
      { productId: 10, productName: 'Surf Excel 1kg', qty: 1, sellPrice: 680, buyPrice: 580 }
    ],
    total: 680,
    profit: 100,
    paymentMode: 'cash',
    customerName: 'Walk-in',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
  },
  {
    id: 8,
    items: [
      { productId: 1, productName: 'Tapal Danedar 475g', qty: 3, sellPrice: 820, buyPrice: 720 },
      { productId: 3, productName: 'Olpers Milk 1L', qty: 2, sellPrice: 320, buyPrice: 280 },
      { productId: 8, productName: 'Peek Freans Sooper', qty: 6, sellPrice: 30, buyPrice: 22 }
    ],
    total: 3280,
    profit: 428,
    paymentMode: 'cash',
    customerName: 'Walk-in',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  }
];

let nextId = 9;

export async function getSales(filters: SalesFilters): Promise<SalesResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (filters.page - 1) * filters.limit;
      const end = start + filters.limit;
      resolve({
        items: MOCK_SALES.slice(start, end),
        total: MOCK_SALES.length
      });
    }, 300);
  });
}

export async function createSale(input: CreateSaleInput): Promise<Sale> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = input.items.reduce((sum, i) => sum + i.qty * i.sellPrice, 0);
      const profit = input.items.reduce((sum, i) => sum + i.qty * (i.sellPrice - i.buyPrice), 0);
      const sale: Sale = {
        id: nextId++,
        items: input.items,
        total,
        profit,
        paymentMode: input.paymentMode,
        ...(input.customerId !== undefined && { customerId: input.customerId }),
        customerName: input.customerName ?? 'Walk-in',
        createdAt: new Date().toISOString()
      };
      MOCK_SALES.unshift(sale);
      resolve(sale);
    }, 300);
  });
}
