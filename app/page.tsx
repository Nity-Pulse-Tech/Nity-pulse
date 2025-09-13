'use client';

import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import WhatsAppCommunity from '@/components/WhatsAppCommunity';
import Partners from '@/components/Partners'
// import Footer from '@/components/Footer';
import { publicApi } from '@/lib/api';
import type { Portfolio, Testimonial as TestimonialType } from '@/lib/types/dashboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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


export default function HomePage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
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
        setTestimonials(testimonialsRes.data.slice(0, 6)); 
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
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Partners />
      <About />
      <Services />
      <Projects portfolios={portfolios} />
      <Testimonials testimonials={testimonials} />
      <Blog blogs={blogs} />
      <WhatsAppCommunity />
      <Contact />
      <Footer />
    </div>
  );
}