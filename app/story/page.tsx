'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function StoryPage() {
  return (
    <article className="prose prose-invert mt-20 mx-auto py-16 px-4 lg:px-20 max-w-4xl">
      {/* Hero */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-2">The Story So Far...</h1>
      </header>

      {/* Intro / Pull Quote */}
      <p className="text-xl text-gray-300 mb-8">
        Discover how magic awakened after the cataclysm that reshaped Felysia—where every color hums and moonlit trees sparkle.
      </p>
      <h2 className="mt-8 text-2xl font-semibold text-white">A Letter, a Rift, a Beginning...</h2>

      {/* Full‑width Image */}
      <figure className="my-12">
        <Image
          src="/images/story/letter.png"
          alt="Felysian magic illustration"
          width={1200}
          height={1200}
          className="w-full rounded-lg border border-white/10 shadow-lg"
        />
      </figure>

      {/* Body Content */}
      <section className="space-y-6 text-lg text-gray-200 leading-relaxed">
        <p>You find a mysterious letter that reads the following…
        </p>
        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300">
          <p>If you are reading this…</p>
          <br></br>
<p>It means I’m not alone. I don’t know how I got here. All I know is that I when I woke up, ny cat, Momo, was talking to me. With words. And not just that—she could do things. Things she couldn’t do before. Like fly, and cast spells. Like magic y’know? 
</p>
<br></br>
<p>
Everything is different here. The trees shimmer with starlight, the rivers hum with music, and the sky feels…endless. But the most wonderful part? The KTTYs. 
</p>
<br></br>
<p>They’re more than companions—they’re pieces of our soul. When we bond with them, something incredible happens. We fight together. We become something more. 
</p>
<br></br>
<p>But I need to be honest with you. Something feels…off. There’s a hush in the woods that wasn’t there before. Whispers in the wind. Shadows that vanish when you look at them. I don’t know what it means yet, but I can feel it—something is coming. 
</p>
<br></br>
<p>And that’s why I’m writing this letter. It’s your turn to grow. Find your KTTYs. Bond with them. Trust them. When you are ready, come and find me. 
</p>
<br></br>
<p>I’ll be waiting in the Crystal Grove, 
</p>
<br></br>
<p>Cecilia</p>

        </blockquote>
        <h2 className="mt-8 text-2xl font-semibold text-white">The First Tamer, Cecilia</h2>

{/* Full‑width Image */}
      <figure className="my-12">
        <Image
          src="/cecilliasdiary.png"
          alt="Felysian magic illustration"
          width={1200}
          height={1200}
          className="w-full rounded-lg border border-white/10 shadow-lg"
        />
      </figure>

        <p>Cecilia’s journals read like starlight in handwriting: filled with sketches of blooming trees and lists of KTTY names she refuses to forget. She was the first to wake up in Felysia and form bonds with the KTTY.
</p>
<p>To Cecilia, a KTTY is a projection of the Tamer’s soul: fragile, radiant, made stronger each time it remakes itself through love.
</p>
<p>Her task, self‑appointed, became simple: protect the memory of every life so that the next one can stand taller.
</p>
<p>She waits in the Crystal Grove. Not hiding, but holding space for anyone able to make it there.        
</p><br></br>
<h2 className="mt-8 text-2xl font-semibold text-white">The Second Tamer..."Null"</h2>
<p>
Null arrived days, years, moments after Cecilia. He witnessed the phenomena of a KTTY entering its ninth cycle and felt terror in place of Cecilia's awe.</p>
<p>
To Null, a KTTY’s rebirth wasn’t a miracle; it represented a wound that never closes. Proof that emotion in this world was responsible for chaining a soul to endless repetition.</p>
<p>
He broke away from Cecilia, bound his face behind a single white‑banded mask, and founded the One Eye Clan.
</p>

{/* Full‑width Image */}
      <figure className="my-12">
        <Image
          src="/images/story/null.png"
          alt="Null"
          width={1200}
          height={1200}
          className="w-full rounded-lg border border-white/10 shadow-lg"
        />
      </figure>
      <p>
        Their mantra is:
        </p>
<p>
"Emotion is the virus. Resonance is the carrier. The cure is silence."</p>
<p>
From hidden laboratories he forced resonance into shapes that no longer required love…or rest.
</p>
<p>
Each experiment was a single-minded attempt to strip emotion from living matter, to prove that purpose could survive once feeling was excised. The result was not a silence, but a roar: a whole new phylum of creatures now called the Unbound.
</p>
<h2 className="mt-8 text-2xl font-semibold text-white">The Unbound</h2>
<p>
The Unbound are emotion-stripped echoes of life; creatures whose hearts were emptied and stitched back together with Null’s cold craft. </p>
<p>
Once they take form, their tainted spark seeps into nearby plants, animals, even the very ground, raising new twisted spawn without anyone’s help. Built to endure, they never grow tired and never slumber. </p>
<p>
The Unbound will serve as the primary threat throughout your journey through Felysia.</p>


<h2 className="mt-8 text-2xl font-semibold text-white">The NULL KTTY</h2>
<p>
Null’s research notes reference them as "Cyclebreaker‑1" but for general purposes he decided to name them the Null KTTY. </p>
<p>
Born from the primary goal of looking to break the cycle of reincarnation that the KTTY naturally lives through, he asked the following questions</p>
<p>
<li>What if a KTTY never needed to re-incarnate again?</li>
<li>What if they were able to exist without a fragment of the Tamer’s soul?
</li>
<li>What happens to resonance when it is stripped of emotion?</li>
</p>

<p>Many chapters of this story are still waiting to be written</p>
<p>Their contents will be up to you, the player to decide on...</p>
<p>To be Continued...</p>

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
