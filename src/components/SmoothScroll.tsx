'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.15, 
      duration: 0.7, 
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 2.5, /* Makes small movements cover more distance */
      touchMultiplier: 2.5,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    }}>
      {children}
    </ReactLenis>
  );
}
