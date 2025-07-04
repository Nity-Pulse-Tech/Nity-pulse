'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    toast.success('Your message has been sent! We’ll get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Send size={16} className="mr-2" />
            Connect With Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Let’s Collaborate
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Ready to bring your ideas to life? Reach out to discuss how we can partner on your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <h3 className="text-3xl font-bold mb-12">Our Contact Details</h3>
            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  title: "Office Location",
                  content: "Yaoundé, Cameroon",
                  gradient: "gradient-primary"
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "contact@nitypulse.com",
                  gradient: "gradient-secondary"
                },
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+237 690123456",
                  gradient: "gradient-primary"
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start space-x-6 group">
                    <div className={`w-14 h-14 ${item.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                      <p className="text-black text-lg">{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="card p-10">
              <h3 className="text-2xl font-bold mb-8">Drop Us a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-3">
                      Name
                    </label>
                    <Input 
                      type="text" 
                      name="name"
                      placeholder="Your name"
                      className="w-full h-12 px-4 border-2 border-primary/20 rounded-xl focus:border-primary transition-colors"
                      value={form.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-3">
                      Email
                    </label>
                    <Input 
                      type="email" 
                      name="email"
                      placeholder="Your email address"
                      className="w-full h-12 px-4 border-2 border-primary/20 rounded-xl focus:border-primary transition-colors"
                      value={form.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    Subject
                  </label>
                  <Input 
                    type="text" 
                    name="subject"
                    placeholder="What’s on your mind?"
                    className="w-full h-12 px-4 border-2 border-primary/20 rounded-xl focus:border-primary transition-colors"
                    value={form.subject}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-3">
                    Message
                  </label>
                  <Textarea 
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-primary/20 rounded-xl focus:border-primary transition-colors resize-none"
                    value={form.message}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <Button 
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;