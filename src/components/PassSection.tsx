import React from 'react';
import styles from '../styles/PassSection.module.css';

export default function PassSection() {
  return (
    <div className={styles.passSection}>
      <div className={styles.card}>
        <div className={styles.shineContainer}></div>
        <img src="/img/pass.png" alt="Sushi Nads Pass" className={styles.passImg} />
      </div>
    </div>
  );
}
