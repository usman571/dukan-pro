'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { customersQueryOptions } from '../api/queries';
import { CustomerCard } from './customer-card';

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

export function UdhaarListView() {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery(
    customersQueryOptions({ page: 1, limit: 100, ...(search && { search }) })
  );

  const customers = data?.items ?? [];
  const totalOutstanding = customers.reduce((sum, c) => sum + c.balance, 0);

  return (
    <div className='flex flex-col'>
      {/* Outstanding banner */}
      <div className='bg-primary px-4 py-5 text-primary-foreground'>
        <p className='text-xs font-medium uppercase tracking-wide opacity-80'>Total Outstanding</p>
        <p className='mt-1 text-3xl font-bold'>{formatRs(totalOutstanding)}</p>
        <p className='mt-0.5 text-sm opacity-80'>
          {customers.length} customer{customers.length !== 1 ? 's' : ''} with udhaar
        </p>
      </div>

      {/* Search */}
      <div className='px-4 py-3'>
        <div className='relative'>
          <Icons.search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            className='pl-9'
            placeholder='Search customers...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Customer list */}
      <div className='flex flex-col gap-2 px-4 pb-6'>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='h-16 animate-pulse rounded-xl bg-muted' />
          ))
        ) : customers.length === 0 ? (
          <div className='flex flex-col items-center gap-3 py-12 text-center'>
            <Icons.teams className='h-12 w-12 text-muted-foreground' />
            <p className='text-sm text-muted-foreground'>No customers found</p>
          </div>
        ) : (
          customers.map((customer) => <CustomerCard key={customer.id} customer={customer} />)
        )}
      </div>
    </div>
  );
}
