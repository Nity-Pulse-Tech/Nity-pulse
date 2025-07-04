import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Quote, Globe, Smartphone } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sophie Ndiaye",
      role: "Startup Founder, Douala",
      content: "Nity Pulse transformed our startup’s website, boosting engagement by 250%. Their collaborative approach made all the difference!",
      rating: 5,
      category: "Web Development",
      icon: Globe,
      service: "Startup Website"
    },
    {
      name: "Emmanuel Kweku",
      role: "E-commerce Owner, Yaoundé",
      content: "The e-commerce platform Nity Pulse built is sleek and user-friendly. Our sales have tripled since launch!",
      rating: 5,
      category: "E-commerce",
      icon: Smartphone,
      service: "Online Store"
    },
    {
      name: "Clara Mvogo",
      role: "Project Manager, Bamenda",
      content: "Nity Pulse’s team delivered a project management app that streamlined our workflows. Their support is unmatched!",
      rating: 5,
      category: "Mobile App",
      icon: Smartphone,
      service: "Project Management App"
    },
    {
      name: "Lucas Tembo",
      role: "Student, University of Buea",
      content: "PulseLearn’s AI tools helped me ace my exams. The platform’s community features fostered amazing study groups!",
      rating: 5,
      category: "PulseLearn User",
      icon: Smartphone,
      service: "Education Platform"
    }
  ];

  const getCategoryColor = (category: string) => {
    if (category.includes('PulseLearn')) return 'gradient-primary';
    if (category.includes('Web')) return 'gradient-secondary';
    if (category.includes('App')) return 'gradient-primary';
    if (category.includes('E-commerce')) return 'gradient-secondary';
    return 'gradient-primary';
  };

  return (
    <section id="testimonials" className="py-24 gradient-primary text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Quote size={16} className="mr-2" />
            Our Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            What Our Partners Say
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Hear from teams and innovators who’ve transformed their visions with Nity Pulse.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => {
              const IconComponent = testimonial.icon;
              return (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`inline-flex items-center ${getCategoryColor(testimonial.category)} px-3 py-1 rounded-full text-xs font-medium text-white`}>
                          <IconComponent size={14} className="mr-2" />
                          {testimonial.category}
                        </div>
                        <div className="flex items-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-white/90 text-sm font-medium mb-4">
                        {testimonial.service}
                      </div>
                      <blockquote className="text-white/90 text-base leading-relaxed mb-6 italic flex-grow">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="mt-auto">
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-white/90 text-sm">{testimonial.role}</div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white/20 border-white/30 text-white hover:bg-white/30" />
          <CarouselNext className="hidden md:flex -right-12 bg-white/20 border-white/30 text-white hover:bg-white/30" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;