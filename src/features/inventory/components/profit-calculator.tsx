'use client';

import { Badge } from '@/components/ui/badge';

interface ProfitCalculatorProps {
  buyPrice: number;
  sellPrice: number;
}

export function ProfitCalculator({ buyPrice, sellPrice }: ProfitCalculatorProps) {
  if (buyPrice <= 0 || sellPrice <= 0) return null;

  const profit = sellPrice - buyPrice;
  const marginPct = Math.round((profit / buyPrice) * 100);

  return (
    <div className='flex items-center gap-3 rounded-lg bg-primary/10 p-3'>
      <div className='flex flex-col gap-0.5'>
        <span className='text-[10px] font-medium uppercase text-primary'>Profit per unit</span>
        <span className='text-sm font-bold text-primary'>+Rs {profit.toLocaleString('en-PK')}</span>
      </div>
      <Badge className='ml-auto bg-primary text-primary-foreground'>{marginPct}% margin</Badge>
    </div>
  );
}
