'use client';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import type { UdhaarTransaction } from '../api/types';

interface TransactionItemProps {
  transaction: UdhaarTransaction;
}

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isSale = transaction.type === 'sale';

  return (
    <div className='flex items-start gap-3 py-3'>
      <div
        className={cn(
          'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isSale ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
        )}
      >
        {isSale ? <Icons.billing className='h-4 w-4' /> : <Icons.check className='h-4 w-4' />}
      </div>

      <div className='flex flex-1 items-start justify-between gap-2'>
        <div>
          <p className='text-sm font-medium'>{isSale ? 'Sale on credit' : 'Payment received'}</p>
          {transaction.note && <p className='text-xs text-muted-foreground'>{transaction.note}</p>}
          <p className='text-xs text-muted-foreground'>{formatDate(transaction.createdAt)}</p>
        </div>
        <p
          className={cn(
            'shrink-0 text-sm font-semibold',
            isSale ? 'text-destructive' : 'text-primary'
          )}
        >
          {isSale ? '+' : '−'}
          {formatRs(transaction.amount)}
        </p>
      </div>
    </div>
  );
}
