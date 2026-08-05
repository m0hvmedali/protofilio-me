import type {Metadata} from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'Executive Portfolio | Premium Services',
  description: 'Premium Portfolio Web Application and Services Platform.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-primary selection:bg-accent selection:text-background" suppressHydrationWarning>{children}</body>
    </html>
  );
}
