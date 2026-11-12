import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PriceTicker } from '@/components/layout/PriceTicker';
import { mockTickerRates } from '@/data/mockData';

export const metadata: Metadata = {
  title: 'Paikari Bazar | বাংলাদেশের বৃহত্তম পাইকারী ও স্ক্র্যাপ মার্কেটপ্লেস',
  description: 'Bangladesh’s largest B2B wholesale and scrap marketplace. Verified sellers, live scrap metal & battery rates, and secure wholesale transactions.',
  keywords: [
    'Paikari Bazar',
    'Scrap marketplace Bangladesh',
    'Battery scrap wholesale Dhaka',
    'Pure lead price Bangladesh',
    'B2B wholesale Bangladesh',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-brand-orange selection:text-white">
        {/* Live Scrap Price Ticker Bar */}
        <div className="hidden lg:block">
          <PriceTicker rates={mockTickerRates} />
        </div>

        {/* Global Navigation Bar */}
        <Navbar />

        {/* Mobile: ticker sits below the navbar */}
        <div className="lg:hidden">
          <PriceTicker rates={mockTickerRates} />
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

