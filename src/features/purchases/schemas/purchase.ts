import * as z from 'zod';

export const purchaseSchema = z.object({
  supplier: z.string().min(1, 'Supplier name is required'),
  paidAmount: z.number({ message: 'Paid amount is required' }).min(0, 'Cannot be negative')
});

export type PurchaseFormValues = {
  supplier: string;
  paidAmount: number | undefined;
};
