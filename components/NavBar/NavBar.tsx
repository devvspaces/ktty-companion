'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type NavLink = {
  label: string
  href?: string
  external?: boolean
  comingSoon?: boolean
}

type NavItem = {
  label: string
  href?: string
  external?: boolean
  dropdown?: NavLink[]
}

const navItems: NavItem[] = [
  {
    label: 'Game',
    dropdown: [
      { label: 'Story', href: '/story' },
      { label: 'Characters', href: '/#characters' },
      { label: 'Roadmap', href: '/#roadmap' },
    ],
  },
  {
    label: 'News',
    href: '/news',
  },
  {
    label: 'Token',
    dropdown: [
      { label: '$KTTY', href: '/ktty' },
      { label: 'Staking Hub', href: 'https://stake.kttyworld.io/', external: true },
    ],
  },
  {
    label: 'NFTs',
    dropdown: [
      { label: 'KTTY Tamers', href: 'https://mint.kttyworld.io/' },
      { label: 'KTTY Companions', comingSoon: true },
      { label: 'KTTY Condos', comingSoon: true },
    ],
  },
  {
    label: 'Project',
    dropdown: [
      { label: 'Team', href: '/#team' },
      { label: 'Whitepaper', href: 'https://ktty-world.gitbook.io/ktty-world/project/welcome-to-ktty-world', external: true },
      { label: 'Dune', href: 'https://dune.com/defi__josh/ktty-world', external: true },
    ],
  },
  {
    label: 'K.O.R.A',
    href: '/kora',
  },
]

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMobileNavClick = (href: string, external = false) => {
    if (external) {
      window.open(href, '_blank')
    } else {
      router.push(href)
    }
    setTimeout(() => {
      setMobileOpen(false)
      setOpenDropdown(null)
    }, 100)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-white/10">
      <nav
        ref={navRef}
        className="relative w-full max-w-[1920px] mx-auto flex items-center justify-between px-6 lg:px-12 py-4"
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/kttywrldlogo.png" alt="KTTY World" width={80} height={80} />
          </Link>
        </div>

        {/* Center nav links */}
        <ul className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8 items-center text-lg font-semibold text-white">
          {navItems.map((item) =>
            item.dropdown ? (
              <li key={item.label} className="relative group">
                <button
                  className="flex items-center gap-1 hover:text-purple-300 transition-all"
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <ChevronDown size={14} />
                </button>
                {openDropdown === item.label && (
                  <ul className="absolute top-full left-0 mt-2 bg-black/80 backdrop-blur-md text-sm rounded-md shadow-lg py-2 min-w-[160px]">
                    {item.dropdown.map((link) =>
                      link.comingSoon ? (
                        <li
                          key={link.label}
                          className="px-4 py-2 text-gray-500 cursor-default select-none"
                        >
                          {link.label}
                        </li>
                      ) : (
                        <li key={link.label}>
                          <Link
                            href={link.href!}
                            target={link.external ? '_blank' : '_self'}
                            className="block px-4 py-2 hover:bg-white/10 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {link.label}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href!}
                  target={item.external ? '_blank' : '_self'}
                  className="hover:text-purple-300 transition-all"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Social icons and CTA */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          <Link href="https://x.com/Kttyworld" target="_blank">
            <Image src="/x-icon.png" alt="X" width={32} height={32} />
          </Link>
          <Link href="https://discord.com/invite/sC3Hv46BKC" target="_blank">
            <Image src="/discord-icon.png" alt="Discord" width={32} height={32} />
          </Link>
          <Link href="https://www.geckoterminal.com/ronin/pools/0x13b617b1b9012612ed6170dc85e3fce4b68c3f5d" target="_blank">
            <Image src="/gecko-icon.png" alt="Gecko" width={32} height={32} />
          </Link>
          <Link
            href="https://missions.kttyworld.io/missions"
            target="_blank"
            className="ml-4 px-6 py-2 text-sm rounded-lg bg-purple-500 text-white font-bold shadow-md animate-pulse-glow hover:brightness-125 transition-all"
          >
            Mission Hub
          </Link>
        </div>

        {/* Hamburger button */}
        <button className="lg:hidden flex items-center" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden relative z-50 pb-6 bg-black/90 backdrop-blur text-white w-full">
          <div className="flex flex-col items-center text-center max-w-sm mx-auto pt-6 gap-4">
            <ul className="flex flex-col gap-6 text-lg font-medium w-full px-4">
              {navItems.map((item) =>
                item.dropdown ? (
                  <li key={item.label}>
                    <div className="text-white text-xl font-bold">{item.label}</div>
                    <ul className="flex flex-col gap-2 mt-1 text-base text-gray-300">
                      {item.dropdown.map((link) =>
                        link.comingSoon ? (
                          <li key={link.label} className="text-gray-500 cursor-default select-none">
                            {link.label}
                          </li>
                        ) : (
                          <li key={link.label}>
                            <button
                              onClick={() => handleMobileNavClick(link.href!, link.external)}
                              className="hover:text-purple-300 transition-all"
                            >
                              {link.label}
                            </button>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label}>
                    <button
                      onClick={() => handleMobileNavClick(item.href!, item.external)}
                      className="text-white text-xl font-bold hover:text-purple-300 transition-all"
                    >
                      {item.label}
                    </button>
                  </li>
                )
              )}
            </ul>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Link href="https://x.com/Kttyworld" target="_blank">
                <Image src="/x-icon.png" alt="X" width={36} height={36} />
              </Link>
              <Link href="https://discord.com/invite/sC3Hv46BKC" target="_blank">
                <Image src="/discord-icon.png" alt="Discord" width={36} height={36} />
              </Link>
              <Link href="https://www.geckoterminal.com/ronin/pools/0x13b617b1b9012612ed6170dc85e3fce4b68c3f5d" target="_blank">
                <Image src="/gecko-icon.png" alt="Gecko" width={36} height={36} />
              </Link>
            </div>

            <Link
              href="https://missions.kttyworld.io/missions"
              target="_blank"
              className="mt-6 inline-block px-8 py-3 text-sm rounded-lg bg-purple-500 text-white font-bold shadow-md animate-pulse-glow hover:brightness-125 transition-all"
            >
              Mission Hub
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
