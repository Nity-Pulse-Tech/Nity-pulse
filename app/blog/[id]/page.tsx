// app/blog/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { publicApi } from '@/lib/api';
import BlogPostClient from './BlogPostClient';

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

interface BlogPostProps {
  params: Promise<{ id: string }>;
}

export default function BlogPost({ params }: BlogPostProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { id } = await params;
      try {
        const response = await publicApi.get(`/api/core/blog/${id}/`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params]);

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

  return <BlogPostClient post={post} />;
}