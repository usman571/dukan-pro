'use client';

import { useAppForm } from '@/components/ui/tanstack-form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import type { SignInFormValues } from '../api/types';

const signInSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(1, 'Password is required')
});

export function SignInView() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: { email: '', password: '' } as SignInFormValues,
    validators: { onSubmit: signInSchema },
    onSubmit: async ({ value }) => {
      const result = await signIn('credentials', {
        email: value.email,
        password: value.password,
        redirect: false
      });
      if (result?.error) {
        toast.error('Email ya password galat hai.');
        return;
      }
      router.push('/dashboard/overview');
      router.refresh();
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
        <h2 className='mb-1 text-xl font-bold text-[#0D1117] md:text-2xl'>Log In</h2>
        <p className='mb-6 text-sm text-muted-foreground'>Apna account access karein.</p>

        <form.AppForm>
          <form.Form className='gap-4 p-0'>
            <form.AppField name='email'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>Email</field.FieldLabel>
                      <Input
                        id={field.name}
                        type='email'
                        autoComplete='email'
                        placeholder='aapka@email.com'
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
                      <div className='flex items-center justify-between'>
                        <field.FieldLabel htmlFor={field.name}>Password</field.FieldLabel>
                        <Link
                          href='/auth/forgot-password'
                          className='text-xs text-muted-foreground hover:text-[#10B981]'
                        >
                          Bhool gaye?
                        </Link>
                      </div>
                      <Input
                        id={field.name}
                        type='password'
                        autoComplete='current-password'
                        placeholder='••••••'
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

            <form.SubmitButton className='w-full bg-[#10B981] text-white hover:bg-[#059669]'>
              Log in
            </form.SubmitButton>
          </form.Form>
        </form.AppForm>

        <div className='relative my-4'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-border' />
          </div>
        </div>

        <p className='text-center text-sm text-muted-foreground'>
          Naya dukaan?{' '}
          <Link href='/auth/sign-up' className='font-medium text-[#10B981] hover:underline'>
            Account banayein
          </Link>
        </p>
      </div>
    </div>
  );
}
