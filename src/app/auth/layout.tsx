import type { Metadata } from 'next';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen bg-background'>
      {/* LEFT PANE — desktop marketing panel */}
      <div className='hidden flex-col justify-between border-r border-border bg-muted p-10 md:flex md:w-1/2 lg:w-[55%]'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary'>
            <Icons.logo className='h-5 w-5 text-primary-foreground' />
          </div>
          <span className='text-lg font-bold text-foreground'>Dukaan Pro</span>
        </div>

        {/* Hero */}
        <div>
          <p className='mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground'>
            Shop management for Pakistan
          </p>
          <h2 className='mb-8 text-4xl font-bold leading-tight text-foreground'>
            Your shop,
            <br />
            in your pocket.
          </h2>
          <div className='flex flex-wrap gap-8'>
            <div>
              <p className='text-lg font-bold text-foreground'>50,000+</p>
              <p className='text-sm text-muted-foreground'>Active shops</p>
            </div>
            <div>
              <p className='text-lg font-bold text-foreground'>Rs 8 Cr</p>
              <p className='text-sm text-muted-foreground'>Sales tracked</p>
            </div>
            <div>
              <p className='text-lg font-bold text-foreground'>4.8★</p>
              <p className='text-sm text-muted-foreground'>Play Store rating</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className='text-xs text-muted-foreground'>© 2026 Dukaan Pro. Built for Pakistan.</p>
      </div>

      {/* RIGHT PANE — form area */}
      <div className='flex flex-1 flex-col items-center justify-center bg-background'>
        {children}
      </div>
    </div>
  );
}
