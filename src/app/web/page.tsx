'use client';

import React, { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../styles/WebPage.module.css';

export default function WebGame() {
  type FullscreenCapableIframe = HTMLIFrameElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
  };

  type FullscreenCapableDocument = Document & {
    webkitExitFullscreen?: () => Promise<void> | void;
    msExitFullscreen?: () => Promise<void> | void;
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'controls' | 'instructions'>('controls');
  const [apiHealthy, setApiHealthy] = useState(true);
  const [isHealthChecking, setIsHealthChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkApiHealth = async (showLoading = false) => {
      if (showLoading) setIsHealthChecking(true);

      try {
        const response = await fetch('/api/backend-health', {
          method: 'GET',
          cache: 'no-store',
        });
        const data = await response.json();
        if (!cancelled) {
          setApiHealthy(Boolean(data?.healthy));
        }
      } catch {
        if (!cancelled) {
          setApiHealthy(false);
        }
      } finally {
        if (!cancelled) {
          setIsHealthChecking(false);
        }
      }
    };

    checkApiHealth(true);
    const intervalId = window.setInterval(() => checkApiHealth(false), 60000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

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

  const requestEmbeddedFullscreen = () => {
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow) return;

    iframeWindow.postMessage(
      { type: 'SUSHI_NADS_FULLSCREEN' },
      window.location.origin
    );
  };

  const handleFullscreenToggle = async () => {
    if (!document.fullscreenElement) {
      const iframeEl = iframeRef.current as FullscreenCapableIframe | null;
      if (!iframeEl) return;

      if (iframeEl.requestFullscreen) {
        await iframeEl.requestFullscreen();
      } else if (iframeEl.webkitRequestFullscreen) {
        iframeEl.webkitRequestFullscreen();
      } else if (iframeEl.msRequestFullscreen) {
        iframeEl.msRequestFullscreen();
      }

      // Unity WebGL loader may initialize a moment later; fire twice for reliability.
      requestEmbeddedFullscreen();
      window.setTimeout(requestEmbeddedFullscreen, 250);
    } else {
      const fullscreenDocument = document as FullscreenCapableDocument;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (fullscreenDocument.webkitExitFullscreen) {
        fullscreenDocument.webkitExitFullscreen();
      } else if (fullscreenDocument.msExitFullscreen) {
        fullscreenDocument.msExitFullscreen();
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
          
          <div className={styles.iframeWrapper}>
            {apiHealthy && (
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
            )}

            {apiHealthy ? (
              <iframe
                ref={iframeRef}
                src="/unity-build/index.html" /* Hosted WebGL build root */
                className={styles.unityFrame}
                title="Sushi Nads WebGL Game"
                allowFullScreen
                scrolling="no"
              ></iframe>
            ) : (
              <div className={styles.maintenanceCard}>
                <div className={styles.maintenanceTitle}>Kitchen Closed for Maintenance</div>
                <div className={styles.maintenanceBody}>
                  Our chefs are sharpening knives and tuning the burners. Please come back in a little while.
                </div>
                <div className={styles.maintenanceSubtext}>
                  Status: API is temporarily unavailable.
                </div>
              </div>
            )}

            {isHealthChecking && (
              <div className={styles.healthCheckingBadge}>Checking kitchen status...</div>
            )}
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
            
            <div className={styles.punText}>Time to serve up some un-roll-evably good sushi! Don&apos;t let the pressure boil over! 🍣🔥</div>
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
