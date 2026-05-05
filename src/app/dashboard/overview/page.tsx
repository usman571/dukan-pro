import { DashboardSkeleton } from '@/features/dashboard/components/dashboard-skeleton';
import { DashboardView } from '@/features/dashboard/components/dashboard-view';
import {
  dashboardStatsQueryOptions,
  lowStockQueryOptions,
  recentSalesQueryOptions,
  salesChartQueryOptions,
  topUdhaarQueryOptions
} from '@/features/dashboard/api/queries';
import { getQueryClient } from '@/lib/query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard — Dukaan Pro'
};

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(dashboardStatsQueryOptions());
  void queryClient.prefetchQuery(recentSalesQueryOptions());
  void queryClient.prefetchQuery(lowStockQueryOptions());
  void queryClient.prefetchQuery(topUdhaarQueryOptions());
  void queryClient.prefetchQuery(salesChartQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardView />
      </Suspense>
    </HydrationBoundary>
  );
}
