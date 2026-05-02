'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ActiveThemeProvider } from '../themes/active-theme';
import QueryProvider from './query-provider';

export default function Providers({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <QueryProvider>{children}</QueryProvider>
      </ActiveThemeProvider>
    </SessionProvider>
  );
}
