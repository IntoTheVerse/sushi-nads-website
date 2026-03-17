'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../styles/LeftPanel.module.css';
import ScrollIndicator from './ScrollIndicator';

export default function LeftPanel() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let frame = 0;
    let rafId: number;
    const fps = 30;
    const interval = 1000 / fps;
    let lastTime = performance.now();

    const render = (time: number) => {
      rafId = requestAnimationFrame(render);
      const deltaTime = time - lastTime;
      
      if (deltaTime >= interval) {
        lastTime = time - (deltaTime % interval);
        
        if (imgRef.current) {
            const formattedNumber = frame.toString().padStart(5, '0');
            imgRef.current.src = `/website-gif/website-gif_${formattedNumber}.jpg`;
        }
        frame = (frame + 1) % 338;
      }
    };
    
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={styles.leftPanelWrapper}>
      <img src="/img/img-comp/confine.png" alt="frame confine overlay" className={styles.confineOverlay} />
      <img src="/img/img-comp/mobile_frame 1.png" alt="mobile frame overlay" className={styles.mobileFrameOverlay} />
      <div className={styles.leftPanel}>
         <img ref={imgRef} alt="sequence" className={styles.imageCanvas} />
      </div>
      <ScrollIndicator />
    </div>
  );
}
