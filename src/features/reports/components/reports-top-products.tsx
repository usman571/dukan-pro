import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TopProduct } from '../api/types';

function formatRs(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

interface Props {
  products: TopProduct[];
}

export function ReportsTopProducts({ products }: Props) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <CardTitle className='text-base'>Top Products by Profit</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {products.map((product) => (
          <div key={product.rank} className='flex items-center gap-3'>
            <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground'>
              {product.rank}
            </span>
            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-medium'>{product.name}</p>
              <p className='text-xs text-muted-foreground'>{product.unitsSold} units sold</p>
            </div>
            <span className='shrink-0 text-sm font-semibold text-primary'>
              +{formatRs(product.profit)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
