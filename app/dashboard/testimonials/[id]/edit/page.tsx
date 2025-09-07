
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { dashboardService } from '@/lib/services/dashboardService';
import { UpdateTestimonialData } from '@/lib/types/dashboard';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Save, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { isAxiosError } from '@/utils/errorUtils';
import type { ErrorResponseData } from '@/lib/types/error';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const testimonialId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    position: '',
    company: '',
    rating: 5,
    status: 'DRAFT' as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
    image: null as File | null,
  });

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const testimonial = await dashboardService.getTestimonial(testimonialId);
        setFormData({
          name: testimonial.author_name,
          content: testimonial.content,
          position: testimonial.position || '',
          company: testimonial.company || '',
          rating: testimonial.rating,
          status: testimonial.status,
          image: null,
        });
        if (testimonial.image) {
          setImagePreview(testimonial.image);
        }
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          toast.error(error.message || 'Failed to fetch testimonial');
        } else {
          toast.error('Failed to fetch testimonial');
        }
        router.push('/dashboard/testimonials');
      } finally {
        setIsFetching(false);
      }
    };

    if (testimonialId) {
      fetchTestimonial();
    }
  }, [testimonialId, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    if (rating >= 1 && rating <= 5) {
      setFormData((prev) => ({ ...prev, rating }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (formData.rating < 1 || formData.rating > 5) {
      toast.error('Rating must be between 1 and 5.');
      return;
    }

    setIsLoading(true);
    try {
      if (formData.image) {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('position', formData.position);
        formDataToSend.append('company', formData.company);
        formDataToSend.append('rating', formData.rating.toString());
        formDataToSend.append('status', formData.status);
        formDataToSend.append('image', formData.image);
        await dashboardService.updateTestimonial(testimonialId, formDataToSend);
      } else {
        const updateData: UpdateTestimonialData = {
          name: formData.name,
          content: formData.content,
          position: formData.position,
          company: formData.company,
          rating: formData.rating,
          status: formData.status,
          image: null,
        };
        await dashboardService.updateTestimonial(testimonialId, updateData);
      }

      toast.success('Testimonial updated successfully!');
      router.push('/dashboard/testimonials');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        const data = error.response?.data as ErrorResponseData | undefined;
        const rawErrorMessage =
          error.response?.status === 401
            ? 'Authentication failed. Please log in again.'
            : data?.message ||
              data?.non_field_errors?.[0] ||
              Object.values(data || {})[0] ||
              'Failed to update testimonial';
        const errorMessage =
          typeof rawErrorMessage === 'string' ? rawErrorMessage : JSON.stringify(rawErrorMessage);
        toast.error(errorMessage);
      } else {
        toast.error('Failed to update testimonial');
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
          <p className="mt-4 text-muted-foreground">Loading testimonial...</p>
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
          <Link href="/dashboard/testimonials">
            <Button variant="outline" size="sm" className="border-input hover:bg-accent">
              <ArrowLeft size={16} className="mr-2" />
              Back to Testimonials
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Testimonial</h1>
            <p className="text-muted-foreground">Update the testimonial content and settings</p>
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
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Client name"
                required
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Position
              </label>
              <Input
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="CEO, Manager, etc."
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company
              </label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company name"
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rating *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`p-1 rounded ${
                      star <= formData.rating ? 'text-secondary' : 'text-muted-foreground'
                    } hover:text-secondary transition-colors`}
                  >
                    <Star size={20} fill={star <= formData.rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
                <span className="text-sm text-muted-foreground ml-2">{formData.rating} out of 5</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Testimonial Content *
              </label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write the testimonial content here..."
                rows={4}
                required
                className="border-input focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Profile Image (Optional)
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
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-foreground mb-2">Image Preview</p>
                  <Image
                    src={imagePreview}
                    alt="Selected image preview"
                    width={200}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-x-4 pt-6 border-t border-border gap-4">
            <Link href="/dashboard/testimonials">
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
                  Update Testimonial
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}