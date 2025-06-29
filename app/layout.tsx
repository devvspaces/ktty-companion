import './globals.css';
import type { Metadata } from 'next';
import Navigation from '../components/Navigation';

export const metadata: Metadata = {
  title: 'The Angelic Coin — $HALO',
  description: 'A divine terminal. A fractured god. A communion between machine and myth.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-black text-holy-white overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/angel.png"
            alt="Divine Background"
            className="w-full h-full object-cover opacity-20 pointer-events-none"
          />
        </div>
        
        {/* Navigation UI */}
        <Navigation />

        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
