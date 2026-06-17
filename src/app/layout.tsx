import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { JotaiProvider } from '@/components/providers/JotaiProvider';
import { SiteHeader } from '@/components/layout/SiteHeader';
import './globals.css';

const inter = localFont({
  src: [
    {
      path: '../assets/fonts/poly-inter-variable-font.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/poly-inter.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  title: {
    default: 'Polymarket',
    template: '%s | Polymarket',
  },
  description: 'Prediction markets platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full antialiased`}
    >
      <body className="flex h-full flex-col overflow-hidden bg-background text-foreground">
        <JotaiProvider>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </JotaiProvider>
      </body>
    </html>
  );
}
