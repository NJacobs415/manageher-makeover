import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Window.gtag type is declared in src/lib/analytics.ts

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-LJ6XE6JK2L', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
}
