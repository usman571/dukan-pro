import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { searchParamsCache } from '@/lib/searchparams';
import { inventoryQueryOptions } from '../api/queries';
import { InventoryTable } from './inventory-tables';

export default function InventoryListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories })
  };

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(inventoryQueryOptions(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InventoryTable />
    </HydrationBoundary>
  );
}
