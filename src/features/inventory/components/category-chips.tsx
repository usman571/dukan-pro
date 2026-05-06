'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PRODUCT_CATEGORIES } from '../api/types';

const ALL_CATEGORIES = ['All', ...PRODUCT_CATEGORIES] as const;

interface CategoryChipsProps {
  value: string;
  onChange: (category: string) => void;
}

export function CategoryChips({ value, onChange }: CategoryChipsProps) {
  return (
    <ScrollArea className='w-full'>
      <ToggleGroup
        type='single'
        value={value}
        onValueChange={(v) => {
          if (v) onChange(v);
        }}
        className='w-max gap-2 rounded-none bg-transparent p-0.5'
      >
        {ALL_CATEGORIES.map((cat) => (
          <ToggleGroupItem
            key={cat}
            value={cat}
            className='shrink-0 rounded-full px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
          >
            {cat}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
