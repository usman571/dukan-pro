'use client';

import { useRouter } from 'next/navigation';
import { NewSaleView } from '@/features/sales/components/new-sale-view';
import type { Sale } from '@/features/sales/api/types';

export function NewSaleViewWrapper() {
  const router = useRouter();

  const handleSaleComplete = (sale: Sale) => {
    sessionStorage.setItem('lastSale', JSON.stringify(sale));
    router.push('/dashboard/sales/confirmation');
  };

  return <NewSaleView onSaleComplete={handleSaleComplete} />;
}
