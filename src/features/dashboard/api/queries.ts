import { queryOptions } from '@tanstack/react-query';
import {
  getDashboardStats,
  getLowStockItems,
  getRecentSales,
  getSalesChartData,
  getTopUdhaarCustomers
} from './service';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  recentSales: () => [...dashboardKeys.all, 'recent-sales'] as const,
  lowStock: () => [...dashboardKeys.all, 'low-stock'] as const,
  topUdhaar: () => [...dashboardKeys.all, 'top-udhaar'] as const,
  salesChart: () => [...dashboardKeys.all, 'sales-chart'] as const
};

export const dashboardStatsQueryOptions = () =>
  queryOptions({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000
  });

export const recentSalesQueryOptions = () =>
  queryOptions({
    queryKey: dashboardKeys.recentSales(),
    queryFn: getRecentSales,
    staleTime: 2 * 60 * 1000
  });

export const lowStockQueryOptions = () =>
  queryOptions({
    queryKey: dashboardKeys.lowStock(),
    queryFn: getLowStockItems,
    staleTime: 5 * 60 * 1000
  });

export const topUdhaarQueryOptions = () =>
  queryOptions({
    queryKey: dashboardKeys.topUdhaar(),
    queryFn: getTopUdhaarCustomers,
    staleTime: 5 * 60 * 1000
  });

export const salesChartQueryOptions = () =>
  queryOptions({
    queryKey: dashboardKeys.salesChart(),
    queryFn: getSalesChartData,
    staleTime: 10 * 60 * 1000
  });
