import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function BlogDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <motion.section
      className="py-12 md:py-16 bg-background dark:bg-black min-h-screen transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 md:px-8">
        {children}
      </div>
    </motion.section>
  );
}
