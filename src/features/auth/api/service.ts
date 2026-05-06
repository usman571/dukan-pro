import { compare } from 'bcryptjs';
import type { AuthUser, SignUpFormValues } from './types';

interface DbUser extends AuthUser {
  passwordHash: string;
  role: string;
}

const MOCK_DB_USERS: DbUser[] = [
  {
    id: '1',
    email: 'owner@example.com',
    name: 'Ahmed Khan',
    shopName: 'Example Shop',
    phone: '03001234567',
    city: 'Lahore',
    // bcryptjs hash of "password123"
    passwordHash: '$2b$10$pT6fQanKZY1SvW.YhkPMNeB9jf1X/NHCR40mtjT5dhst49siBqLau',
    role: 'user'
  }
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getDbUserByEmail(email: string): Promise<DbUser | null> {
  return MOCK_DB_USERS.find((u) => u.email === email) ?? null;
}

export async function getDbUserByIdentifier(identifier: string): Promise<DbUser | null> {
  const isPhone = /^03\d{9}$/.test(identifier);
  return (
    MOCK_DB_USERS.find((u) => (isPhone ? u.phone === identifier : u.email === identifier)) ?? null
  );
}

export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  const user = await getDbUserByEmail(email);
  if (!user) return null;
  const { passwordHash: _h, role: _r, ...profile } = user;
  return profile;
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return compare(plain, hash);
}

export async function signUp(values: SignUpFormValues): Promise<AuthUser> {
  await delay(800);
  const user: AuthUser = {
    id: `user_${Date.now()}`,
    email: values.email,
    name: values.ownerName,
    shopName: values.shopName,
    phone: values.phone,
    city: values.city
  };
  MOCK_DB_USERS.push({ ...user, passwordHash: '', role: 'user' });
  return user;
}

export async function sendResetEmail(_email: string): Promise<void> {
  await delay(600);
}

export async function resetPassword(_newPassword: string): Promise<void> {
  await delay(600);
}
