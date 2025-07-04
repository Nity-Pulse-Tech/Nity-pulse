'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('#') && pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Services', href: '/#services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 text-white shadow-lg' : 'bg-transparent text-black'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/#home" 
            className="flex items-center space-x-3 group"
            onClick={() => handleNavigation('#home')}
          >
            <Image 
              src="/logo.png" 
              alt="Nity Pulse Logo" 
              width={32}
              height={32}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <div className="text-2xl font-bold group-hover:text-primary transition-colors">
              Nity Pulse
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-primary transition-colors font-medium relative group"
                onClick={() => handleNavigation(item.href)}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/#contact">
              <Button 
                className="btn-primary"
                onClick={() => handleNavigation('#contact')}
              >
                Get Started
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-6 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-primary transition-colors font-medium py-2 text-left"
                  onClick={() => handleNavigation(item.href)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/#contact">
                <Button 
                  className="btn-primary"
                  onClick={() => handleNavigation('#contact')}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;