'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { inventoryQueryOptions } from '@/features/inventory/api/queries';
import type { Product } from '@/features/inventory/api/types';

interface ProductSearchProps {
  onAddProduct: (product: {
    id: number;
    name: string;
    sellPrice: number;
    buyPrice: number;
  }) => void;
}

export function ProductSearch({ onAddProduct }: ProductSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useQuery(inventoryQueryOptions({ page: 1, limit: 200 }));
  const products: Product[] = data?.products ?? [];

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className='relative'>
      <div className='relative'>
        <Icons.search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          className='pl-9'
          placeholder={isLoading ? 'Loading products...' : 'Search products to add...'}
          value={query}
          disabled={isLoading}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <div className='absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-md border border-border bg-card shadow-lg'>
          {filtered.map((product) => (
            <button
              key={product.id}
              className='flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted'
              onMouseDown={(e) => {
                e.preventDefault();
                onAddProduct(product);
                setQuery('');
                setIsOpen(false);
              }}
            >
              <span className='truncate font-medium'>{product.name}</span>
              <span className='ml-2 whitespace-nowrap text-muted-foreground'>
                Rs {product.sellPrice.toLocaleString('en-PK')}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
