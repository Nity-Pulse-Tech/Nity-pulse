'use client';

import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { dashboardService } from '@/lib/services/dashboardService';
import { isAxiosError } from '@/utils/errorUtils';

interface ContactItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
  key: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerEmail, setFooterEmail] = useState('');
  const [footerLoading, setFooterLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    office_location: 'Yaoundé, Cameroon',
    emails: ['contact@nitypulse.com'],
    phones: ['+33 6 05 50 85 42'],
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    github: '',
    company_tagline: '',
    privacy_policy: '',
    terms_of_service: '',
    cookies_policy: '',
  });

  useEffect(() => {
    const fetchCompanySettings = async () => {
      try {
        const settings = await dashboardService.getCompanySettings();
        setCompanyInfo({
          office_location: settings.office_location || 'Yaoundé, Cameroon',
          emails: settings.emails || ['contact@nitypulse.com'],
          phones: settings.phones || ['+33 6 05 50 85 42'],
          facebook: settings.facebook || '',
          twitter: settings.twitter || '',
          instagram: settings.instagram || '',
          linkedin: settings.linkedin || '',
          github: settings.github || '',
          company_tagline: settings.company_tagline || '',
          privacy_policy: settings.privacy_policy || '',
          terms_of_service: settings.terms_of_service || '',
          cookies_policy: settings.cookies_policy || '',
        });
      } catch (error: unknown) {
        console.error('Failed to fetch company settings:', error);
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error('Authentication failed. Please log in to update company settings.');
          } else if (error.response?.status === 404) {
            toast.info('No company settings found. Using default contact information.');
          } else {
            toast.error('Failed to fetch company settings.');
          }
        } else {
          toast.error('Failed to fetch company settings.');
        }
      }
    };

    fetchCompanySettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(footerEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setFooterLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Thank you for subscribing!');
      setFooterEmail('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setFooterLoading(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: companyInfo.facebook || '#', label: 'Facebook' },
    { icon: Twitter, href: companyInfo.twitter || '#', label: 'Twitter' },
    { icon: Linkedin, href: companyInfo.linkedin || '#', label: 'LinkedIn' },
    { icon: Instagram, href: companyInfo.instagram || '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Services', href: '/#services' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  const contactItems: ContactItem[] = [
    { icon: MapPin, text: companyInfo.office_location, key: 'location' },
    { icon: Mail, text: companyInfo.emails[0] || 'contact@nitypulse.com', key: 'email' },
    ...companyInfo.phones.map((phone, index) => ({
      icon: Phone,
      text: phone || '+33 6 05 50 85 42',
      key: `phone-${index}`,
    })),
  ];

  return (
    <footer className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-6">Nity Pulse</h3>
            <p className="text-primary-foreground/90 leading-relaxed mb-6 text-lg max-w-md">
              Collaborating to create innovative tech and design solutions that empower teams and startups worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-primary-foreground/10 rounded-xl flex items-center justify-center hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-300 group"
                  >
                    <IconComponent size={20} className="text-primary-foreground/90 group-hover:text-primary-foreground transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-primary-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors duration-300 hover:translate-x-1 inline-block group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-foreground transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-primary-foreground">Contact Info</h4>
            <div className="space-y-4">
              {contactItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.key} className="flex items-start space-x-3 group">
                    <IconComponent size={18} className="text-primary-foreground/90 mt-0.5 group-hover:text-primary-foreground transition-colors" />
                    <span className="text-primary-foreground/90 group-hover:text-primary-foreground transition-colors">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold text-primary-foreground mb-4">Stay in the Loop</h4>
            <p className="text-primary-foreground/90 mb-6">Join our newsletter for the latest tech and design insights.</p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={handleSubmit}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:border-primary-foreground/40 transition-colors"
                value={footerEmail}
                onChange={e => setFooterEmail(e.target.value)}
                disabled={footerLoading}
              />
              <Button
                type="submit"
                className="bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/90 rounded-xl px-6 py-3 font-semibold transition-all duration-300"
                disabled={footerLoading}
              >
                {footerLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-secondary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/90 text-lg">
            © {currentYear} Nity Pulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;