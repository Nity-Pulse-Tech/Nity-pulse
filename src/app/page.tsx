
'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '@/services/newsletterService';
import { NewsletterSubscriber } from '@/types/newsletter';

// Initialize GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export default function ComingSoon() {
  // Get launch date from environment variable (in Cameroon timezone)
  const [targetDate] = useState<Date>(() => {
    const launchDate = process.env.NEXT_PUBLIC_LAUNCH_DATE || '';
    if (launchDate) {
      const date = new Date(launchDate);
      return new Date(date.getTime() + 60 * 60 * 1000);
    }
    return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Default: 14 days
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  // Form state
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const titleControls = useAnimation();

  // Infinite animation for the title
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await titleControls.start({
          y: [-3, 3, -3],
          transition: { duration: 6, ease: 'easeInOut' },
        });
        await titleControls.start({
          scale: [1, 1.02, 1],
          transition: { duration: 4, ease: 'easeInOut' },
        });
        await titleControls.start({
          textShadow: [
            '0 0 8px rgba(106, 13, 173, 0.1)',
            '0 0 15px rgba(106, 13, 173, 0.2)',
            '0 0 8px rgba(106, 13, 173, 0.1)',
          ],
          transition: { duration: 5, ease: 'easeInOut' },
        });
      }
    };
    sequence();
  }, [titleControls]);

  // GSAP animations on load
  useGSAP(() => {
    gsap.from('.countdown-item', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out',
    });
    gsap.from('.subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
    });
    gsap.from('.form-element', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      stagger: 0.1,
    });
    gsap.from('.social-link', {
      y: 10,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      delay: 0.8,
    });
  });

  // Countdown logic
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: false,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          expired: false,
        };
      } else {
        timeLeft.expired = true;
      }

      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Format numbers with leading zero
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email address.', {
        style: {
          backgroundColor: '#ffffff',
          color: '#e65100',
          border: '1px solid #e65100',
          fontFamily: 'Inter, sans-serif',
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const response: NewsletterSubscriber = await subscribeToNewsletter(email);
      setEmail('');
      toast.success('Successfully subscribed! We’ll notify you when Nity Pulse is live.', {
        duration: 5000,
        style: {
          backgroundColor: '#ffffff',
          color: '#6a0dad',
          border: '1px solid #6a0dad',
          fontFamily: 'Inter, sans-serif',
        },
      });
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMsg, {
        duration: 5000,
        style: {
          backgroundColor: '#ffffff',
          color: '#e65100',
          border: '1px solid #e65100',
          fontFamily: 'Inter, sans-serif',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto backdrop-blur-md bg-white/90 dark:bg-black/90 p-6 sm:p-10 rounded-2xl border border-primary/20 shadow-xl"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-primary dark:text-primary font-heading"
          animate={titleControls}
          initial={{ y: -20, opacity: 0 }}
        >
          Coming Soon
        </motion.h1>

        {!timeLeft.expired ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 sm:mb-12">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="countdown-item flex flex-col items-center p-3 bg-white dark:bg-primary/10 rounded-lg shadow-sm border border-primary/10"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-primary-foreground">
                  {formatNumber(item.value)}
                </span>
                <span className="text-sm uppercase text-muted-foreground mt-2">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="mb-10 sm:mb-12"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <p className="text-xl sm:text-2xl text-primary font-heading">
              Nity Pulse is Live!
            </p>
          </motion.div>
        )}

        <motion.p
          className="subtitle text-lg sm:text-xl mb-8 text-foreground dark:text-gray-200 px-4 sm:px-0"
          whileHover={{ scale: 1.01 }}
        >
          Join <span className="font-bold text-primary">Nity Pulse</span> to stay informed. We’ll notify you when our site launches and share exclusive updates.
        </motion.p>

        <motion.form
          className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12 w-full max-w-md mx-auto"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          onSubmit={handleSubmit}
        >
          <motion.input
            type="email"
            placeholder="Enter your email address"
            className="form-element flex-1 px-4 py-3 rounded-lg border border-primary/20 bg-white dark:bg-black text-foreground focus:ring-2 focus:ring-primary focus:outline-none shadow-sm text-sm sm:text-base"
            required
            whileFocus={{ scale: 1.02 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            className="form-element px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-heading font-bold shadow-md text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Notify Me'}
          </motion.button>
        </motion.form>

        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { name: 'Instagram', href: 'https://instagram.com/nitypulse' },
            { name: 'WhatsApp', href: 'https://wa.me/1234567890' },
            { name: 'LinkedIn', href: 'https://linkedin.com/company/nitypulse' },
            { name: 'Dribbble', href: 'https://dribbble.com/nitypulse' },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="social-link text-sm sm:text-base text-foreground hover:text-primary dark:hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              aria-label={`Follow us on ${social.name}`}
            >
              {social.name}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="text-xs sm:text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          © {new Date().getFullYear()} Nity Pulse. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
