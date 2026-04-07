'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={styles.headerArea}>
        <img 
          src="/img/img-comp/header.png" 
          className={`${styles.headerBg} ${isScrolled ? styles.scrolled : ''}`} 
          alt="header bg" 
        />
      </div>
      <Link href="/home" className={`${styles.logoWrapper} ${isScrolled ? styles.scrolled : ''}`} aria-label="Go to home page">
        <img src="/img/img-comp/logo_high_res.png" className={styles.headerLogo} alt="Sushi Nads Logo" />
      </Link>
    </>
  );
}
