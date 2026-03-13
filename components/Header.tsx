'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, User, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: '/#home', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/#services', label: 'Services' },
    { href: '/#projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Sidebar animation variants
  const sidebarVariants: Variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // Overlay animation variants
  const overlayVariants: Variants = {
    open: { opacity: 0.5, transition: { duration: 0.3 } },
    closed: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Check if a link is active
  const isLinkActive = (href: string) => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (href === '/#home') {
      return pathname === '/' || pathname + hash === '/#home';
    }
    return pathname === href || (href.includes('#') && pathname === '/' && pathname + hash === href);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full bg-background shadow-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center h-12">
          <Image
            src="/logo_sans_fond.png"
            alt="Nity Pulse Logo"
            width={120}
            height={100}
            className="max-h-40 w-auto object-contain dark:hidden"
            priority
          />
          <Image
            src="/logo_sans_fond.png"
            alt="Nity Pulse Logo"
            width={120}
            height={100}
            className="max-h-40 w-auto object-contain hidden dark:block"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors ${
                isLinkActive(item.href) ? 'text-primary font-semibold border-b-2 border-primary' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && user?.is_admin && (
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className={`text-primary border-primary hover:bg-primary hover:text-white ${
                  pathname === '/dashboard' ? 'bg-primary text-white' : ''
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          )}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Hi, {user?.first_name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-1" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-900 dark:text-gray-100 hover:text-primary"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-900 dark:text-gray-100 hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.nav
              className="fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-50 lg:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
            >
              <div className="px-6 py-4 flex flex-col space-y-4 h-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Menu
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-900 dark:text-gray-100 hover:text-primary"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors ${
                      isLinkActive(item.href) ? 'text-primary font-semibold border-l-4 border-primary pl-2' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {isAuthenticated && user?.is_admin && (
                  <Link
                    href="/dashboard"
                    className={`text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-primary transition-colors flex items-center ${
                      pathname === '/dashboard' ? 'text-primary font-semibold border-l-4 border-primary pl-2' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                )}
                <div className="border-t border-border pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Welcome, {user?.first_name}!
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full justify-start"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-gray-900 dark:text-gray-100 hover:text-primary"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-primary border-primary hover:bg-primary hover:text-white"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-900 dark:text-gray-100 hover:text-primary"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;