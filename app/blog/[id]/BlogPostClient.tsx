'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, Heart, ThumbsUp, Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { authApi } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { isAxiosError } from '@/utils/errorUtils';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  image_url?: string;
  created: string;
  status: string;
  author: string;
  category?: string;
  read_time?: string;
}

interface Comment {
  id: string;
  first_name: string;
  last_name: string;
  blog: string;
  content: string;
  created: string;
  modified: string;
  parent: string | null;
}

interface BlogPostClientProps {
  post: BlogPost | null;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [likes, setLikes] = useState(0);
  const [loves, setLoves] = useState(0);
  const [userReaction, setUserReaction] = useState<'LIKE' | 'LOVE' | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Get current user from localStorage
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    if (post) {
      const fetchData = async () => {
        try {
          const [reactionsResponse, commentsResponse] = await Promise.all([
            authApi.get(`/api/core/blog/${post.id}/reactions/`),
            authApi.get(`/api/core/comment/?blog_id=${post.id}`),
          ]);
          setLikes(reactionsResponse.data.likes);
          setLoves(reactionsResponse.data.loves);
          setUserReaction(reactionsResponse.data.user_reaction);
          setComments(commentsResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [post]);

  const handleReaction = async (type: 'like' | 'love') => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      const response = await authApi.post('/api/core/like/', {
        blog: post?.id,
        reaction_type: type.toUpperCase(),
      });

      setUserReaction(response.data.message === 'Reaction removed' ? null : type.toUpperCase() as 'LIKE' | 'LOVE');
      setLikes((prev) =>
        response.data.message === 'Reaction removed' && userReaction === 'LIKE'
          ? prev - 1
          : type === 'like' && userReaction !== 'LIKE'
          ? prev + 1
          : userReaction === 'LOVE' && type === 'like'
          ? prev - 1
          : prev
      );
      setLoves((prev) =>
        response.data.message === 'Reaction removed' && userReaction === 'LOVE'
          ? prev - 1
          : type === 'love' && userReaction !== 'LOVE'
          ? prev + 1
          : userReaction === 'LIKE' && type === 'love'
          ? prev - 1
          : prev
      );
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error sending reaction:', error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      } else {
        console.error('Unknown error sending reaction:', error);
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!newComment.trim()) return;

    try {
      const payload = {
        blog: post?.id,
        content: newComment,
        parent: null,
      };
      const response = await authApi.post('/api/core/comment/', payload);
      setComments((prev) => [...prev, response.data]);
      setNewComment('');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error posting comment:', error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      } else {
        console.error('Unknown error posting comment:', error);
      }
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    const content = replyContent[parentId]?.trim();
    if (!content) return;

    try {
      const payload = {
        blog: post?.id,
        content,
        parent: parentId,
      };
      const response = await authApi.post('/api/core/comment/', payload);
      setComments((prev) => [...prev, response.data]);
      setReplyContent((prev) => ({ ...prev, [parentId]: '' }));
      setReplyTo(null);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error posting reply:', error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      } else {
        console.error('Unknown error posting reply:', error);
      }
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!editContent.trim()) return;

    try {
      const response = await authApi.put(`/api/core/comment/${commentId}/`, {
        content: editContent,
        blog: post?.id,
      });
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, content: response.data.content, modified: response.data.modified } : c))
      );
      setEditingComment(null);
      setEditContent('');
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error editing comment:', error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          router.push('/login');
        } else if (error.response?.status === 403) {
          console.error('Permission denied: You can only edit your own comments');
        }
      } else {
        console.error('Unknown error editing comment:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      await authApi.delete(`/api/core/comment/${commentId}/`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error deleting comment:', error.message);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          router.push('/login');
        } else if (error.response?.status === 403) {
          console.error('Permission denied: You can only delete your own comments');
        }
      } else {
        console.error('Unknown error deleting comment:', error);
      }
    }
  };

  // Build comment tree for rendering replies
  const commentTree = comments.reduce((acc, comment) => {
    if (!comment.parent) {
      acc[comment.id] = { ...comment, replies: [] };
    } else {
      if (acc[comment.parent]) {
        acc[comment.parent].replies.push(comment);
      }
    }
    return acc;
  }, {} as { [key: string]: Comment & { replies: Comment[] } });

  if (!post) {
    return <div className="text-black dark:text-white text-center py-10">Post not found</div>;
  }

  return (
    <motion.section
      className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline text-base font-medium">
            ← Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-900 dark:text-white">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6 space-x-6">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {new Date(post.created).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              {post.read_time || '5 min read'}
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              {post.author}
            </div>
          </div>

          {(post.image || post.image_url) ? (
            <Image
              src={post.image || post.image_url!}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-80 object-cover rounded-xl mb-8 shadow-md"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-xl mb-8 flex items-center justify-center shadow-md">
              <span className="text-gray-500 dark:text-gray-400">No image available</span>
            </div>
          )}

          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>

          <div className="flex space-x-4 mt-6">
            <Button
              variant="outline"
              className={`border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 ${
                userReaction === 'LIKE' ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'
              } transition-colors disabled:opacity-50`}
              onClick={() => handleReaction('like')}
              title={!isAuthenticated ? 'Login to like' : 'Like this post'}
              disabled={userReaction === 'LOVE'}
            >
              <ThumbsUp size={16} className="mr-2" /> Like ({likes})
            </Button>
            <Button
              variant="outline"
              className={`border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-400 ${
                userReaction === 'LOVE' ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20' : 'text-gray-700 dark:text-gray-300'
              } transition-colors disabled:opacity-50`}
              onClick={() => handleReaction('love')}
              title={!isAuthenticated ? 'Login to love' : 'Love this post'}
              disabled={userReaction === 'LIKE'}
            >
              <Heart size={16} className="mr-2" /> Love ({loves})
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Comments</h2>
          {!isAuthenticated && (
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                Log in
              </Link>{' '}
              to add a comment or reply.
            </p>
          )}
          <div className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-700 transition-all text-sm"
              rows={3}
              disabled={!isAuthenticated}
            />
            <div className="flex gap-4 mt-3">
              <Button
                onClick={handleCommentSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                disabled={!isAuthenticated || !newComment.trim()}
              >
                Post Comment
              </Button>
            </div>
          </div>

          {Object.values(commentTree).map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="mb-4 bg-gray-50 dark:bg-gray-700 border-none shadow-sm">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {comment.first_name} {comment.last_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.created).toLocaleString()}
                        {comment.modified !== comment.created && ' (edited)'}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">{comment.content}</p>
                    </div>
                    {isAuthenticated && comment.first_name === user.first_name && comment.last_name === user.last_name && (
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingComment(comment.id);
                            setEditContent(comment.content);
                            setReplyTo(null);
                            setReplyContent({});
                          }}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          <Edit size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <Trash size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="link"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-2"
                    onClick={() => {
                      setReplyTo(comment.id);
                      setEditingComment(null);
                      setReplyContent((prev) => ({ ...prev, [comment.id]: '' }));
                    }}
                    disabled={!isAuthenticated}
                  >
                    Reply
                  </Button>
                  {replyTo === comment.id && (
                    <div className="mt-4">
                      <textarea
                        value={replyContent[comment.id] || ''}
                        onChange={(e) =>
                          setReplyContent((prev) => ({ ...prev, [comment.id]: e.target.value }))
                        }
                        placeholder="Write your reply..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-700 transition-all text-sm"
                        rows={3}
                        disabled={!isAuthenticated}
                      />
                      <div className="flex gap-4 mt-3">
                        <Button
                          onClick={() => handleReplySubmit(comment.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                          disabled={!isAuthenticated || !replyContent[comment.id]?.trim()}
                        >
                          Post Reply
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setReplyTo(null);
                            setReplyContent((prev) => ({ ...prev, [comment.id]: '' }));
                          }}
                          className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-sm py-2"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  {editingComment === comment.id && (
                    <div className="mt-4">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-700 transition-all text-sm"
                        rows={3}
                      />
                      <div className="flex gap-4 mt-3">
                        <Button
                          onClick={() => handleEditComment(comment.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                          disabled={!editContent.trim()}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditingComment(null);
                            setEditContent('');
                          }}
                          className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-sm py-2"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  {comment.replies?.map((reply, replyIndex) => (
                    <motion.div
                      key={reply.id}
                      className="ml-6 mt-4 border-l-2 border-gray-200 dark:border-gray-600 pl-4"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: replyIndex * 0.1 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {reply.first_name} {reply.last_name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(reply.created).toLocaleString()}
                            {reply.modified !== reply.created && ' (edited)'}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">{reply.content}</p>
                        </div>
                        {isAuthenticated && reply.first_name === user.first_name && reply.last_name === user.last_name && (
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingComment(reply.id);
                                setEditContent(reply.content);
                                setReplyTo(null);
                                setReplyContent({});
                              }}
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            >
                              <Edit size= {14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteComment(reply.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                        )}
                      </div>
                      {replyTo === reply.id && (
                        <div className="mt-4">
                          <textarea
                            value={replyContent[reply.id] || ''}
                            onChange={(e) =>
                              setReplyContent((prev) => ({ ...prev, [reply.id]: e.target.value }))
                            }
                            placeholder="Write your reply..."
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-700 transition-all text-sm"
                            rows={3}
                            disabled={!isAuthenticated}
                          />
                          <div className="flex gap-4 mt-3">
                            <Button
                              onClick={() => handleReplySubmit(reply.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                              disabled={!isAuthenticated || !replyContent[reply.id]?.trim()}
                            >
                              Post Reply
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setReplyTo(null);
                                setReplyContent((prev) => ({ ...prev, [reply.id]: '' }));
                              }}
                              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-sm py-2"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      {editingComment === reply.id && (
                        <div className="mt-4">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-gray-100 dark:bg-gray-700 transition-all text-sm"
                            rows={3}
                          />
                          <div className="flex gap-4 mt-3">
                            <Button
                              onClick={() => handleEditComment(reply.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
                              disabled={!editContent.trim()}
                            >
                              Save Changes
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setEditingComment(null);
                                setEditContent('');
                              }}
                              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-sm py-2"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {Object.values(commentTree).length === 0 && (
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">No comments yet. Be the first to comment!</p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}