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
import LoadingSpinner from '@/components/common/LoadingSpinner';

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to load portfolios');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filterPortfolios = () => {
    let filtered = portfolios;

    if (searchTerm) {
      filtered = filtered.filter(portfolio =>
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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
      loadPortfolios();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to delete portfolio item');
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
        return 'bg-primary/10 text-primary';
      case 'DRAFT':
        return 'bg-secondary/10 text-secondary';
      case 'ARCHIVED':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Management</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your portfolio items, showcase your work, and track their status.
          </p>
        </div>
        <Link href="/dashboard/portfolio/create">
          <Button className="btn-primary">
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
        className="card p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search portfolios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-input focus:ring-ring"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center bg-accent rounded-md p-3">
            <Briefcase className="text-muted-foreground mr-2" size={20} />
            <span className="text-sm text-muted-foreground">
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
        className="card overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Portfolio Items</h2>
        </div>

        {filteredPortfolios.length === 0 ? (
          <div className="p-8 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-medium text-foreground">No portfolio items found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchTerm || statusFilter !== 'ALL' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first portfolio item.'
              }
            </p>
            {!searchTerm && statusFilter === 'ALL' && (
              <div className="mt-6">
                <Link href="/dashboard/portfolio/create">
                  <Button className="btn-primary">
                    <Plus size={20} className="mr-2" />
                    Add Portfolio Item
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredPortfolios.map((portfolio) => (
              <motion.div
                key={portfolio.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                {portfolio.image && (
                  <div className="aspect-video bg-accent">
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
                    <h3 className="text-lg font-medium text-foreground truncate">
                      {portfolio.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(portfolio.status)}`}>
                      {portfolio.status}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {portfolio.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
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
                      <Button variant="outline" size="sm" className="w-full border-input hover:bg-accent">
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
                        <Button variant="outline" size="sm" className="w-full border-input hover:bg-accent">
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                      </a>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(portfolio.id)}
                      className="text-destructive border-destructive hover:bg-destructive/10"
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
