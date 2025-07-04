import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BlogPostPageProps {
  params: { id: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-16 gradient-primary text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/blog">
            <Button
              variant="outline"
              className="mb-6 text-white border-white/20 hover:bg-white/20"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {post.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-white/90 mb-8">
            <div className="flex items-center mb-2 sm:mb-0">
              <User size={16} className="mr-2" />
              {post.author}
            </div>
            <div className="flex items-center mb-2 sm:mb-0">
              <Calendar size={16} className="mr-2" />
              {new Date(post.publishDate).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              {post.readTime}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card className="card">
            <CardHeader className="p-0">
              <img
                src={`https://images.unsplash.com/photo-${1600000000 + parseInt(post.id)}?w=800&h=400&fit=crop`}
                alt={post.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg prose-black max-w-none">
                <p className="text-black/60 leading-relaxed mb-6">{post.content}</p>
                {/* Add more dynamic content here if blogPosts.content includes structured data */}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}