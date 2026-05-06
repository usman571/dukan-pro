'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import type { ReportPeriod } from '../api/types';

const PERIODS = ['today', 'week', 'month', 'year'] as const;

const PERIOD_LABELS: Record<ReportPeriod, string> = {
  today: 'Today',
  week: 'Week',
  month: 'Month',
  year: 'Year'
};

export function ReportsPeriodTabs() {
  const [period, setPeriod] = useQueryState(
    'period',
    parseAsStringLiteral(PERIODS).withDefault('month')
  );

  return (
    <div className='flex gap-2 overflow-x-auto pb-1'>
      {PERIODS.map((p) => (
        <Button
          key={p}
          size='sm'
          variant={period === p ? 'default' : 'outline'}
          className={cn('shrink-0 rounded-full')}
          onClick={() => setPeriod(p)}
        >
          {PERIOD_LABELS[p]}
        </Button>
      ))}
    </div>
  );
}
