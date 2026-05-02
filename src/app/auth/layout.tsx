import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <div className='bg-muted hidden lg:block' />
      <div className='flex items-center justify-center p-8'>
        <div className='mx-auto w-full max-w-sm'>{children}</div>
      </div>
    </div>
  );
}
