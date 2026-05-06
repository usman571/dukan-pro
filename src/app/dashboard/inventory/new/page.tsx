import PageContainer from '@/components/layout/page-container';
import AddProductForm from '@/features/inventory/components/add-product-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Product — Dukaan Pro'
};

export default function NewProductPage() {
  return (
    <PageContainer>
      <div className='flex-1 space-y-4'>
        <AddProductForm />
      </div>
    </PageContainer>
  );
}
