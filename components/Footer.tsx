'use client';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerEmail, setFooterEmail] = useState('');
  const [footerLoading, setFooterLoading] = useState(false);

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
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Thank you for subscribing!');
    setFooterEmail('');
    setFooterLoading(false);
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  const quickLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/#projects" },
    { label: "Services", href: "/#services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" }
  ];

  return (
    <footer className="gradient-primary text-white relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-6">
              Nity Pulse
            </h3>
            <p className="text-white/90 leading-relaxed mb-6 text-lg max-w-md">
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
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
                  >
                    <IconComponent size={20} className="text-white/90 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block group"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: "Yaoundé, Cameroon" },
                { icon: Mail, text: "contact@nitypulse.com" },
                { icon: Phone, text: "+237 690123456" }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 group">
                    <IconComponent size={18} className="text-white/90 mt-0.5 group-hover:text-white transition-colors" />
                    <span className="text-white/90 group-hover:text-white transition-colors">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold text-white mb-4">Stay in the Loop</h4>
            <p className="text-white/90 mb-6">Join our newsletter for the latest tech and design insights.</p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={handleSubmit}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
                value={footerEmail}
                onChange={e => setFooterEmail(e.target.value)}
                disabled={footerLoading}
              />
              <Button 
                type="submit"
                className="btn-secondary flex items-center justify-center"
                disabled={footerLoading}
              >
                {footerLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/90 text-lg">
            © {currentYear} Nity Pulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;