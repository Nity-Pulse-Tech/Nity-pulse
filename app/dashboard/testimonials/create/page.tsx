'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { dashboardService } from '@/lib/services/dashboardService';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Star } from 'lucide-react';
import Link from 'next/link';

export default function CreateTestimonialPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    author_name: '',  // Changed from 'name' to 'author_name'
    position: '',
    company: '',
    content: '',
    rating: 5,
    status: 'DRAFT',  // Added status field
    image: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
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
      const formDataToSend = new FormData();
      formDataToSend.append('author_name', formData.author_name);  // Changed from 'name'
      formDataToSend.append('position', formData.position);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('rating', formData.rating.toString());
      formDataToSend.append('status', formData.status);  // Added status
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await dashboardService.createTestimonial(formDataToSend);
      toast.success('Testimonial created successfully!');
      router.push('/dashboard/testimonials');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create testimonial');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/testimonials">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Back to Testimonials
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create Testimonial</h1>
            <p className="text-gray-600">Add a new testimonial to showcase client feedback</p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gzrid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <Input
                name="author_name"  // Changed from 'name'
                value={formData.author_name}
                onChange={handleInputChange}
                placeholder="Client name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <Input
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="CEO, Manager, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company
              </label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className={`p-1 rounded ${
                      star <= formData.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    } hover:text-yellow-400 transition-colors`}
                  >
                    <Star size={20} fill={star <= formData.rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {formData.rating} out of 5
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Content *
              </label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write the testimonial content here..."
                rows={4}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Image (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500">
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
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link href="/dashboard/testimonials">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
    {isLoading ? (
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
    ) : (
      <>
        <Save size={16} className="mr-2" />
        Create Testimonial
      </>
    )}
  </Button>

          </div>
        </form>
      </motion.div>
    </div>
  );
}