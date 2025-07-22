import Link from 'next/link'

type NewsCardProps = {
  title: string
  excerpt: string
  slug: string
  tags: string[]
  date: string // YYYY-MM-DD
}

export default function NewsCard({ title, excerpt, slug, tags, date }: NewsCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:shadow-lg transition-all flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">{title}</h2>
        <p className="text-sm text-gray-400 mb-2">{formattedDate}</p>
        <p className="text-sm text-gray-300 mb-4">{excerpt}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-purple-800/30 text-purple-300 rounded-full"
          >
            {tag}
          </span>
        ))}
        <Link
          href={`/news/${slug}`}
          className="ml-auto text-xs text-purple-300 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  )
}
