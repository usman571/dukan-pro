'use client';

import { lowStockQueryOptions } from '@/features/dashboard/api/queries';
import { cn } from '@/lib/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

function StockBadge({ stock, threshold }: { stock: number; threshold: number }) {
  const ratio = stock / threshold;
  const label = `${stock} left`;

  return (
    <span
      className={cn(
        'rounded-md px-2 py-0.5 text-xs font-semibold',
        ratio <= 0.3
          ? 'bg-destructive/10 text-destructive'
          : ratio <= 0.6
            ? 'bg-amber-100 text-amber-700'
            : 'bg-muted text-muted-foreground'
      )}
    >
      {label}
    </span>
  );
}

export function LowStockPanel() {
  const { data: items } = useSuspenseQuery(lowStockQueryOptions());

  if (items.length === 0) return null;

  return (
    <div className='rounded-xl border border-border bg-card p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-base font-semibold'>Low stock</h2>
        <Link href='/dashboard/inventory' className='text-sm font-medium text-primary'>
          Order all
        </Link>
      </div>
      <div className='flex flex-col gap-3'>
        {items.map((item) => (
          <div key={item.id} className='flex items-center justify-between gap-2'>
            <div className='min-w-0'>
              <p className='truncate text-sm font-medium'>{item.name}</p>
              <p className='text-xs text-muted-foreground'>Reorder threshold · {item.threshold}</p>
            </div>
            <StockBadge stock={item.stock} threshold={item.threshold} />
          </div>
        ))}
      </div>
    </div>
  );
}
