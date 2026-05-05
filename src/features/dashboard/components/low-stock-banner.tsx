'use client';

import { Icons } from '@/components/icons';
import { lowStockQueryOptions } from '@/features/dashboard/api/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

export function LowStockBanner() {
  const { data: items } = useSuspenseQuery(lowStockQueryOptions());

  if (items.length === 0) return null;

  const itemNames = items.map((i) => i.name).join(', ');

  return (
    <div className='flex flex-col gap-1.5 rounded-xl border border-amber-200 bg-amber-50 p-3 md:flex-row md:items-center md:gap-3'>
      <div className='flex items-center gap-2'>
        <Icons.warning className='h-4 w-4 shrink-0 text-amber-600' />
        <span className='text-sm font-semibold text-amber-800'>
          {items.length} {items.length === 1 ? 'item' : 'items'} running low
        </span>
      </div>
      <p className='truncate text-xs text-amber-700 md:flex-1'>{itemNames}</p>
      <Link
        href='/dashboard/inventory'
        className='text-xs font-medium text-amber-800 underline-offset-2 hover:underline md:shrink-0'
      >
        View inventory
      </Link>
    </div>
  );
}
