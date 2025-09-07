'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Briefcase, MessageSquare, Mail, LogOut, X, Settings } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Blog Posts', href: '/dashboard/blog', icon: FileText },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Briefcase },
  { name: 'Testimonials', href: '/dashboard/testimonials', icon: MessageSquare },
  { name: 'Messages', href: '/dashboard/messages', icon: Mail },
  { name: 'Company Settings', href: '/dashboard/company-settings', icon: Settings },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <h1 className="text-xl font-bold text-black dark:text-white">Nity Pulse</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-black/60 dark:text-white/60 hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X size={20} />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-secondary text-secondary-foreground'
                      : 'text-black/60 dark:text-white/60 hover:bg-gray-100 hover:text-black dark:hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground text-sm font-medium">
                {user?.first_name?.charAt(0) || 'A'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-black dark:text-white">{user?.first_name || 'Admin'}</p>
              <p className="text-xs text-black/60 dark:text-white/60">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full text-red-600 border-red-600 hover:bg-red-50"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}