import { useState } from 'react'
import { Play, Pause, ArrowLeftRight, Sparkles } from 'lucide-react'
import { LinkedInIcon } from './Icons'
import { team } from '../data/team'
import SectionHeading from './SectionHeading'

export default function Team() {
  const [isPaused, setIsPaused] = useState(false)
  const [direction, setDirection] = useState('left')

  // Duplicate team items so the carousel loops infinitely and seamlessly from right to left
  const items = [...team, ...team, ...team, ...team]

  return (
    <section id="about" className="py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            label="THE MINDS BEHIND ELEVIQ"
            title={"Builders, Engineers &\nAI Enthusiasts"}
            description="Our team combines product thinking, engineering expertise, design, and artificial intelligence to solve complex problems."
            center={false}
          />
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-body/45 font-medium px-3 py-1.5 rounded-full bg-soft border border-edge">
              <Sparkles size={12} className="text-primary" />
              Flowing Right to Left · Hover to Pause
            </span>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1.5 rounded-xl border border-edge text-xs font-semibold text-body/70 hover:text-dark hover:bg-soft transition-all flex items-center gap-1.5 cursor-pointer"
              aria-label={isPaused ? "Resume Carousel" : "Pause Carousel"}
            >
              {isPaused ? <Play size={13} className="text-primary" /> : <Pause size={13} className="text-primary" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>

            {/* Reverse Flow Direction Button */}
            <button
              onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}
              className="px-3 py-1.5 rounded-xl border border-edge text-xs font-semibold text-body/70 hover:text-dark hover:bg-soft transition-all flex items-center gap-1.5 cursor-pointer"
              title="Reverse Flow Direction"
            >
              <ArrowLeftRight size={13} className="text-primary" />
              <span className="hidden sm:inline">{direction === 'left' ? 'Reverse' : 'Default'}</span>
            </button>
          </div>
        </div>

        {/* Carousel Container with Edge Fade Masks */}
        <div className="relative -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-20 overflow-hidden group">
          {/* Side Gradient Masks for Seamless Entry/Exit */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Continuous Right-to-Left Marquee Track */}
          <div
            className="flex gap-6 w-max py-4 px-4"
            style={{
              animation: `marquee-${direction} 42s linear infinite`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
            onMouseEnter={e => {
              if (!isPaused) e.currentTarget.style.animationPlayState = 'paused'
            }}
            onMouseLeave={e => {
              if (!isPaused) e.currentTarget.style.animationPlayState = 'running'
            }}
          >
            {items.map((member, i) => (
              <div
                key={`${member.id}-${i}`}
                className="shrink-0 w-72 sm:w-80 p-5 rounded-2xl border border-edge bg-white hover:border-primary/30 hover:shadow-[0_8px_32px_rgba(79,115,232,0.09)] transition-all duration-300 group/card cursor-pointer"
              >
                {/* Member Photo */}
                <div className="relative w-full h-56 rounded-xl overflow-hidden mb-5 bg-soft border border-edge">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover/card:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        const fallback = e.currentTarget.parentElement?.querySelector('.avatar-fallback')
                        if (fallback) fallback.classList.remove('hidden')
                      }}
                    />
                  ) : null}
                  <div
                    className={`avatar-fallback w-full h-full ${member.image ? 'hidden' : 'flex'} items-center justify-center text-white text-2xl font-bold`}
                    style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}BB)` }}
                  >
                    {member.initials}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-dark group-hover/card:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-soft border border-edge text-body/40 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <LinkedInIcon size={13} />
                  </a>
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-primary mt-1">
                  {member.role}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-body/60 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
