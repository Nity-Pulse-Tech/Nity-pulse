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
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "We embrace the latest technologies to deliver groundbreaking solutions for your projects."
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "Your vision is our mission. We work closely to deliver tailored solutions."
    },
    {
      icon: Target,
      title: "Excellence Always",
      description: "We uphold the highest standards in design, development, and client support."
    },
    {
      icon: Heart,
      title: "Integrity Matters",
      description: "Transparency and ethical practices are at the core of our partnerships."
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "100+ Projects",
      description: "Delivered across diverse industries"
    },
    {
      icon: Users,
      title: "250+ Partners",
      description: "Trusted by teams worldwide"
    },
    {
      icon: Globe,
      title: "10+ Countries",
      description: "Serving global innovators"
    },
    {
      icon: Rocket,
      title: "6 Years",
      description: "Of pioneering innovation"
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

  return (
    <div className="min-h-screen bg-background">
      <motion.section
        className="pt-32 pb-16 gradient-primary text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              About Nity Pulse
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We’re a dynamic team dedicated to crafting innovative solutions that empower collaboration and drive impact.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 bg-background"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="card">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white">Our Mission</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-black/60 dark:text-white/60 leading-relaxed">
                  To empower teams and startups with innovative tech solutions that drive collaboration and growth.
                </p>
              </CardContent>
            </Card>

            <Card className="card">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Rocket size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white">Our Vision</h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-black/60 dark:text-white/60 leading-relaxed">
                  To lead as Africa’s premier hub for collaborative tech innovation, fostering global impact.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 bg-background"
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
                  <Card className="card text-center">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent size={32} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-black dark:text-white">{value.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-black/60 dark:text-white/60 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 bg-background"
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
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="card text-center p-8">
                    <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-black dark:text-white mb-2">{achievement.title}</h3>
                    <p className="text-black/60 dark:text-white/60">{achievement.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 bg-background"
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
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start mb-12 last:mb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-24 text-right mr-8">
                  <div className="text-2xl font-bold text-primary">{item.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-2 mr-8 relative">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-primary/30 last:hidden"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">{item.title}</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 gradient-primary text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Partner with Nity Pulse to transform your ideas into impactful solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#contact">
                <Button size="lg" className="btn-secondary">
                  Start Now
                  <ArrowRight size={20} className="ml-2 text-white" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}