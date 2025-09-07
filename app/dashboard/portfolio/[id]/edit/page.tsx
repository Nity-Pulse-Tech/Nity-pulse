
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { dashboardService } from '@/lib/services/dashboardService';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import Link from 'next/link';
import { isAxiosError } from '@/utils/errorUtils';
import type { PortfolioStatus } from '@/lib/types/dashboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const portfolioId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    project_url: '',
    github_url: '',
    status: 'DRAFT' as PortfolioStatus,
    image: null as File | null,
  });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const portfolio = await dashboardService.getPortfolio(portfolioId);
        setFormData({
          title: portfolio.title,
          description: portfolio.description,
          technologies: portfolio.technologies || '',
          project_url: portfolio.project_url || '',
          github_url: portfolio.github_url || '',
          status: portfolio.status,
          image: null,
        });
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          toast.error(error.message || 'Failed to fetch portfolio');
        } else {
          toast.error('Failed to fetch portfolio');
        }
        router.push('/dashboard/portfolio');
      } finally {
        setIsFetching(false);
      }
    };

    if (portfolioId) {
      fetchPortfolio();
    }
  }, [portfolioId, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies,
        project_url: formData.project_url,
        github_url: formData.github_url,
        status: formData.status as PortfolioStatus,
      };

      if (formData.image) {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('technologies', formData.technologies);
        formDataToSend.append('project_url', formData.project_url);
        formDataToSend.append('github_url', formData.github_url);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('image', formData.image);
        
        await dashboardService.updatePortfolio(portfolioId, formDataToSend);
      } else {
        await dashboardService.updatePortfolio(portfolioId, updateData);
      }

      toast.success('Portfolio updated successfully!');
      router.push('/dashboard/portfolio');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.message || 'Failed to update portfolio');
      } else {
        toast.error('Failed to update portfolio');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/portfolio">
            <Button variant="outline" size="sm" className="border-input hover:bg-accent">
              <ArrowLeft size={16} className="mr-2" />
              Back to Portfolio
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Portfolio Item</h1>
            <p className="text-muted-foreground">Update your portfolio project details</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Title *
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Project title"
                required
                className="border-input focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Project description"
                rows={4}
                required
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Technologies
              </label>
              <Input
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="React, Node.js, MongoDB"
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project URL
              </label>
              <Input
                name="project_url"
                type="url"
                value={formData.project_url}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                GitHub URL
              </label>
              <Input
                name="github_url"
                type="url"
                value={formData.github_url}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
                className="border-input focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label className="relative cursor-pointer bg-card rounded-md font-medium text-primary hover:text-primary/90">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-x-4 pt-6 border-t border-border gap-4">
            <Link href="/dashboard/portfolio">
              <Button type="button" variant="outline" className="border-input hover:bg-accent">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Update Portfolio Item
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
