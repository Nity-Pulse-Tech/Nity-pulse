'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { publicApi } from '@/lib/api';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  created_at: string;
  status: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies?: string;
  project_url?: string;
  github_url?: string;
  status: string;
}

interface Testimonial {
  id: string;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  status: string;
}

export default function HomePage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsRes, portfoliosRes, testimonialsRes] = await Promise.all([
          publicApi.get('/api/core/blog/'),
          publicApi.get('/api/portfolio/portfolios/'),
          publicApi.get('/api/core/testimonial/'),
        ]);

        // Filter only published items
        setBlogs(blogsRes.data.filter((blog: BlogPost) => blog.status === 'PUBLISHED').slice(0, 3));
        setPortfolios(portfoliosRes.data.filter((portfolio: PortfolioItem) => portfolio.status === 'PUBLISHED').slice(0, 6));
        setTestimonials(testimonialsRes.data.filter((testimonial: Testimonial) => testimonial.status === 'PUBLISHED').slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to empty arrays if API fails
        setBlogs([]);
        setPortfolios([]);
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Projects portfolios={portfolios} />
      <Testimonials testimonials={testimonials} />
      <Blog blogs={blogs} />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
}