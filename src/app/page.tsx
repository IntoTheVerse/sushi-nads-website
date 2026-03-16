'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
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
    <div className={styles.container}>
      {/* Header spanning right side behind diagonal clip */}
      <div className={styles.headerArea}>
        <img src="/img/header.png" className={styles.headerBg} alt="header bg" />
      </div>

      <div className={styles.logoWrapper}>
        <img src="/img/logo_high_res.png" className={styles.headerLogo} alt="Sushi Nads Logo" />
      </div>

      <div className={styles.mainArea}>
        <div className={styles.textureBg}></div>
        {/* The highlighted left panel area containing the image sequence loop */}
        <div className={styles.leftPanelWrapper}>
          <img src="/img/confine.png" alt="frame confine overlay" className={styles.confineOverlay} />
          <div className={styles.leftPanel}>
             <img ref={imgRef} alt="sequence" className={styles.imageCanvas} />
          </div>
        </div>

        {/* The right panel UI with exact vertical mapping to bands */}
        <div className={styles.rightPanel}>
          <div style={{ height: '230px' }}></div> {/* Spacer for Band 1 */}
          
          <div className={styles.gameInfoSection}>
            <div className={styles.gameInfoTitle}>Outcook everyone on Monad</div>
            <div className={styles.gameInfoDesc}>
              Cook sushi and deliver under pressure. Bend time. Every order counts. Overcook and you&apos;re done. Your Chef and your scores live on monad. <br /><br /><b>Fast, frantic, competitive and fully onchain.</b>
            </div>
            <div className={styles.buttonGroup}>
              <img src="/img/ply_andr_btn 1.png" className={styles.playBtn} alt="Play on Android" />
              <img src="/img/ply_web_btn 1.png" className={styles.playBtn} alt="Play on Web" />
            </div>
          </div>
          
          <div className={styles.comingSoonSection}>
            <div className={styles.soonTitle}>COMING SOON...</div>
          </div>

          <div className={styles.passSection}>
            <div className={styles.card}>
              <div className={styles.shineContainer}></div>
              <img src="/img/pass.png" alt="Sushi Nads Pass" className={styles.passImg} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.newsletter}>
          <span>Subscribe to newsletter with email</span>
          <div className={styles.newsletterControls}>
            <div className={styles.inputWrapper}>
              <img src="/img/box 3.png" className={styles.inputBg} alt="input box background" />
              <input type="email" placeholder="ENTER EMAIL..." className={styles.emailInput} />
            </div>
            <button className={styles.subscribeBtn}>
              <img src="/img/subs_btn 1.png" alt="Subscribe" />
            </button>
          </div>
        </div>

        <div className={styles.attribution}>
          Built on <img src="/img/monad.png" alt="Monad" className={styles.attrLogo} /> by <img src="/img/intotheverse.png" alt="IntoTheVerse Games" className={styles.attrLogo} />
        </div>

        <div className={styles.socials}>
          <a href="https://discord.gg/w94EVQRPRf" target="_blank" rel="noopener noreferrer">
            <img src="/img/discord 1.png" className={styles.socialIcon} alt="Discord" />
          </a>
          <a href="https://x.com/sushinads" target="_blank" rel="noopener noreferrer">
            <img src="/img/x.png" className={styles.socialIcon} alt="X (formerly Twitter)" />
          </a>
        </div>
      </div>
    </div>
  );
}
