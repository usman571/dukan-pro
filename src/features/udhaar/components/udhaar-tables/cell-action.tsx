'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import { parseAsInteger, useQueryStates } from 'nuqs';
import Link from 'next/link';
import type { UdhaarCustomer } from '../../api/types';

interface CellActionProps {
  data: UdhaarCustomer;
}

export function CellAction({ data }: CellActionProps) {
  const [, setParams] = useQueryStates({ selectedId: parseAsInteger });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <Icons.ellipsis className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setParams({ selectedId: data.id })}>
          <Icons.billing className='mr-2 h-4 w-4' /> View activity
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/udhaar/${data.id}`}>
            <Icons.user className='mr-2 h-4 w-4' /> View profile
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
