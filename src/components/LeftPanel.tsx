'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../styles/LeftPanel.module.css';

export default function LeftPanel() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let frame = 1;
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
            const formattedNumber = frame.toString().padStart(3, '0');
            imgRef.current.src = `/image-seq/ezgif-frame-${formattedNumber}.png`;
        }
        frame = frame % 300 + 1;
      }
    };
    
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={styles.leftPanelWrapper}>
      <img src="/img/confine.png" alt="frame confine overlay" className={styles.confineOverlay} />
      <img src="/img/mobile_frame 1.png" alt="mobile frame overlay" className={styles.mobileFrameOverlay} />
      <div className={styles.leftPanel}>
         <img ref={imgRef} alt="sequence" className={styles.imageCanvas} />
      </div>
    </div>
  );
}
