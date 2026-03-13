'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last Updated: March 13, 2026</p>

            <section className="space-y-8 prose prose-gray dark:prose-invert max-w-none">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
                <p>
                  Welcome to Nity Pulse. We respect your privacy and are committed to protecting your personal data. 
                  This Privacy Policy will inform you as to how we look after your personal data when you visit our website 
                  (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
                <p>
                  We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                  <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                  <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
                  <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                  <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. 
                  Cookies are files with small amount of data which may include an anonymous unique identifier. 
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Disclosure</h2>
                <p>
                  We may share your personal information in the following situations:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                  <li><strong>For Business Transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                  <li><strong>With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Data Security</h2>
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the Internet, 
                  or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to 
                  protect your personal data, we cannot guarantee its absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Your Data Protection Rights</h2>
                <p>
                  Depending on your location, you may have the following rights regarding your personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>The right to access, update or delete the information we have on you.</li>
                  <li>The right of rectification.</li>
                  <li>The right to object.</li>
                  <li>The right of restriction.</li>
                  <li>The right to data portability.</li>
                  <li>The right to withdraw consent.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Changes to this Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, you can contact us:
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
