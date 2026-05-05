import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      shopName?: string;
    } & DefaultSession['user'];
  }

  interface User {
    role?: string;
    shopName?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    shopName?: string;
  }
}
