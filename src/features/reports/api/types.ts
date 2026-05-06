export type ReportPeriod = 'today' | 'week' | 'month' | 'year';

export interface ReportStats {
  totalSales: number;
  totalTransactions: number;
  profit: number;
  profitChangePercent: number;
  cashCollected: number;
  cashPercent: number;
  udhaarPending: number;
  udhaarCustomers: number;
}

export interface DailySalesPoint {
  day: string;
  sales: number;
}

export interface TopProduct {
  rank: number;
  name: string;
  unitsSold: number;
  profit: number;
}

export interface ReportData {
  stats: ReportStats;
  dailySales: DailySalesPoint[];
  topProducts: TopProduct[];
}

export interface ReportFilters {
  period: ReportPeriod;
}
