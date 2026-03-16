import styles from '../styles/page.module.css';

import Header from '../components/Header';
import LeftPanel from '../components/LeftPanel';
import GameInfo from '../components/GameInfo';
import ComingSoon from '../components/ComingSoon';
import PassSection from '../components/PassSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.mainArea}>
        <div className={styles.textureBg}></div>
        <LeftPanel />

        {/* The right panel UI with exact vertical mapping to bands */}
        <div className={styles.rightPanel}>
          <GameInfo />
          <ComingSoon />
          <PassSection />
        </div>
      </div>

      <Footer />
    </div>
  );
}
