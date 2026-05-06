import PageContainer from '@/components/layout/page-container';
import ReportsListingPage from '@/features/reports/components/reports-listing';
import { ReportsMobileView } from '@/features/reports/components/reports-mobile-view';
import type { ReportPeriod } from '@/features/reports/api/types';
import type { Metadata } from 'next';
import type { SearchParams } from 'nuqs/server';

export const metadata: Metadata = {
  title: 'Reports — Dukaan Pro'
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ReportsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const period = ((searchParams.period as string) ?? 'month') as ReportPeriod;

  return (
    <div className='md:flex md:h-full md:flex-col'>
      {/* Mobile */}
      <div className='md:hidden'>
        <ReportsMobileView />
      </div>

      {/* Desktop */}
      <div className='hidden md:flex md:flex-1 md:flex-col'>
        <PageContainer pageTitle='Reports' pageDescription='Business performance overview'>
          <ReportsListingPage period={period} />
        </PageContainer>
      </div>
    </div>
  );
}
