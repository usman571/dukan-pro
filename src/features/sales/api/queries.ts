import { queryOptions } from '@tanstack/react-query';
import { getSales } from './service';
import type { SalesFilters } from './types';

export const salesKeys = {
  all: ['sales'] as const,
  lists: () => [...salesKeys.all, 'list'] as const,
  list: (filters: SalesFilters) => [...salesKeys.lists(), filters] as const
};

export const salesQueryOptions = (filters: SalesFilters) =>
  queryOptions({
    queryKey: salesKeys.list(filters),
    queryFn: () => getSales(filters)
  });
