import { mutationOptions } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { createProduct, deleteProduct } from './service';
import { inventoryKeys } from './queries';
import type { AddProductInput } from './types';

export const addProductMutation = mutationOptions({
  mutationFn: (data: AddProductInput) => createProduct(data),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: inventoryKeys.all });
  }
});

export const deleteProductMutation = mutationOptions({
  mutationFn: (id: number) => deleteProduct(id),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: inventoryKeys.all });
  }
});
