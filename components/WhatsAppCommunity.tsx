
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, ArrowRight, CheckCircle, MessageSquare, Bell } from 'lucide-react';
import { dashboardService } from '@/lib/services/dashboardService';
import { toast } from 'sonner';
import { isAxiosError } from '@/utils/errorUtils';

const WhatsAppCommunity = () => {
  const [companyInfo, setCompanyInfo] = useState({
    phones: ['+33 6 05 50 85 42'],
  });

  useEffect(() => {
    const fetchCompanySettings = async () => {
      try {
        const settings = await dashboardService.getCompanySettings();
        setCompanyInfo({
          phones: settings.phones || ['+33 6 05 50 85 42'],
        });
      } catch (error: unknown) {
        console.error('Failed to fetch company settings:', error);
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error('Authentication failed. Please log in to update company settings.');
          } else if (error.response?.status === 404) {
            toast.info('No company settings found. Using default contact information.');
          } else {
            console.error(error);
            toast.error('Failed to fetch company settings.');
          }
        } else {
          toast.error('Failed to fetch company settings.');
        }
      }
    };

    fetchCompanySettings();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <MessageCircle size={16} className="mr-2" />
            Join Our Community
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connect With Us on WhatsApp
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join our WhatsApp community to get updates, share ideas, and collaborate with other innovators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* WhatsApp Group Card */}
          <div className="bg-primary-foreground/10 p-8 rounded-xl border border-primary-foreground/20 backdrop-blur-sm">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center">Community Group</h3>
            <p className="mb-6 text-primary-foreground/90 text-center">
              Join our interactive community group to discuss ideas, ask questions, and network with other members.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <CheckCircle size={20} className="text-secondary/80 mr-3" />
                <span>Real-time discussions</span>
              </li>
              <li className="flex items-center">
                <CheckCircle size={20} className="text-secondary/80 mr-3" />
                <span>Direct networking</span>
              </li>
              <li className="flex items-center">
                <CheckCircle size={20} className="text-secondary/80 mr-3" />
                <span>Quick responses</span>
              </li>
            </ul>
            <a
              href="https://chat.whatsapp.com/HmlT3FOKbq2E28Kt57oQzw"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                className="w-full bg-secondary text-white group flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300"
              >
                Join Group
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>

          {/* WhatsApp Channel Card */}
          <div className="bg-primary-foreground/10 p-8 rounded-xl border border-primary-foreground/20 backdrop-blur-sm">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Bell size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center">Updates Channel</h3>
            <p className="mb-6 text-primary-foreground/90 text-center">
              Follow our broadcast channel for official announcements, updates, and news without the chatter.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <CheckCircle size={20} className="text-secondary/80 mr-3" />
                <span>Official announcements</span>
              </li>
              <li className="flex items-center">
                <CheckCircle size={20} className="text-secondary/80 mr-3" />
                <span>No distractions</span>
              </li>
              <li className="flex items-center">
                <CheckCircle size={20} className="text-secondary/80 mr-3" />
                <span>Important updates only</span>
              </li>
            </ul>
            <a
              href="https://whatsapp.com/channel/0029VbAp7F0Jf05gKLM72H2D"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                className="w-full bg-secondary hover:bg-green-700 text-white group flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300"
              >
                Follow Channel
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-primary-foreground/80 flex items-center justify-center flex-wrap">
            <MessageSquare size={16} className="mr-2" />
            Can't access the links? Message us at&nbsp;
            {companyInfo.phones.map((phone, index) => (
              <span key={`phone-${index}`} className="inline-flex">
                <strong>{phone}</strong>
                {index < companyInfo.phones.length - 1 && <span>,&nbsp;</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCommunity;
