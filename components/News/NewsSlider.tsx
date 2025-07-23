'use client'

import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import Image from 'next/image'

export default function NewsSlider() {
  const articles = getAllArticles()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`/news/${article.slug}`}
          className="bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm hover:shadow-lg hover:bg-white/10 hover:-translate-y-1 hover:scale-[1.02] transition-transform duration-300 flex flex-col"
        >
          {/* Title */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white mb-1 line-clamp-2">
              {article.title}
            </h2>

            {/* Date */}
            <p className="text-sm text-gray-400 mb-2">
              {new Date(article.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Responsive Image */}
          <div className="w-full aspect-[7/4] relative">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover rounded-b-lg"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>

          {/* Excerpt & Tags */}
          <div className="p-4 flex flex-col gap-3 flex-grow">
            <p className="text-sm text-gray-300 line-clamp-3">{article.excerpt}</p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-purple-800/30 text-purple-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
