import React from 'react';
import styles from '../styles/HowToPlay.module.css';

const steps = [
  {
    title: 'Mint your Chef',
    body: 'Log in with email, Google or X and mint your Chef on Monad. Your progress, energy and scores live onchain.',
  },
  {
    title: 'Cook & deliver',
    body: 'Grab, chop and roll against the clock. Orders stack up fast, so keep the pass moving and never let anything burn.',
    keys: ['W', 'A', 'S', 'D', 'E', 'F'],
  },
  {
    title: 'Climb the board',
    body: 'Every session is scored and written onchain. Outcook the best chefs of the season and take the top spot.',
  },
];

export default function HowToPlay() {
  return (
    <section className={styles.section} id="how-to-play" aria-labelledby="how-to-play-title">
      <h2 className={styles.title} id="how-to-play-title">How the kitchen works</h2>
      <p className={styles.subtitle}>Three steps from new hire to head chef.</p>

      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li className={styles.card} key={step.title}>
            <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
            <h3 className={styles.cardTitle}>{step.title}</h3>
            <p className={styles.cardBody}>{step.body}</p>
            {step.keys && (
              <div className={styles.keys} aria-label="Controls: W A S D to move, E to grab, F to chop">
                {step.keys.map((key) => (
                  <kbd className={styles.key} key={key}>{key}</kbd>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
