'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Send } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setEmail('');
      setLoading(false);
      toast.success('Successfully subscribed! You’ll receive our latest updates.');
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Mail size={16} className="mr-2" />
            Stay Connected
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Tech Community
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Subscribe for exclusive updates on collaborative tech, design trends, and startup insights.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-4 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20 focus:border-primary-foreground/40 backdrop-blur-sm transition-colors"
              disabled={loading}
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-secondary text-secondary-foreground group flex items-center justify-center hover:bg-secondary/90 rounded-xl px-6 py-3 font-semibold transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-secondary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
          <p className="text-primary-foreground/90 text-sm mt-4 opacity-80">
            Join 10,000+ innovators. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;