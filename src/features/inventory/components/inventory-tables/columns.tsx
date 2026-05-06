'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { Product } from '../../api/types';
import { getStockStatus } from '../../api/types';
import type { Column, ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

function StockBadge({ product }: { product: Product }) {
  const status = getStockStatus(product);
  return (
    <Badge
      className={cn(
        'border-0',
        status === 'out' && 'bg-destructive/10 text-destructive',
        status === 'low' && 'bg-amber-500/10 text-amber-600',
        status === 'ok' && 'bg-primary/10 text-primary'
      )}
    >
      {product.stock === 0 ? 'Out of stock' : `${product.stock}`}
    </Badge>
  );
}

export const columns: ColumnDef<Product>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Product' />
    ),
    cell: ({ row }) => (
      <div>
        <p className='text-sm font-semibold'>{row.original.name}</p>
        <p className='text-xs text-muted-foreground'>{row.original.brand}</p>
      </div>
    ),
    meta: {
      label: 'Product',
      placeholder: 'Search products...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'category',
    accessorKey: 'category',
    enableSorting: false,
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ cell }) => (
      <Badge variant='outline' className='capitalize'>
        {cell.getValue<string>()}
      </Badge>
    ),
    enableColumnFilter: true,
    meta: {
      label: 'Category',
      variant: 'multiSelect',
      options: CATEGORY_OPTIONS
    }
  },
  {
    accessorKey: 'buyPrice',
    header: 'BUY',
    cell: ({ getValue }) => <span className='text-sm'>{formatRs(getValue<number>())}</span>
  },
  {
    accessorKey: 'sellPrice',
    header: 'SELL',
    cell: ({ getValue }) => (
      <span className='text-sm font-semibold'>{formatRs(getValue<number>())}</span>
    )
  },
  {
    id: 'margin',
    header: 'MARGIN',
    cell: ({ row }) => (
      <span className='text-sm text-primary'>
        +{formatRs(row.original.sellPrice - row.original.buyPrice)}
      </span>
    )
  },
  {
    accessorKey: 'stock',
    header: 'STOCK',
    cell: ({ row }) => <StockBadge product={row.original} />
  },
  {
    id: 'actions',
    size: 40,
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
