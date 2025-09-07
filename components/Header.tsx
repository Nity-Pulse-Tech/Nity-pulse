'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, User, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

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

  return (
    <motion.header
      className="fixed top-0 left-0 w-full bg-background z-50 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center h-12 mt-2"> 
          {/* Light theme logo */}
          <Image
            src="/logo_sans_fond.png"
            alt="Nity Pulse Logo Dark"
            width={120}
            height={100}
            className="max-h-40 w-auto block dark:hidden object-contain"
          />

          {/* Dark theme logo */}
          <Image
            src="/logo_sans_fond.png"
            alt="Nity Pulse Logo Light"
            width={120}
            height={120}
            className="max-h-40 w-auto hidden dark:block object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-black dark:text-white hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          
          {/* Dashboard button for admin users */}
          {isAuthenticated && user?.is_admin && (
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-white">
                <Settings size={16} className="mr-2" />
                Dashboard
              </Button>
            </Link>
          )}

          {/* Authentication buttons */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Hi, {user?.first_name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <User size={16} className="mr-1" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-black dark:text-white hover:text-primary"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-black dark:text-white hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {isMenuOpen && (
        <motion.nav
          className="lg:hidden bg-background border-t border-border"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-black dark:text-white hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Dashboard link for admin users */}
            {isAuthenticated && user?.is_admin && (
              <Link
                href="/dashboard"
                className="text-black dark:text-white hover:text-primary transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings size={16} className="mr-2" />
                Dashboard
              </Link>
            )}

            {/* Authentication section */}
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
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <User size={16} className="mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start text-primary border-primary hover:bg-primary hover:text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-black dark:text-white hover:text-primary"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Header;