'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Preloader.module.css';

export default function Preloader() {
  const spriteRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    let frame = 0;
    const totalFrames = 93;
    const frameSize = 300; // Updated to match displayed container size
    const cols = 10;
    
    let rafId: number;
    const fps = 30; // Aiming for a smooth animation
    const interval = 1000 / fps;
    let lastTime = performance.now();

    const animate = (time: number) => {
      rafId = requestAnimationFrame(animate);
      const deltaTime = time - lastTime;

      if (deltaTime >= interval) {
        lastTime = time - (deltaTime % interval);

        if (spriteRef.current) {
          const col = frame % cols;
          const row = Math.floor(frame / cols);
          
          spriteRef.current.style.backgroundPosition = `-${col * frameSize}px -${row * frameSize}px`;
        }

        frame = (frame + 1) % totalFrames;
      }
    };

    rafId = requestAnimationFrame(animate);

    // 5 second timer to redirect
    const timer = setTimeout(() => {
      router.push('/home');
    }, 8000);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className={styles.preloaderContainer}>
      <div className={styles.textureOverlay}></div>
      <div className={styles.spriteWrapper}>
        <div className={styles.glow}></div>
        <div ref={spriteRef} className={styles.sprite}></div>
      </div>
    </div>
  );
}
