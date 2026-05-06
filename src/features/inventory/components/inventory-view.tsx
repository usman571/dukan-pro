'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { inventoryQueryOptions } from '../api/queries';
import { CategoryChips } from './category-chips';
import { ProductCard } from './product-card';
import { InventorySkeleton } from './inventory-skeleton';

export function InventoryView() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const { data, isLoading } = useQuery(inventoryQueryOptions({ page: 1, limit: 100 }));

  const filteredProducts = useMemo(
    () =>
      (data?.products ?? []).filter((p) => {
        const matchesSearch =
          search === '' ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
      }),
    [data, search, category]
  );

  if (isLoading) return <InventorySkeleton />;

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between px-4 pt-4'>
        <div>
          <h1 className='text-xl font-bold text-foreground'>Inventory</h1>
          <p className='text-sm text-muted-foreground'>{filteredProducts.length} products</p>
        </div>
        <Button size='sm' className='rounded-full' asChild>
          <Link href='/dashboard/inventory/new'>
            <Icons.add className='mr-1.5 h-4 w-4' />
            Add
          </Link>
        </Button>
      </div>

      <div className='px-4'>
        <div className='relative'>
          <Icons.search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Search products...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='pl-9'
          />
        </div>
      </div>

      <div className='px-4'>
        <CategoryChips value={category} onChange={setCategory} />
      </div>

      <div className='flex flex-col gap-3 px-4 pb-6'>
        {filteredProducts.length === 0 ? (
          <p className='py-8 text-center text-sm text-muted-foreground'>No products found.</p>
        ) : (
          filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
}
