'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useRouter, useSearchParams } from 'next/navigation';

export function SignupSuccessView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ownerName = searchParams.get('name') ?? 'Dukaan Owner';
  const shopName = searchParams.get('shop') ?? 'Aap Ki Dukaan';

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-[#10B981] px-6 text-center'>
      <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20'>
        <Icons.circleCheck className='h-10 w-10 text-white' />
      </div>

      <h1 className='mb-2 text-3xl font-bold text-white'>Welcome, {ownerName}!</h1>

      <p className='mb-10 max-w-xs text-base text-white/90' dir='auto'>
        {shopName} ab Dukaan Pro par hai. Pehli sale add karke shuru karein.
      </p>

      <div className='flex w-full max-w-xs flex-col gap-3'>
        <Button
          className='w-full bg-[#0D1117] text-white hover:bg-[#0D1117]/90'
          onClick={() => router.push('/dashboard/sales')}
        >
          Record first sale
        </Button>
        <Button
          variant='outline'
          className='w-full border-white bg-transparent text-white hover:bg-white/10'
          onClick={() => router.push('/dashboard/overview')}
        >
          Skip to dashboard
        </Button>
      </div>
    </div>
  );
}
