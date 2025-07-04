import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Projects />
      <Services />
      <Testimonials />
      <Newsletter />
      <Contact />
    </div>
  );
}