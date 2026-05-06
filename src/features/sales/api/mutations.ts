import { mutationOptions } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { createSale } from './service';
import { salesKeys } from './queries';
import type { CreateSaleInput } from './types';

export const createSaleMutation = mutationOptions({
  mutationFn: (input: CreateSaleInput) => createSale(input),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: salesKeys.all });
  }
});
