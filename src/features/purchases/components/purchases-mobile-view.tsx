'use client';

import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { purchasesQueryOptions } from '../api/queries';

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

export function PurchasesMobileView() {
  const { data, isLoading } = useQuery(purchasesQueryOptions({ page: 1, limit: 50 }));

  return (
    <div className='flex flex-col gap-4 p-4 pb-24'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-bold'>Purchases</h1>
          {data && <p className='text-sm text-muted-foreground'>{data.total} records</p>}
        </div>
        <Button asChild size='sm'>
          <Link href='/dashboard/purchases/new'>
            <Icons.add className='mr-1 h-4 w-4' />
            Record
          </Link>
        </Button>
      </div>

      {isLoading && (
        <div className='space-y-3'>
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className='h-28 rounded-xl' />
          ))}
        </div>
      )}

      {data?.items.map((purchase) => {
        const balance = purchase.total - purchase.paidAmount;
        return (
          <Card key={purchase.id}>
            <CardContent className='p-4'>
              <div className='flex items-start justify-between gap-2'>
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-semibold'>{purchase.supplier}</p>
                  <p className='mt-0.5 truncate text-xs text-muted-foreground'>
                    {purchase.items.map((i) => i.productName).join(', ')}
                  </p>
                  <p className='mt-1 text-xs text-muted-foreground'>
                    {purchase.items.length} items · {formatDate(purchase.createdAt)}
                  </p>
                </div>
                <div className='shrink-0 text-right'>
                  <p className='font-bold'>{formatRs(purchase.total)}</p>
                  <p className='mt-0.5 text-xs text-muted-foreground'>
                    Paid {formatRs(purchase.paidAmount)}
                  </p>
                </div>
              </div>
              {balance > 0 && (
                <div className='mt-3 flex items-center justify-between rounded-lg bg-destructive/10 px-3 py-2'>
                  <span className='text-xs font-medium text-destructive'>Balance due</span>
                  <span className='text-xs font-bold text-destructive'>{formatRs(balance)}</span>
                </div>
              )}
              {balance <= 0 && (
                <div className='mt-3'>
                  <Badge className='border-0 bg-primary/10 text-primary'>Fully paid</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {data?.items.length === 0 && (
        <div className='flex flex-col items-center gap-3 py-16 text-center'>
          <Icons.product className='h-10 w-10 text-muted-foreground' />
          <p className='text-sm text-muted-foreground'>No purchases recorded yet.</p>
          <Button asChild size='sm'>
            <Link href='/dashboard/purchases/new'>Record first purchase</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
