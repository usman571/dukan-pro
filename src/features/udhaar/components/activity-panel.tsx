'use client';

import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { transactionsQueryOptions, customerQueryOptions } from '../api/queries';
import { TransactionItem } from './transaction-item';
import { RecordPaymentSheet } from './record-payment-sheet';

export function ActivityPanel() {
  const [params] = useQueryStates({ selectedId: parseAsInteger.withDefault(0) });
  const selectedId = params.selectedId;

  const { data: customerData } = useQuery(customerQueryOptions(selectedId));
  const { data: txData, isLoading } = useQuery(
    transactionsQueryOptions({ customerId: selectedId })
  );

  if (selectedId === 0 || !customerData) {
    return (
      <div className='flex h-full flex-col items-center justify-center gap-3 p-6 text-center'>
        <Icons.user className='h-12 w-12 text-muted-foreground' />
        <p className='text-sm font-medium'>Select a customer</p>
        <p className='text-xs text-muted-foreground'>
          Click the actions menu on any row to view their activity
        </p>
      </div>
    );
  }

  const transactions = txData?.items ?? [];

  return (
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div className='shrink-0 border-b border-border p-4'>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <p className='text-sm font-bold'>{customerData.name}</p>
            <p className='text-xs text-muted-foreground'>{customerData.phone}</p>
          </div>
          <div className='text-right'>
            <p className='text-lg font-bold text-destructive'>
              Rs {customerData.balance.toLocaleString('en-PK')}
            </p>
            <p className='text-xs text-muted-foreground'>OWED</p>
          </div>
        </div>

        <RecordPaymentSheet customerId={customerData.id} customerName={customerData.name}>
          <Button size='sm' className='mt-3 w-full'>
            Record Payment
          </Button>
        </RecordPaymentSheet>
      </div>

      {/* Transaction timeline */}
      <div className='flex-1 overflow-y-auto p-4'>
        <p className='mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
          Activity
        </p>

        {isLoading ? (
          <div className='space-y-3'>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='h-12 animate-pulse rounded-lg bg-muted' />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className='text-sm text-muted-foreground'>No transactions yet</p>
        ) : (
          <div className='divide-y divide-border'>
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
