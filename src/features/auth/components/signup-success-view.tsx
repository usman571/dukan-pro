'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useRouter, useSearchParams } from 'next/navigation';

export function SignupSuccessView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ownerName = searchParams.get('name') ?? 'Shop Owner';
  const shopName = searchParams.get('shop') ?? 'Your Shop';

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-primary px-6 text-center'>
      <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-foreground/20'>
        <Icons.circleCheck className='h-10 w-10 text-primary-foreground' />
      </div>

      <h1 className='mb-2 text-3xl font-bold text-primary-foreground'>Welcome, {ownerName}!</h1>

      <p className='mb-10 max-w-xs text-base text-primary-foreground/80'>
        {shopName} is now on Dukaan Pro. Start by recording your first sale.
      </p>

      <div className='flex w-full max-w-xs flex-col gap-3'>
        <Button
          className='w-full bg-background text-foreground hover:bg-background/90'
          onClick={() => router.push('/dashboard/sales')}
        >
          Record first sale
        </Button>
        <Button
          variant='outline'
          className='w-full border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10'
          onClick={() => router.push('/dashboard/overview')}
        >
          Skip to dashboard
        </Button>
      </div>
    </div>
  );
}
