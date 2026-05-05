'use client';

import { dashboardStatsQueryOptions } from '@/features/dashboard/api/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import { KpiCard } from './kpi-card';
import { LowStockBanner } from './low-stock-banner';
import { LowStockPanel } from './low-stock-panel';
import { RecentSalesList } from './recent-sales-list';
import { SalesChart } from './sales-chart';
import { TopUdhaarPanel } from './top-udhaar-panel';

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

export function DashboardView() {
  const { data: stats } = useSuspenseQuery(dashboardStatsQueryOptions());

  // TODO: replace with session data when auth session exposes shop info
  const ownerName = 'Ahmed Khan';
  const shopName = 'Ahmed Electronics';

  return (
    <div className='flex flex-col gap-4 p-4 md:p-6'>
      {/* Greeting */}
      <div>
        <p className='text-sm text-muted-foreground'>Good morning</p>
        <h1 className='text-xl font-bold text-foreground'>{ownerName}</h1>
        <p className='text-sm text-muted-foreground'>{shopName}</p>
      </div>

      {/* KPI cards — 2×2 mobile, 4-col desktop */}
      <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
        <KpiCard
          title="Today's Sales"
          value={formatRs(stats.todaySales)}
          subValue={`${stats.todayTransactions} transactions`}
        />
        <KpiCard
          title='Profit Today'
          value={formatRs(stats.profitToday)}
          subValue={`+${stats.profitVsYesterday}% vs yesterday`}
          variant='profit'
        />
        <KpiCard
          title='Udhaar Balance'
          value={formatRs(stats.udhaarTotal)}
          subValue={`${stats.udhaarCustomers} customers`}
          variant='danger'
        />
        <KpiCard
          title='Stock Items'
          value={String(stats.stockItems)}
          subValue={`${stats.lowStockCount} low stock`}
        />
      </div>

      {/* Mobile-only: amber banner + recent sales */}
      <div className='flex flex-col gap-4 md:hidden'>
        <LowStockBanner />
        <RecentSalesList />
      </div>

      {/* Desktop-only: 2/3 + 1/3 grid */}
      <div className='hidden gap-6 md:grid md:grid-cols-3'>
        {/* Left — chart + recent sales */}
        <div className='flex flex-col gap-6 md:col-span-2'>
          <SalesChart />
          <div className='rounded-xl border border-border bg-card p-4'>
            <RecentSalesList />
          </div>
        </div>

        {/* Right — udhaar panel + low stock panel */}
        <div className='flex flex-col gap-6 md:col-span-1'>
          <TopUdhaarPanel />
          <LowStockPanel />
        </div>
      </div>
    </div>
  );
}
