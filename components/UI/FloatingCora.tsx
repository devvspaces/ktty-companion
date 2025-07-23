'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const DISABLED_ROUTES = ['/cora']

export default function FloatingCora() {
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setVisible(!DISABLED_ROUTES.includes(pathname))
  }, [pathname])

  const [collapsed, setCollapsed] = useState(false)

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-1 bg-white/20 hover:bg-white/40 text-white px-2 py-1 rounded-full transition"
      >
        {collapsed ? '▲' : '▼'}
      </button>

      {/* C.O.R.A link + hover effect */}
      {!collapsed && (
        <Link href="/kora">
          <div
            className={clsx(
              'rounded-xl overflow-hidden border border-white/20 shadow-xl transition-all duration-300',
              'hover:border-pink-500 hover:shadow-[0_0_24px_4px_rgba(255,0,144,0.8)]',
              // Responsive sizing
              'w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[250px] lg:h-[250px]'
            )}
          >
            <Image
              src="/images/characters/kora.png"
              alt="k.O.R.A"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
      )}
    </div>
  )
}
