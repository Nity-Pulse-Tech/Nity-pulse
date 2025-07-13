'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import { dashboardService } from '@/lib/services/dashboardService';
import { Portfolio } from '@/lib/types/dashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Briefcase,
  Calendar,
  Filter,
  ExternalLink
} from 'lucide-react';

export default function PortfolioManagementPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    loadPortfolios();
  }, []);

  useEffect(() => {
    filterPortfolios();
  }, [portfolios, searchTerm, statusFilter]);

  const loadPortfolios = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardService.getAllPortfolios();
      setPortfolios(data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load portfolios');
    } finally {
      setIsLoading(false);
    }
  };

  const filterPortfolios = () => {
    let filtered = portfolios;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(portfolio =>
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(portfolio => portfolio.status === statusFilter);
    }

    setFilteredPortfolios(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) {
      return;
    }

    try {
      await dashboardService.deletePortfolio(id);
      toast.success('Portfolio item deleted successfully');
      loadPortfolios(); // Reload the list
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete portfolio item');
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
          <p className="mt-4 text-gray-600">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
          <p className="mt-2 text-gray-600">
            Manage your portfolio items, showcase your work, and track their status.
          </p>
        </div>
        <Link href="/dashboard/portfolio/create">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Plus size={20} className="mr-2" />
            Add Portfolio Item
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
              placeholder="Search portfolios..."
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
            <Briefcase className="text-gray-600 mr-2" size={20} />
            <span className="text-sm text-gray-600">
              {filteredPortfolios.length} of {portfolios.length} items
            </span>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Portfolio Items</h2>
        </div>

        {filteredPortfolios.length === 0 ? (
          <div className="p-8 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No portfolio items found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'ALL' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first portfolio item.'
              }
            </p>
            {!searchTerm && statusFilter === 'ALL' && (
              <div className="mt-6">
                <Link href="/dashboard/portfolio/create">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus size={20} className="mr-2" />
                    Add Portfolio Item
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredPortfolios.map((portfolio) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                {portfolio.image && (
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={portfolio.image}
                      alt={portfolio.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {portfolio.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(portfolio.status)}`}>
                      {portfolio.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {portfolio.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(portfolio.created)}
                    </div>
                    {portfolio.link && (
                      <div className="flex items-center">
                        <ExternalLink size={14} className="mr-1" />
                        Has link
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Link href={`/dashboard/portfolio/${portfolio.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit size={14} className="mr-1" />
                        Edit
                      </Button>
                    </Link>
                    
                    {portfolio.link && (
                      <a
                        href={portfolio.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                      </a>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(portfolio.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
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