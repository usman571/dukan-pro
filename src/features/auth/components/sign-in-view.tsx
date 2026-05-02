import { UserAuthForm } from './user-auth-form';

export function SignInView() {
  return (
    <div className='flex flex-col space-y-2 text-center'>
      <h1 className='text-2xl font-semibold tracking-tight'>Sign in to your account</h1>
      <p className='text-muted-foreground text-sm'>Enter your email and password below</p>
      <UserAuthForm className='pt-4' />
    </div>
  );
}
