import { NextResponse } from "next/server";

const DEFAULT_API_BASE_URL = "https://api-sushinads.cryptara.world";

// Cache the upstream calls so page visitors don't hammer the game backend.
export const revalidate = 60;

type Ranking = {
  rank: number;
  player: string;
  playerName: string;
  score: number;
};

type GlobalStats = {
  totalSessions: number;
  totalPlayers: number;
  currentSeason: number;
};

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate },
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function GET() {
  const baseUrl = (process.env.API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, "");

  const [top, stats] = await Promise.all([
    fetchJson<{ rankings?: Ranking[] }>(`${baseUrl}/api/leaderboard/top?limit=25`),
    fetchJson<GlobalStats>(`${baseUrl}/api/leaderboard/global-stats`),
  ]);

  // The contract returns registered players with no runs as rank 0 / score 0.
  const rankings = (top?.rankings ?? [])
    .filter((entry) => entry.rank > 0 && entry.score > 0)
    .slice(0, 10)
    .map(({ rank, player, playerName, score }) => ({ rank, player, playerName, score }));

  return NextResponse.json(
    {
      healthy: top !== null || stats !== null,
      rankings,
      stats,
    },
    { status: 200 }
  );
}
