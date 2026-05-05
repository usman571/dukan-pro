import type { Metadata } from 'next';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen bg-background'>
      {/* LEFT PANE — desktop marketing panel */}
      <div className='hidden flex-col justify-between bg-foreground p-10 md:flex md:w-1/2 lg:w-[55%]'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-background'>
            <Icons.logo className='h-5 w-5 text-foreground' />
          </div>
          <span className='text-lg font-bold text-background'>Dukaan Pro</span>
        </div>

        {/* Hero */}
        <div>
          <p className='mb-4 text-xs font-medium uppercase tracking-widest text-background/60'>
            Shop management for Pakistan
          </p>
          <h2 className='mb-8 text-4xl font-bold leading-tight text-background'>
            Your shop,
            <br />
            in your pocket.
          </h2>
          <div className='flex flex-wrap gap-8'>
            <div>
              <p className='text-lg font-bold text-background'>50,000+</p>
              <p className='text-sm text-background/60'>Active shops</p>
            </div>
            <div>
              <p className='text-lg font-bold text-background'>Rs 8 Cr</p>
              <p className='text-sm text-background/60'>Sales tracked</p>
            </div>
            <div>
              <p className='text-lg font-bold text-background'>4.8★</p>
              <p className='text-sm text-background/60'>Play Store rating</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className='text-xs text-background/60'>© 2026 Dukaan Pro. Built for Pakistan.</p>
      </div>

      {/* RIGHT PANE — form area */}
      <div className='flex flex-1 flex-col items-center justify-center bg-background'>
        {children}
      </div>
    </div>
  );
}
