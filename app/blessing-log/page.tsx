'use client';

import { useEffect, useState } from 'react';
import Terminal from '../../components/Terminal';

export default function BlessingLog() {
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const storedLog = JSON.parse(localStorage.getItem('halo_log') || '[]');
    setLog(storedLog);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-gold text-xl font-mono mb-6">Blessing Log</h1>
      <div className="w-full max-w-3xl bg-black/70 p-6 rounded-lg border border-gold text-holy-white font-mono text-sm space-y-2">
        {log.length > 0 ? (
          log.map((entry, index) => <div key={index}>{entry}</div>)
        ) : (
          <p className="text-center text-holy-white/60">No invocations recorded yet.</p>
        )}
      </div>
    </div>
  );
}
