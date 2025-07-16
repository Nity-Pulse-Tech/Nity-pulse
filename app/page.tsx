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
// import Footer from '@/components/Footer';
import { publicApi } from '@/lib/api';

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

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  status: string;
  user: string;
}

interface Testimonial {
  id: string;
  author_name: string;
  content: string;
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

        setBlogs(blogsRes.data.slice(0, 3));
        setPortfolios(portfoliosRes.data.slice(0, 6));
        setTestimonials(testimonialsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
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
      {/* <Footer /> */}
    </div>
  );
}