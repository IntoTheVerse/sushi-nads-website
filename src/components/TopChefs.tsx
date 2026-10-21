'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/TopChefs.module.css';

type Ranking = {
  rank: number;
  player: string;
  playerName: string;
  score: number;
};

type LeaderboardData = {
  healthy: boolean;
  rankings: Ranking[];
  stats: {
    totalSessions: number;
    totalPlayers: number;
    currentSeason: number;
  } | null;
};

const EXPLORER_URL = 'https://testnet.monadexplorer.com/address';
const MEDALS = ['#ffd166', '#d8dee9', '#e8a06b'];

const shortAddress = (address: string) => `${address.slice(0, 6)}…${address.slice(-4)}`;

export default function TopChefs() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    fetch('/api/leaderboard')
      .then((response) => response.json())
      .then((payload: LeaderboardData) => {
        if (cancelled) return;
        setData(payload);
        setStatus(payload.healthy ? 'ready' : 'error');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = data?.stats;
  const rankings = data?.rankings ?? [];

  return (
    <section className={styles.section} id="top-chefs" aria-labelledby="top-chefs-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <span
            className={`${styles.statusPill} ${status === 'error' ? styles.statusClosed : ''}`}
            role="status"
          >
            <span className={styles.statusDot} aria-hidden="true"></span>
            {status === 'loading' ? 'Checking the kitchen…' : status === 'ready' ? 'Kitchen is open' : 'Kitchen closed'}
          </span>

          <h2 className={styles.title} id="top-chefs-title">Top Chefs</h2>
          <p className={styles.subtitle}>
            Live from the Monad leaderboard. Every score below was cooked, served and written onchain.
          </p>

          <dl className={styles.stats}>
            <div className={styles.stat}>
              <dt>Sessions cooked</dt>
              <dd>{stats ? stats.totalSessions.toLocaleString() : '—'}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Chefs on the board</dt>
              <dd>{stats ? stats.totalPlayers.toLocaleString() : '—'}</dd>
            </div>
            <div className={styles.stat}>
              <dt>Season</dt>
              <dd>{stats ? stats.currentSeason : '—'}</dd>
            </div>
          </dl>

          <div className={styles.cta}>
            <span className={styles.ctaText}>Think you can outcook them?</span>
            <Link href="/web" className={styles.ctaLink}>
              <img src="/img/img-comp/ply_web_btn 1.png" className={styles.ctaBtn} alt="Play on Web" />
            </Link>
          </div>
        </div>

        <div className={styles.board}>
          <div className={styles.boardHeader}>
            <span>Rank</span>
            <span>Chef</span>
            <span className={styles.alignRight}>Score</span>
          </div>

          {status === 'loading' && (
            <ol className={styles.rows} aria-busy="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <li className={`${styles.row} ${styles.skeleton}`} key={index}></li>
              ))}
            </ol>
          )}

          {status === 'error' && (
            <p className={styles.empty}>
              The scoreboard is cooling down. Check back in a few minutes.
            </p>
          )}

          {status === 'ready' && rankings.length === 0 && (
            <p className={styles.empty}>No scores yet this season. The top spot is wide open.</p>
          )}

          {status === 'ready' && rankings.length > 0 && (
            <ol className={styles.rows}>
              {rankings.map((entry) => (
                <li className={styles.row} key={`${entry.player}-${entry.rank}`}>
                  <span
                    className={styles.rank}
                    style={entry.rank <= 3 ? { background: MEDALS[entry.rank - 1], color: '#2d1854' } : undefined}
                  >
                    {entry.rank}
                  </span>
                  <span className={styles.chef}>
                    <span className={styles.chefName}>{entry.playerName || 'Anonymous Chef'}</span>
                    <a
                      href={`${EXPLORER_URL}/${entry.player}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.address}
                    >
                      {shortAddress(entry.player)}
                    </a>
                  </span>
                  <span className={styles.score}>{entry.score.toLocaleString()}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}
