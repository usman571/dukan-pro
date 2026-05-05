import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string;
  subValue: string;
  variant?: 'default' | 'profit' | 'danger';
}

const subValueClass: Record<NonNullable<KpiCardProps['variant']>, string> = {
  default: 'text-muted-foreground',
  profit: 'text-primary',
  danger: 'text-destructive'
};

export function KpiCard({ title, value, subValue, variant = 'default' }: KpiCardProps) {
  return (
    <div className='rounded-xl border border-border bg-card p-4'>
      <p className='mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
        {title}
      </p>
      <p className='text-2xl font-bold text-foreground md:text-3xl'>{value}</p>
      <p className={cn('mt-1 text-xs', subValueClass[variant])}>{subValue}</p>
    </div>
  );
}
