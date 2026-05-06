import PageContainer from '@/components/layout/page-container';
import UdhaarListingPage from '@/features/udhaar/components/udhaar-listing';
import { UdhaarListView } from '@/features/udhaar/components/udhaar-list-view';
import { searchParamsCache } from '@/lib/searchparams';
import type { SearchParams } from 'nuqs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Udhaar — Dukaan Pro'
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function UdhaarPage(props: PageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <div className='md:flex md:h-full md:flex-col'>
      {/* Mobile: scrollable list */}
      <div className='md:hidden'>
        <UdhaarListView />
      </div>

      {/* Desktop: DataTable + activity panel — flex-1 fills height from sidebar layout */}
      <div className='hidden md:flex md:flex-1 md:flex-col'>
        <PageContainer pageTitle='Udhaar' pageDescription='Track customer credit and payments'>
          <UdhaarListingPage />
        </PageContainer>
      </div>
    </div>
  );
}
