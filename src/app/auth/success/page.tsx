import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SignupSuccessView } from '@/features/auth/components/signup-success-view';

export const metadata: Metadata = {
  title: 'Welcome — Dukaan Pro'
};

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className='fixed inset-0 bg-primary' />}>
      <SignupSuccessView />
    </Suspense>
  );
}
