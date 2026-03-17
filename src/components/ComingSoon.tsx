import React from 'react';
import styles from '../styles/ComingSoon.module.css';

export default function ComingSoon() {
  return (
    <div className={styles.comingSoonSection} id="coming-soon">
      <div className={styles.soonTitle}>COMING SOON<span className={styles.dots}>...</span></div>
    </div>
  );
}
