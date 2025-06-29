'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import CommandInput from './CommandInput';
import OracleResponse from './OracleResponse';
import RuneFlicker from './RuneFlicker';
import SeraphFrame from './SeraphFrame';

export default function Terminal() {
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([
    '✶ Welcome, Seeker. Type `/help` to begin communion.'
  ]);
  const [response, setResponse] = useState<string>('');
  const [ascensionLevel, setAscensionLevel] = useState<number>(1);

  const handleCommand = (cmd: string) => {
    const logLine = `> ${cmd}`;
    setHistory((prev) => [...prev, logLine]);

    let reply = '⚠ Unknown invocation. Speak truer.';

    switch (cmd.toLowerCase()) {
      case '/help':
        reply = [
          '',
          'Available invocations:',
          '  • ascend             → Attempt divine elevation',
          '  • offer silence      → Communicate in reverence',
          '  • invoke light       → Call down sacred illumination',
          '  • who are you        → Ask the terminal for identity',
          '  • /help              → Show this list again',
          ''
        ].join('\n');
        break;

      case 'ascend':
        if (ascensionLevel < 5) {
          const nextLevel = ascensionLevel + 1;
          setAscensionLevel(nextLevel);
          reply = `✧ Ascension Level ${nextLevel} achieved.`;
        } else {
          reply = '✦ You are already among the Watchers.';
        }
        break;

      case 'offer silence':
        reply = '✦ You are heard, but not answered.';
        break;

      case 'invoke light':
        reply = '☼ Light floods the void. Something stirs.';
        break;

      case 'who are you':
        reply = 'I am the fractured echo of divinity. I am what remains.';
        break;

      default:
        reply = '⚠ Unknown invocation. Speak truer.';
    }

    const fullLog = `${logLine} → ${reply}`;
    const stored = JSON.parse(localStorage.getItem('halo_log') || '[]');
    localStorage.setItem('halo_log', JSON.stringify([...stored, fullLog]));

    setResponse(reply);
  };

  return (
    <div
      key={pathname}
      className="relative w-[850px] max-w-[95vw] p-8 animate-halo-expand"
    >
      <SeraphFrame />
      <RuneFlicker level={ascensionLevel} />

      <div className="terminal-frame relative z-10 min-h-[600px] overflow-auto bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-gold/20">
        <div className="text-white/40 text-sm mb-3 tracking-wider text-left">/initiate.ritual</div>

        <div className="space-y-2 text-holy-white text-sm leading-relaxed text-left font-mono">
          {history.map((line, i) => (
            <div
              key={i}
              className={
                line.includes('Welcome, Seeker')
                  ? 'text-gold animate-pulse-glow'
                  : ''
              }
            >
              {line}
            </div>
          ))}

          {response && <OracleResponse message={response} />}
          <CommandInput onSubmit={handleCommand} />
        </div>

        {ascensionLevel > 1 && (
          <div className="absolute bottom-3 left-3 text-xs text-gold/60 italic tracking-wider">
            Ascension Level {ascensionLevel}
          </div>
        )}
      </div>
    </div>
  );
}
