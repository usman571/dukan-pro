'use client';

import { useAppForm } from '@/components/ui/tanstack-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import type { SignInFormValues } from '../api/types';

const signInSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

interface UserAuthFormProps {
  className?: string;
}

export function UserAuthForm({ className }: UserAuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues: { email: '', password: '' } as SignInFormValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TanStack Form validator type mismatch with Zod
    validators: { onSubmit: signInSchema as any },
    onSubmit: async ({ value }) => {
      setError(null);
      const result = await signIn('credentials', {
        email: value.email,
        password: value.password,
        redirect: false
      });
      if (result?.error) {
        setError('Invalid email or password.');
        return;
      }
      router.push('/dashboard');
      router.refresh();
    }
  });

  return (
    <div className={cn('grid gap-6', className)}>
      <form.AppForm>
        <form.Form className='gap-4 p-0'>
          <form.AppField
            name='email'
            children={(field) => {
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
          />
          <form.AppField
            name='password'
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <field.FieldSet>
                  <field.Field>
                    <field.FieldLabel htmlFor={field.name}>Password</field.FieldLabel>
                    <Input
                      id={field.name}
                      type='password'
                      autoComplete='current-password'
                      placeholder='••••••••'
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
          />
          {error && <p className='text-destructive text-sm'>{error}</p>}
          <form.SubmitButton className='w-full'>Sign In</form.SubmitButton>
        </form.Form>
      </form.AppForm>
    </div>
  );
}
