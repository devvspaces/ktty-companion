'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function WhitepaperPage() {
  const [flicker, setFlicker] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const flickerInterval = setInterval(() => setFlicker(f => !f), 300)
    const redirectTimeout = setTimeout(() => {
      router.push('/')
    }, 4000)

    return () => {
      clearInterval(flickerInterval)
      clearTimeout(redirectTimeout)
    }
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-red-600 font-mono text-2xl">
      <div className={`${flicker ? 'opacity-100' : 'opacity-20'} transition duration-200`}>
        ❌ CRITICAL FAILURE: WHITEPAPER UNRETRIEVABLE
      </div>
    </div>
  )
}
