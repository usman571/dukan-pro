'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CartItem } from '../store/cart-store';

interface CartItemRowProps {
  item: CartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function CartItemRow({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) {
  const subtotal = item.qty * item.sellPrice;
  const profit = item.qty * (item.sellPrice - item.buyPrice);

  return (
    <div className='flex items-center gap-1 border-b border-border py-3'>
      {/* Product info */}
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-medium'>{item.productName}</p>
        <p className='text-xs text-muted-foreground'>
          Rs {item.sellPrice.toLocaleString('en-PK')} ea ·{' '}
          <span
            className={cn('font-medium', profit > 0 ? 'text-primary' : 'text-muted-foreground')}
          >
            +Rs {(item.sellPrice - item.buyPrice).toLocaleString('en-PK')}
          </span>
        </p>
      </div>

      {/* Qty controls */}
      <div className='flex shrink-0 items-center gap-0.5'>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8'
          onClick={onDecrement}
          aria-label='Decrease quantity'
        >
          <Icons.minus className='h-3.5 w-3.5' />
        </Button>
        <span className='w-6 text-center text-sm font-semibold'>{item.qty}</span>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8'
          onClick={onIncrement}
          aria-label='Increase quantity'
        >
          <Icons.add className='h-3.5 w-3.5' />
        </Button>
        <Button
          variant='ghost'
          size='icon'
          className='h-8 w-8 text-destructive hover:text-destructive'
          onClick={onRemove}
          aria-label='Remove item'
        >
          <Icons.trash className='h-3.5 w-3.5' />
        </Button>
      </div>

      {/* Subtotal */}
      <div className='w-16 shrink-0 text-right'>
        <p className='text-sm font-semibold'>Rs {subtotal.toLocaleString('en-PK')}</p>
      </div>
    </div>
  );
}
