import { mutationOptions } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { createPurchase, deletePurchase } from './service';
import { purchaseKeys } from './queries';
import type { AddPurchaseInput } from './types';

export const addPurchaseMutation = mutationOptions({
  mutationFn: (data: AddPurchaseInput) => createPurchase(data),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: purchaseKeys.all });
  }
});

export const deletePurchaseMutation = mutationOptions({
  mutationFn: (id: number) => deletePurchase(id),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: purchaseKeys.all });
  }
});
