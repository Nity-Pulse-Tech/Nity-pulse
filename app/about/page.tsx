'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Users, 
  Target, 
  Rocket, 
  Lightbulb, 
  Globe, 
  Award,
  ArrowRight,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const useCountUp = (end: number, duration: number, inView: boolean) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);
    
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  
  return count;
};

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "We embrace the latest technologies to deliver groundbreaking solutions for your projects, pushing boundaries with creative and cutting-edge approaches."
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "Your vision is our mission. We work closely with clients to deliver tailored solutions that foster teamwork and achieve shared goals."
    },
    {
      icon: Target,
      title: "Excellence Always",
      description: "We uphold the highest standards in design, development, and client support, ensuring quality and precision in every project we undertake."
    },
    {
      icon: Heart,
      title: "Integrity Matters",
      description: "Transparency and ethical practices are at the core of our partnerships, building trust and fostering long-term relationships with our clients."
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "100+ Projects",
      count: 100,
      description: "Delivered across diverse industries, from tech startups to established enterprises, with a focus on innovation and impact."
    },
    {
      icon: Users,
      title: "250+ Partners",
      count: 250,
      description: "Trusted by teams worldwide, we collaborate with organizations to bring their visions to life through technology."
    },
    {
      icon: Globe,
      title: "10+ Countries",
      count: 10,
      description: "Serving global innovators across multiple continents, delivering solutions that resonate worldwide."
    },
    {
      icon: Rocket,
      title: "6 Years",
      count: 6,
      description: "Pioneering innovation since our inception, driving progress in the tech and design landscape."
    }
  ];

  const timeline = [
    {
      year: "2019",
      title: "Founded",
      description: "Nity Pulse began with a mission to empower teams through technology."
    },
    {
      year: "2020",
      title: "First Breakthrough",
      description: "Launched our first collaborative platform, setting the stage for growth."
    },
    {
      year: "2021",
      title: "Team Growth",
      description: "Expanded with experts in design, AI, and development."
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description: "Named a top innovator in African tech."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Extended services to clients across multiple continents."
    },
    {
      year: "2024",
      title: "Innovation Lab",
      description: "Launched a lab for AI and emerging tech research."
    }
  ];

  const milestonesRef = useRef(null);
  const isMilestonesInView = useInView(milestonesRef, { once: true, amount: 0.3 });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section
        className="pt-32 pb-16 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-foreground">
              About Nity Pulse
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              We're a dynamic team dedicated to crafting innovative solutions that empower collaboration and drive impact.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        className="py-20 bg-background"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card h-full p-8 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Target size={36} className="text-primary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-black dark:text-white">Our Mission</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-black/70 dark:text-white/70 leading-relaxed text-lg">
                  To empower teams and startups with innovative tech solutions that drive collaboration and growth, delivering measurable impact.
                </p>
              </CardContent>
            </Card>

            <Card className="card h-full p-8 border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Rocket size={36} className="text-secondary-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-black dark:text-white">Our Vision</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-black/70 dark:text-white/70 leading-relaxed text-lg">
                  To lead as Africa's premier hub for collaborative tech innovation, fostering global impact through creativity and excellence.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-20 bg-muted/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
              Our Values
            </h2>
            <p className="text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto">
              The principles that guide our collaborative journey.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card h-full p-6 hover:shadow-lg transition-all duration-300 border border-border">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                        <IconComponent size={28} className="text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold text-center text-black dark:text-white">{value.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-black/60 dark:text-white/60 leading-relaxed text-center">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Milestones Section */}
      <motion.section
        className="py-20 bg-background"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        ref={milestonesRef}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
              Our Milestones
            </h2>
            <p className="text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto">
              Key achievements in our journey of innovation.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              const count = useCountUp(achievement.count, 2000, isMilestonesInView);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="card h-full p-6 text-center hover:shadow-lg transition-all duration-300 border border-border">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                        <IconComponent size={28} className="text-secondary-foreground" />
                      </div>
                      <h3 className="text-3xl font-bold text-black dark:text-white">
                        {count}+
                      </h3>
                      <p className="text-lg font-semibold text-black dark:text-white mt-2">
                        {achievement.title.split('+ ')[1]}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-black/60 dark:text-white/60 leading-relaxed">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        className="py-20 bg-muted/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
              Our Story
            </h2>
            <p className="text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto">
              From vision to victory: our journey of collaboration and innovation.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2 z-0"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start mb-12 last:mb-0 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="text-2xl font-bold text-primary">{item.year}</div>
                </div>
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-primary to-primary/80 rounded-full mt-2 mr-6 relative shadow-md">
                  {index !== timeline.length - 1 && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-primary/30"></div>
                  )}
                </div>
                <div className="flex-1 bg-card p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{item.title}</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Partner with Nity Pulse to transform your ideas into impactful solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg rounded-xl px-8 py-4 font-semibold transition-all duration-300 text-lg">
                  Start Now
                  <ArrowRight size={20} className="ml-2 text-secondary-foreground" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}