import PageContainer from '@/components/layout/page-container';
import PurchaseForm from '@/features/purchases/components/purchase-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Record Purchase — Dukaan Pro'
};

export default function NewPurchasePage() {
  return (
    <div className='md:flex md:h-full md:flex-col'>
      {/* Mobile */}
      <div className='md:hidden'>
        <div className='p-4 pb-24'>
          <PurchaseForm />
        </div>
      </div>

      {/* Desktop */}
      <div className='hidden md:flex md:flex-1 md:flex-col'>
        <PageContainer pageTitle='Record Purchase' pageDescription='Stock received from supplier'>
          <PurchaseForm />
        </PageContainer>
      </div>
    </div>
  );
}
