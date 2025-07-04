'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, User, Heart } from 'lucide-react';
import { blogPosts } from '@/data/blogData';
import Link from 'next/link';
import { motion } from 'framer-motion';

const BlogPost = ({ params }: { params: { id: string } }) => {
  const post = blogPosts.find((p) => p.id === params.id);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<{ id: string; author: string; content: string; replies?: { id: string; author: string; content: string }[] }[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  if (!post) return <div>Post not found</div>;

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center text-sm text-foreground/60 mb-4 space-x-4">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(post.publishDate).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              {post.author}
            </div>
          </div>
          <img
            src={`https://images.unsplash.com/photo-${1600000000 + parseInt(post.id)}?w=800&h=400&fit=crop`}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <p className="text-lg text-foreground/80">{post.content || post.excerpt}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleLike}
          >
            <Heart size={16} className="mr-2" /> Like ({likes})
          </Button>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-4 border rounded-lg"
            />
            <div className="flex gap-4 mt-4">
              <Button onClick={handleCommentSubmit}>Post Comment</Button>
              {replyTo && <Button variant="outline" onClick={() => setReplyTo(null)}>Cancel Reply</Button>}
            </div>
          </div>
          {comments.map((comment) => (
            <Card key={comment.id} className="mb-4">
              <CardContent className="p-4">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-foreground/80">{comment.content}</p>
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={() => setReplyTo(comment.id)}
                >
                  Reply
                </Button>
                {comment.replies?.map((reply) => (
                  <div key={reply.id} className="ml-6 mt-2 border-l-2 pl-4">
                    <p className="font-semibold">{reply.author}</p>
                    <p className="text-foreground/80">{reply.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogPost;