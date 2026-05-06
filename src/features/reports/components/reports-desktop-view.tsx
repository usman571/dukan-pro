'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { reportQueryOptions } from '../api/queries';
import type { ReportPeriod } from '../api/types';
import { ReportsKpiCards } from './reports-kpi-cards';
import { ReportsPeriodTabs } from './reports-period-tabs';
import { ReportsSalesChart } from './reports-sales-chart';
import { ReportsTopProducts } from './reports-top-products';

const PERIODS = ['today', 'week', 'month', 'year'] as const;

export function ReportsDesktopView() {
  const [period] = useQueryState('period', parseAsStringLiteral(PERIODS).withDefault('month'));

  const { data } = useSuspenseQuery(reportQueryOptions({ period: period as ReportPeriod }));

  return (
    <div className='flex flex-col gap-6'>
      <ReportsPeriodTabs />
      <ReportsKpiCards stats={data.stats} />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <ReportsSalesChart data={data.dailySales} trendPercent={data.stats.profitChangePercent} />
        <ReportsTopProducts products={data.topProducts} />
      </div>
    </div>
  );
}
