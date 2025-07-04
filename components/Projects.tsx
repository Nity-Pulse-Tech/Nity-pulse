'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Utensils, Globe, Briefcase, Shield } from 'lucide-react';
import Image from 'next/image';

const Projects = () => {
  const projects = [
    {
      title: "PulseLearn",
      description: "A collaborative learning platform offering resources, AI-driven insights, and community forums to empower students and educators.",
      image: "https://images.unsplash.com/photo-1516321310762-90b0f9b1a4b1?w=600&h=400&fit=crop",
      icon: Smartphone,
      gradient: "gradient-primary",
      category: "Education"
    },
    {
      title: "FoodConnect",
      description: "A seamless food ordering app connecting users with local restaurants for a delightful dining experience.",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=400&fit=crop",
      icon: Utensils,
      gradient: "gradient-secondary",
      category: "Food & Delivery"
    },
    {
      title: "CultureHub",
      description: "An app celebrating African heritage, enabling users to explore languages and traditions interactively.",
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&h=400&fit=crop",
      icon: Globe,
      gradient: "gradient-primary",
      category: "Culture"
    },
    {
      title: "JobLink",
      description: "A platform connecting job seekers with local opportunities, simplifying the job search process.",
      image: "https://images.unsplash.com/photo-1516321310762-90b0f9b1a4b2?w=600&h=400&fit=crop",
      icon: Briefcase,
      gradient: "gradient-secondary",
      category: "Employment"
    },
    {
      title: "SafeNet",
      description: "An app educating users on cybersecurity best practices to stay secure in the digital world.",
      image: "https://images.unsplash.com/photo-1516321310762-90b0f9b1a4b3?w=600&h=400&fit=crop",
      icon: Shield,
      gradient: "gradient-primary",
      category: "Cybersecurity"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Smartphone size={16} className="mr-2 text-black/60 dark:text-white/60" />
            <span className="text-black dark:text-white">Our Creations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black dark:text-white">
            Innovative Projects
          </h2>
          <p className="text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto">
            Discover our portfolio of collaborative tech solutions transforming industries and empowering users.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div key={index}>
                <Card className="group card hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <div className="relative overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-black dark:text-white">
                      {project.category}
                    </div>
                    <div className={`absolute top-4 right-4 w-10 h-10 ${project.gradient} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={20} className="text-white" />
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-black dark:text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-black/60 dark:text-white/60 leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;