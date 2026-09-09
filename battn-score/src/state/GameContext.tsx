import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  adjustPoints,
  awardTurn,
  beginNormalTurn,
  beginOrbiTurn,
  createInitialMatch,
  currentBaseStake,
  foldTurn,
  raiseStake,
  refuseOrbi,
  rematch,
  resetMatch,
  setStake,
  setTargetScore,
  startMatch,
  undoLast,
} from '../gameLogic';
import { MatchState, TargetScore, TeamId, normalizeMatch } from '../types';
import { tapLight, tapMedium, tapSuccess, tapWarning } from '../utils/haptics';

const STORAGE_KEY = 'battn.match.v3';
const LEGACY_KEYS = ['battn.match.v2', 'battn.match.v1'];

type GameContextValue = {
  state: MatchState;
  baseStake: number;
  chooseTarget: (target: TargetScore) => void;
  start: (a: string, b: string) => void;
  beginNormal: () => void;
  beginOrbi: (caller: TeamId) => void;
  raise: () => void;
  setToFour: () => void;
  setStakeValue: (n: number) => void;
  award: (team: TeamId) => void;
  fold: (team: TeamId) => void;
  refuse: () => void;
  adjust: (team: TeamId, delta: number) => void;
  undo: () => void;
  reset: () => void;
  playAgain: () => void;
  rename: (a: string, b: string) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MatchState>(createInitialMatch());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) {
          for (const key of LEGACY_KEYS) {
            raw = await AsyncStorage.getItem(key);
            if (raw) break;
          }
        }
        if (raw) setState(normalizeMatch(JSON.parse(raw) as Partial<MatchState>));
      } catch {
        /* ignore */
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [state, hydrated]);

  const chooseTarget = useCallback((target: TargetScore) => {
    setState((s) => setTargetScore(s, target));
    void tapLight();
  }, []);

  const start = useCallback((a: string, b: string) => {
    setState((s) => startMatch(s, a, b));
    void tapSuccess();
  }, []);

  const beginNormal = useCallback(() => {
    setState((s) => beginNormalTurn(s));
    void tapLight();
  }, []);

  const beginOrbi = useCallback((caller: TeamId) => {
    setState((s) => beginOrbiTurn(s, caller));
    void tapMedium();
  }, []);

  const raise = useCallback(() => {
    setState((s) => raiseStake(s));
    void tapLight();
  }, []);

  const setToFour = useCallback(() => {
    setState((s) => setStake(s, 4));
    void tapMedium();
  }, []);

  const setStakeValue = useCallback((n: number) => {
    setState((s) => setStake(s, n));
    void tapLight();
  }, []);

  const award = useCallback((team: TeamId) => {
    setState((s) => awardTurn(s, team));
    void tapSuccess();
  }, []);

  const fold = useCallback((team: TeamId) => {
    setState((s) => foldTurn(s, team));
    void tapWarning();
  }, []);

  const refuse = useCallback(() => {
    setState((s) => refuseOrbi(s));
    void tapWarning();
  }, []);

  const adjust = useCallback((team: TeamId, delta: number) => {
    setState((s) => adjustPoints(s, team, delta));
    void tapLight();
  }, []);

  const undo = useCallback(() => {
    setState((s) => undoLast(s));
    void tapWarning();
  }, []);

  const reset = useCallback(() => {
    setState((s) => ({ ...resetMatch(s), started: false }));
  }, []);

  const playAgain = useCallback(() => {
    setState((s) => rematch(s));
    void tapSuccess();
  }, []);

  const rename = useCallback((a: string, b: string) => {
    setState((s) => ({
      ...s,
      teamAName: a.trim() || s.teamAName,
      teamBName: b.trim() || s.teamBName,
    }));
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      baseStake: currentBaseStake(state),
      chooseTarget,
      start,
      beginNormal,
      beginOrbi,
      raise,
      setToFour,
      setStakeValue,
      award,
      fold,
      refuse,
      adjust,
      undo,
      reset,
      playAgain,
      rename,
    }),
    [
      state,
      chooseTarget,
      start,
      beginNormal,
      beginOrbi,
      raise,
      setToFour,
      setStakeValue,
      award,
      fold,
      refuse,
      adjust,
      undo,
      reset,
      playAgain,
      rename,
    ],
  );

  if (!hydrated) return null;

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
