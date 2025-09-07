'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { dashboardService } from '@/lib/services/dashboardService';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import Link from 'next/link';
import { isAxiosError } from '@/utils/errorUtils';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function CreatePortfolioPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    link: '',
    github_url: '',
    image: null as File | null,
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('technologies', formData.technologies);
      formDataToSend.append('project_url', formData.link);
      formDataToSend.append('github_url', formData.github_url);
      formDataToSend.append('status', formData.status);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await dashboardService.createPortfolio(formDataToSend);
      toast.success('Portfolio item created successfully!');
      router.push('/dashboard/portfolio');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.message || 'Failed to create portfolio item');
      } else {
        toast.error('Failed to create portfolio item');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Creating portfolio...</p>
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
            <h1 className="text-2xl font-bold text-foreground">Create Portfolio Item</h1>
            <p className="text-muted-foreground">Add a new project to your portfolio</p>
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
                Project URL
              </label>
              <Input
                name="link"
                type="url"
                value={formData.link}
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
                  Create Portfolio Item
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
