import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Register - Nity Pulse',
  description: 'Create a new account to get started with Nity Pulse.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
