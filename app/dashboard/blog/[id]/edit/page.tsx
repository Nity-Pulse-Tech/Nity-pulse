'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { UpdateBlogData } from '@/lib/types/dashboard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { dashboardService } from '@/lib/services/dashboardService';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import Link from 'next/link';
import { isAxiosError } from '@/utils/errorUtils';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'DRAFT',
    image: null as File | null,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await dashboardService.getBlog(blogId);
        setFormData({
          title: blog.title,
          content: blog.content,
          status: blog.status,
          image: null,
        });
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          toast.error(error.message || 'Failed to fetch blog');
        } else {
          toast.error('Failed to fetch blog');
        }
        router.push('/dashboard/blog');
      } finally {
        setIsFetching(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId, router]);

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
    setIsLoading(true);

    try {
      if (formData.image) {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('image', formData.image);
        await dashboardService.updateBlog(blogId, formDataToSend);
      } else {
        const updateData: UpdateBlogData = {
          title: formData.title,
          content: formData.content,
          status: formData.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
          image: null,
        };
        await dashboardService.updateBlog(blogId, updateData);
      }

      toast.success('Blog updated successfully!');
      router.push('/dashboard/blog');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.message || 'Failed to update blog');
      } else {
        toast.error('Failed to update blog');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading blog...</p>
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
          <Link href="/dashboard/blog">
            <Button variant="outline" size="sm" className="border-input hover:bg-accent">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blogs
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Blog Post</h1>
            <p className="text-muted-foreground">Update your blog post content and settings</p>
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
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title *
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Blog post title"
              required
              className="border-input focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Content *
            </label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post content here..."
              rows={10}
              required
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
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Featured Image (Optional)
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

          <div className="flex flex-col sm:flex-row sm:justify-end space-x-4 pt-6 border-t border-border gap-4">
            <Link href="/dashboard/blog">
              <Button type="button" variant="outline" className="border-input hover:bg-accent">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Update Blog Post
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}