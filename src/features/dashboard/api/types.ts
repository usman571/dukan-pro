export interface DashboardStats {
  todaySales: number;
  todayTransactions: number;
  profitToday: number;
  profitVsYesterday: number;
  udhaarTotal: number;
  udhaarCustomers: number;
  stockItems: number;
  lowStockCount: number;
}

export interface RecentSale {
  id: number;
  customerName: string;
  itemCount: number;
  time: string;
  amount: number;
  paymentMode: 'cash' | 'udhaar';
}

export interface LowStockItem {
  id: number;
  name: string;
  stock: number;
  threshold: number;
}

export interface TopUdhaarCustomer {
  id: number;
  name: string;
  initials: string;
  balance: number;
  lastActivity: string;
}

export interface SalesChartDay {
  day: string;
  sales: number;
}
