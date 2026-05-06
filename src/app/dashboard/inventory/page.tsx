import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import InventoryListingPage from '@/features/inventory/components/inventory-listing';
import { InventoryView } from '@/features/inventory/components/inventory-view';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import type { SearchParams } from 'nuqs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inventory — Dukaan Pro'
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function InventoryPage(props: PageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    // md:h-full gives <main>'s computed height to this wrapper, enabling the
    // DataTable's absolute inset-0 scroll area to size correctly on desktop.
    <div className='md:flex md:h-full md:flex-col'>
      {/* Mobile: card list with local state */}
      <div className='md:hidden'>
        <InventoryView />
      </div>

      {/* Desktop: flex-1 fills the wrapper, passing height down to DataTable */}
      <div className='hidden md:flex md:flex-1 md:flex-col'>
        <PageContainer
          pageTitle='Inventory'
          pageDescription='Manage your product stock'
          pageHeaderAction={
            <Link
              href='/dashboard/inventory/new'
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <Icons.add className='mr-2 h-4 w-4' /> Add product
            </Link>
          }
        >
          <InventoryListingPage />
        </PageContainer>
      </div>
    </div>
  );
}
