'use client';

import { useMutation } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { useCartStore } from '../store/cart-store';
import { createSaleMutation } from '../api/mutations';
import type { CreateSaleInput, Sale } from '../api/types';
import { CartItemRow } from './cart-item';
import { CartSummary } from './cart-summary';
import { ProductGrid } from './product-grid';

interface NewSalePOSProps {
  onSaleComplete: (sale: Sale) => void;
}

export function NewSalePOS({ onSaleComplete }: NewSalePOSProps) {
  const {
    items,
    paymentMode,
    customerId,
    customerName,
    addItem,
    removeItem,
    incrementQty,
    decrementQty
  } = useCartStore();

  const { mutate, isPending } = useMutation({
    ...createSaleMutation,
    onSuccess: (data) => {
      useCartStore.getState().clearCart();
      onSaleComplete(data);
    }
  });

  const handleSubmit = () => {
    const input: CreateSaleInput = {
      items,
      paymentMode,
      ...(customerId !== null && { customerId }),
      ...(customerName !== null && { customerName })
    };
    mutate(input);
  };

  return (
    <div className='flex h-full overflow-hidden'>
      {/* Left: Product grid */}
      <div className='flex min-w-0 flex-1 flex-col overflow-hidden border-r border-border p-4'>
        <h2 className='mb-3 shrink-0 text-lg font-bold'>Add products</h2>
        <div className='min-h-0 flex-1 overflow-hidden'>
          <ProductGrid onAddProduct={addItem} />
        </div>
      </div>

      {/* Right: Cart panel */}
      <div className='flex w-80 shrink-0 flex-col bg-card'>
        <div className='shrink-0 border-b border-border px-4 py-3'>
          <h2 className='text-lg font-bold'>Cart</h2>
          {items.length > 0 && (
            <p className='text-xs text-muted-foreground'>
              {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Cart items */}
        <div className='flex-1 overflow-y-auto px-4'>
          {items.length === 0 ? (
            <div className='flex h-full flex-col items-center justify-center gap-2 py-8 text-center'>
              <Icons.billing className='h-8 w-8 text-muted-foreground' />
              <p className='text-sm text-muted-foreground'>Cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={item.productId}
                item={item}
                onIncrement={() => incrementQty(item.productId)}
                onDecrement={() => decrementQty(item.productId)}
                onRemove={() => removeItem(item.productId)}
              />
            ))
          )}
        </div>

        {/* Summary */}
        <div className='shrink-0'>
          <CartSummary onSubmit={handleSubmit} isPending={isPending} />
        </div>
      </div>
    </div>
  );
}
