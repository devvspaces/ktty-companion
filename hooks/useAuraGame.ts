import { useState, useEffect, useRef, useCallback } from 'react';

interface AuraGameState {
  aura: number;
  comboMultiplier: number;
  level: number;
  timeLeft: number;
  status: 'playing' | 'won' | 'lost';
  cue: 'Perfect!' | 'Too Slow!' | null;
}

const MAX_MULTIPLIER = 3;
const BASE_TAP_VALUE = 5;

const LEVEL_TIME_BASE = 15; // seconds for level 1
const LEVEL_TIME_MIN = 5;   // min seconds at high levels
const LEVEL_AURA_BASE = 100;
const LEVEL_AURA_INCREMENT = 20;
const PERFECT_WINDOW_BASE = 500; // ms
const PERFECT_WINDOW_MIN = 200;  // ms

export function useAuraGame() {
  const [state, setState] = useState<AuraGameState>({
    aura: 0,
    comboMultiplier: 1,
    level: 1,
    timeLeft: LEVEL_TIME_BASE,
    status: 'playing',
    cue: null,
  });

  const lastTapTime = useRef<number | null>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const cueTimeout = useRef<NodeJS.Timeout | null>(null);

  // Calculate current level parameters
  const auraMax = LEVEL_AURA_BASE + LEVEL_AURA_INCREMENT * (state.level - 1);
  const timeLimit = Math.max(LEVEL_TIME_MIN, LEVEL_TIME_BASE - (state.level - 1));
  const perfectWindow = Math.max(
    PERFECT_WINDOW_MIN,
    PERFECT_WINDOW_BASE - 30 * (state.level - 1)
  );

  // Start countdown timer on level start or restart
  useEffect(() => {
    if (state.status !== 'playing') return;

    if (timerId.current) clearInterval(timerId.current);
    setState((s) => ({ ...s, timeLeft: timeLimit }));

    timerId.current = setInterval(() => {
      setState((s) => {
        if (s.timeLeft <= 0) {
          clearInterval(timerId.current!);
          return { ...s, timeLeft: 0, status: s.aura >= auraMax ? 'won' : 'lost' };
        }
        return { ...s, timeLeft: s.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timerId.current!);
  }, [state.level, auraMax, timeLimit, state.status]);

  const showCue = useCallback((cueText: 'Perfect!' | 'Too Slow!') => {
    setState((s) => ({ ...s, cue: cueText }));
    if (cueTimeout.current) clearTimeout(cueTimeout.current);
    cueTimeout.current = setTimeout(() => {
      setState((s) => ({ ...s, cue: null }));
    }, 1000);
  }, []);

  const onTap = useCallback(() => {
    if (state.status !== 'playing') return;

    const now = Date.now();
    const last = lastTapTime.current;
    const delta = last ? now - last : 0;

    if (last && delta <= perfectWindow) {
      // Perfect tap
      const newMultiplier = Math.min(state.comboMultiplier + 0.1, MAX_MULTIPLIER);
      showCue('Perfect!');
      setState((s) => ({
        ...s,
        comboMultiplier: newMultiplier,
        aura: Math.min(s.aura + BASE_TAP_VALUE * newMultiplier, auraMax),
      }));
    } else {
      // Missed timing or first tap
      if (last) {
        showCue('Too Slow!');
      }
      setState((s) => ({
        ...s,
        comboMultiplier: 1,
        aura: Math.min(s.aura + BASE_TAP_VALUE, auraMax),
      }));
    }
    lastTapTime.current = now;

    // Check win condition
    setState((s) => {
      if (s.aura >= auraMax) {
        clearInterval(timerId.current!);
        return { ...s, status: 'won' };
      }
      return s;
    });
  }, [state, auraMax, perfectWindow, showCue]);

  // Restart game for next level or retry
  const restart = useCallback(() => {
    lastTapTime.current = null;
    setState({
      aura: 0,
      comboMultiplier: 1,
      level: state.status === 'won' ? state.level + 1 : state.level,
      timeLeft: timeLimit,
      status: 'playing',
      cue: null,
    });
  }, [state.level, state.status, timeLimit]);

  return { state, onTap, restart, auraMax, timeLimit, perfectWindow };
}
