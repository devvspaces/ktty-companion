'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

const CATEGORIES = ['Update', 'Dev Blog', 'Announcement', 'Event', 'Lore']
const SORT_OPTIONS = ['Newest', 'Oldest']

export default function NewsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Newest')
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(8)
      } else {
        setItemsPerPage(9)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const articles = getAllArticles()

  const toggleCategory = (cat: string) => {
    setPage(1)
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortBy === 'Newest' ? dateB - dateA : dateA - dateB
    })
  }, [sortBy, articles])

  const filteredArticles = useMemo(() => {
    if (selectedCategories.length === 0) return sortedArticles
    return sortedArticles.filter((article) =>
      selectedCategories.some((cat) => article.tags.includes(cat))
    )
  }, [sortedArticles, selectedCategories])

  const paginatedArticles = useMemo(() => {
    return filteredArticles.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    )
  }, [filteredArticles, page, itemsPerPage])

  return (
    <div className="min-h-screen w-full px-4 md:px-12 pt-32 pb-10 text-foreground">
      {/* Banner */}
      <div className="w-full mb-12 overflow-hidden rounded-xl">
        <Image
          src="/images/news/newsbanner.png"
          alt="News Banner"
          width={2048}
          height={512}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Filter + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1 text-sm rounded-full border transition-all ${
                selectedCategories.includes(cat)
                  ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                  : 'border-white/20 text-gray-400 hover:border-purple-500 hover:text-purple-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value)
            setPage(1)
          }}
          className="bg-black/20 border border-white/20 px-3 py-1 rounded-md text-sm text-white"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* News Grid */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity duration-300 ease-in-out animate-fade-in"
        key={selectedCategories.join(',') + sortBy + page + itemsPerPage}
      >
        {paginatedArticles.map((article) => {
          const formattedDate = new Date(article.date).toLocaleDateString(
            'en-GB',
            {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }
          )
          return (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="relative bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm p-4 flex flex-col justify-between hover:bg-white/10 transition-colors h-full"
            >
              {/* Tags Top-Right */}
              <div className="absolute top-4 right-4 flex gap-1 flex-wrap justify-end">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-[2px] bg-purple-900 text-purple-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Main Content */}
              <div>
                <p className="text-xs text-purple-300 mb-1">{formattedDate}</p>
                <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>

                <div className="relative w-full aspect-[7/4] mb-3 overflow-hidden rounded-md">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 100vw, 50vw"
                  />
                </div>

                <p className="text-sm text-gray-300 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          )
        })}
      </section>

      {/* Pagination */}
      {filteredArticles.length > itemsPerPage && (
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white/10 text-sm rounded-md hover:bg-white/20 disabled:opacity-30"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setPage((p) =>
                p < Math.ceil(filteredArticles.length / itemsPerPage)
                  ? p + 1
                  : p
              )
            }
            disabled={page >= Math.ceil(filteredArticles.length / itemsPerPage)}
            className="px-4 py-2 bg-white/10 text-sm rounded-md hover:bg-white/20 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
