import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PriceTicker } from '@/components/layout/PriceTicker';
import { BottomNav } from '@/components/layout/BottomNav';
import { GoogleTranslateLoader } from '@/components/layout/LanguageSwitcher';
import { PostDemandModal } from '@/components/buyer/PostDemandModal';
import { mockTickerRates } from '@/data/mockData';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Paikari Bazar | নতুন ও পুরাতন পাইকারি বাজার',
  description:
    'Global B2B wholesale marketplace for new and used goods. Verified suppliers, direct deals, live market rates for plate lead, used batteries and iron.',
  keywords: [
    'Paikari Bazar',
    'B2B wholesale marketplace',
    'Plate lead price',
    'Used battery wholesale',
    'Battery scrap wholesale Dhaka',
    'Pure lead price Bangladesh',
    'পাইকারি বাজার',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-brand-orange selection:text-white pb-16 lg:pb-0">
        {/* Free Google Translate (loads once; UI lives in the navbar) */}
        <GoogleTranslateLoader />

        <AuthProvider>
        {/* Market Rate Ticker Bar */}
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

        {/* Mobile bottom navigation + global "post demand" form */}
        <BottomNav />
        <PostDemandModal />
        </AuthProvider>
      </body>
    </html>
  );
}
