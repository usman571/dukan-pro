import { CustomerDetailView } from '@/features/udhaar/components/customer-detail-view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Detail — Dukaan Pro'
};

type PageProps = {
  params: Promise<{ customerId: string }>;
};

export default async function CustomerDetailPage(props: PageProps) {
  const { customerId } = await props.params;
  const id = parseInt(customerId, 10);

  return (
    <div className='min-h-full bg-background'>
      <CustomerDetailView customerId={id} />
    </div>
  );
}
