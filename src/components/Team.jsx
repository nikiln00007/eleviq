import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { LinkedInIcon } from './Icons'
import { team } from '../data/team'
import SectionHeading from './SectionHeading'

export default function Team() {
  const total = team.length
  const SPEED = 1.50 // px per frame

  const [activeIndex, setActiveIndex]   = useState(0)
  const [isPaused, setIsPaused]         = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)

  // Drag / swipe states
  const [isDragging, setIsDragging]     = useState(false)
  const [dragStartX, setDragStartX]     = useState(0)
  const [dragOffset, setDragOffset]     = useState(0)

  const trackRef       = useRef(null)
  const containerRef   = useRef(null)
  const offsetRef      = useRef(0)       // continuous pixel offset
  const rafRef         = useRef(null)
  const cardWidthRef   = useRef(0)       // card + gap stride

  const isPausedRef    = useRef(isPaused)
  const isDraggingRef  = useRef(isDragging)
  isPausedRef.current  = isPaused
  isDraggingRef.current = isDragging

  // Duplicate items for seamless infinite loop
  const loopItems = [...team, ...team]

  // Responsive card width
  const getCardWidth = useCallback(() => {
    if (typeof window === 'undefined') return 720
    const w = containerWidth || window.innerWidth
    if (w < 640)  return Math.min(w - 32, 380)
    if (w < 1024) return Math.min(w - 64, 620)
    return 720
  }, [containerWidth])

  const gap = 24

  // Observe container size
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      } else if (typeof window !== 'undefined') {
        setContainerWidth(window.innerWidth)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // ── RAF continuous scroll loop ──────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Measure card stride from actual DOM after render
    const firstCard = track.children[0]
    if (firstCard) {
      const computedGap = parseFloat(getComputedStyle(track).gap) || gap
      cardWidthRef.current = firstCard.offsetWidth + computedGap
    }

    const totalWidth = cardWidthRef.current * total // width of ONE set

    const tick = () => {
      if (!isPausedRef.current && !isDraggingRef.current && track) {
        offsetRef.current += SPEED

        // Seamless reset when we've scrolled one full set
        if (offsetRef.current >= totalWidth) {
          offsetRef.current -= totalWidth
        }

        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`

        // Update active dot / counter
        const newIdx = Math.round(offsetRef.current / cardWidthRef.current) % total
        setActiveIndex(newIdx)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // Re-mount only when cardWidth changes (container resize)
  }, [containerWidth, total])
  // ───────────────────────────────────────────────────────────────────────────

  // Jump to a specific card index (used by arrows + drag)
  const scrollToCard = useCallback((index) => {
    const clamped = ((index % total) + total) % total
    setActiveIndex(clamped)
    offsetRef.current = clamped * cardWidthRef.current
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`
    }
  }, [total])

  const nextCard = useCallback(() => {
    const next = (activeIndex + 1) % total
    scrollToCard(next)
  }, [activeIndex, total, scrollToCard])

  const prevCard = useCallback(() => {
    const prev = (activeIndex - 1 + total) % total
    scrollToCard(prev)
  }, [activeIndex, total, scrollToCard])

  // Pointer drag handlers
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragOffset(0)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    setDragOffset(e.clientX - dragStartX)
  }

  const handlePointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragOffset < -60) nextCard()
    else if (dragOffset > 60) prevCard()
    setDragOffset(0)
  }

  const cardWidth   = getCardWidth()
  const centerOffset = (containerWidth - cardWidth) / 2

  return (
    <section id="about" className="py-24 md:py-32 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 max-w-6xl mx-auto">
          <SectionHeading
            label="THE MINDS BEHIND ELEVIQ"
            title={"Builders, Engineers &\nAI Enthusiasts"}
            description="Our team combines product thinking, engineering expertise, and artificial intelligence to solve complex problems and build scalable solutions."
            center={false}
          />

          {/* Controls: Counter + Auto Play/Pause */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <span className="text-xs text-body/60 font-semibold px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              aria-label={isPaused ? 'Resume auto-sliding' : 'Pause auto-sliding'}
            >
              {isPaused ? <Play size={13} className="text-blue-600" /> : <Pause size={13} className="text-blue-600" />}
              <span>{isPaused ? 'Auto Play' : 'Pause'}</span>
            </button>
          </div>
        </div>

        {/* Carousel Showcase Area */}
        <div
          ref={containerRef}
          className="relative w-full max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button
            onClick={prevCard}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-[0_6px_20px_rgba(15,23,42,0.12)] flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Previous team member"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextCard}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 shadow-[0_6px_20px_rgba(15,23,42,0.12)] flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Next team member"
          >
            <ChevronRight size={22} />
          </button>

          {/* Track Viewport */}
          <div
            className="overflow-hidden py-8 px-2 cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/*
              The track starts offset so the active card is centred.
              RAF drives transform continuously; drag adds a live delta.
            */}
            <div
              ref={trackRef}
              className="flex items-center will-change-transform"
              style={{
                gap: `${gap}px`,
                // Initial position — RAF will overwrite transform each frame.
                // We add centerOffset + dragOffset so centring & drag feel correct.
                transform: `translate3d(${centerOffset - offsetRef.current + (isDragging ? dragOffset : 0)}px, 0, 0)`,
              }}
            >
              {loopItems.map((member, idx) => {
                const memberIdx = idx % total
                const isActive  = memberIdx === activeIndex

                return (
                  <div
                    key={`${member.id}-${idx}`}
                    style={{ width: `${cardWidth}px` }}
                    className="shrink-0"
                    onClick={() => {
                      if (!isActive) scrollToCard(memberIdx)
                    }}
                  >
                    <article
                      className={`w-full bg-white rounded-3xl border p-5 sm:p-7 md:p-8 transition-all duration-600 ${
                        isActive
                          ? 'border-blue-500/30 shadow-[0_20px_48px_rgba(37,99,235,0.12)] scale-100 opacity-100 blur-none'
                          : 'border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.05)] scale-[0.92] opacity-40 blur-[1px] hover:opacity-75 cursor-pointer'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 md:gap-8">
                        {/* Portrait Photo Column */}
                        <div className="w-full sm:w-[240px] md:w-[270px] h-[260px] sm:h-[300px] md:h-[330px] shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 relative group/img">
                          {member.image ? (
                            <img
                              src={member.image}
                              alt={`${member.name}, ${member.role}`}
                              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105 select-none pointer-events-none"
                              loading="eager"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                const fb = e.currentTarget.parentElement?.querySelector('.avatar-fallback')
                                if (fb) fb.classList.remove('hidden')
                              }}
                            />
                          ) : null}
                          <div
                            className={`avatar-fallback w-full h-full ${
                              member.image ? 'hidden' : 'flex'
                            } items-center justify-center text-white text-4xl font-bold`}
                            style={{ background: `linear-gradient(135deg, ${member.color || '#2563EB'}, #1E40AF)` }}
                          >
                            {member.initials || member.name[0]}
                          </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex flex-col justify-between py-1 md:py-2 text-left flex-1 min-w-0">
                          <div>
                            {/* Role Label */}
                            <span className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-[#2563EB] font-mono">
                              {member.role}
                            </span>

                            {/* Member Name */}
                            <h3 className="mt-1.5 text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#0F172A] tracking-tight">
                              {member.name}
                            </h3>

                            {/* Tagline */}
                            {member.tagline && (
                              <p className="mt-2 text-sm sm:text-base font-bold text-[#1E293B] leading-snug">
                                {member.tagline}
                              </p>
                            )}

                            {/* Bio */}
                            <p className="mt-2.5 text-xs sm:text-sm text-[#475569] leading-relaxed font-normal">
                              {member.bio}
                            </p>
                          </div>

                          {/* LinkedIn Connect Button */}
                          <div className="pt-5 mt-auto">
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-bold text-[#0F172A] hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white transition-all shadow-sm w-fit group/btn cursor-pointer"
                              aria-label={`Connect with ${member.name} on LinkedIn`}
                            >
                              <LinkedInIcon size={16} className="text-[#0F172A] group-hover/btn:text-white transition-colors" />
                              <span>Connect on LinkedIn</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
