'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import type { DailySalesPoint } from '../api/types';

function formatRs(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

interface Props {
  data: DailySalesPoint[];
  trendPercent: number;
}

export function ReportsSalesChart({ data, trendPercent }: Props) {
  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-base'>Daily Sales</CardTitle>
          <span className='text-xs font-medium text-primary'>+{trendPercent}%</span>
        </div>
        <p className='text-xs text-muted-foreground'>Last 7 days</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={220}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(v: number) => `Rs ${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [formatRs(value), 'Sales']}
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
                    index === data.length - 1
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--muted-foreground))'
                  }
                  opacity={index === data.length - 1 ? 1 : 0.4}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
