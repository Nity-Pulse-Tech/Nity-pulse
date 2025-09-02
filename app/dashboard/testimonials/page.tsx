'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import { dashboardService } from '@/lib/services/dashboardService';
import { Testimonial } from '@/lib/types/dashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MessageSquare,
  Filter,
  User,
  Quote
} from 'lucide-react';
import { isAxiosError } from '@/utils/errorUtils';

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    filterTestimonials();
  }, [testimonials, searchTerm, statusFilter]);

  const loadTestimonials = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardService.getAllTestimonials();
      setTestimonials(data);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.message || 'Failed to load testimonials');
      } else {
        toast.error('Failed to load testimonials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filterTestimonials = () => {
    let filtered = testimonials;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(testimonial =>
        testimonial.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(testimonial => testimonial.status === statusFilter);
    }

    setFilteredTestimonials(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      await dashboardService.deleteTestimonial(id);
      toast.success('Testimonial deleted successfully');
      loadTestimonials(); // Reload the list
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.message || 'Failed to delete testimonial');
      } else {
        toast.error('Failed to delete testimonial');
      }
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
          <p className="mt-2 text-gray-600">
            Manage customer testimonials and reviews to build trust with your audience.
          </p>
        </div>
        <Link href="/dashboard/testimonials/create">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus size={20} className="mr-2" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center bg-gray-50 rounded-md p-3">
            <MessageSquare className="text-gray-600 mr-2" size={20} />
            <span className="text-sm text-gray-600">
              {filteredTestimonials.length} of {testimonials.length} testimonials
            </span>
          </div>
        </div>
      </motion.div>

      {/* Testimonials List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
        </div>

        {filteredTestimonials.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No testimonials found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'ALL' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first testimonial.'
              }
            </p>
            {!searchTerm && statusFilter === 'ALL' && (
              <div className="mt-6">
                <Link href="/dashboard/testimonials/create">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus size={20} className="mr-2" />
                    Add Testimonial
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <User className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {testimonial.author_name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(testimonial.status)}`}>
                            {testimonial.status}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatDate(testimonial.created)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative bg-gray-50 rounded-lg p-4">
                      <Quote className="absolute top-2 left-2 text-gray-300" size={16} />
                      <p className="text-gray-700 pl-6">
                        {testimonial.content.length > 200 
                          ? `${testimonial.content.substring(0, 200)}...` 
                          : testimonial.content
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Link href={`/dashboard/testimonials/${testimonial.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                    </Link>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}