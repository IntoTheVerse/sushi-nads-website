import React from 'react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
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
  );
}
