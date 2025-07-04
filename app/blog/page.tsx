'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, User, ThumbsUp, Heart } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BlogPage() {
  const [reactions, setReactions] = useState<{ [key: string]: { likes: number; loves: number } }>(
    blogPosts.reduce((acc, post) => ({ ...acc, [post.id]: { likes: 0, loves: 0 } }), {})
  );

  const handleReaction = (postId: string, type: 'like' | 'love') => {
    setReactions((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [type === 'like' ? 'likes' : 'loves']: prev[postId][type === 'like' ? 'likes' : 'loves'] + 1,
      },
    }));
  };

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
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
                        src={`https://images.unsplash.com/photo-${1600000000 + index}?w=600&h=400&fit=crop`}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-black/60 dark:text-white/60 mb-3 space-x-4">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1 text-black/60 dark:text-white/60" />
                        {new Date(post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-black/60 dark:text-white/60" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-black/60 dark:text-white/60 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-black/60 dark:text-white/60" />
                        <span className="text-sm text-black/60 dark:text-white/60">{post.author}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReaction(post.id, 'like')}
                        >
                          <ThumbsUp size={16} className="mr-1 text-black/60 dark:text-white/60" />
                          {reactions[post.id].likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReaction(post.id, 'love')}
                        >
                          <Heart size={16} className="mr-1 text-black/60 dark:text-white/60" />
                          {reactions[post.id].loves}
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
            Share your ideas with us and let’s create something extraordinary together.
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