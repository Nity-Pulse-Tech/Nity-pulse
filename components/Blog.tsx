'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  image_url?: string; // Added to match backend
  created: string;
  status: string;
  author: string;
  category?: string;
  read_time?: string;
}

interface BlogProps {
  blogs: BlogPost[];
}

export default function Blog({ blogs }: BlogProps) {
  if (!blogs || blogs.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600 mb-8">No blog posts available at the moment.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest insights, tutorials, and industry trends.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || post.image_url || '/fallback-image.jpg'} // Prioritize image, then image_url
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-2" />
                    {new Date(post.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <CardTitle className="text-xl mb-3 line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="mb-4 line-clamp-3">
                    {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                  </CardDescription>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Read More
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <Button size="lg">
              View All Posts
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}