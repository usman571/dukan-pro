import { getQueryClient } from '@/lib/query-client';
import { searchParamsCache } from '@/lib/searchparams';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { purchasesQueryOptions } from '../api/queries';
import { PurchasesTable } from './purchases-tables';

export default function PurchasesListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search })
  };

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(purchasesQueryOptions(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PurchasesTable />
    </HydrationBoundary>
  );
}
