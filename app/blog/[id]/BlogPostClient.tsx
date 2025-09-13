'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

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

interface BlogPostClientProps {
  post: BlogPost | null;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<
    { id: string; author: string; content: string; replies?: { id: string; author: string; content: string }[] }[]
  >([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  if (!post) {
    return <div className="text-black dark:text-white">Post not found</div>;
  }

  const handleLike = () => setLikes(likes + 1);

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    const comment = { id: Date.now().toString(), author: 'Anonymous', content: newComment, replies: [] };
    if (replyTo) {
      setComments(
        comments.map((c) =>
          c.id === replyTo ? { ...c, replies: [...(c.replies || []), { ...comment, id: `${comment.id}-reply` }] } : c
        )
      );
    } else {
      setComments([...comments, comment]);
    }
    setNewComment('');
    setReplyTo(null);
  };

  return (
    <motion.section
      className="py-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">{post.title}</h1>
          <div className="flex items-center text-sm text-black/60 dark:text-white/60 mb-4 space-x-4">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1 text-black/60 dark:text-white/60" />
              {new Date(post.created).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1 text-black/60 dark:text-white/60" />
              {post.read_time || '5 min read'}
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-1 text-black/60 dark:text-white/60" />
              {post.author}
            </div>
          </div>

          {(post.image || post.image_url) ? (
            <Image
              src={post.image || post.image_url!} // Prioritize image, then image_url
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
              <span className="text-gray-600">No image available</span>
            </div>
          )}

          <p className="text-lg text-black/60 dark:text-white/60">{post.content}</p>

          <Button
            variant="outline"
            className="mt-4 text-black dark:text-white border-primary/20 hover:border-primary"
            onClick={handleLike}
          >
            <Heart size={16} className="mr-2 text-black/60 dark:text-white/60" /> Like ({likes})
          </Button>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Comments</h2>
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-4 border-2 border-primary/20 rounded-lg focus:border-primary transition-colors text-black dark:text-white placeholder:text-black/60 dark:placeholder:text-white/60"
            />
            <div className="flex gap-4 mt-4">
              <Button onClick={handleCommentSubmit} className="btn-primary">
                Post Comment
              </Button>
              {replyTo && (
                <Button
                  variant="outline"
                  onClick={() => setReplyTo(null)}
                  className="text-black dark:text-white border-primary/20 hover:border-primary"
                >
                  Cancel Reply
                </Button>
              )}
            </div>
          </div>

          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="mb-4">
                <CardContent className="p-4">
                  <p className="font-semibold text-black dark:text-white">{comment.author}</p>
                  <p className="text-black/60 dark:text-white/60">{comment.content}</p>
                  <Button variant="link" className="text-primary" onClick={() => setReplyTo(comment.id)}>
                    Reply
                  </Button>
                  {comment.replies?.map((reply, replyIndex) => (
                    <motion.div
                      key={reply.id}
                      className="ml-6 mt-2 border-l-2 pl-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: replyIndex * 0.1 }}
                    >
                      <p className="font-semibold text-black dark:text-white">{reply.author}</p>
                      <p className="text-black/60 dark:text-white/60">{reply.content}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}