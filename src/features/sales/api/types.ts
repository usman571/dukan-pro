export interface SaleItem {
  productId: number;
  productName: string;
  qty: number;
  sellPrice: number;
  buyPrice: number;
}

export interface Sale {
  id: number;
  items: SaleItem[];
  total: number;
  profit: number;
  paymentMode: 'cash' | 'udhaar';
  customerId?: number;
  customerName?: string;
  createdAt: string;
}

export interface CreateSaleInput {
  items: SaleItem[];
  paymentMode: 'cash' | 'udhaar';
  customerId?: number;
  customerName?: string;
}

export interface SalesFilters {
  page: number;
  limit: number;
}

export interface SalesResponse {
  items: Sale[];
  total: number;
}
