'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Menu } from 'lucide-react';
import Sidebar from './_components/Sidebar';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push('/login');
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Compact dashboard-specific header */}
        <header className="bg-card shadow-sm border-b border-border px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-md border border-border bg-gray-100 text-black/60 dark:text-white/60 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
                <span className="sr-only">Open sidebar</span>
              </button>
              <h1 className="text-lg font-semibold text-black dark:text-white hidden lg:block">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-black/60 dark:text-white/60">
                {user.first_name}
              </span>
              <span className="text-sm font-medium text-secondary">
                {user.email}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}