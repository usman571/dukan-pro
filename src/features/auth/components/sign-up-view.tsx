'use client';

import { useAppForm } from '@/components/ui/tanstack-form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { signUp } from '../api/service';
import type { SignUpFormValues } from '../api/types';

const signUpSchema = z.object({
  shopName: z.string().min(2, 'Shop name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters'),
  phone: z.string().regex(/^03\d{9}$/, 'Format: 03XX XXXXXXX (11 digits)'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export function SignUpView() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: {
      shopName: '',
      ownerName: '',
      phone: '',
      city: '',
      password: ''
    } as SignUpFormValues,
    validators: { onSubmit: signUpSchema },
    onSubmit: async ({ value }) => {
      try {
        const user = await signUp(value);
        router.push(
          `/auth/success?name=${encodeURIComponent(user.name)}&shop=${encodeURIComponent(user.shopName)}`
        );
      } catch {
        toast.error('Kuch masla hua, dobara try karein.');
      }
    }
  });

  return (
    <div className='flex w-full flex-col items-center justify-center px-4 py-8 md:px-0 md:py-0'>
      {/* Logo — mobile only */}
      <div className='mb-8 flex flex-col items-center md:hidden'>
        <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#10B981]'>
          <Icons.logo className='h-7 w-7 text-white' />
        </div>
        <h1 className='text-2xl font-bold text-white'>Dukaan Pro</h1>
        <p className='mt-1 text-sm text-[#10B981]' dir='auto'>
          Apni dukaan, apni jeb mein.
        </p>
      </div>

      {/* Form card */}
      <div
        className={cn(
          'w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl',
          'md:max-w-md md:rounded-none md:bg-transparent md:p-0 md:shadow-none'
        )}
      >
        <h2 className='mb-1 text-xl font-bold text-[#0D1117] md:text-2xl'>Create your shop</h2>
        <p className='mb-6 text-sm text-muted-foreground' dir='auto'>
          Sirf 1 minute. Phir aap ka hisaab phone mein.
        </p>

        <form.AppForm>
          <form.Form className='gap-4 p-0'>
            <form.AppField name='shopName'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>Shop Name</field.FieldLabel>
                      <Input
                        id={field.name}
                        type='text'
                        autoComplete='organization'
                        placeholder='Karim Kiryana Store'
                        aria-invalid={isInvalid}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <field.FieldError className='text-destructive text-sm' />}
                    </field.Field>
                  </field.FieldSet>
                );
              }}
            </form.AppField>

            <form.AppField name='ownerName'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>Owner Name</field.FieldLabel>
                      <Input
                        id={field.name}
                        type='text'
                        autoComplete='name'
                        placeholder='Karim Bhai'
                        aria-invalid={isInvalid}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <field.FieldError className='text-destructive text-sm' />}
                    </field.Field>
                  </field.FieldSet>
                );
              }}
            </form.AppField>

            <form.AppField name='phone'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>Phone Number</field.FieldLabel>
                      <Input
                        id={field.name}
                        type='tel'
                        autoComplete='tel'
                        placeholder='03121234567'
                        aria-invalid={isInvalid}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <p className='text-xs text-muted-foreground'>Format: 03XX XXXXXXX</p>
                      {isInvalid && <field.FieldError className='text-destructive text-sm' />}
                    </field.Field>
                  </field.FieldSet>
                );
              }}
            </form.AppField>

            <form.AppField name='city'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>City</field.FieldLabel>
                      <Input
                        id={field.name}
                        type='text'
                        autoComplete='address-level2'
                        placeholder='Lahore'
                        aria-invalid={isInvalid}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <field.FieldError className='text-destructive text-sm' />}
                    </field.Field>
                  </field.FieldSet>
                );
              }}
            </form.AppField>

            <form.AppField name='password'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>Set Password</field.FieldLabel>
                      <Input
                        id={field.name}
                        type='password'
                        autoComplete='new-password'
                        placeholder='••••••'
                        aria-invalid={isInvalid}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <p className='text-xs text-muted-foreground'>Kam-az-kam 6 characters</p>
                      {isInvalid && <field.FieldError className='text-destructive text-sm' />}
                    </field.Field>
                  </field.FieldSet>
                );
              }}
            </form.AppField>

            <p className='text-center text-xs text-muted-foreground'>
              Account banake aap hamare{' '}
              <a href='#' className='underline hover:text-[#10B981]'>
                Terms of Service
              </a>{' '}
              se razi hain.
            </p>

            <form.SubmitButton className='w-full bg-[#10B981] text-white hover:bg-[#059669]'>
              Create account
            </form.SubmitButton>
          </form.Form>
        </form.AppForm>

        <p className='mt-4 text-center text-sm text-muted-foreground'>
          Pehle se account hai?{' '}
          <Link href='/auth/sign-in' className='font-medium text-[#10B981] hover:underline'>
            Log in karein
          </Link>
        </p>
      </div>
    </div>
  );
}
