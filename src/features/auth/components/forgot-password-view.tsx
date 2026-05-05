'use client';

import { useAppForm } from '@/components/ui/tanstack-form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { sendResetEmail } from '../api/service';
import type { ForgotPasswordFormValues } from '../api/types';

const forgotSchema = z.object({
  email: z.string().email('Valid email required')
});

export function ForgotPasswordView() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: { email: '' } as ForgotPasswordFormValues,
    validators: { onSubmit: forgotSchema },
    onSubmit: async ({ value }) => {
      await sendResetEmail(value.email);
      toast.success('Reset link sent! Check your inbox.');
      setTimeout(() => {
        router.push('/auth/reset-password');
      }, 1000);
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
        <h2 className='mb-1 text-xl font-bold text-foreground md:text-2xl'>Forgot password?</h2>
        <p className='mb-6 text-sm text-muted-foreground'>
          Enter your email and we&apos;ll send you a reset link.
        </p>

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

            <form.SubmitButton className='w-full'>Send reset link</form.SubmitButton>
          </form.Form>
        </form.AppForm>

        <p className='mt-4 text-center text-sm text-muted-foreground'>
          <Link
            href='/auth/sign-in'
            className='inline-flex items-center gap-1 font-medium text-primary hover:underline'
          >
            <Icons.chevronLeft className='h-4 w-4' />
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
