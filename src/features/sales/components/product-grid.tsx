'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { inventoryQueryOptions } from '@/features/inventory/api/queries';
import type { Product } from '@/features/inventory/api/types';

interface ProductGridProps {
  onAddProduct: (product: {
    id: number;
    name: string;
    sellPrice: number;
    buyPrice: number;
  }) => void;
}

export function ProductGrid({ onAddProduct }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery(inventoryQueryOptions({ page: 1, limit: 200 }));
  const products: Product[] = data?.products ?? [];

  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const filtered = products
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className='flex h-full flex-col gap-3 overflow-hidden'>
      {/* Search */}
      <div className='relative shrink-0'>
        <Icons.search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          className='pl-9'
          placeholder='Search products...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Category chips */}
      <div className='flex shrink-0 gap-2 overflow-x-auto pb-1'>
        {['all', ...uniqueCategories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors',
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className='flex-1 overflow-y-auto'>
        {isLoading ? (
          <div className='grid grid-cols-3 gap-2'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='h-24 animate-pulse rounded-lg bg-muted' />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-2 pb-4'>
            {filtered.map((product) => (
              <button
                key={product.id}
                onClick={() => onAddProduct(product)}
                className='flex w-full flex-col gap-1 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted'
              >
                <p className='line-clamp-2 text-sm font-semibold leading-tight'>{product.name}</p>
                <p className='text-xs text-muted-foreground'>{product.category}</p>
                <p className='mt-auto text-sm font-medium'>
                  Rs {product.sellPrice.toLocaleString('en-PK')}
                </p>
                <p className='text-xs text-muted-foreground'>Stock: {product.stock}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
