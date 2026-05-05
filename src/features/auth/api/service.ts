import bcrypt from 'bcryptjs';
import type { AuthUser, SignUpFormValues } from './types';

const MOCK_USERS: AuthUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Karim Bhai',
    shopName: 'Karim Kiryana Store',
    phone: '03001234567',
    city: 'Lahore'
  }
];

const MOCK_PASSWORD_HASH = '$2b$10$pT6fQanKZY1SvW.YhkPMNeB9jf1X/NHCR40mtjT5dhst49siBqLau';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  return MOCK_USERS.find((u) => u.email === email) ?? null;
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function getMockPasswordHash(): Promise<string> {
  return MOCK_PASSWORD_HASH;
}

export async function signUp(values: SignUpFormValues): Promise<AuthUser> {
  await delay(800);
  const user: AuthUser = {
    id: `user_${Date.now()}`,
    email: `${values.ownerName.toLowerCase().replace(/\s+/g, '.')}@dukaan.pk`,
    name: values.ownerName,
    shopName: values.shopName,
    phone: values.phone,
    city: values.city
  };
  MOCK_USERS.push(user);
  return user;
}

export async function sendResetEmail(_email: string): Promise<void> {
  await delay(600);
}

export async function resetPassword(_newPassword: string): Promise<void> {
  await delay(600);
}
