import { getQueryClient } from '@/lib/query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';
import { reportQueryOptions } from '../api/queries';
import type { ReportPeriod } from '../api/types';
import { ReportsDesktopView } from './reports-desktop-view';

interface Props {
  period: ReportPeriod;
}

export default function ReportsListingPage({ period }: Props) {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(reportQueryOptions({ period }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={<div className='p-6 text-sm text-muted-foreground'>Loading reports...</div>}
      >
        <ReportsDesktopView />
      </Suspense>
    </HydrationBoundary>
  );
}
