import React from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <>
      <div className={styles.headerArea}>
        <img src="/img/header.png" className={styles.headerBg} alt="header bg" />
      </div>
      <div className={styles.logoWrapper}>
        <img src="/img/logo_high_res.png" className={styles.headerLogo} alt="Sushi Nads Logo" />
      </div>
    </>
  );
}
