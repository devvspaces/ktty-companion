'use client'

import Image from 'next/image'

const TEAM_MEMBERS = [
  { name: 'Fat KTTY', role: 'CEO', image: '/images/team/member1.png' },
  { name: 'Anubis KTTY', role: 'COO', image: '/images/team/member2.png' },
  { name: 'Purr KTTY', role: 'CMO', image: '/images/team/member3.png' },
  { name: 'Grumpy KTTY', role: 'CTO', image: '/images/team/member4.png' },
  { name: 'Dev KTTY', role: 'Tech Lead', image: '/images/team/member5.png' },
  { name: 'Purrfessor KTTY', role: 'Content & Socials', image: '/images/team/member6.png' },
  { name: '420 KTTY', role: 'Graphic Design', image: '/images/team/member7.png' },
  { name: 'Dum KTTY', role: 'Partnerships & Growth', image: '/images/team/member8.png' },
  { name: 'Picasso KTTY', role: 'Lead Artist', image: '/images/team/member9.png' },
  { name: 'Motion KTTY', role: 'Animation Artist', image: '/images/team/member10.png' },
]

export default function TeamSection() {
  return (
    <section id="team" className="w-full sm:py-4 lg:py-10 px-6 text-center">
      <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-6">Team</h2>
      <p className="text-base lg:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
        Meet the pixel-powered cats behind the world of KTTY
      </p>

<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-3 lg:gap-8 sm:max-w-3xl max-w-7xl mx-auto justify-items-center">
        {TEAM_MEMBERS.map((member, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-contain rounded-[16px] border border-black/30"
              />
            </div>
            <h3 className="text-md font-bold text-white">{member.name}</h3>
            <p className="text-sm text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
