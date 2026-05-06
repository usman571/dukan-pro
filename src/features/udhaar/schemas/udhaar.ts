import { z } from 'zod';

export const recordPaymentSchema = z.object({
  amount: z.number({ message: 'Amount is required' }).positive('Amount must be greater than 0'),
  note: z.string()
});

export type RecordPaymentFormValues = {
  amount: number | undefined;
  note: string;
};
