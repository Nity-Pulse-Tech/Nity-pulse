import BlogPostClient from './BlogPostClient';
import { publicApi } from '@/lib/api';
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

type Params = Promise<{ id: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
  const { id } = await params;

  let post: BlogPost | null = null;

  try {
    const response = await publicApi.get(`/api/core/blog/${id}/`);
    post = response.data;
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
}
