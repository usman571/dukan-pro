import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { searchParamsCache } from '@/lib/searchparams';
import { customersQueryOptions, statsQueryOptions } from '../api/queries';
import { UdhaarDesktopView } from './udhaar-desktop-view';

export default function UdhaarListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search })
  };

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(customersQueryOptions(filters));
  void queryClient.prefetchQuery(statsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UdhaarDesktopView />
    </HydrationBoundary>
  );
}
