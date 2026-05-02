'use client';

import { useAppForm } from '@/components/ui/tanstack-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';
import type { SignInFormValues, SignUpFormValues } from '../api/types';

const signInSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

const signUpSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^03\d{2}\s?\d{7}$/, 'Enter a valid phone number (e.g. 03XX XXXXXXX)')
});

interface UserAuthFormProps {
  className?: string;
  variant?: 'sign-in' | 'sign-up';
}

export function UserAuthForm({ className, variant = 'sign-in' }: UserAuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const isSignUp = variant === 'sign-up';

  const signInForm = useAppForm({
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

  const signUpForm = useAppForm({
    defaultValues: { email: '', password: '', phoneNumber: '' } as SignUpFormValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TanStack Form validator type mismatch with Zod
    validators: { onSubmit: signUpSchema as any },
    onSubmit: async ({ value }) => {
      setError(null);
      const result = await signIn('credentials', {
        email: value.email,
        password: value.password,
        redirect: false
      });
      if (result?.error) {
        setError('Failed to create account. Please try again.');
        return;
      }
      router.push('/dashboard');
      router.refresh();
    }
  });

  if (isSignUp) {
    return (
      <div className={cn('grid gap-6', className)}>
        <signUpForm.AppForm>
          <signUpForm.Form className='gap-4 p-0'>
            <signUpForm.AppField
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
            <signUpForm.AppField
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
                        autoComplete='new-password'
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
            <signUpForm.AppField
              name='phoneNumber'
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <field.FieldSet>
                    <field.Field>
                      <field.FieldLabel htmlFor={field.name}>Phone Number</field.FieldLabel>
                      <Input
                        id={field.name}
                        type='tel'
                        autoComplete='tel'
                        placeholder='03XX XXXXXXX'
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
            <signUpForm.SubmitButton className='w-full'>Create Account</signUpForm.SubmitButton>
          </signUpForm.Form>
        </signUpForm.AppForm>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', className)}>
      <signInForm.AppForm>
        <signInForm.Form className='gap-4 p-0'>
          <signInForm.AppField
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
          <signInForm.AppField
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
          <signInForm.SubmitButton className='w-full'>Sign In</signInForm.SubmitButton>
        </signInForm.Form>
      </signInForm.AppForm>
    </div>
  );
}
