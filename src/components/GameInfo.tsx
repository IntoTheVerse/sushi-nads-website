import React from 'react';
import styles from '../styles/GameInfo.module.css';

export default function GameInfo() {
  return (
    <>
      <div className={styles.desktopSpacer}></div> 
      
      <div className={styles.gameInfoSection}>
        <div className={styles.gameInfoTitle}>Outcook everyone on Monad</div>
        <div className={styles.gameInfoDesc}>
          Cook sushi and deliver under pressure. Bend time. Every order counts. Overcook and you&apos;re done. Your Chef and your scores live on monad. <br /><br /><b>Fast, frantic, competitive and fully onchain.</b>
        </div>
        {/* <div className={styles.infoLabel}>Game Info</div> */}
        <div className={styles.buttonGroup}>
          <img src="/img/ply_andr_btn 1.png" className={styles.playBtn} alt="Play on Android" />
          <img src="/img/ply_web_btn 1.png" className={styles.playBtn} alt="Play on Web" />
        </div>
      </div>
    </>
  );
}
