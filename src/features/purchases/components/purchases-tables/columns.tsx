import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { ColumnDef } from '@tanstack/react-table';
import type { Purchase } from '../../api/types';
import { CellAction } from './cell-action';

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

export const columns: ColumnDef<Purchase>[] = [
  {
    id: 'supplier',
    accessorKey: 'supplier',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Supplier' />,
    cell: ({ row }) => (
      <div>
        <p className='text-sm font-semibold'>{row.original.supplier}</p>
        <p className='text-xs text-muted-foreground'>{row.original.items.length} items</p>
      </div>
    ),
    meta: {
      label: 'Supplier',
      placeholder: 'Search supplier...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'items',
    header: 'ITEMS',
    cell: ({ row }) => (
      <p className='max-w-[200px] truncate text-sm text-muted-foreground'>
        {row.original.items.map((i) => i.productName).join(', ')}
      </p>
    )
  },
  {
    accessorKey: 'total',
    header: 'TOTAL',
    cell: ({ getValue }) => (
      <span className='text-sm font-semibold'>{formatRs(getValue<number>())}</span>
    )
  },
  {
    accessorKey: 'paidAmount',
    header: 'PAID',
    cell: ({ getValue }) => <span className='text-sm'>{formatRs(getValue<number>())}</span>
  },
  {
    id: 'balance',
    header: 'BALANCE',
    cell: ({ row }) => {
      const balance = row.original.total - row.original.paidAmount;
      return balance > 0 ? (
        <Badge className='border-0 bg-destructive/10 text-destructive'>{formatRs(balance)}</Badge>
      ) : (
        <Badge className='border-0 bg-primary/10 text-primary'>Paid</Badge>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Date' />,
    cell: ({ getValue }) => (
      <span className='text-sm text-muted-foreground'>{formatDate(getValue<string>())}</span>
    )
  },
  {
    id: 'actions',
    size: 40,
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
