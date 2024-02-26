import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/shared/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simple Quiz',
  description: 'Build simple quiz and take answers from users.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="shadow-md">
          <NavBar />
        </header>

        <main className="container py-4">{children}</main>
      </body>
    </html>
  );
}
