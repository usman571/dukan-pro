'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { recordPaymentMutation } from '../api/mutations';
import { recordPaymentSchema } from '../schemas/udhaar';
import type { RecordPaymentFormValues } from '../schemas/udhaar';

interface RecordPaymentSheetProps {
  customerId: number;
  customerName: string;
  children: React.ReactNode;
}

export function RecordPaymentSheet({
  customerId,
  customerName,
  children
}: RecordPaymentSheetProps) {
  const [open, setOpen] = useState(false);

  const { FormTextField } = useFormFields<RecordPaymentFormValues>();

  const mutation = useMutation({
    ...recordPaymentMutation,
    onSuccess: () => {
      toast.success('Payment recorded successfully');
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error('Failed to record payment');
    }
  });

  const form = useAppForm({
    defaultValues: { amount: undefined, note: '' } as RecordPaymentFormValues,
    validators: { onSubmit: recordPaymentSchema },
    onSubmit: ({ value }) => {
      mutation.mutate({
        customerId,
        amount: value.amount as number,
        note: value.note || undefined
      });
    }
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side='bottom' className='rounded-t-xl pb-8'>
        <SheetHeader className='mb-4'>
          <SheetTitle>Record Payment</SheetTitle>
          <p className='text-sm text-muted-foreground'>{customerName}</p>
        </SheetHeader>

        <form.AppForm>
          <form.Form className='space-y-4'>
            <FormTextField
              name='amount'
              label='Amount (Rs)'
              required
              type='number'
              placeholder='0'
            />
            <FormTextField name='note' label='Note (optional)' placeholder='e.g. Cash payment' />
            <Button type='submit' isLoading={mutation.isPending} className='w-full'>
              Record Payment
            </Button>
          </form.Form>
        </form.AppForm>
      </SheetContent>
    </Sheet>
  );
}
