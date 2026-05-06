'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '../store/cart-store';
import { CustomerPicker } from './customer-picker';

interface CartSummaryProps {
  onSubmit: () => void;
  isPending: boolean;
}

export function CartSummary({ onSubmit, isPending }: CartSummaryProps) {
  const { items, paymentMode, setPaymentMode } = useCartStore();

  const total = items.reduce((sum, i) => sum + i.qty * i.sellPrice, 0);
  const profit = items.reduce((sum, i) => sum + i.qty * (i.sellPrice - i.buyPrice), 0);

  return (
    <div className='space-y-3 border-t border-border bg-background p-4'>
      {/* Payment mode toggle */}
      <div className='grid grid-cols-2 gap-2'>
        <button
          onClick={() => setPaymentMode('cash')}
          className={cn(
            'flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors',
            paymentMode === 'cash'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          <Icons.billing className='h-4 w-4' />
          Cash
        </button>
        <button
          onClick={() => setPaymentMode('udhaar')}
          className={cn(
            'flex h-10 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors',
            paymentMode === 'udhaar'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          <Icons.teams className='h-4 w-4' />
          Udhaar
        </button>
      </div>

      {/* Customer picker (udhaar only) */}
      {paymentMode === 'udhaar' && <CustomerPicker />}

      {/* Totals */}
      <div className='space-y-1'>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Profit on this sale</span>
          <span className='font-semibold text-primary'>+Rs {profit.toLocaleString('en-PK')}</span>
        </div>
        <div className='flex justify-between'>
          <span className='font-medium'>Total</span>
          <span className='text-lg font-bold'>Rs {total.toLocaleString('en-PK')}</span>
        </div>
      </div>

      {/* CTA button */}
      <Button
        className='h-12 w-full'
        onClick={onSubmit}
        isLoading={isPending}
        disabled={items.length === 0 || isPending}
      >
        {paymentMode === 'cash'
          ? `Collect Cash · Rs ${total.toLocaleString('en-PK')}`
          : `Record Udhaar · Rs ${total.toLocaleString('en-PK')}`}
      </Button>
    </div>
  );
}
