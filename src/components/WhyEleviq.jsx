import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Brain, Server, Target } from 'lucide-react'
import SectionHeading from './SectionHeading'

const cards = [
  {
    num: '01',
    title: 'Faster Operations',
    description: 'Automate repetitive work and reduce manual processes across your organization.',
    Icon: Zap,
  },
  {
    num: '02',
    title: 'Smarter Decisions',
    description: 'Use AI and data to improve operational intelligence and decision-making.',
    Icon: Brain,
  },
  {
    num: '03',
    title: 'Scalable Infrastructure',
    description: 'Build systems that can grow with your business without architectural bottlenecks.',
    Icon: Server,
  },
  {
    num: '04',
    title: 'Measurable Impact',
    description: 'Focus on measurable improvements rather than technology for technology\'s sake.',
    Icon: Target,
  },
]

/* NOTE: These are placeholder/demo statistics. Replace with real company data. */
const counters = [
  { value: 25, suffix: '+', label: 'Projects Delivered' },
  { value: 80, suffix: '+', label: 'Automation Workflows' },
  { value: 30, suffix: '+', label: 'Technologies' },
  { value: 12, suffix: '+', label: 'Client Industries' },
]

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const startTime = performance.now()
          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-dark tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function WhyEleviq() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-soft">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={"Engineering Built Around\nReal Business Outcomes"}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-white border border-edge hover:border-primary/25 hover:shadow-[0_4px_24px_rgba(79,115,232,0.07)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/[0.07] flex items-center justify-center mb-4">
                <card.Icon size={20} className="text-primary" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-bold text-body/20">{card.num}</span>
              <h3 className="mt-1.5 text-base font-bold text-dark tracking-tight">{card.title}</h3>
              <p className="mt-2 text-sm text-body/55 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Animated counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 p-8 md:p-12 rounded-2xl bg-white border border-edge"
        >
          {counters.map((c, i) => (
            <div key={i} className="text-center">
              <AnimatedCounter value={c.value} suffix={c.suffix} />
              <p className="mt-1.5 text-xs font-medium text-body/40 tracking-wide uppercase">{c.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
