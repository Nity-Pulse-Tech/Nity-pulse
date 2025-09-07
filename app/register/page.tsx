'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isAxiosError } from '@/utils/errorUtils';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  });

  const { register } = useAuth();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.password_confirm) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.password_confirm) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      toast.success('Registration successful! Please log in.');
      router.push('/login');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.message || 'Registration failed');
      } else {
        toast.error('Registration failed');
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
              Create Account
            </h1>
            <p className="text-black/60 dark:text-white/60">
              Join Nity Pulse and start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-black dark:text-white mb-2">
                  First Name
                </label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                  className="w-full bg-card text-black dark:text-white border-border"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-black dark:text-white mb-2">
                  Last Name
                </label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                  className="w-full bg-card text-black dark:text-white border-border"
                />
              </div>
            </div>

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
                placeholder="john@example.com"
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

            <div>
              <label htmlFor="password_confirm" className="block text-sm font-medium text-black dark:text-white mb-2">
                Confirm Password
              </label>
              <Input
                id="password_confirm"
                name="password_confirm"
                type="password"
                value={formData.password_confirm}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
                className="w-full bg-card text-black dark:text-white border-border"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-secondary"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-black/60 dark:text-white/60">
              Already have an account?{' '}
              <Link href="/login" className="text-secondary hover:text-secondary/90 font-medium">
                Sign in
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