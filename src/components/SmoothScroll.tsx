'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useState, useEffect } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ReactLenis root options={{ 
      lerp: 0.15, 
      duration: 0.7, 
      smoothWheel: isMobile, // Disable smooth wheel on desktop
      syncTouch: isMobile,   // Disable touch sync on desktop
      wheelMultiplier: 2.5,
      touchMultiplier: 2.5,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    }}>
      {children}
    </ReactLenis>
  );
}
