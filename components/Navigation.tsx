'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/initiate', label: 'initiate.ritual' },
  { href: '/blessing-log', label: 'blessing.log' },
  { href: '/choir', label: 'choir.bin' },
  { href: '/seraphic-keys', label: 'seraphic/keys' },
  { href: '/sacrifice-mirror', label: 'sacrifice.mirror' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-xs font-mono px-3 py-1 border rounded bg-black/70 text-holy-white border-holy-white hover:text-gold hover:border-gold transition-all
            ${pathname === href ? 'text-gold border-gold' : ''}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
