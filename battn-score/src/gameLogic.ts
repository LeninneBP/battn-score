import {
  BASE_STAKE,
  HistoryEntry,
  MatchState,
  MAX_TRICKS,
  POST_NINETEEN_BASE,
  TargetScore,
  TeamId,
  createInitialMatch,
  xMarkFor,
} from './types';

export { createInitialMatch } from './types';

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * La X non è un gettone: una coppia è in X finché il suo punteggio sta a due
 * punti dalla meta. Vale per entrambe le coppie e sparisce se si corregge il
 * punteggio verso il basso.
 */
export function isMarkedX(state: MatchState, team: TeamId): boolean {
  const score = team === 'a' ? state.scoreA : state.scoreB;
  return score >= xMarkFor(state.targetScore);
}

export function currentBaseStake(state: MatchState): number {
  return isMarkedX(state, 'a') || isMarkedX(state, 'b') ? POST_NINETEEN_BASE : BASE_STAKE;
}

function teamName(state: MatchState, team: TeamId): string {
  return team === 'a' ? state.teamAName : state.teamBName;
}

function clearTricks(state: MatchState): MatchState {
  return { ...state, tricksA: 0, tricksB: 0 };
}

function applyScore(
  state: MatchState,
  team: TeamId,
  points: number,
  kind: HistoryEntry['kind'],
  note: string,
  stake: number,
): MatchState {
  let scoreA = state.scoreA;
  let scoreB = state.scoreB;
  if (team === 'a') scoreA += points;
  else scoreB += points;

  const xMark = xMarkFor(state.targetScore);
  const anyMarked = scoreA >= xMark || scoreB >= xMark;

  let winner: TeamId | null = null;
  if (scoreA >= state.targetScore) winner = 'a';
  else if (scoreB >= state.targetScore) winner = 'b';

  const entry: HistoryEntry = {
    id: uid(),
    kind,
    team,
    points,
    stake,
    note,
    scoreAAfter: scoreA,
    scoreBAfter: scoreB,
  };

  return {
    ...state,
    scoreA,
    scoreB,
    winner,
    history: [entry, ...state.history],
    turnActive: false,
    isOrbi: false,
    orbiCaller: null,
    stake: anyMarked ? POST_NINETEEN_BASE : BASE_STAKE,
    tricksA: 0,
    tricksB: 0,
  };
}

export function setTargetScore(state: MatchState, targetScore: TargetScore): MatchState {
  // Nuova scelta dalla welcome: resetta la partita, tiene i nomi.
  return {
    ...createInitialMatch(state.teamAName, state.teamBName, targetScore),
    started: false,
  };
}

export function startMatch(
  state: MatchState,
  teamAName: string,
  teamBName: string,
  targetScore?: TargetScore,
): MatchState {
  return {
    ...createInitialMatch(
      teamAName.trim() || 'Coppia A',
      teamBName.trim() || 'Coppia B',
      targetScore ?? state.targetScore,
    ),
    started: true,
    stake: BASE_STAKE,
  };
}

/** Nova partida com os mesmos nomes e meta, placar zerado. */
export function rematch(state: MatchState): MatchState {
  return {
    ...createInitialMatch(state.teamAName, state.teamBName, state.targetScore),
    started: true,
    stake: BASE_STAKE,
    matchesWonA: state.matchesWonA + (state.winner === 'a' ? 1 : 0),
    matchesWonB: state.matchesWonB + (state.winner === 'b' ? 1 : 0),
  };
}

export function beginNormalTurn(state: MatchState): MatchState {
  if (state.winner) return state;
  return clearTricks({
    ...state,
    turnActive: true,
    isOrbi: false,
    orbiCaller: null,
    stake: currentBaseStake(state),
  });
}

export function beginOrbiTurn(state: MatchState, caller: TeamId): MatchState {
  if (state.winner) return state;
  return clearTricks({
    ...state,
    turnActive: true,
    isOrbi: true,
    orbiCaller: caller,
    stake: POST_NINETEEN_BASE,
  });
}

export function raiseStake(state: MatchState): MatchState {
  if (!state.turnActive || state.winner) return state;
  return { ...state, stake: state.stake + 1 };
}

export function setStake(state: MatchState, stake: number): MatchState {
  if (!state.turnActive || state.winner) return state;
  return { ...state, stake: Math.max(1, stake) };
}

export function addTrick(state: MatchState, team: TeamId): MatchState {
  if (!state.turnActive || state.winner) return state;
  const key = team === 'a' ? 'tricksA' : 'tricksB';
  const current = state[key];
  if (current >= MAX_TRICKS) return state;
  return { ...state, [key]: current + 1 };
}

export function removeTrick(state: MatchState, team: TeamId): MatchState {
  if (!state.turnActive || state.winner) return state;
  const key = team === 'a' ? 'tricksA' : 'tricksB';
  const current = state[key];
  if (current <= 0) return state;
  return { ...state, [key]: current - 1 };
}

export function awardTurn(state: MatchState, team: TeamId): MatchState {
  if (!state.turnActive || state.winner) return state;
  const note = state.isOrbi
    ? `Orbi · ${teamName(state, team)} ha vinto il turno (${state.stake} pti)`
    : `${teamName(state, team)} ha vinto il turno (${state.stake} pti)`;
  return applyScore(state, team, state.stake, 'turn_win', note, state.stake);
}

export function foldTurn(state: MatchState, foldingTeam: TeamId): MatchState {
  if (!state.turnActive || state.winner) return state;
  const winner: TeamId = foldingTeam === 'a' ? 'b' : 'a';
  let points = state.stake;

  if (isMarkedX(state, foldingTeam) && state.stake === POST_NINETEEN_BASE && !state.isOrbi) {
    points = 2;
  }

  const note = `${teamName(state, foldingTeam)} ha lasciato · ${teamName(state, winner)} +${points}`;
  return applyScore(state, winner, points, 'fold', note, points);
}

export function refuseOrbi(state: MatchState): MatchState {
  if (!state.turnActive || !state.isOrbi || !state.orbiCaller || state.winner) {
    return state;
  }
  const caller = state.orbiCaller;
  const note = `Orbi rifiutato · ${teamName(state, caller)} +2`;
  return applyScore(state, caller, 2, 'orbi_refuse', note, 2);
}

export function adjustPoints(
  state: MatchState,
  team: TeamId,
  delta: number,
): MatchState {
  if (state.winner && delta > 0) return state;
  if (delta === 0) return state;

  let scoreA = state.scoreA;
  let scoreB = state.scoreB;
  if (team === 'a') scoreA = Math.max(0, scoreA + delta);
  else scoreB = Math.max(0, scoreB + delta);

  let winner: TeamId | null = null;
  if (scoreA >= state.targetScore) winner = 'a';
  else if (scoreB >= state.targetScore) winner = 'b';

  const sign = delta > 0 ? '+' : '';
  const entry: HistoryEntry = {
    id: uid(),
    kind: 'adjust',
    team,
    points: delta,
    stake: Math.abs(delta),
    note: `Rettifica ${teamName(state, team)} ${sign}${delta}`,
    scoreAAfter: scoreA,
    scoreBAfter: scoreB,
  };

  return {
    ...state,
    scoreA,
    scoreB,
    winner,
    history: [entry, ...state.history],
  };
}

export function undoLast(state: MatchState): MatchState {
  if (state.history.length === 0) return state;
  const [, ...rest] = state.history;

  let rebuilt: MatchState = {
    ...createInitialMatch(state.teamAName, state.teamBName, state.targetScore),
    started: true,
    matchesWonA: state.matchesWonA,
    matchesWonB: state.matchesWonB,
  };

  for (const entry of [...rest].reverse()) {
    rebuilt = {
      ...rebuilt,
      scoreA: entry.scoreAAfter,
      scoreB: entry.scoreBAfter,
      history: [entry, ...rebuilt.history],
    };

    let winner: TeamId | null = null;
    if (rebuilt.scoreA >= state.targetScore) winner = 'a';
    else if (rebuilt.scoreB >= state.targetScore) winner = 'b';
    rebuilt.winner = winner;
  }

  return {
    ...rebuilt,
    stake: currentBaseStake(rebuilt),
    turnActive: false,
    isOrbi: false,
    orbiCaller: null,
    tricksA: 0,
    tricksB: 0,
  };
}

export function resetMatch(state: MatchState): MatchState {
  return createInitialMatch(state.teamAName, state.teamBName, state.targetScore);
}
