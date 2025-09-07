'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isAxiosError } from '@/utils/errorUtils';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login } = useAuth();
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState('/');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect') || '/';
    setRedirectTo(redirect);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(formData);
      toast.success('Login successful!');
      router.push(redirectTo);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.message || 'Login failed');
      } else {
        toast.error('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-black/60 dark:text-white/60">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="w-full bg-card text-black dark:text-white border-border"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white mb-2">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                className="w-full bg-card text-black dark:text-white border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-secondary"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-black/60 dark:text-white/60">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-secondary hover:text-secondary/90 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-black/60 dark:text-white/60 hover:text-secondary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}