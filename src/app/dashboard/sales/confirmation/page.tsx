'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { SaleConfirmationView } from '@/features/sales/components/sale-confirmation-view';
import type { Sale } from '@/features/sales/api/types';

export default function ConfirmationPage() {
  const router = useRouter();
  const [sale, setSale] = useState<Sale | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('lastSale');
    if (raw) {
      setSale(JSON.parse(raw) as Sale);
      sessionStorage.removeItem('lastSale');
    }
  }, []);

  if (!sale) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <Icons.spinner className='h-8 w-8 animate-spin text-muted-foreground' />
      </div>
    );
  }

  return (
    <SaleConfirmationView
      sale={sale}
      onNewSale={() => router.push('/dashboard/sales')}
      onDone={() => router.push('/dashboard/overview')}
    />
  );
}
