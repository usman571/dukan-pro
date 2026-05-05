import type {
  DashboardStats,
  LowStockItem,
  RecentSale,
  SalesChartDay,
  TopUdhaarCustomer
} from './types';

export async function getDashboardStats(): Promise<DashboardStats> {
  return {
    todaySales: 8420,
    todayTransactions: 14,
    profitToday: 1280,
    profitVsYesterday: 18,
    udhaarTotal: 16790,
    udhaarCustomers: 6,
    stockItems: 124,
    lowStockCount: 3
  };
}

export async function getRecentSales(): Promise<RecentSale[]> {
  return [
    {
      id: 1,
      customerName: 'Ahmed Khan',
      itemCount: 3,
      time: '2 hours ago',
      amount: 1240,
      paymentMode: 'cash'
    },
    {
      id: 2,
      customerName: 'Walk-in',
      itemCount: 1,
      time: '3 hours ago',
      amount: 180,
      paymentMode: 'cash'
    },
    {
      id: 3,
      customerName: 'Sara Ali',
      itemCount: 4,
      time: '4 hours ago',
      amount: 2100,
      paymentMode: 'udhaar'
    },
    {
      id: 4,
      customerName: 'Walk-in',
      itemCount: 2,
      time: '5 hours ago',
      amount: 560,
      paymentMode: 'cash'
    },
    {
      id: 5,
      customerName: 'Bilal Mehmood',
      itemCount: 1,
      time: 'Yesterday',
      amount: 320,
      paymentMode: 'udhaar'
    },
    {
      id: 6,
      customerName: 'Walk-in',
      itemCount: 3,
      time: 'Yesterday',
      amount: 820,
      paymentMode: 'cash'
    }
  ];
}

export async function getLowStockItems(): Promise<LowStockItem[]> {
  return [
    { id: 1, name: 'Tapal Danedar 500g', stock: 4, threshold: 10 },
    { id: 2, name: 'Olpers Milk 1L', stock: 2, threshold: 15 },
    { id: 3, name: 'Sufi Cooking Oil 5L', stock: 6, threshold: 10 }
  ];
}

export async function getTopUdhaarCustomers(): Promise<TopUdhaarCustomer[]> {
  return [
    { id: 1, name: 'Ahmed Khan', initials: 'AK', balance: 4200, lastActivity: '2 days ago' },
    { id: 2, name: 'Sara Ali', initials: 'SA', balance: 3100, lastActivity: 'Today' },
    { id: 3, name: 'Bilal Mehmood', initials: 'BM', balance: 5800, lastActivity: '3 days ago' },
    { id: 4, name: 'Zara Sheikh', initials: 'ZS', balance: 3690, lastActivity: '1 week ago' }
  ];
}

export async function getSalesChartData(): Promise<SalesChartDay[]> {
  return [
    { day: 'Mon', sales: 6200 },
    { day: 'Tue', sales: 7800 },
    { day: 'Wed', sales: 5400 },
    { day: 'Thu', sales: 9100 },
    { day: 'Fri', sales: 8200 },
    { day: 'Sat', sales: 11400 },
    { day: 'Sun', sales: 8420 }
  ];
}
