'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

const charts = [
  { src: '/raritychart1.png', alt: 'Rarity Chart 1' },
  { src: '/raritychart2.png', alt: 'Rarity Chart 2' },
  { src: '/raritychart3.png', alt: 'Rarity Chart 3' },
]

export default function TamersPage() {
  const [selectedChart, setSelectedChart] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  const dragStart = useRef({ x: 0, y: 0 })
  const posStart = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    posStart.current = { ...position }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    e.preventDefault()
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPosition({ x: posStart.current.x + dx, y: posStart.current.y + dy })
  }

  const handleMouseUp = () => setDragging(false)

  const handleZoom = (delta: number) => {
    setZoom((z) => Math.min(Math.max(z + delta, 1), 3)) // 1x–3x zoom
  }

  const resetView = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-20 max-w-[1400px] mx-auto text-white">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-12">KTTY Tamers Rarity Charts</h1>

      {/* Rarity Charts */}
      <div className="space-y-8">
        {charts.map((chart, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedChart(chart.src)
              resetView()
            }}
            className="cursor-pointer rounded-lg overflow-hidden border border-white/10 hover:border-purple-400 transition"
          >
            <Image
              src={chart.src}
              alt={chart.alt}
              width={1200}
              height={800}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedChart && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedChart(null)}
        >
          <div
            className="relative max-w-full max-h-[90vh] w-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Controls */}
            <div className="absolute top-2 right-2 flex gap-2 z-50">
              <button
                onClick={() => handleZoom(0.2)}
                className="bg-black/50 text-white px-3 py-1 rounded hover:bg-black"
              >
                +
              </button>
              <button
                onClick={() => handleZoom(-0.2)}
                className="bg-black/50 text-white px-3 py-1 rounded hover:bg-black"
              >
                –
              </button>
              <button
                onClick={resetView}
                className="bg-black/50 text-white px-3 py-1 rounded hover:bg-black"
              >
                Reset
              </button>
              <button
                onClick={() => setSelectedChart(null)}
                className="bg-black/50 text-white px-3 py-1 rounded hover:bg-black"
              >
                ✕
              </button>
            </div>

            {/* Zoomable & Draggable Image */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDoubleClick={resetView}
              className="cursor-grab active:cursor-grabbing"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transformOrigin: 'center center',
                transition: dragging ? 'none' : 'transform 0.1s ease-out',
              }}
            >
              <Image
                src={selectedChart}
                alt="Full Size Chart"
                width={1600}
                height={1200}
                className="rounded-lg object-contain max-h-[90vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
