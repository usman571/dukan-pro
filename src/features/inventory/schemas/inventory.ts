import * as z from 'zod';

export const inventorySchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Please select a category'),
  brand: z.string().min(1, 'Brand is required'),
  buyPrice: z.number({ message: 'Buy price is required' }).positive('Must be greater than 0'),
  sellPrice: z.number({ message: 'Sell price is required' }).positive('Must be greater than 0'),
  stock: z.number({ message: 'Stock is required' }).int().nonnegative('Cannot be negative'),
  lowStockThreshold: z
    .number({ message: 'Threshold is required' })
    .int()
    .positive('Must be at least 1')
});

export type InventoryFormValues = {
  name: string;
  category: string;
  brand: string;
  buyPrice: number | undefined;
  sellPrice: number | undefined;
  stock: number | undefined;
  lowStockThreshold: number | undefined;
};
