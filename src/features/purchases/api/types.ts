export interface PurchaseItem {
  productName: string;
  qty: number;
  costEach: number;
}

export interface Purchase {
  id: number;
  supplier: string;
  items: PurchaseItem[];
  total: number;
  paidAmount: number;
  createdAt: string;
}

export interface AddPurchaseInput {
  supplier: string;
  date: string;
  items: PurchaseItem[];
  paidAmount: number;
}

export interface PurchaseFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PurchasesResponse {
  items: Purchase[];
  total: number;
}
