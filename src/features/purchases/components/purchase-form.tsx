'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { addPurchaseMutation } from '../api/mutations';
import { purchaseSchema, type PurchaseFormValues } from '../schemas/purchase';

interface LineItem {
  id: string;
  productName: string;
  qty: string;
  costEach: string;
}

function todayString() {
  return new Date().toISOString().split('T')[0];
}

function formatRs(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}

export default function PurchaseForm() {
  const router = useRouter();
  const [date, setDate] = useState(todayString());
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', productName: '', qty: '', costEach: '' }
  ]);
  const [itemsError, setItemsError] = useState<string | null>(null);

  const addItem = () =>
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), productName: '', qty: '', costEach: '' }
    ]);

  const removeItem = (id: string) =>
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev));

  const updateItem = (id: string, field: keyof Omit<LineItem, 'id'>, value: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const itemTotal = items.reduce((sum, i) => {
    return sum + (parseFloat(i.qty) || 0) * (parseFloat(i.costEach) || 0);
  }, 0);

  const mutation = useMutation({
    ...addPurchaseMutation,
    onSuccess: () => {
      toast.success('Purchase recorded successfully');
      router.push('/dashboard/purchases');
    },
    onError: () => {
      toast.error('Failed to record purchase. Please try again.');
    }
  });

  const form = useAppForm({
    defaultValues: {
      supplier: '',
      paidAmount: undefined
    } as PurchaseFormValues,
    validators: { onSubmit: purchaseSchema },
    onSubmit: ({ value }) => {
      const validItems = items.filter(
        (i) => i.productName.trim() && parseFloat(i.qty) > 0 && parseFloat(i.costEach) > 0
      );

      if (validItems.length === 0) {
        setItemsError('Add at least one item with name, qty, and cost.');
        return;
      }

      setItemsError(null);
      mutation.mutate({
        supplier: value.supplier,
        date,
        paidAmount: value.paidAmount!,
        items: validItems.map((i) => ({
          productName: i.productName.trim(),
          qty: parseInt(i.qty, 10),
          costEach: parseFloat(i.costEach)
        }))
      });
    }
  });

  const { FormTextField } = useFormFields<PurchaseFormValues>();

  return (
    <Card className='mx-auto w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>Record Purchase</CardTitle>
        <p className='text-sm text-muted-foreground'>Stock received from supplier</p>
      </CardHeader>
      <CardContent>
        <form.AppForm>
          <form.Form className='space-y-6'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormTextField
                name='supplier'
                label='Supplier Name'
                required
                placeholder='e.g. Hassan Distributors'
              />

              {/* Date uses plain Input — FormTextField does not support type='date' */}
              <div className='space-y-2'>
                <Label htmlFor='purchase-date'>
                  Date <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='purchase-date'
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className='block w-full'
                />
              </div>
            </div>

            {/* Line items */}
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <Label className='text-sm font-medium'>Items bought · {items.length}</Label>
                <Button type='button' variant='ghost' size='sm' onClick={addItem}>
                  <Icons.add className='mr-1 h-4 w-4' />
                  Add item
                </Button>
              </div>

              <div className='space-y-2'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='space-y-2 rounded-lg border border-border bg-muted/30 p-3'
                  >
                    <div className='flex items-center gap-2'>
                      <Input
                        value={item.productName}
                        onChange={(e) => updateItem(item.id, 'productName', e.target.value)}
                        placeholder='Product name'
                        className='flex-1 text-sm'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive'
                        onClick={() => removeItem(item.id)}
                      >
                        <Icons.close className='h-4 w-4' />
                      </Button>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='space-y-1'>
                        <Label className='text-xs text-muted-foreground'>QTY</Label>
                        <Input
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                          placeholder='0'
                          type='number'
                          inputMode='numeric'
                          min={1}
                          className='text-sm'
                        />
                      </div>
                      <div className='space-y-1'>
                        <Label className='text-xs text-muted-foreground'>COST EACH (Rs)</Label>
                        <Input
                          value={item.costEach}
                          onChange={(e) => updateItem(item.id, 'costEach', e.target.value)}
                          placeholder='0'
                          type='number'
                          inputMode='decimal'
                          min={0}
                          className='text-sm'
                        />
                      </div>
                    </div>
                    {item.productName && item.qty && item.costEach && (
                      <p className='text-right text-xs font-medium text-muted-foreground'>
                        Subtotal: {formatRs(parseFloat(item.qty) * parseFloat(item.costEach))}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {itemsError && <p className='text-xs text-destructive'>{itemsError}</p>}

              {itemTotal > 0 && (
                <div className='rounded-lg bg-muted/50 px-4 py-3 text-sm'>
                  <div className='flex justify-between font-semibold'>
                    <span>Items total</span>
                    <span>{formatRs(itemTotal)}</span>
                  </div>
                </div>
              )}
            </div>

            <FormTextField
              name='paidAmount'
              label='Amount Paid (Rs)'
              required
              type='number'
              inputMode='numeric'
              min={0}
              placeholder='0'
              description='Enter 0 if nothing paid yet'
            />

            <form.Subscribe selector={(s) => s.values.paidAmount}>
              {(paid) => {
                const balance = itemTotal - (Number(paid) || 0);
                if (itemTotal <= 0) return null;
                return (
                  <div className='rounded-lg border border-border px-4 py-3 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Total</span>
                      <span className='font-semibold'>{formatRs(itemTotal)}</span>
                    </div>
                    <div className='mt-1 flex justify-between'>
                      <span className='text-muted-foreground'>Paid</span>
                      <span>{formatRs(Number(paid) || 0)}</span>
                    </div>
                    <div className='mt-1 flex justify-between border-t border-border pt-1'>
                      <span className='font-medium'>Balance due</span>
                      <span
                        className={
                          balance > 0 ? 'font-bold text-destructive' : 'font-bold text-primary'
                        }
                      >
                        {formatRs(Math.max(0, balance))}
                      </span>
                    </div>
                  </div>
                );
              }}
            </form.Subscribe>

            <div className='flex justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => router.back()}>
                Cancel
              </Button>
              <form.SubmitButton>Record purchase</form.SubmitButton>
            </div>
          </form.Form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
}
