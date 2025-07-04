import { Rocket, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      title: "Empower Innovation",
      description: "At Nity Pulse, we ignite creativity and collaboration, delivering cutting-edge solutions to drive your success in the digital age.",
      icon: Rocket,
      gradient: "gradient-primary"
    },
    {
      title: "Dedicated Partnership",
      description: "Our team is your ally, providing tailored support to ensure your projects thrive with innovative technology and design.",
      icon: Target,
      gradient: "gradient-secondary"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket size={16} className="mr-2" />
            About Nity Pulse
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Who We Are
          </h2>
          <p className="text-xl text-black max-w-4xl mx-auto leading-relaxed">
            Nity Pulse is a collaborative tech innovator, crafting solutions that empower startups, teams, and visionaries to shape the future with bold ideas and cutting-edge design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className={`group p-10 ${feature.gradient} text-white hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/90 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '75+', label: 'Innovative Projects' },
            { number: '200+', label: 'Satisfied Partners' },
            { number: '6', label: 'Years of Impact' },
            { number: '24/7', label: 'Support Availability' }
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.4}s` }}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-black font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;