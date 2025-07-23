'use client'

import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function KTTYPage() {
  const markdown = `
### Tokenomics

| Allocation              | Percentage (%) | Amount        |
|-------------------------|----------------|---------------|
| Total Supply            | -              | 1,000,000,000 |
| Initial Team Allocation | 3              | 30,000,000    |
| Development Allocation  | 3              | 30,000,000    |
| Locked Tokens           | 20             | 200,000,000   |
| Open Market             | 74             | 740,000,000   |

The team has made a commitment to buying back 33% of the secondary market overtime.
`

  return (
    <article className="prose prose-invert mt-20 mx-auto py-16 px-4 lg:px-20 max-w-4xl">
      {/* Hero */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-2">The $KTTY Token</h1>
      </header>

      {/* Intro */}
      <h2 className="mt-8 mb-4 text-2xl font-semibold text-white">Introduction</h2>

      <section className="space-y-6 text-lg text-gray-200 leading-relaxed">
        <p>The KTTY Token is the central premium currency within the KTTY World Ecosystem.</p>
        <p>You will find important information on the token as well as its current and future utility below.</p>

        {/* Staking Image */}
        <figure className="my-12">
          <Image
            src="/images/token/staking.png"
            alt="KTTY Token"
            width={1200}
            height={1200}
            className="w-full rounded-lg border border-white/10 shadow-lg"
          />
        </figure>

        <h2 className="mt-8 text-2xl font-semibold text-white">KTTY Utility</h2>
        <li>In Game Premium Currency within the KTTY World Game</li>
        <li>NFT Minting Discounts</li>
        <li>Premium Functions in the Tamer Mission Hub</li>
        <li>Premium Functions in the Tamer Item Forge (Coming Soon)</li>
        <li>Trading in the Tamer Gear Marketplace (Coming Soon)</li>

        <div className="prose prose-invert max-w-3xl mx-auto prose-table:table prose-table:w-full prose-table:border-collapse prose-th:px-4 prose-th:py-2 prose-th:border prose-th:border-white/10 prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-white/5 prose-tr:even:bg-white/5 prose-p:text-left prose-p:text-xl prose-p:my-8 prose-li:text-left prose-li:text-xl prose-li:my-2 prose-ul:pl-5 prose-li:marker:text-white prose-img:mx-auto prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdown}
          </ReactMarkdown>
        </div>

        <h2 className="mt-8 text-2xl font-semibold text-white">Staking</h2>
        <p>The $KTTY Staking Hub is live and you can access it at:</p>
        <p>
          <Link href="/about">
            <span className="text-blue-500 hover:underline">https://stake.kttyworld.io/</span>
          </Link>
        </p>

        <figure className="my-12">
          <Image
            src="/images/token/stakehub.png"
            alt="Staking Hub"
            width={1200}
            height={800}
            className="w-full rounded-lg border border-white/10 shadow-lg"
          />
        </figure>

        <p>We have 5 different reward tiers, with each subsequent tier providing an increasing amount of rewards.</p>

        <p>Step 1: Connect Wallet</p>
        <p>Step 2: Enter the amount of $KTTY you would like to stake.</p>
        <p>Step 3: Choose your lock-up period.</p>
        <p>Step 4: Click Stake Now</p>
        <p>
          You can also head to the Staking Tiers section and select "Stake at this tier" to automatically stake enough
          to qualify for a specific staking tier.
        </p>

        <figure className="my-12">
          <Image
            src="/images/token/tiers.png"
            alt="Staking Tiers"
            width={1200}
            height={800}
            className="w-full rounded-lg border border-white/10 shadow-lg"
          />
        </figure>
      </section>

      {/* CTA */}
      <footer className="mt-16 text-center">
        <hr className="border-t border-gray-700 mb-8" />
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition"
        >
          ← Back to Home
        </Link>
      </footer>
    </article>
  )
}
