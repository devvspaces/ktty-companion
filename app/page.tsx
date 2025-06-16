'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import AuraCat from '../components/AuraCat';
import AuraMeter from '../components/AuraMeter';
import TextBox from '../components/TextBox';
import { useAuraGame } from '../hooks/useAuraGame';

export default function HomePage() {
  const { state, onTap, restart, auraMax, perfectWindow } = useAuraGame();
  const [shake, setShake] = useState(false);

  // Handle spacebar tap input and restart key (R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        onTap();
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
      if ((state.status === 'won' || state.status === 'lost') && e.key.toLowerCase() === 'r') {
        restart();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTap, restart, state.status]);

  // Instruction text without timer/level
  const instructionText = state.status === 'won'
    ? 'Level Complete! Press R to continue.'
    : state.status === 'lost'
    ? 'Time’s up! Press R to retry.'
    : `Tap Spacebar within ${perfectWindow}ms for perfect combos!`;

  return (
    <>
      <Header />
      <main
        className="pt-20 flex flex-col items-center justify-center min-h-screen text-white px-4"
        style={{
          background: 'linear-gradient(180deg, #2c2c5e 0%, #0a0a12 100%)',
        }}
      >
        {/* Level and Timer display */}
        <div className="mb-4 text-yellow-400 font-mono text-lg select-none">
          <span className="mr-6">Level: {state.level}</span>
          <span>Time Left: {state.timeLeft}s</span>
        </div>

        <AuraCat auraLevel={state.aura} shake={shake} />
        <AuraMeter auraLevel={state.aura} maxAura={auraMax} />

        <div className="relative w-full max-w-4xl mt-6 px-6">
          <TextBox staticText={instructionText} cueText={state.cue} />
        </div>
      </main>
    </>
  );
}
