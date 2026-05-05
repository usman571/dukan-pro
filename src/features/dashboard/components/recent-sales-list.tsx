'use client';

import { cn } from '@/lib/utils';
import { recentSalesQueryOptions } from '@/features/dashboard/api/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

function PaymentBadge({ mode }: { mode: 'cash' | 'udhaar' }) {
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase',
        mode === 'cash' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
      )}
    >
      {mode}
    </span>
  );
}

export function RecentSalesList() {
  const { data: sales } = useSuspenseQuery(recentSalesQueryOptions());

  return (
    <div>
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-base font-semibold'>Recent sales</h2>
        <Link href='/dashboard/sales' className='text-sm font-medium text-primary'>
          View all
        </Link>
      </div>

      {/* Mobile list */}
      <div className='flex flex-col divide-y divide-border md:hidden'>
        {sales.map((sale) => (
          <div key={sale.id} className='flex items-center justify-between py-3'>
            <div>
              <p className='text-sm font-medium'>{sale.customerName}</p>
              <p className='text-xs text-muted-foreground'>
                {sale.itemCount} {sale.itemCount === 1 ? 'item' : 'items'} · {sale.time}
              </p>
            </div>
            <div className='flex flex-col items-end gap-1'>
              <p className='text-sm font-semibold'>{formatRs(sale.amount)}</p>
              <PaymentBadge mode={sale.paymentMode} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className='hidden md:block'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-border text-xs text-muted-foreground'>
              <th className='pb-2 text-left font-medium uppercase'>Customer</th>
              <th className='pb-2 text-left font-medium uppercase'>Items</th>
              <th className='pb-2 text-left font-medium uppercase'>Mode</th>
              <th className='pb-2 text-left font-medium uppercase'>Time</th>
              <th className='pb-2 text-right font-medium uppercase'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className='border-b border-border last:border-0'>
                <td className='py-3 font-medium'>{sale.customerName}</td>
                <td className='py-3 text-muted-foreground'>{sale.itemCount}</td>
                <td className='py-3'>
                  <PaymentBadge mode={sale.paymentMode} />
                </td>
                <td className='py-3 text-muted-foreground'>{sale.time}</td>
                <td className='py-3 text-right font-semibold'>{formatRs(sale.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
