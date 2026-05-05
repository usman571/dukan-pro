import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getDbUserByEmail, verifyPassword } from '@/features/auth/api/service';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await getDbUserByEmail(parsed.data.email);
        if (!user) return null;

        const match = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!match) return null;

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? 'user';
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    }
  },
  pages: {
    signIn: '/auth/sign-in'
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
