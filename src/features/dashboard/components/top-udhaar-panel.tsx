'use client';

import { topUdhaarQueryOptions } from '@/features/dashboard/api/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

export function TopUdhaarPanel() {
  const { data: customers } = useSuspenseQuery(topUdhaarQueryOptions());

  return (
    <div className='rounded-xl border border-border bg-card p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-base font-semibold'>Top udhaar</h2>
        <Link href='/dashboard/udhaar' className='text-sm font-medium text-primary'>
          View all
        </Link>
      </div>
      <div className='flex flex-col gap-3'>
        {customers.map((customer) => (
          <div key={customer.id} className='flex items-center gap-3'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground'>
              {customer.initials}
            </div>
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-medium'>{customer.name}</p>
              <p className='text-xs text-muted-foreground'>{customer.lastActivity}</p>
            </div>
            <p className='shrink-0 text-sm font-semibold text-destructive'>
              {formatRs(customer.balance)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
