'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { dashboardService } from '@/lib/services/dashboardService';
import { DashboardStats, Blog, Portfolio, ContactMessage } from '@/lib/types/dashboard';
import { FileText, Briefcase, MessageSquare, Mail } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [recentPortfolios, setRecentPortfolios] = useState<Portfolio[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [dashboardStats, blogs, portfolios, messages] = await Promise.all([
        dashboardService.getDashboardStats(),
        dashboardService.getAllBlogs(),
        dashboardService.getAllPortfolios(),
        dashboardService.getAllContactMessages(),
      ]);

      setStats(dashboardStats);
      setRecentBlogs(blogs.slice(0, 5));
      setRecentPortfolios(portfolios.slice(0, 5));
      setRecentMessages(messages.slice(0, 5));
    } catch (error: any) {
      toast.error(error.message || 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto"
          ></motion.div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Welcome to your admin dashboard. Here's what's happening with your content.
        </p>
      </motion.div>

      {/* Stats Grid */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              title: 'Total Blogs',
              value: stats.totalBlogs,
              subValue: `${stats.publishedBlogs} published`,
              icon: FileText,
              color: 'bg-blue-100 text-blue-600',
            },
            {
              title: 'Portfolio Items',
              value: stats.totalPortfolios,
              subValue: `${stats.publishedPortfolios} published`,
              icon: Briefcase,
              color: 'bg-green-100 text-green-600',
            },
            {
              title: 'Testimonials',
              value: stats.totalTestimonials,
              subValue: `${stats.publishedTestimonials} published`,
              icon: MessageSquare,
              color: 'bg-purple-100 text-purple-600',
            },
            {
              title: 'Messages',
              value: stats.totalMessages,
              subValue: 'New inquiries',
              icon: Mail,
              color: 'bg-orange-100 text-orange-600',
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subValue}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h2>
          </div>
          <div className="p-6">
            {recentBlogs.length > 0 ? (
              <div className="space-y-4">
                {recentBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/dashboard/blog/${blog.id}`}
                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {blog.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {formatDate(blog.created)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(blog.status)}`}>
                          {blog.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No blog posts yet</p>
            )}
          </div>
        </motion.div>

        {/* Recent Portfolio Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Portfolio Items</h2>
          </div>
          <div className="p-6">
            {recentPortfolios.length > 0 ? (
              <div className="space-y-4">
                {recentPortfolios.map((portfolio) => (
                  <Link
                    key={portfolio.id}
                    href={`/dashboard/portfolio/${portfolio.id}`}
                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {portfolio.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {formatDate(portfolio.created)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(portfolio.status)}`}>
                          {portfolio.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No portfolio items yet</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Messages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
        </div>
        <div className="p-6">
          {recentMessages.length > 0 ? (
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <Link
                  key={message.id}
                  href={`/dashboard/messages/${message.id}`}
                  className="block border-b border-gray-100 pb-4 last:border-b-0 hover:bg-gray-50 p-2 rounded-md transition-colors"
                >
                  <h3 className="text-sm font-medium text-gray-900">
                    {message.name} - {message.subject}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.email} • {formatDate(message.created)}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {message.message}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No messages yet</p>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              href: '/dashboard/blog/create',
              title: 'Create Blog Post',
              description: 'Write a new blog post',
              icon: FileText,
              color: 'text-blue-600',
            },
            {
              href: '/dashboard/portfolio/create',
              title: 'Add Portfolio Item',
              description: 'Showcase your work',
              icon: Briefcase,
              color: 'text-green-600',
            },
            {
              href: '/dashboard/testimonials/create',
              title: 'Add Testimonial',
              description: 'Manage testimonials',
              icon: MessageSquare,
              color: 'text-purple-600',
            },
          ].map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all"
            >
              <action.icon className={`h-6 w-6 ${action.color} mr-3`} />
              <div>
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}