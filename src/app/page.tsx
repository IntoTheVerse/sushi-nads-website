'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    // We will preload all 300 images
    // Note: for production, a sprite sheet or video might be more optimal,
    // but for this barebones prototype, an image sequence is used exactly as requested.
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= 300; i++) {
      const img = new Image();
      const formattedNumber = i.toString().padStart(3, '0');
      img.src = `/image-seq/ezgif-frame-${formattedNumber}.png`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let frame = 0;
    
    // We aim for approx 30 FPS.
    const fps = 30;
    const interval = 1000 / fps;
    let lastTime = performance.now();

    const render = (time: number) => {
      rafId = requestAnimationFrame(render);
      const deltaTime = time - lastTime;
      
      if (deltaTime >= interval) {
        lastTime = time - (deltaTime % interval);
        
        const img = images[frame];
        if (img && img.complete && img.naturalWidth > 0) {
          if (canvas.width !== img.naturalWidth) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        frame = (frame + 1) % images.length;
      }
    };
    
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [images]);

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        {/* The highlighted left panel area containing the image sequence loop */}
        <div className={styles.leftPanelWrapper}>
          <div className={styles.leftPanel}>
             <canvas ref={canvasRef} className={styles.imageCanvas} />
          </div>
        </div>

        {/* The right panel UI with placeholders */}
        <div className={styles.rightPanel}>
          <div className={styles.gameInfo}>Game Info</div>
          <div className={styles.buttonGroup}>
            <button className={styles.btn}>Play on Android</button>
            <button className={styles.btn}>Play on Web</button>
          </div>
          
          <div className={styles.comingSoon}>
            <div className={styles.soonTitle}>COMING SOON...</div>
            <div className={styles.card}>
              <h3 style={{
                color: '#ffe54e', 
                fontSize: '28px', 
                fontStyle: 'italic', 
                fontWeight: 900,
                zIndex: 2,
                textShadow: '2px 2px 0px #d8167e'
              }}>
                SUSHI NADS PASS
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.newsletter}>
          <span>Subscribe to newsletter with email</span>
          <input type="email" placeholder="ENTER EMAIL..." className={styles.emailInput} />
          <button className={styles.subscribeBtn}>Subscribe</button>
        </div>
        <div className={styles.socials}>
          <div className={styles.icon} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 900, color: '#3b1980'}}>D</div>
          <div className={styles.icon} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', fontWeight: 900, color: '#3b1980'}}>X</div>
        </div>
      </div>
    </div>
  );
}
