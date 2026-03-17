'use client';

import React, { useState } from 'react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    // Safety check for the environment variable
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
    if (!scriptUrl || scriptUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
      console.warn('Newsletter script URL is not configured in .env.local');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Since we use no-cors, we won't see the JSON result, but we can assume success if no error is thrown
      setStatus('success');
      setEmail('');
      
      // Reset back to idle after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
    }
  };

  return (
    <div className={styles.bottomBar}>
      <div className={styles.newsletter}>
        <span className={styles.pulseText}>
          {status === 'success' ? 'THANKS FOR SUBSCRIBING!' : 
           status === 'error' ? 'TRY AGAIN LATER' : 
           'Subscribe to newsletter with email'}
        </span>
        <form className={styles.newsletterControls} onSubmit={handleSubscribe}>
          <div className={styles.inputWrapper}>
            <img src="/img/img-comp/box 3.png" className={styles.inputBg} alt="input box background" />
            <input 
              type="email" 
              placeholder="ENTER EMAIL..." 
              className={styles.emailInput} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              required
            />
          </div>
          <button 
            type="submit" 
            className={styles.subscribeBtn} 
            disabled={status === 'loading'}
            style={{ opacity: status === 'loading' ? 0.5 : 1 }}
          >
            <img src="/img/img-comp/subs_btn 1.png" alt="Subscribe" />
          </button>
        </form>
      </div>

      <div className={styles.attribution}>
        Built on <img src="/img/img-comp/monad.png" alt="Monad" className={styles.attrLogo} /> by <img src="/img/img-comp/intotheverse.png" alt="IntoTheVerse Games" className={styles.attrLogo} />
      </div>

      <div className={styles.socials}>
        <a href="https://discord.gg/w94EVQRPRf" target="_blank" rel="noopener noreferrer">
          <img src="/img/img-comp/discord 1.png" className={styles.socialIcon} alt="Discord icon" />
        </a>
        <a href="https://x.com/sushinads" target="_blank" rel="noopener noreferrer">
          <img src="/img/img-comp/x.png" className={styles.socialIcon} alt="X icon" />
        </a>
      </div>
    </div>
  );
}
