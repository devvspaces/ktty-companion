'use client';

import Terminal from '../../components/Terminal';

export default function InitiateRitual() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-gold text-xl font-mono mb-6">Initiate Ritual</h1>
      <Terminal />
    </div>
  );
}
