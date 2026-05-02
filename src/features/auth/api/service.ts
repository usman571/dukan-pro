import bcrypt from 'bcryptjs';
import type { AuthUser } from './types';

// Stub user store — replace with your real database call
const MOCK_USERS: AuthUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    // bcryptjs hash of "password123"
    passwordHash: '$2b$10$pT6fQanKZY1SvW.YhkPMNeB9jf1X/NHCR40mtjT5dhst49siBqLau',
    role: 'admin'
  }
];

export async function getUserByEmail(email: string): Promise<AuthUser | null> {
  return MOCK_USERS.find((u) => u.email === email) ?? null;
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
