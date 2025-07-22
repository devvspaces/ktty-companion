'use client'

import Image from 'next/image'
import Link from 'next/link'


export default function KTTYPage() {
  return (
 <article className="prose prose-invert mt-20 mx-auto py-16 px-4 lg:px-20 max-w-4xl">
      {/* Hero */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-2">The $KTTY Token</h1>
      </header>

      {/* Intro / Pull Quote */}
      <h2 className="mt-8 mb-4 text-2xl font-semibold text-white">Introduction</h2>

      {/* Body Content */}
      <section className="space-y-6 text-lg text-gray-200 leading-relaxed">
     
        <p>The KTTY Token is the central premium currency within the KTTY World Ecosystem
        </p>

         <p>You will find important information on the token as well as its current and future utility below
        </p>

          {/* Full‑width Image */}
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

      <h2 className="mt-8 text-2xl font-semibold text-white">Tokenomics</h2>

    <div className="overflow-x-auto mt-12">
  <table className="min-w-full table-fixed border-collapse rounded-lg overflow-hidden border border-white/10">
    <thead>
      <tr className="bg-white/10 text-white uppercase text-sm">
        <th className="w-1/3 px-6 py-4 text-center">Allocation</th>
        <th className="w-1/3 px-6 py-4 text-center">Percentage (%)</th>
        <th className="w-1/3 px-6 py-4 text-center">Amount</th>
      </tr>
    </thead>
    <tbody className="text-gray-300 text-center divide-y divide-white/10 bg-black/40">
       <tr>
        <td className="px-6 py-4">Total Supply</td>
        <td className="px-6 py-4">-</td>
        <td className="px-6 py-4">1,000,000,000</td>
      </tr>
      <tr>
        <td className="px-6 py-4">Initial Team Allocation</td>
        <td className="px-6 py-4">3</td>
        <td className="px-6 py-4">30,000,000</td> 
      </tr>
      <tr>
        <td className="px-6 py-4">Development Allocation</td>
        <td className="px-6 py-4">3</td>
        <td className="px-6 py-4">30,000,000</td>
      </tr>
      <tr>
        <td className="px-6 py-4">Locked Tokens</td>
        <td className="px-6 py-4">20</td>
        <td className="px-6 py-4">200,000,000</td>
      </tr>
      <tr>
        <td className="px-6 py-4">Open Market</td>
        <td className="px-6 py-4">74</td>
        <td className="px-6 py-4">740,000,000</td>
      </tr>
    </tbody>
  </table>
</div>

<p>The team has made a commitment to buying back 33% of the secondary market overtime</p>

<h2 className="mt-8 text-2xl font-semibold text-white">Staking</h2>
<p>
The $KTTY Staking Hub is live and you can access it at: 
</p>

<p>
<Link href="/about">
  <span className="text-blue-500 hover:underline">https://stake.kttyworld.io/</span>
</Link>
</p>


     {/* Full‑width Image */}
      <figure className="my-12">
        <Image
          src="/images/token/stakehub.png"
          alt="Staking Hub"
          width={1200}
          height={800}
          className="w-full rounded-lg border border-white/10 shadow-lg"
        />
      </figure>

<p>We have 5 different reward tiers, with each subsequent tier provides an increasing amount of rewards.</p>

<p>Step 1: Connect Wallet</p>

<p>Step 2: Enter the amount of $KTTY you would like to stake.</p>

<p>Step 3: Choose your lock-up period.</p>

<p>Step 4: Click Stake Now</p>

<p>You can also head to the Staking Tiers section and select "Stake at this tier" to automatically stake enough to qualify for a specific staking tier.</p>  

     {/* Full‑width Image */}
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

      {/* CTA & Navigation */}
      <footer className="mt-16 text-center">
        <hr className="border-t border-gray-700 mb-8" />
        <Link href="/" className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition">
          ← Back to Home
        </Link>
      </footer>
    </article>

      )
}
