'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Initialize GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export default function ComingSoon() {
  // Get launch date from environment variable (in Cameroon timezone)
  const [targetDate] = useState<Date>(() => {
    const launchDate = process.env.NEXT_PUBLIC_LAUNCH_DATE || '';
    if (launchDate) {
      // Convert to Cameroon time (WAT - UTC+1)
      const date = new Date(launchDate);
      return new Date(date.getTime() + 60 * 60 * 1000); // Add 1 hour for WAT
    }
    // Default to 2 weeks from now if no env var
    return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  });

  const titleControls = useAnimation();

  // Infinite animation for the title
  useEffect(() => {
    const sequence = async () => {
      while (true) {
        await titleControls.start({
          y: [-3, 3, -3],
          transition: { duration: 6, ease: 'easeInOut' }
        });
        await titleControls.start({
          scale: [1, 1.02, 1],
          transition: { duration: 4, ease: 'easeInOut' }
        });
        await titleControls.start({
          textShadow: [
            '0 0 8px rgba(0,0,0,0.1)',
            '0 0 15px rgba(0,0,0,0.2)',
            '0 0 8px rgba(0,0,0,0.1)'
          ],
          transition: { duration: 5, ease: 'easeInOut' }
        });
      }
    };
    sequence();
  }, [titleControls]);

  // Animation on load
  useGSAP(() => {
    gsap.from('.countdown-item', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out'
    });

    gsap.from('.subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4
    });

    gsap.from('.form-element', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      stagger: 0.1
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
        expired: false
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          expired: false
        };
      } else {
        timeLeft.expired = true;
      }

      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Format numbers with leading zero
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto backdrop-blur-sm bg-white/80 dark:bg-black/80 p-8 rounded-xl border border-border shadow-2xl"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-8 text-gray-900 dark:text-white font-heading"
          animate={titleControls}
          initial={{ y: -10, opacity: 0 }}
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          COMING SOON
        </motion.h1>
        
        {!timeLeft.expired ? (
          <div className="grid grid-cols-4 gap-4 mb-12">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="countdown-item flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-primary">
                  {formatNumber(item.value)}
                </span>
                <span className="text-sm uppercase text-gray-600 dark:text-muted-foreground mt-2">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="mb-12"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <p className="text-2xl text-primary">We are live!</p>
          </motion.div>
        )}

        <motion.p 
          className="subtitle text-xl mb-8 text-gray-800 dark:text-gray-200"
          whileHover={{ scale: 1.01 }}
        >
          Our Team at <span className="font-bold text-primary">Nity Pulse</span> Have Been Working On Something Amazing. We Will Be Back Soon.
        </motion.p>

        <motion.form 
          className="flex flex-col sm:flex-row gap-4 mb-12"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <motion.input 
            type="email" 
            placeholder="Enter Your Email" 
            className="form-element flex-1 px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button 
            type="submit" 
            className="form-element px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-heading font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit →
          </motion.button>
        </motion.form>

        <motion.div 
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {['Instagram', 'Whatsapp', 'LinkedIn', 'Dribbble'].map((social, index) => (
            <motion.a 
              key={index}
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
            >
              {social}
            </motion.a>
          ))}
        </motion.div>

        <motion.p 
          className="text-sm text-gray-600 dark:text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          © {new Date().getFullYear()} Made with ❤️ by <span className="font-bold">Nity Pulse</span>.
        </motion.p>
      </motion.div>
    </div>
  );
}