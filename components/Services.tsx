'use client';
import { Code, Smartphone, ArrowRight, Brain, Shield, Network, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    {
      title: "Web Solutions",
      description: "Crafting responsive, scalable websites that engage users and drive collaboration.",
      icon: Code,
      features: ["Responsive Design", "Performance Optimization", "SEO Integration", "Modern Frameworks"]
    },
    {
      title: "Mobile Apps",
      description: "Building iOS and Android apps that connect teams and deliver seamless experiences.",
      icon: Smartphone,
      features: ["Native Development", "Cross-Platform Apps-move", "App Store Optimization", "Ongoing Support"]
    },
    {
      title: "AI & Analytics",
      description: "Leveraging AI and data analytics to empower smarter decisions and automation.",
      icon: Brain,
      features: ["Machine Learning", "Data Insights", "AI Assistants", "Predictive Analytics"]
    },
    {
      title: "Cybersecurity",
      description: "Protecting your digital assets with robust security solutions and threat mitigation.",
      icon: Shield,
      features: ["Threat Detection", "Data Encryption", "Security Audits", "Incident Response"]
    },
    {
      title: "Telecommunications",
      description: "Delivering reliable, high-speed communication networks for seamless connectivity.",
      icon: Network,
      features: ["Network Infrastructure", "VoIP Solutions", "5G Integration", "Network Optimization"]
    },
    {
      title: "Telephone",
      description: "Providing advanced telephony solutions for efficient and scalable communication.",
      icon: Phone,
      features: ["Cloud Telephony", "PBX Systems", "Call Analytics", "Voice Integration"]
    }
  ];

  return (
    <motion.section
      id="services"
      className="py-24 gradient-primary text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Code size={16} className="mr-2 text-white" />
            <span className="text-white">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
            Our Services
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Partner with Nity Pulse to unlock innovative solutions that elevate your digital journey.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white group-hover:text-secondary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed mb-6 text-sm">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-white/90 text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="inline-flex items-center text-white hover:text-secondary transition-colors group/btn"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight size={16} className="ml-2 text-white group-hover/btn:text-secondary group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;