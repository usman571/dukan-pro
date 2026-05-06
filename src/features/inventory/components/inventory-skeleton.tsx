import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function MobileSkeleton() {
  return (
    <div className='flex flex-col gap-4 p-4 md:hidden'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-1.5'>
          <Skeleton className='h-6 w-28' />
          <Skeleton className='h-4 w-20' />
        </div>
        <Skeleton className='h-9 w-20 rounded-full' />
      </div>

      {/* Search */}
      <Skeleton className='h-10 w-full rounded-lg' />

      {/* Chips */}
      <div className='flex gap-2'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='h-8 w-16 shrink-0 rounded-full' />
        ))}
      </div>

      {/* Cards */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='space-y-2 rounded-lg border border-border bg-card p-3'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-5 w-20 rounded-full' />
          </div>
          <Skeleton className='h-3 w-28' />
          <div className='flex gap-6'>
            <div className='space-y-1'>
              <Skeleton className='h-2.5 w-8' />
              <Skeleton className='h-4 w-16' />
            </div>
            <div className='space-y-1'>
              <Skeleton className='h-2.5 w-8' />
              <Skeleton className='h-4 w-16' />
            </div>
            <div className='ml-auto space-y-1'>
              <Skeleton className='h-2.5 w-12' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DesktopSkeleton() {
  return (
    <div className={cn('hidden flex-col gap-4 p-6 md:flex')}>
      {/* Toolbar */}
      <div className='flex items-center gap-3'>
        <Skeleton className='h-9 w-64' />
        <Skeleton className='h-9 w-28' />
        <Skeleton className='ml-auto h-9 w-20' />
        <Skeleton className='h-9 w-32' />
      </div>

      {/* Table header */}
      <div className='flex gap-4 border-b border-border pb-2'>
        {['w-48', 'w-24', 'w-20', 'w-20', 'w-20', 'w-16'].map((w, i) => (
          <Skeleton key={i} className={`h-3 ${w}`} />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className='flex items-center gap-4 py-2'>
          <div className='w-48 space-y-1'>
            <Skeleton className='h-4 w-40' />
            <Skeleton className='h-3 w-20' />
          </div>
          <Skeleton className='h-4 w-24' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-6 w-8 rounded-full' />
        </div>
      ))}
    </div>
  );
}

export function InventorySkeleton() {
  return (
    <>
      <MobileSkeleton />
      <DesktopSkeleton />
    </>
  );
}
