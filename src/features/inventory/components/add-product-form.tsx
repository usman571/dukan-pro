'use client';

import { useAppForm, useFormFields } from '@/components/ui/tanstack-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { addProductMutation } from '../api/mutations';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { inventorySchema, type InventoryFormValues } from '../schemas/inventory';
import { categoryOptions } from '../constants/inventory-options';
import { ProfitCalculator } from './profit-calculator';

export default function AddProductForm() {
  const router = useRouter();

  const createMutation = useMutation({
    ...addProductMutation,
    onSuccess: () => {
      toast.success('Product added successfully');
      router.push('/dashboard/inventory');
    },
    onError: () => {
      toast.error('Failed to add product. Please try again.');
    }
  });

  const form = useAppForm({
    defaultValues: {
      name: '',
      category: '',
      brand: '',
      buyPrice: undefined,
      sellPrice: undefined,
      stock: undefined,
      lowStockThreshold: undefined
    } as InventoryFormValues,
    validators: { onSubmit: inventorySchema },
    onSubmit: ({ value }) => {
      createMutation.mutate({
        name: value.name,
        category: value.category as import('../api/types').ProductCategory,
        brand: value.brand,
        buyPrice: value.buyPrice!,
        sellPrice: value.sellPrice!,
        stock: value.stock!,
        lowStockThreshold: value.lowStockThreshold!
      });
    }
  });

  const { FormTextField, FormSelectField } = useFormFields<InventoryFormValues>();

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>Add Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form.AppForm>
          <form.Form className='space-y-6'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormTextField
                name='name'
                label='Product Name'
                required
                placeholder='e.g. Tapal Danedar 200g'
              />

              <FormTextField name='brand' label='Brand' required placeholder='e.g. Tapal' />
            </div>

            <FormSelectField
              name='category'
              label='Category'
              required
              options={categoryOptions}
              placeholder='Select a category'
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormTextField
                name='buyPrice'
                label='Buy Price (Rs)'
                required
                type='number'
                inputMode='numeric'
                min={0}
              />
              <FormTextField
                name='sellPrice'
                label='Sell Price (Rs)'
                required
                type='number'
                inputMode='numeric'
                min={0}
              />
            </div>

            <form.Subscribe selector={(s) => [s.values.buyPrice, s.values.sellPrice] as const}>
              {([buyPrice, sellPrice]) => (
                <ProfitCalculator
                  buyPrice={Number(buyPrice ?? 0)}
                  sellPrice={Number(sellPrice ?? 0)}
                />
              )}
            </form.Subscribe>

            <div className='grid grid-cols-2 gap-4'>
              <FormTextField
                name='stock'
                label='Stock'
                required
                type='number'
                inputMode='numeric'
                min={0}
              />
              <FormTextField
                name='lowStockThreshold'
                label='Low Stock Alert'
                required
                type='number'
                inputMode='numeric'
                min={1}
                description='Alert when stock falls to this level'
              />
            </div>

            <div className='flex justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => router.back()}>
                Back
              </Button>
              <form.SubmitButton>Add product</form.SubmitButton>
            </div>
          </form.Form>
        </form.AppForm>
      </CardContent>
    </Card>
  );
}
