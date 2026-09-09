export type TeamId = 'a' | 'b';

export type HistoryKind =
  | 'turn_win'
  | 'fold'
  | 'orbi_refuse'
  | 'adjust'
  | 'reset';

export type HistoryEntry = {
  id: string;
  kind: HistoryKind;
  team: TeamId;
  points: number;
  stake: number;
  note: string;
  scoreAAfter: number;
  scoreBAfter: number;
};

export type TargetScore = 11 | 16 | 21;

export const TARGET_OPTIONS: TargetScore[] = [11, 16, 21];

export type MatchState = {
  teamAName: string;
  teamBName: string;
  scoreA: number;
  scoreB: number;
  /** Meta della partita (11 / 16 / 21). */
  targetScore: TargetScore;
  stake: number;
  isOrbi: boolean;
  orbiCaller: TeamId | null;
  turnActive: boolean;
  winner: TeamId | null;
  history: HistoryEntry[];
  started: boolean;
  /** Vazas do turno atual (0–3). Só visual/ajuda na mesa. */
  tricksA: number;
  tricksB: number;
  /** Partite vinte nella serie (meglio di 3, 5...). Sale a ogni rivincita. */
  matchesWonA: number;
  matchesWonB: number;
};

/** Default classico; la partita può usare 11 o 16. */
export const TARGET_SCORE = 21;
/** Soglia X classica (21 − 2). Usare xMarkFor(target) in partita. */
export const NINETEEN_MARK = 19;
export const BASE_STAKE = 2;
export const POST_NINETEEN_BASE = 3;
export const MAX_TRICKS = 3;

/** X due punti prima della meta (19→21, 14→16, 9→11). */
export function xMarkFor(target: TargetScore): number {
  return target - 2;
}

function isTargetScore(n: unknown): n is TargetScore {
  return n === 11 || n === 16 || n === 21;
}

/** Garante campos novos em partidas salvas de versões antigas. */
export function normalizeMatch(raw: Partial<MatchState> | null | undefined): MatchState {
  const base = createInitialMatch();
  if (!raw) return base;
  return {
    ...base,
    ...raw,
    targetScore: isTargetScore(raw.targetScore) ? raw.targetScore : base.targetScore,
    tricksA: typeof raw.tricksA === 'number' ? raw.tricksA : 0,
    tricksB: typeof raw.tricksB === 'number' ? raw.tricksB : 0,
    matchesWonA: typeof raw.matchesWonA === 'number' ? raw.matchesWonA : 0,
    matchesWonB: typeof raw.matchesWonB === 'number' ? raw.matchesWonB : 0,
    history: Array.isArray(raw.history) ? raw.history : [],
  };
}

export function createInitialMatch(
  teamAName = 'Coppia A',
  teamBName = 'Coppia B',
  targetScore: TargetScore = TARGET_SCORE,
): MatchState {
  return {
    teamAName,
    teamBName,
    scoreA: 0,
    scoreB: 0,
    targetScore,
    stake: BASE_STAKE,
    isOrbi: false,
    orbiCaller: null,
    turnActive: false,
    winner: null,
    history: [],
    started: false,
    tricksA: 0,
    tricksB: 0,
    matchesWonA: 0,
    matchesWonB: 0,
  };
}
