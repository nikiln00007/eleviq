import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'
import SectionHeading from './SectionHeading'

export default function CaseStudies() {
  const [active, setActive] = useState(0)
  const study = caseStudies[active]

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-soft">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="SELECTED WORK"
          title={"Solutions Built for\nReal-World Problems"}
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          {caseStudies.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-200 ${
                active === i
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-body/60 border-edge hover:border-primary/30'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Active case study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Info */}
            <div className="p-8 md:p-10 rounded-2xl bg-white border border-edge">
              <span className="text-[11px] font-bold tracking-[0.15em] text-primary/60">
                {study.category}
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold text-dark tracking-tight">
                {study.title}
              </h3>
              <p className="mt-4 text-base text-body/55 leading-relaxed">
                {study.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {study.technologies.map((t) => (
                  <span key={t} className="text-xs font-medium text-body/50 bg-soft px-3 py-1.5 rounded-lg border border-edge">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors group">
                  View Case Study
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href="#work" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-body/60 border border-edge rounded-xl hover:bg-soft transition-colors">
                  View All Projects
                </a>
              </div>
            </div>

            {/* Metrics card */}
            <div className="p-8 md:p-10 rounded-2xl border border-edge" style={{ background: `linear-gradient(135deg, ${study.color}08, ${study.color}15)` }}>
              <span className="text-[11px] font-bold tracking-wider text-body/30">CASE STUDY {study.num}</span>
              <div className="mt-8 space-y-8">
                {study.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    <p className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: study.color }}>
                      {m.value}
                    </p>
                    <p className="mt-1 text-sm text-body/50">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
