import type { Metadata } from 'next';
import { Icons } from '@/components/icons';

export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen bg-[#0D1117]'>
      {/* LEFT PANE — D1 desktop marketing panel */}
      <div className='hidden flex-col justify-between border-r border-white/10 p-10 md:flex md:w-1/2 lg:w-[55%]'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[#10B981]'>
            <Icons.logo className='h-5 w-5 text-white' />
          </div>
          <span className='text-lg font-bold text-white'>Dukaan Pro</span>
        </div>

        {/* Hero */}
        <div>
          <p className='mb-4 text-xs font-medium uppercase tracking-widest text-white/50'>
            Pakistan ka #1 dukaan app
          </p>
          <h2 className='mb-8 text-4xl font-bold leading-tight text-white' dir='auto'>
            Apni dukaan,
            <br />
            apni jeb mein.
          </h2>
          <div className='flex flex-wrap gap-8'>
            <div>
              <p className='text-lg font-bold text-white'>50,000+</p>
              <p className='text-sm text-white/60'>Active dukaans</p>
            </div>
            <div>
              <p className='text-lg font-bold text-white'>Rs 8 Cr</p>
              <p className='text-sm text-white/60'>Sales tracked</p>
            </div>
            <div>
              <p className='text-lg font-bold text-white'>4.8★</p>
              <p className='text-sm text-white/60'>Play Store rating</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className='text-xs text-white/30'>
          © 2026 Dukaan Pro. Haq se banaya gaya Pakistan mein.
        </p>
      </div>

      {/* RIGHT PANE — form area */}
      {/* Mobile: dark bg, children render white card */}
      {/* Desktop: white bg, children render form directly */}
      <div className='flex flex-1 flex-col items-center justify-center bg-[#0D1117] md:bg-white'>
        {children}
      </div>
    </div>
  );
}
