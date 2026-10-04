import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { useRef, useMemo } from 'react'
import SectionHeading from './SectionHeading'

const phases = [
  {
    num: '/01',
    phaseLabel: 'PHASE 01',
    title: 'Discovery & Strategy',
    description:
      'We understand your business, workflows, users, technical environment, and desired outcomes.',
    checks: ['Business Analysis', 'Workflow Audit', 'Technical Discovery'],
    icon: '/icon-01.png',
  },
  {
    num: '/02',
    phaseLabel: 'PHASE 02',
    title: 'Design & Engineering',
    description:
      'We design the product architecture and build the core AI and software systems.',
    checks: ['UX/UI Design', 'System Architecture', 'AI Engineering'],
    icon: '/icon-02.png',
  },
  {
    num: '/03',
    phaseLabel: 'PHASE 03',
    title: 'Integration & Testing',
    description:
      'We connect the system with your existing technology stack and validate performance.',
    checks: ['API Integration', 'Automated Testing', 'Security Testing'],
    icon: '/icon-03.png',
  },
  {
    num: '/04',
    phaseLabel: 'PHASE 04',
    title: 'Launch & Optimization',
    description:
      'We deploy, monitor, measure, and continuously improve the system.',
    checks: ['Cloud Deployment', 'Monitoring', 'Performance Optimization'],
    icon: '/icon-04.png',
  },
]

/* ─── Floating sparkle particles ─── */
function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * 360 + Math.random() * 20
      const radius = 80 + Math.random() * 50
      return {
        x: Math.cos((angle * Math.PI) / 180) * radius,
        y: Math.sin((angle * Math.PI) / 180) * radius,
        size: 2 + Math.random() * 2.5,
        delay: Math.random() * 3,
        duration: 2.5 + Math.random() * 2,
        color:
          i % 3 === 0
            ? 'rgba(99,179,255,0.95)'
            : i % 3 === 1
            ? 'rgba(147,210,255,0.85)'
            : 'rgba(255,255,255,0.95)',
      }
    })
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            top: '50%',
            left: '50%',
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.size + 1}px rgba(100,180,255,0.55)`,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            x: [0, p.x * 0.35, p.x, p.x * 0.6, 0],
            y: [0, p.y * 0.25, p.y, p.y * 0.75, 0],
            opacity: [0, 0.9, 1, 0.5, 0],
            scale: [0, 1.3, 1, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/* ─── Scroll-linked glowing orb ─── */
function ScrollOrb({ sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })
  const springProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 20 })
  const top = useTransform(springProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.04, 0.5, 0.96, 1], [0.4, 1, 1.15, 1, 0.4])

  return (
    <motion.div
      className="absolute left-0 pointer-events-none z-10"
      style={{ top, opacity, scale, translateX: '-50%', translateY: '-50%' }}
    >
      {/* Core orb */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffffff 0%, #bfdbfe 35%, #4F73E8 100%)',
          boxShadow:
            '0 0 0 3px rgba(79,115,232,0.3), 0 0 20px 8px rgba(79,115,232,0.45), 0 0 70px 24px rgba(147,197,253,0.2)',
        }}
      />
      {/* Wide ambient spread */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(79,115,232,0.1) 0%, rgba(147,197,253,0.05) 50%, transparent 70%)',
          filter: 'blur(24px)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

/* ─── Animated vertical timeline ─── */
function TimelineLine({ sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 55, damping: 20 })

  return (
    <div className="absolute left-0 top-0 bottom-0 w-px pointer-events-none">
      {/* Track */}
      <div className="absolute inset-0 bg-slate-200" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 bottom-0 origin-top"
        style={{
          scaleY,
          background: 'linear-gradient(180deg, #4F73E8 0%, #93c5fd 55%, #4F73E8 100%)',
          boxShadow: '0 0 8px 2px rgba(79,115,232,0.5)',
        }}
      />
    </div>
  )
}

/* ─── Single phase card ─── */
function PhaseCard({ phase, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-15% 0px -15% 0px' })

  return (
    <motion.div
      ref={ref}
      key={phase.num}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-12 lg:gap-16 group"
    >
      {/* Subtle active bg wash */}
      <motion.div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 22% 50%, rgba(79,115,232,0.055) 0%, transparent 70%)',
        }}
      />

      {/* Left: Number + Icon */}
      <div className="flex items-center gap-6 sm:gap-10 shrink-0 w-full lg:w-[460px] justify-center lg:justify-start">
        {/* Number */}
        <motion.span
          className="text-xl sm:text-2xl font-light select-none tracking-tight shrink-0"
          animate={isInView ? { color: '#4F73E8' } : { color: '#94a3b8' }}
          transition={{ duration: 0.5 }}
        >
          {phase.num}
        </motion.span>

        {/* Icon container */}
        <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
          {/* Always-on ambient glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none -translate-x-2"
            style={{
              background:
                'radial-gradient(circle, rgba(147,197,253,0.38) 0%, rgba(191,219,254,0.16) 42%, transparent 70%)',
              filter: 'blur(22px)',
            }}
          />

          {/* Pulsing active glow ring */}
          <motion.div
            className="absolute -inset-5 rounded-full pointer-events-none"
            animate={
              isInView
                ? { opacity: [0.35, 0.85, 0.35], scale: [0.94, 1.06, 0.94] }
                : { opacity: 0, scale: 0.9 }
            }
            transition={
              isInView
                ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.4 }
            }
            style={{
              background:
                'radial-gradient(circle, rgba(79,115,232,0.2) 0%, rgba(99,179,255,0.12) 45%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Entry spotlight flash */}
          <motion.div
            className="absolute -inset-8 rounded-full pointer-events-none"
            animate={
              isInView
                ? { opacity: [0, 0.7, 0], scale: [0.5, 1.4, 1.1] }
                : { opacity: 0, scale: 0.5 }
            }
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                'radial-gradient(circle, rgba(120,180,255,0.5) 0%, rgba(79,115,232,0.22) 40%, transparent 70%)',
              filter: 'blur(14px)',
            }}
          />

          {/* Floating sparkles (only when in view) */}
          {isInView && <Particles />}

          {/* Rotating dashed ring */}
          <motion.div
            className="absolute inset-4 rounded-full pointer-events-none"
            animate={
              isInView
                ? { rotate: 360, opacity: [0.25, 0.6, 0.25] }
                : { rotate: 0, opacity: 0 }
            }
            transition={
              isInView
                ? {
                    rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                  }
                : {}
            }
            style={{
              border: '1px dashed rgba(99,179,255,0.35)',
            }}
          />

          {/* Counter-rotating ring */}
          <motion.div
            className="absolute inset-8 rounded-full pointer-events-none"
            animate={
              isInView
                ? { rotate: -360, opacity: [0.15, 0.45, 0.15] }
                : { rotate: 0, opacity: 0 }
            }
            transition={
              isInView
                ? {
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                  }
                : {}
            }
            style={{
              border: '1px solid rgba(147,197,253,0.25)',
            }}
          />

          {/* 3D Asset — floats when in view */}
          <motion.img
            src={phase.icon}
            alt={phase.title}
            className="relative z-10 w-full h-full object-contain select-none"
            animate={
              isInView
                ? {
                    y: [0, -7, 0],
                    filter: [
                      'drop-shadow(0 12px 24px rgba(79,115,232,0.14))',
                      'drop-shadow(0 20px 40px rgba(79,115,232,0.38))',
                      'drop-shadow(0 12px 24px rgba(79,115,232,0.14))',
                    ],
                  }
                : {
                    y: 0,
                    filter: 'drop-shadow(0 10px 20px rgba(79,115,232,0.08))',
                  }
            }
            transition={
              isInView
                ? { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.4 }
            }
            whileHover={{ scale: 1.07 }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 text-left">
        <motion.p
          className="text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase"
          animate={isInView ? { color: '#0f172a', opacity: 1 } : { color: '#94a3b8', opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {phase.phaseLabel}
        </motion.p>

        <motion.h3
          className="mt-2.5 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-tight"
          animate={isInView ? { x: 0, opacity: 1, color: '#020617' } : { x: -10, opacity: 0.6, color: '#64748b' }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {phase.title}
        </motion.h3>

        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
          {phase.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-medium">
          {phase.checks.map((item, ci) => (
            <motion.div
              key={item}
              className="inline-flex items-center gap-2"
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 6 }}
              transition={{ duration: 0.45, delay: 0.18 + ci * 0.06 }}
            >
              <span className="text-slate-900 font-bold select-none text-sm">✓</span>
              <span className="text-slate-700 font-normal">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const sectionRef = useRef(null)

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="OUR APPROACH"
          title={"From Concept to\nProduction Scale"}
          description="Our structured engineering process transforms ideas into reliable, scalable digital systems."
        />

        <div className="mt-16 md:mt-24 max-w-6xl mx-auto">
          {/* Timeline wrapper */}
          <div className="relative pl-6 sm:pl-10">
            <TimelineLine sectionRef={sectionRef} />
            <ScrollOrb sectionRef={sectionRef} />

            <div className="space-y-16 md:space-y-24">
              {phases.map((phase, index) => (
                <PhaseCard key={phase.num} phase={phase} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
