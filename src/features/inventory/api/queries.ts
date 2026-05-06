import { queryOptions } from '@tanstack/react-query';
import { getProducts } from './service';
import type { InventoryFilters } from './types';

export const inventoryKeys = {
  all: ['inventory'] as const,
  list: (filters: InventoryFilters) => [...inventoryKeys.all, 'list', filters] as const
};

export const inventoryQueryOptions = (filters: InventoryFilters) =>
  queryOptions({
    queryKey: inventoryKeys.list(filters),
    queryFn: () => getProducts(filters)
  });
