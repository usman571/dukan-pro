import { mutationOptions } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { recordPayment } from './service';
import { udhaarKeys } from './queries';
import type { RecordPaymentInput } from './types';

export const recordPaymentMutation = mutationOptions({
  mutationFn: (input: RecordPaymentInput) => recordPayment(input),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: udhaarKeys.all });
  }
});
