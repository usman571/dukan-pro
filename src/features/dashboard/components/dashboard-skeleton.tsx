import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className='flex flex-col gap-4 p-4 md:p-6'>
      {/* Greeting */}
      <div className='flex flex-col gap-1'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-7 w-40' />
        <Skeleton className='h-4 w-32' />
      </div>

      {/* KPI cards */}
      <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='rounded-xl border border-border bg-card p-4'>
            <Skeleton className='mb-2 h-3 w-20' />
            <Skeleton className='mb-1 h-8 w-24' />
            <Skeleton className='h-3 w-16' />
          </div>
        ))}
      </div>

      {/* Low-stock banner */}
      <Skeleton className='h-12 w-full rounded-xl' />

      {/* Recent sales rows */}
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-5 w-28' />
          <Skeleton className='h-4 w-14' />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='flex items-center justify-between'>
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-3 w-20' />
            </div>
            <div className='flex flex-col items-end gap-1'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-12 rounded-full' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
