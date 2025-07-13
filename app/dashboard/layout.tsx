'use client';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/globals.css';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isAdmin') !== 'true') {
      router.push('/login');
    }
    // Set initial theme
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('theme') === 'dark';
      setDark(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [router]);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newDark);
    }
  };

  return (
    <div className="flex min-h-screen bg-background dark:bg-black transition-colors">
      <aside className="w-64 bg-sidebar dark:bg-sidebar border-r border-sidebar-border flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-sidebar-foreground dark:text-sidebar-foreground">Admin Dashboard</h2>
        <nav className="flex flex-col gap-4 mb-8">
          <Link href="/dashboard/blog" className="hover:text-primary">Blog Management</Link>
          <Link href="/dashboard/projects" className="hover:text-primary">Projects Management</Link>
          <hr className="my-4 border-sidebar-border" />
          <Link href="/" className="hover:text-primary text-sm">&larr; Back to site</Link>
        </nav>
        <button
          onClick={toggleTheme}
          className="mt-auto py-2 px-4 rounded bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground border border-border hover:bg-accent dark:hover:bg-accent transition-colors"
        >
          {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </aside>
      <main className="flex-1 bg-background dark:bg-black p-8 transition-colors">{children}</main>
    </div>
  );
} 