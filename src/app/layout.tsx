import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Nity Pulse',
  description:
    'Join Nity Pulse for innovative technology and design solutions. Subscribe to stay informed about our launch and exclusive updates.',
  keywords: ['Nity Pulse', 'technology', 'design', 'startup', 'coming soon'],
  openGraph: {
    title: 'Nity Pulse ',
    description:
      'Innovative technology and design solutions for collaborative teams and startups.',
    url: 'https://nity-pulse.vercel.app/',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
