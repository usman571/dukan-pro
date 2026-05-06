export interface UdhaarCustomer {
  id: number;
  name: string;
  phone: string;
  balance: number;
  lastActivity: string;
  createdAt: string;
}

export interface UdhaarTransaction {
  id: number;
  customerId: number;
  type: 'sale' | 'payment';
  amount: number;
  note?: string;
  createdAt: string;
}

export interface UdhaarStats {
  totalOutstanding: number;
  totalCustomers: number;
  avgBalance: number;
}

export interface RecordPaymentInput {
  customerId: number;
  amount: number;
  note?: string;
}

export interface UdhaarFilters {
  page: number;
  limit: number;
  search?: string;
}

export interface TransactionFilters {
  customerId: number;
}

export interface CustomersResponse {
  items: UdhaarCustomer[];
  total: number;
}

export interface TransactionsResponse {
  items: UdhaarTransaction[];
}
