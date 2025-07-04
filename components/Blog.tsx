'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, User, ThumbsUp, Heart } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Blog = () => {
  const featuredPosts = blogPosts.slice(0, 3);
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
    <motion.section
      id="blog"
      className="py-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">Tech Trends & Insights</h2>
          <p className="text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto leading-relaxed">
            Dive into the latest innovations, design trends, and collaborative tech stories shaping the future.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={`https://images.unsplash.com/photo-${1600000000 + index}?w=600&h=400&fit=crop`}
                      alt={post.title}
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
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/blog">
            <Button size="lg" className="btn-primary">
              View All Articles
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Blog;