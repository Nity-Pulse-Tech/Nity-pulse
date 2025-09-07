'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import type { Portfolio } from '@/lib/types/dashboard'; 

interface ProjectsProps {
  portfolios: Portfolio[];  // Use Portfolio instead of local interface
}



export default function Projects({ portfolios }: ProjectsProps) {
  const publishedPortfolios = portfolios.filter((project) => project.status === 'PUBLISHED');

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Our Work
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our showcase of innovative projects, built with cutting-edge technologies to solve real-world challenges.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        {publishedPortfolios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-600 text-lg">No projects available at the moment.</p>
            <Button asChild className="mt-6 bg-primary hover:bg-primary/80 text-white">
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedPortfolios.slice(0, 6).map((project, index) => ( // Limit to 6 projects for landing page
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <Card className="h-full overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-xl">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                    <Image
                           src={project.image || '/fallback-image.jpg'}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-2xl font-semibold text-gray-900 mb-3">{project.title}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.split(',').map((tech, idx) => (
                          <Badge
                            key={idx}
                            color="secondary"
                            className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                          >
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex flex-wrap gap-2">
                    {project.link && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="border-gray-600 text-gray-600 hover:bg-gray-50 rounded-full"
                      >
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github size={16} className="mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Projects Button */}
        {publishedPortfolios.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild className="bg-primary  text-white rounded-full px-6 py-2">
              <Link href="/portfolio">View All Projects</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}