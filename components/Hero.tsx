'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

import { motion } from 'framer-motion';
import AutoCarousel from '@/components/AutoCarousel';


const Hero = () => {
  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} className="mr-2" />
              Collaborate & Innovate
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-primary">Spark</span>
              <br />
              Your Next Breakthrough
            </h1>
            <div className="mb-8 space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Innovative Solutions for Teams</h2>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-2xl">
                Nity Pulse transforms ideas into reality with collaborative technology and design, empowering startups and teams to achieve greatness.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="btn-primary"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Collaborating
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Discover More
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative max-w-lg mx-auto">
              <div className="card p-8 transform hover:scale-105 transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <div className="w-3 h-3 bg-secondary rounded-full"></div>
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                    <div className="text-xs text-foreground/60 font-mono">Nity Pulse</div>
                  </div>
                  <div className="text-center">
                  <div className="relative w-72 h-72 mx-auto mb-4">
                    <AutoCarousel />
                    <div className="absolute inset-0 gradient-primary rounded-2xl opacity-20"></div>
                  </div>

                    <h3 className="text-xl font-bold mb-2">Our Team in Action</h3>
                    <p className="text-primary font-semibold mb-3">Crafting the Future</p>
                    <div className="bg-primary/10 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-medium">Ready to Shape Tomorrow?</span>
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-primary-foreground rounded-full animate-ping"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;