'use client';

import React, { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/WebPage.module.css';

export default function WebGame() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'controls' | 'instructions'>('controls');

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      if (wrapperRef.current) {
        if (wrapperRef.current.requestFullscreen) {
          wrapperRef.current.requestFullscreen();
        } else if ((wrapperRef.current as any).webkitRequestFullscreen) { 
          (wrapperRef.current as any).webkitRequestFullscreen();
        } else if ((wrapperRef.current as any).msRequestFullscreen) { 
          (wrapperRef.current as any).msRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.textureBg}></div>
      <Header />
      
      <main className={styles.contentArea}>
        
        {/* Desktop WebGL Player and Instructions */}
        <div className={styles.gameWrapper}>
          
          <div ref={wrapperRef} className={styles.iframeWrapper}>
            <button 
              className={styles.fullscreenBtn} 
              onClick={handleFullscreenToggle}
              title={isFullscreen ? "Exit Fullscreen" : "Expand to Fullscreen"}
            >
              {isFullscreen ? (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              )}
            </button>
            <iframe 
              src="/unity-build/index.html" /* Hosted WebGL build root */
              className={styles.unityFrame}
              title="Sushi Nads WebGL Game"
              allowFullScreen
              scrolling="no"
            ></iframe>
          </div>
          
          <div className={styles.kitchenMenu}>
            <div className={styles.menuTitle}>Kitchen Orders</div>

            <div className={styles.tabGroup} role="tablist" aria-label="Kitchen guide sections">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'controls'}
                className={`${styles.tabBtn} ${activeTab === 'controls' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('controls')}
              >
                Controls
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'instructions'}
                className={`${styles.tabBtn} ${activeTab === 'instructions' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('instructions')}
              >
                Instructions
              </button>
            </div>

            {activeTab === 'controls' ? (
              <ul className={styles.instructionList}>
                <li>Move with <span className={styles.keyLabel}>W</span> <span className={styles.keyLabel}>A</span> <span className={styles.keyLabel}>S</span> <span className={styles.keyLabel}>D</span>.</li>
                <li>Grab or drop items with <span className={styles.keyLabel}>E</span>.</li>
                <li>Chop ingredients with <span className={styles.keyLabel}>F</span>.</li>
                <li>Use on-screen buttons if you are not on keyboard.</li>
              </ul>
            ) : (
              <ul className={styles.instructionList}>
                <li>Tap Controller (bottom left corner) for a quick tutorial with no onchain actions.</li>
                <li>Tap Play to cook and deliver sushi onchain.</li>
                <li>Tap Avatar (top-left) to open your player profile.</li>
                <li>Tap Chef Hat button (below) for the live Monad leaderboard to see where your skills rank.</li>
                <li>Low energy? Refill it and stay in the kitchen using the (+) icon on the energy bar.</li>
                <li>Refills are currently free in this build (no USDC charged, even if the prompt says so).</li>
                <li>The game server covers your Monad transaction fees.</li>
              </ul>
            )}
            
            <div className={styles.punText}>Time to serve up some un-roll-evably good sushi! Don't let the pressure boil over! 🍣🔥</div>
          </div>
          
        </div>

        {/* Mobile Fallback Message */}
        <div className={styles.mobileMessage}>
          <div className={styles.mobileTitle}>Too Spicy for Small Screens!</div>
          <div className={styles.mobileDesc}>
            Web Mode not available on mobile screens. Switch to your Desktop screen to outcook everyone on Monad.
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
