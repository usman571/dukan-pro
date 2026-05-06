import { queryOptions } from '@tanstack/react-query';
import { getPurchases } from './service';
import type { PurchaseFilters } from './types';

export const purchaseKeys = {
  all: ['purchases'] as const,
  list: (filters: PurchaseFilters) => [...purchaseKeys.all, 'list', filters] as const
};

export const purchasesQueryOptions = (filters: PurchaseFilters) =>
  queryOptions({
    queryKey: purchaseKeys.list(filters),
    queryFn: () => getPurchases(filters)
  });
