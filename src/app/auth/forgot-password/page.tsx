import type { Metadata } from 'next';
import { ForgotPasswordView } from '@/features/auth/components/forgot-password-view';

export const metadata: Metadata = {
  title: 'Forgot Password — Dukaan Pro'
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
