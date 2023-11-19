import './globals.css';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/providers/modal-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ToasterProvider } from '@/providers/toast-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
