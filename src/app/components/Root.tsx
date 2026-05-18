import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { StickyBookButton } from './StickyBookButton';
import { WhatsAppButton } from './WhatsAppButton';
import { CallButton } from './CallButton';
import { SeoManager } from './SeoManager';

export function Root() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SeoManager />
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
      <StickyBookButton />
      <CallButton />
      <WhatsAppButton />
    </div>
  );
}
