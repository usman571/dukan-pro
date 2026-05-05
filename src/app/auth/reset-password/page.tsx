import type { Metadata } from 'next';
import { ResetPasswordView } from '@/features/auth/components/reset-password-view';

export const metadata: Metadata = {
  title: 'Reset Password — Dukaan Pro'
};

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
