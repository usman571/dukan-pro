'use client';

import Link from 'next/link';
import { Icons } from '@/components/icons';
import type { UdhaarCustomer } from '../api/types';
import { CustomerAvatar } from './customer-avatar';

interface CustomerCardProps {
  customer: UdhaarCustomer;
}

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <Link
      href={`/dashboard/udhaar/${customer.id}`}
      className='flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-muted'
    >
      <CustomerAvatar name={customer.name} size='md' />

      <div className='flex flex-1 flex-col gap-0.5 overflow-hidden'>
        <p className='truncate text-sm font-semibold'>{customer.name}</p>
        <div className='flex items-center gap-1 text-xs text-muted-foreground'>
          <Icons.clock className='h-3 w-3' />
          <span>Last activity {timeAgo(customer.lastActivity)}</span>
        </div>
      </div>

      <div className='shrink-0 text-right'>
        <p className='text-sm font-bold text-destructive'>{formatRs(customer.balance)}</p>
        <p className='text-xs text-muted-foreground'>OWED</p>
      </div>
    </Link>
  );
}
