'use client';

import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { Column, ColumnDef } from '@tanstack/react-table';
import type { UdhaarCustomer } from '../../api/types';
import { CellAction } from './cell-action';

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const columns: ColumnDef<UdhaarCustomer>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<UdhaarCustomer, unknown> }) => (
      <DataTableColumnHeader column={column} title='Customer' />
    ),
    cell: ({ row }) => (
      <div>
        <p className='text-sm font-semibold'>{row.original.name}</p>
        <p className='text-xs text-muted-foreground'>{row.original.phone}</p>
      </div>
    ),
    meta: {
      label: 'Customer',
      placeholder: 'Search customers...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'lastActivity',
    accessorKey: 'lastActivity',
    enableSorting: false,
    header: 'LAST ACTIVITY',
    cell: ({ getValue }) => (
      <span className='text-sm text-muted-foreground'>{timeAgo(getValue<string>())}</span>
    )
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: ({ column }: { column: Column<UdhaarCustomer, unknown> }) => (
      <DataTableColumnHeader column={column} title='Balance' />
    ),
    cell: ({ getValue }) => (
      <div>
        <p className='text-sm font-bold text-destructive'>{formatRs(getValue<number>())}</p>
        <p className='text-xs text-muted-foreground'>OWED</p>
      </div>
    )
  },
  {
    id: 'actions',
    size: 40,
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
