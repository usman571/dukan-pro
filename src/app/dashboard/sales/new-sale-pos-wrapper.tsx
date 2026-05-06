'use client';

import { useRouter } from 'next/navigation';
import { NewSalePOS } from '@/features/sales/components/new-sale-pos';
import type { Sale } from '@/features/sales/api/types';

export function NewSalePOSWrapper() {
  const router = useRouter();

  const handleSaleComplete = (sale: Sale) => {
    sessionStorage.setItem('lastSale', JSON.stringify(sale));
    router.push('/dashboard/sales/confirmation');
  };

  return <NewSalePOS onSaleComplete={handleSaleComplete} />;
}
