'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { reportQueryOptions } from '../api/queries';
import type { ReportPeriod } from '../api/types';
import { ReportsKpiCards } from './reports-kpi-cards';
import { ReportsPeriodTabs } from './reports-period-tabs';
import { ReportsSalesChart } from './reports-sales-chart';
import { ReportsTopProducts } from './reports-top-products';

const PERIODS = ['today', 'week', 'month', 'year'] as const;

export function ReportsMobileView() {
  const [period] = useQueryState('period', parseAsStringLiteral(PERIODS).withDefault('month'));

  const { data, isLoading } = useQuery(reportQueryOptions({ period: period as ReportPeriod }));

  return (
    <div className='flex flex-col gap-4 p-4 pb-24'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Reports</h1>
      </div>

      <ReportsPeriodTabs />

      {isLoading && (
        <>
          <div className='grid grid-cols-2 gap-3'>
            <Skeleton className='h-24 rounded-xl' />
            <Skeleton className='h-24 rounded-xl' />
            <Skeleton className='h-24 rounded-xl' />
            <Skeleton className='h-24 rounded-xl' />
          </div>
          <Skeleton className='h-64 rounded-xl' />
          <Skeleton className='h-48 rounded-xl' />
        </>
      )}

      {data && (
        <>
          <ReportsKpiCards stats={data.stats} />
          <ReportsSalesChart data={data.dailySales} trendPercent={data.stats.profitChangePercent} />
          <ReportsTopProducts products={data.topProducts} />
        </>
      )}
    </div>
  );
}
