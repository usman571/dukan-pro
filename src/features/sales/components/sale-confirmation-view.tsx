'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { Sale } from '../api/types';

interface SaleConfirmationViewProps {
  sale: Sale;
  onNewSale: () => void;
  onDone: () => void;
}

export function SaleConfirmationView({ sale, onNewSale, onDone }: SaleConfirmationViewProps) {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Green banner */}
      <div className='flex flex-col items-center justify-center bg-primary px-4 py-12'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20'>
          <Icons.check className='h-8 w-8 text-primary-foreground' />
        </div>
        <h1 className='text-2xl font-bold text-primary-foreground'>Sale recorded</h1>
        <p className='mt-1 text-sm text-primary-foreground/80'>
          {sale.paymentMode === 'cash' ? 'Cash collected' : 'Recorded as udhaar'}
        </p>
      </div>

      {/* Summary card */}
      <div className='flex-1 p-4'>
        <div className='space-y-3 rounded-xl border border-border bg-card p-4'>
          <div className='flex items-start justify-between'>
            <span className='text-sm text-muted-foreground'>Total collected</span>
            <span className='text-2xl font-bold'>Rs {sale.total.toLocaleString('en-PK')}</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Profit earned</span>
            <span className='font-semibold text-primary'>
              +Rs {sale.profit.toLocaleString('en-PK')}
            </span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-muted-foreground'>Customer</span>
            <span className='font-medium'>{sale.customerName ?? 'Walk-in'}</span>
          </div>
          <hr className='border-border' />
          <p className='text-sm font-medium'>Items sold · {sale.items.length}</p>
          {sale.items.map((item) => (
            <div key={item.productId} className='flex justify-between text-sm'>
              <span className='text-muted-foreground'>
                {item.productName} × {item.qty}
              </span>
              <span>Rs {(item.qty * item.sellPrice).toLocaleString('en-PK')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className='space-y-3 border-t border-border p-4'>
        <Button className='w-full' onClick={onNewSale}>
          New sale
        </Button>
        <Button className='w-full' variant='outline' onClick={onDone}>
          Done
        </Button>
      </div>
    </div>
  );
}
