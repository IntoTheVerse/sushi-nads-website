'use client';

import React from 'react';
import styles from '../styles/LeftPanel.module.css';
import ScrollIndicator from './ScrollIndicator';

export default function LeftPanel() {
  return (
    <div className={styles.leftPanelWrapper}>
      <img src="/img/img-comp/confine.png" alt="frame confine overlay" className={styles.confineOverlay} />
      <img src="/img/img-comp/mobile_frame 1.png" alt="mobile frame overlay" className={styles.mobileFrameOverlay} />
      <div className={styles.leftPanel}>
        <video
          className={styles.imageCanvas}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/website-gif/sushi-sequence-poster.jpg"
        >
          <source src="/website-gif/sushi-sequence.webm" type="video/webm" />
          <source src="/website-gif/sushi-sequence.mp4" type="video/mp4" />
          <img src="/website-gif/sushi-sequence-poster.jpg" alt="Sushi Nads preview" />
        </video>
      </div>
      <ScrollIndicator />
    </div>
  );
}
