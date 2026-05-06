import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Dukaan Pro',
  description: 'Manage your shop',
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className='pb-16 md:pb-0 w-full'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
      <BottomNav />
    </KBar>
  );
}
