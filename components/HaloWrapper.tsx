'use client';

import { ReactNode } from 'react';
import GlitchEffect from './GlitchEffect';

export default function HaloWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black text-holy-white">
      <GlitchEffect />
      {children}
    </div>
  );
}