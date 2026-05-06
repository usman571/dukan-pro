'use client';

import { Icons } from '@/components/icons';
import type { UdhaarStats } from '../api/types';

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

interface UdhaarStatsCardsProps {
  stats: UdhaarStats;
}

export function UdhaarStatsCards({ stats }: UdhaarStatsCardsProps) {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='rounded-xl border border-border bg-card p-4'>
        <div className='mb-2 flex items-center gap-2 text-muted-foreground'>
          <Icons.warning className='h-4 w-4' />
          <span className='text-xs font-medium uppercase tracking-wide'>Total Outstanding</span>
        </div>
        <p className='text-2xl font-bold text-destructive'>{formatRs(stats.totalOutstanding)}</p>
      </div>

      <div className='rounded-xl border border-border bg-card p-4'>
        <div className='mb-2 flex items-center gap-2 text-muted-foreground'>
          <Icons.teams className='h-4 w-4' />
          <span className='text-xs font-medium uppercase tracking-wide'>Customers</span>
        </div>
        <p className='text-2xl font-bold'>{stats.totalCustomers}</p>
      </div>

      <div className='rounded-xl border border-border bg-card p-4'>
        <div className='mb-2 flex items-center gap-2 text-muted-foreground'>
          <Icons.trendingUp className='h-4 w-4' />
          <span className='text-xs font-medium uppercase tracking-wide'>Avg Balance</span>
        </div>
        <p className='text-2xl font-bold'>{formatRs(stats.avgBalance)}</p>
      </div>
    </div>
  );
}
