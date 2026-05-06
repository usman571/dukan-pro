import { Card, CardContent } from '@/components/ui/card';
import type { ReportStats } from '../api/types';

function formatRs(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

interface Props {
  stats: ReportStats;
}

export function ReportsKpiCards({ stats }: Props) {
  return (
    <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
      <Card>
        <CardContent className='p-4'>
          <p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
            Total Sales
          </p>
          <p className='mt-1 text-xl font-bold'>{formatRs(stats.totalSales)}</p>
          <p className='mt-0.5 text-xs text-muted-foreground'>
            {stats.totalTransactions} transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
            Profit
          </p>
          <p className='mt-1 text-xl font-bold text-primary'>{formatRs(stats.profit)}</p>
          <p className='mt-0.5 text-xs text-primary'>
            +{stats.profitChangePercent}% vs last period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
            Cash Collected
          </p>
          <p className='mt-1 text-xl font-bold'>{formatRs(stats.cashCollected)}</p>
          <p className='mt-0.5 text-xs text-muted-foreground'>{stats.cashPercent}% of sales</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <p className='text-xs font-medium tracking-wide text-muted-foreground uppercase'>
            Udhaar Pending
          </p>
          <p className='mt-1 text-xl font-bold text-destructive'>{formatRs(stats.udhaarPending)}</p>
          <p className='mt-0.5 text-xs text-destructive'>{stats.udhaarCustomers} customers</p>
        </CardContent>
      </Card>
    </div>
  );
}
