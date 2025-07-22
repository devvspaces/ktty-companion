'use client'

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getArticleBySlug } from '@/lib/articles'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)

  if (!article) return notFound()

  return (
    <>
      {/* Back Button OUTSIDE the main article box */}
      <div className="px-6 mb-7 md:px-20 pt-32 max-w-4xl mx-auto">
        <Link href="/news">
          <button className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-md transition">
            ← Back to News
          </button>
        </Link>
      </div>

      <div className="px-6 md:px-20 pb-16 text-foreground max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">{article.title}</h1>
        <p className="text-sm text-gray-400 mb-6 text-center">
          {new Date(article.date).toLocaleDateString('en-GB')} • {article.tags.join(', ')}
        </p>

        <Image
          src={article.image}
          alt={article.title}
          width={1200}
          height={600}
          className="rounded-xl w-full mb-10"
        />

        <div className="prose prose-invert max-w-3xl mx-auto
          prose-table:table prose-table:w-full prose-table:border-collapse
          prose-th:px-4 prose-th:py-2 prose-th:border prose-th:border-white/10
          prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-white/5
          prose-tr:even:bg-white/5
          prose-h1:text-center prose-h2:text-center prose-h3:text-center prose-h4:text-center prose-h5:text-center prose-h6:text-center
          prose-p:text-left prose-p:text-xl prose-p:my-8
          prose-li:text-left prose-li:text-xl prose-li:my-2
          prose-ul:pl-5 prose-li:marker:text-white
          prose-img:mx-auto prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src = '', alt = '' }) => (
                <img
                  src={src}
                  alt={alt}
                  className="mx-auto my-8 rounded-xl border border-white/10 shadow-lg max-w-full h-auto"
                />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  )
}
