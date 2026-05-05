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
        toast.error('Invalid email or password.');
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
        <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary'>
          <Icons.logo className='h-7 w-7 text-primary-foreground' />
        </div>
        <h1 className='text-2xl font-bold text-foreground'>Dukaan Pro</h1>
        <p className='mt-1 text-sm text-muted-foreground'>Your shop, in your pocket.</p>
      </div>

      {/* Form card */}
      <div
        className={cn(
          'w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-sm',
          'md:max-w-md md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none'
        )}
      >
        <h2 className='mb-1 text-xl font-bold text-black md:text-2xl'>Sign in</h2>
        <p className='mb-6 text-sm text-muted-foreground'>Enter your email and password below.</p>

        <form.AppForm>
          <form.Form className='gap-6 p-0'>
            <form.AppField name='email'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet className='gap-2'>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>Email</field.FieldLabel>
                      <Input
                        id={field.name}
                        type='email'
                        autoComplete='email'
                        placeholder='name@example.com'
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
                  <field.FieldSet className='gap-2'>
                    <field.Field>
                      <div className='flex items-center justify-between'>
                        <field.FieldLabel htmlFor={field.name}>Password</field.FieldLabel>
                        <Link
                          href='/auth/forgot-password'
                          className='text-xs text-muted-foreground hover:text-primary'
                        >
                          Forgot password?
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

            <form.SubmitButton className='w-full'>Sign in</form.SubmitButton>
          </form.Form>
        </form.AppForm>

        <div className='relative my-4'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-border' />
          </div>
        </div>

        <p className='text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/auth/sign-up' className='font-medium text-primary hover:underline'>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
