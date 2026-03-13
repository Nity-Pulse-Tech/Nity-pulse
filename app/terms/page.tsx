'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last Updated: March 13, 2026</p>

            <section className="space-y-8 prose prose-gray dark:prose-invert max-w-none">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using the Nity Pulse website and services, you agree to be bound by these Terms of Service 
                  and all terms incorporated by reference. If you do not agree to all of these terms, do not use our website 
                  or services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
                <p>
                  Nity Pulse provides technology and design solutions, including web development, mobile applications, 
                  branding, and digital strategy. We reserve the right to modify or discontinue any aspect of our services 
                  at any time without notice.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Responsibilities</h2>
                <p>
                  You are responsible for your use of the Service and for any consequences thereof. You agree to use the 
                  Service only for purposes that are legal, proper and in accordance with these Terms and any applicable 
                  regulations or laws.
                </p>
                <p className="mt-4">
                  Users are prohibited from:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Engaging in any automated use of the system, such as using scripts to send comments or messages.</li>
                  <li>Interfering with, disrupting, or creating an undue burden on the Service or the networks or services connected to the Service.</li>
                  <li>Attempting to impersonate another user or person.</li>
                  <li>Using the Service as part of any effort to compete with us.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Intellectual Property Rights</h2>
                <p>
                  Unless otherwise indicated, the Service is our proprietary property and all source code, databases, 
                  functionality, software, website designs, audio, video, text, photographs, and graphics on the Service 
                  (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") 
                  are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice 
                  or liability, under our sole discretion, for any reason whatsoever and without limitation, including but 
                  not limited to a breach of the Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Limitation of Liability</h2>
                <p>
                  In no event shall Nity Pulse, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential or punitive damages, including without 
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your 
                  access to or use of or inability to access or use the Service; (ii) any conduct or content of any third 
                  party on the Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Disclaimer</h2>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. 
                  The Service is provided without warranties of any kind, whether express or implied, including, but not 
                  limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or 
                  course of performance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Cameroon, without regard to 
                  its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be 
                  considered a waiver of those rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
                  is material we will try to provide at least 30 days notice prior to any new terms taking effect. 
                  What constitutes a material change will be determined at our sole discretion.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>By email: contact@nitypulse.com</li>
                  <li>By visiting this page on our website: /#contact</li>
                </ul>
              </div>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
