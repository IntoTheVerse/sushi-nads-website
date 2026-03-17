import React from 'react';
import styles from '../styles/ScrollIndicator.module.css';

export default function ScrollIndicator() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.scrollIndicator} onClick={scrollToBottom}>
      <span className={styles.scrollText}>SCROLL</span>
      <div className={styles.arrow}></div>
    </div>
  );
}
