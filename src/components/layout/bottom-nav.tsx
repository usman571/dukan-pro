'use client';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Home', href: '/dashboard/overview', icon: 'dashboard' as const },
  { label: 'Stock', href: '/dashboard/inventory', icon: 'product' as const }
] satisfies { label: string; href: string; icon: keyof typeof Icons }[];

const tabsRight = [
  { label: 'Udhaar', href: '/dashboard/udhaar', icon: 'teams' as const },
  { label: 'Reports', href: '/dashboard/reports', icon: 'trendingUp' as const }
] satisfies { label: string; href: string; icon: keyof typeof Icons }[];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 flex h-16 items-end justify-around border-t border-border bg-background pb-1 md:hidden'>
      {tabs.map((tab) => {
        const Icon = Icons[tab.icon];
        const isActive = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className='flex min-h-[44px] w-14 flex-col items-center justify-end gap-0.5 pb-1'
          >
            <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground')} />
            <span
              className={cn(
                'text-[10px]',
                isActive ? 'font-medium text-primary' : 'text-muted-foreground'
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}

      {/* Center FAB */}
      <Link
        href='/dashboard/sales/new'
        className='flex flex-col items-center justify-end pb-1'
        aria-label='New sale'
      >
        <div className='-translate-y-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg'>
          <Icons.add className='h-6 w-6 text-primary-foreground' />
        </div>
      </Link>

      {tabsRight.map((tab) => {
        const Icon = Icons[tab.icon];
        const isActive = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className='flex min-h-[44px] w-14 flex-col items-center justify-end gap-0.5 pb-1'
          >
            <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-muted-foreground')} />
            <span
              className={cn(
                'text-[10px]',
                isActive ? 'font-medium text-primary' : 'text-muted-foreground'
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
