'use client';

import { useAppForm } from '@/components/ui/tanstack-form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { resetPassword } from '../api/service';
import type { ResetPasswordFormValues } from '../api/types';

const resetSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export function ResetPasswordView() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: { password: '', confirmPassword: '' } as ResetPasswordFormValues,
    validators: { onSubmit: resetSchema },
    onSubmit: async ({ value }) => {
      await resetPassword(value.password);
      toast.success('Password updated! You can now sign in.');
      router.push('/auth/sign-in');
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
        <h2 className='mb-1 text-xl font-bold text-foreground md:text-2xl'>Set new password</h2>
        <p className='mb-6 text-sm text-muted-foreground'>
          Choose a new password, at least 6 characters.
        </p>

        <form.AppForm>
          <form.Form className='gap-6 p-0 space-y-3'>
            <form.AppField name='password'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet className='gap-2'>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>New Password</field.FieldLabel>
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
                      {isInvalid && <field.FieldError className='text-destructive text-sm' />}
                    </field.Field>
                  </field.FieldSet>
                );
              }}
            </form.AppField>

            <form.AppField name='confirmPassword'>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet className='gap-2'>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>Confirm Password</field.FieldLabel>
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
                      {isInvalid && <field.FieldError className='text-destructive text-sm' />}
                    </field.Field>
                  </field.FieldSet>
                );
              }}
            </form.AppField>

            {/* Live match indicator */}
            <form.Subscribe
              selector={(state) => ({
                password: state.values.password,
                confirm: state.values.confirmPassword
              })}
            >
              {({ password, confirm }) => {
                if (!confirm) return null;
                const match = password === confirm && password.length >= 6;
                return (
                  <p className={cn('text-sm', match ? 'text-primary' : 'text-destructive')}>
                    {match ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </p>
                );
              }}
            </form.Subscribe>

            <form.SubmitButton className='w-full'>Update password</form.SubmitButton>
          </form.Form>
        </form.AppForm>

        <p className='mt-4 text-center text-sm text-muted-foreground'>
          <Link
            href='/auth/sign-in'
            className='inline-flex items-center gap-1 font-medium text-primary hover:underline'
          >
            <Icons.chevronLeft className='h-4 w-4' />
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
