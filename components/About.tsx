'use client';
import { Card } from '@/components/ui/card';
import { Users, Award, Clock, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const statsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    statsRef.current.forEach((el, index) => {
      if (el) {
        if (index === 3) {
          gsap.to(el, {
            duration: 2,
            onStart: () => {
              el.textContent = '24/7';
            },
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        } else {
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: [75, 200, 6][index],
              duration: 2,
              ease: 'power1.out',
              snap: { textContent: 1 },
              onUpdate: function () {
                el.textContent = Math.ceil(Number(this.targets()[0].textContent)).toString();
              },
              scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    });
  }, []);

  const stats = [
    { value: 75, label: 'Innovative Projects', icon: Award },
    { value: 200, label: 'Satisfied Partners', icon: Users },
    { value: 6, label: 'Years of Impact', icon: Clock },
    { value: '24/7', label: 'Support Availability', icon: Headphones },
  ];

  return (
    <motion.section
      id="about"
      className="py-24 bg-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users size={16} className="mr-2 text-black/60 dark:text-white/60" />
            <span className="text-black dark:text-white">Who We Are</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black dark:text-white">About Us</h2>
          <p className="text-xl text-black/60 dark:text-white/60 max-w-4xl mx-auto leading-relaxed">
            Nity Pulse is a dynamic team dedicated to transforming ideas into innovative tech solutions.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <Card className="card p-8">
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">Our Mission</h3>
              <p className="text-black/60 dark:text-white/60 leading-relaxed">
                To empower startups and teams with collaborative technology and design.
              </p>
            </Card>
          </div>
          <div>
            <Card className="card p-8">
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">Our Vision</h3>
              <p className="text-black/60 dark:text-white/60 leading-relaxed">
                To create a future where technology fosters global collaboration.
              </p>
            </Card>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="card text-center p-6">
                <Icon size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-primary">
                  <span ref={(el) => (statsRef.current[index] = el)}>{stat.value}</span>
                  {index === 0 || index === 1 ? '+' : ''}
                </h3>
                <p className="text-black/60 dark:text-white/60">{stat.label}</p>
              </Card>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;