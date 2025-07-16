'use client';

import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { publicApi } from '@/lib/api';
import BlogPostClient from './BlogPostClient';
import { isAxiosError } from '@/utils/errorUtils';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  created: string;
  status: string;
  author: string;
  category?: string;
  read_time?: string;
}

type BlogPageProps = {
  params: { id: string };
};

const BlogPost: NextPage<BlogPageProps> = ({ params }) => {
  const { id } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await publicApi.get(`/api/core/blog/${id}/`);
        setPost(response.data);
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error('Error fetching blog post:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
          });
        } else {
          console.error('Unknown error fetching blog post:', error);
        }
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-600">
          <h2 className="text-xl font-semibold mb-2">Blog post not found</h2>
          <p>It might have been deleted or doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return <BlogPostClient post={post} />;
};

export default BlogPost;