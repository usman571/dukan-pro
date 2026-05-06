import PageContainer from '@/components/layout/page-container';
import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import PurchasesListingPage from '@/features/purchases/components/purchases-listing';
import { PurchasesMobileView } from '@/features/purchases/components/purchases-mobile-view';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { SearchParams } from 'nuqs/server';

export const metadata: Metadata = {
  title: 'Purchases — Dukaan Pro'
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function PurchasesPage(props: PageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <div className='md:flex md:h-full md:flex-col'>
      {/* Mobile */}
      <div className='md:hidden'>
        <PurchasesMobileView />
      </div>

      {/* Desktop */}
      <div className='hidden md:flex md:flex-1 md:flex-col'>
        <PageContainer
          pageTitle='Purchases'
          pageDescription='Track supplier stock deliveries'
          pageHeaderAction={
            <Link
              href='/dashboard/purchases/new'
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <Icons.add className='mr-2 h-4 w-4' /> Record purchase
            </Link>
          }
        >
          <PurchasesListingPage />
        </PageContainer>
      </div>
    </div>
  );
}
