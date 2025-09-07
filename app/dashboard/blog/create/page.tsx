'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import { dashboardService } from '@/lib/services/dashboardService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { ArrowLeft, Save, X, Image as ImageIcon } from 'lucide-react';

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'DRAFT',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('Please enter content');
      return;
    }

    setIsLoading(true);
    try {
      const blogFormData = new FormData();
      blogFormData.append('title', formData.title);
      blogFormData.append('content', formData.content);
      blogFormData.append('status', formData.status);
      if (selectedImage) {
        blogFormData.append('image', selectedImage);
      }

      await dashboardService.createBlog({
        title: formData.title,
        content: formData.content,
        status: formData.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
        image: selectedImage ?? undefined,
      });
      
      toast.success('Blog post created successfully!');
      router.push('/dashboard/blog');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to create blog post');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/blog">
            <Button variant="outline" size="sm" className="border-input hover:bg-accent">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blogs
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Blog Post</h1>
            <p className="mt-2 text-muted-foreground">
              Write and publish a new blog post for your audience.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Blog Title *
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your blog post title"
              required
              className="w-full border-input focus:ring-ring"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Featured Image
            </label>
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <label htmlFor="image" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-foreground">
                        Upload an image
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </span>
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-foreground mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post content here..."
              required
              rows={15}
              className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              {formData.content.length} characters
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-border gap-4">
            <Link href="/dashboard/blog">
              <Button variant="outline" type="button" className="border-input hover:bg-accent">
                Cancel
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Create Blog Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-primary/10 rounded-lg p-6"
      >
        <h3 className="text-lg font-medium text-primary mb-3">Writing Tips</h3>
        <ul className="space-y-2 text-sm text-primary">
          <li>• Write a compelling title that grabs attention</li>
          <li>• Use clear, concise language</li>
          <li>• Break up content with paragraphs and headings</li>
          <li>• Include relevant images to enhance your post</li>
          <li>• Save as draft first, then publish when ready</li>
        </ul>
      </motion.div>
    </div>
  );
}