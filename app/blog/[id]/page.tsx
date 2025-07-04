import { blogPosts } from '@/data/blogData';
import BlogPostClient from './BlogPostClient';

// Define the props type to match Next.js expectations
interface BlogPostProps {
  params: Promise<{ id: string }>;
}

// Make the component async to handle the Promise
export default async function BlogPost({ params }: BlogPostProps) {
  const { id } = await params; // Await the params to get the id
  const post = blogPosts.find((p) => p.id === id);
  return <BlogPostClient post={post} />;
}