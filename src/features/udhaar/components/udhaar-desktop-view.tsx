'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { statsQueryOptions } from '../api/queries';
import { UdhaarStatsCards } from './udhaar-stats-cards';
import { UdhaarTable } from './udhaar-tables';
import { ActivityPanel } from './activity-panel';

export function UdhaarDesktopView() {
  const { data: stats } = useSuspenseQuery(statsQueryOptions());

  return (
    <div className='flex h-full flex-col gap-4 overflow-hidden'>
      {/* Stats row */}
      <div className='shrink-0'>
        <UdhaarStatsCards stats={stats} />
      </div>

      {/* Table + activity panel */}
      <div className='flex min-h-0 flex-1 gap-4'>
        {/* Customer table — flex-1 gives it available width */}
        <div className='relative flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card'>
          <UdhaarTable />
        </div>

        {/* Activity panel — fixed width */}
        <div className='flex w-96 shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card'>
          <ActivityPanel />
        </div>
      </div>
    </div>
  );
}
