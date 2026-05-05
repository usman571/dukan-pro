'use client';

import { salesChartQueryOptions } from '@/features/dashboard/api/queries';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export function SalesChart() {
  const { data } = useSuspenseQuery(salesChartQueryOptions());

  return (
    <div className='rounded-xl border border-border bg-card p-4'>
      <h2 className='mb-4 text-base font-semibold'>Sales — last 7 days</h2>
      <ResponsiveContainer width='100%' height={220}>
        <BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray='3 3' stroke='hsl(var(--border))' vertical={false} />
          <XAxis
            dataKey='day'
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(v: number) => `Rs ${(v / 1000).toFixed(0)}k`}
            width={52}
          />
          <Tooltip
            formatter={(v: number) => [`Rs ${v.toLocaleString('en-PK')}`, 'Sales']}
            contentStyle={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            cursor={{ fill: 'hsl(var(--muted))' }}
          />
          <Bar dataKey='sales' radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === data.length - 1 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
                }
                opacity={index === data.length - 1 ? 1 : 0.4}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
