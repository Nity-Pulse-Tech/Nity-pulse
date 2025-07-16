'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, User, ThumbsUp, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { publicApi, authApi } from '@/lib/api';
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reactions, setReactions] = useState<{ [key: string]: { likes: number; loves: number } }>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    const fetchBlogs = async () => {
      try {
        const response = await publicApi.get('/api/core/blog/');
        setBlogs(response.data);
        const initialReactions = response.data.reduce(
          (acc: { [key: string]: { likes: number; loves: number } }, post: BlogPost) => ({
            ...acc,
            [post.id]: { likes: 0, loves: 0 }
          }),
          {}
        );        
        setReactions(initialReactions);
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.error('Error fetching blogs:', error.message);
        } else {
          console.error('Unknown error fetching blogs:', error);
        }
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleReaction = async (postId: string, type: 'like' | 'love') => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    try {
      await authApi.post('/api/core/like/', {
        blog: postId,
        reaction_type: type.toUpperCase()
      });

      setReactions((prev) => ({
        ...prev,
        [postId]: {
          ...prev[postId],
          [type === 'like' ? 'likes' : 'loves']: prev[postId][type === 'like' ? 'likes' : 'loves'] + 1,
        },
      }));
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error sending reaction:', error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
      } else {
        console.error('Unknown error sending reaction:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.section
        className="pt-32 pb-16 gradient-primary text-primary-foreground relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Nity Pulse Insights</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Explore the latest trends, tech innovations, and collaborative stories shaping the future.
          </p>
        </div>
      </motion.section>

      <motion.section
        className="py-20 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-6">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-4 text-gray-600">No blogs available</h3>
              <p className="text-gray-500">Check back later for new content!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogs.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group card hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={post.image || `https://images.unsplash.com/photo-${1600000000 + index}?w=600&h=400&fit=crop`}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {post.category || 'Blog'}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center text-sm text-black/60 dark:text-white/60 mb-3 space-x-4">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-black/60 dark:text-white/60" />
                          {new Date(post.created).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1 text-black/60 dark:text-white/60" />
                          {post.read_time || '5 min read'}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-black/60 dark:text-white/60 mb-4 line-clamp-3">
                        {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <User size={16} className="mr-2 text-black/60 dark:text-white/60" />
                          <span className="text-sm text-black/60 dark:text-white/60">
                            {post.author || 'Nity Pulse'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReaction(post.id, 'like')}
                            title={!isAuthenticated ? 'Login to like' : 'Like this post'}
                          >
                            <ThumbsUp size={16} className="mr-1 text-black/60 dark:text-white/60" />
                            {reactions[post.id]?.likes || 0}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReaction(post.id, 'love')}
                            title={!isAuthenticated ? 'Login to love' : 'Love this post'}
                          >
                            <Heart size={16} className="mr-1 text-black/60 dark:text-white/60" />
                            {reactions[post.id]?.loves || 0}
                          </Button>
                        </div>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        >
                          Read More
                          <ArrowRight size={16} className="ml-2 text-black/60 dark:text-white/60" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.section>

      <motion.section
        className="py-20 gradient-primary text-primary-foreground"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Want to Collaborate?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Share your ideas with us and let&apos;s create something extraordinary together.
          </p>


          <Link href="/#contact">
            <Button size="lg" className="btn-secondary">
              Get in Touch
              <ArrowRight size={20} className="ml-2 text-white" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}