'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Product } from '../api/types';
import { getStockStatus } from '../api/types';

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

function StockBadge({ product }: { product: Product }) {
  const status = getStockStatus(product);

  if (status === 'out') {
    return (
      <Badge className='border-0 bg-destructive/10 text-destructive text-xs'>OUT OF STOCK</Badge>
    );
  }

  if (status === 'low') {
    return (
      <Badge className='border-0 bg-amber-500/10 text-amber-600 text-xs'>{product.stock} LOW</Badge>
    );
  }

  return (
    <Badge className='border-0 bg-primary/10 text-primary text-xs'>{product.stock} IN STOCK</Badge>
  );
}

function PriceLabel({
  label,
  amount,
  isProfit = false
}: {
  label: string;
  amount: number;
  isProfit?: boolean;
}) {
  return (
    <div className='flex flex-col gap-0.5'>
      <span className='text-[10px] font-medium uppercase text-muted-foreground'>{label}</span>
      <span className={cn('text-xs font-semibold', isProfit ? 'text-primary' : 'text-foreground')}>
        {isProfit ? `+${formatRs(amount)}` : formatRs(amount)}
      </span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className='space-y-2 rounded-lg border border-border bg-card p-3'>
      <div className='flex items-start justify-between gap-2'>
        <span className='text-sm font-bold text-foreground leading-tight'>{product.name}</span>
        <StockBadge product={product} />
      </div>

      <p className='text-xs text-muted-foreground'>
        {product.brand} · {product.category}
      </p>

      <div className='flex gap-4'>
        <PriceLabel label='BUY' amount={product.buyPrice} />
        <PriceLabel label='SELL' amount={product.sellPrice} />
        <div className='ml-auto'>
          <PriceLabel label='MARGIN' amount={product.sellPrice - product.buyPrice} isProfit />
        </div>
      </div>
    </div>
  );
}
