'use client';

import React, { useEffect, useRef } from 'react';
import styles from '../styles/LeftPanel.module.css';
import ScrollIndicator from './ScrollIndicator';

export default function LeftPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {
        // Some browsers delay autoplay until metadata is loaded.
      });
    }
  }, []);

  return (
    <div className={styles.leftPanelWrapper}>
      <img src="/img/img-comp/confine.png" alt="frame confine overlay" className={styles.confineOverlay} />
      <img src="/img/img-comp/mobile_frame 1.png" alt="mobile frame overlay" className={styles.mobileFrameOverlay} />
      <div className={styles.leftPanel}>
        <video
          ref={videoRef}
          className={styles.imageCanvas}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/website-gif/sushi-sequence-poster.jpg"
        >
          <source src="/website-gif/sushi-sequence.mp4" type="video/mp4" />
          <source src="/website-gif/sushi-sequence.webm" type="video/webm" />
          <img src="/website-gif/sushi-sequence-poster.jpg" alt="Sushi Nads preview" />
        </video>
      </div>
      <ScrollIndicator />
    </div>
  );
}
