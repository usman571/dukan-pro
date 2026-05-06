import type { ReportData, ReportFilters } from './types';

const MOCK_DATA: Record<string, ReportData> = {
  today: {
    stats: {
      totalSales: 18400,
      totalTransactions: 31,
      profit: 2840,
      profitChangePercent: 8,
      cashCollected: 17200,
      cashPercent: 93,
      udhaarPending: 1200,
      udhaarCustomers: 2
    },
    dailySales: [
      { day: 'Mon', sales: 14200 },
      { day: 'Tue', sales: 15800 },
      { day: 'Wed', sales: 13400 },
      { day: 'Thu', sales: 16900 },
      { day: 'Fri', sales: 18400 },
      { day: 'Sat', sales: 17200 },
      { day: 'Sun', sales: 18400 }
    ],
    topProducts: [
      { rank: 1, name: 'Tapal Danedar 1kg', unitsSold: 18, profit: 540 },
      { rank: 2, name: 'Olpers Milk 1L', unitsSold: 24, profit: 480 },
      { rank: 3, name: 'Lays Classic', unitsSold: 48, profit: 384 },
      { rank: 4, name: 'Sufi Cooking Oil 5L', unitsSold: 9, profit: 360 },
      { rank: 5, name: 'Nescafe 3in1', unitsSold: 36, profit: 288 }
    ]
  },
  week: {
    stats: {
      totalSales: 118600,
      totalTransactions: 198,
      profit: 18240,
      profitChangePercent: 14,
      cashCollected: 110500,
      cashPercent: 93,
      udhaarPending: 8100,
      udhaarCustomers: 4
    },
    dailySales: [
      { day: 'Mon', sales: 14200 },
      { day: 'Tue', sales: 15800 },
      { day: 'Wed', sales: 13400 },
      { day: 'Thu', sales: 16900 },
      { day: 'Fri', sales: 18400 },
      { day: 'Sat', sales: 21200 },
      { day: 'Sun', sales: 18700 }
    ],
    topProducts: [
      { rank: 1, name: 'Tapal Danedar 1kg', unitsSold: 112, profit: 3360 },
      { rank: 2, name: 'Olpers Milk 1L', unitsSold: 148, profit: 2960 },
      { rank: 3, name: 'Lays Classic', unitsSold: 284, profit: 2272 },
      { rank: 4, name: 'Sufi Cooking Oil 5L', unitsSold: 54, profit: 2160 },
      { rank: 5, name: 'National Biryani Masala', unitsSold: 96, profit: 1920 }
    ]
  },
  month: {
    stats: {
      totalSales: 248400,
      totalTransactions: 412,
      profit: 38680,
      profitChangePercent: 22,
      cashCollected: 231610,
      cashPercent: 93,
      udhaarPending: 16790,
      udhaarCustomers: 6
    },
    dailySales: [
      { day: 'Mon', sales: 31200 },
      { day: 'Tue', sales: 34800 },
      { day: 'Wed', sales: 28600 },
      { day: 'Thu', sales: 38400 },
      { day: 'Fri', sales: 42100 },
      { day: 'Sat', sales: 39800 },
      { day: 'Sun', sales: 33500 }
    ],
    topProducts: [
      { rank: 1, name: 'Tapal Danedar 1kg', unitsSold: 248, profit: 7440 },
      { rank: 2, name: 'Olpers Milk 1L', unitsSold: 312, profit: 6240 },
      { rank: 3, name: 'Sufi Cooking Oil 5L', unitsSold: 124, profit: 4960 },
      { rank: 4, name: 'Lays Classic', unitsSold: 586, profit: 4688 },
      { rank: 5, name: 'National Biryani Masala', unitsSold: 204, profit: 4080 }
    ]
  },
  year: {
    stats: {
      totalSales: 2840000,
      totalTransactions: 4820,
      profit: 438200,
      profitChangePercent: 31,
      cashCollected: 2648000,
      cashPercent: 93,
      udhaarPending: 192000,
      udhaarCustomers: 18
    },
    dailySales: [
      { day: 'Mon', sales: 218000 },
      { day: 'Tue', sales: 246000 },
      { day: 'Wed', sales: 198000 },
      { day: 'Thu', sales: 284000 },
      { day: 'Fri', sales: 312000 },
      { day: 'Sat', sales: 294000 },
      { day: 'Sun', sales: 288000 }
    ],
    topProducts: [
      { rank: 1, name: 'Tapal Danedar 1kg', unitsSold: 2840, profit: 85200 },
      { rank: 2, name: 'Olpers Milk 1L', unitsSold: 3480, profit: 69600 },
      { rank: 3, name: 'Sufi Cooking Oil 5L', unitsSold: 1480, profit: 59200 },
      { rank: 4, name: 'Lays Classic', unitsSold: 6840, profit: 54720 },
      { rank: 5, name: 'National Biryani Masala', unitsSold: 2440, profit: 48800 }
    ]
  }
};

export async function getReportData(filters: ReportFilters): Promise<ReportData> {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_DATA[filters.period];
}
