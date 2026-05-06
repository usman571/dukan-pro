'use client';

import { useMutation } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { useCartStore } from '../store/cart-store';
import { createSaleMutation } from '../api/mutations';
import type { CreateSaleInput, Sale } from '../api/types';
import { CartItemRow } from './cart-item';
import { CartSummary } from './cart-summary';
import { ProductSearch } from './product-search';

interface NewSaleViewProps {
  onSaleComplete: (sale: Sale) => void;
}

export function NewSaleView({ onSaleComplete }: NewSaleViewProps) {
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
    <div className='flex h-full flex-col'>
      {/* Header */}
      <div className='shrink-0 border-b border-border px-4 py-3'>
        <h1 className='text-lg font-bold'>New Sale</h1>
        {items.length > 0 && (
          <p className='text-xs text-muted-foreground'>
            {items.length} item{items.length !== 1 ? 's' : ''} in cart
          </p>
        )}
      </div>

      {/* Product search */}
      <div className='shrink-0 px-4 py-2'>
        <ProductSearch onAddProduct={addItem} />
      </div>

      {/* Cart list */}
      <div className='flex-1 overflow-y-auto px-4'>
        {items.length === 0 ? (
          <div className='flex h-full flex-col items-center justify-center gap-3 py-12 text-center'>
            <Icons.billing className='h-12 w-12 text-muted-foreground' />
            <p className='text-sm text-muted-foreground'>Add products to start a sale</p>
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

      {/* Cart summary */}
      <div className='shrink-0'>
        <CartSummary onSubmit={handleSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
