'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { customerQueryOptions, transactionsQueryOptions } from '../api/queries';
import { CustomerAvatar } from './customer-avatar';
import { TransactionItem } from './transaction-item';
import { RecordPaymentSheet } from './record-payment-sheet';

interface CustomerDetailViewProps {
  customerId: number;
}

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

export function CustomerDetailView({ customerId }: CustomerDetailViewProps) {
  const { data: customer, isLoading: customerLoading } = useQuery(customerQueryOptions(customerId));
  const { data: txData, isLoading: txLoading } = useQuery(transactionsQueryOptions({ customerId }));

  const transactions = txData?.items ?? [];

  if (customerLoading) {
    return (
      <div className='flex flex-col gap-4 p-4'>
        <div className='h-6 w-24 animate-pulse rounded bg-muted' />
        <div className='h-24 animate-pulse rounded-xl bg-muted' />
        <div className='h-40 animate-pulse rounded-xl bg-muted' />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className='flex flex-col items-center gap-3 py-16 text-center'>
        <Icons.warning className='h-12 w-12 text-muted-foreground' />
        <p className='text-sm text-muted-foreground'>Customer not found</p>
        <Button variant='ghost' asChild>
          <Link href='/dashboard/udhaar'>
            <Icons.chevronLeft className='mr-1 h-4 w-4' /> Back to Udhaar
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      {/* Back button */}
      <div className='px-4 pt-4'>
        <Button variant='ghost' size='sm' asChild className='-ml-2'>
          <Link href='/dashboard/udhaar'>
            <Icons.chevronLeft className='mr-1 h-4 w-4' /> Udhaar
          </Link>
        </Button>
      </div>

      {/* Customer header */}
      <div className='flex flex-col items-center gap-3 px-4 py-6'>
        <CustomerAvatar name={customer.name} size='lg' />
        <div className='text-center'>
          <p className='text-xl font-bold'>{customer.name}</p>
          <p className='text-sm text-muted-foreground'>{customer.phone}</p>
        </div>
        <div className='text-center'>
          <p className='text-3xl font-bold text-destructive'>{formatRs(customer.balance)}</p>
          <p className='text-sm text-muted-foreground'>OWED</p>
        </div>
      </div>

      {/* Actions */}
      <div className='flex gap-3 px-4 pb-4'>
        <RecordPaymentSheet customerId={customer.id} customerName={customer.name}>
          <Button className='flex-1'>
            <Icons.check className='mr-2 h-4 w-4' /> Record Payment
          </Button>
        </RecordPaymentSheet>

        <Button variant='outline' asChild>
          <a href={`tel:${customer.phone}`}>
            <Icons.phone className='h-4 w-4' />
          </a>
        </Button>
      </div>

      {/* Transaction timeline */}
      <div className='px-4 pb-6'>
        <p className='mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
          Transaction History
        </p>

        {txLoading ? (
          <div className='space-y-3'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='h-14 animate-pulse rounded-xl bg-muted' />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className='text-sm text-muted-foreground'>No transactions yet</p>
        ) : (
          <div className='divide-y divide-border rounded-xl border border-border bg-card px-4'>
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
