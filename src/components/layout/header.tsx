import { Icons } from '@/components/icons';
import SearchInput from '@/components/search-input';
import { ThemeModeToggle } from '@/components/themes/theme-mode-toggle';
import { ThemeSelector } from '@/components/themes/theme-selector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Breadcrumbs } from '../breadcrumbs';

export default function Header() {
  return (
    <header className='bg-background/60 sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2 backdrop-blur-md md:h-14'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <ThemeModeToggle />
        <div className='hidden sm:block'>
          <ThemeSelector />
        </div>
        <Button
          variant='ghost'
          size='icon'
          className='hidden h-9 w-9 md:flex'
          aria-label='Notifications'
        >
          <Icons.notification className='h-4 w-4' />
        </Button>
        <Button asChild size='sm' className='hidden md:flex'>
          <Link href='/dashboard/sales'>
            <Icons.add className='mr-1.5 h-4 w-4' />
            New sale
          </Link>
        </Button>
      </div>
    </header>
  );
}
