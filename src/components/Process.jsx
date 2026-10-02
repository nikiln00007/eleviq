import { motion } from 'framer-motion'
import { Check, Search, PenTool, Cable, Rocket } from 'lucide-react'
import SectionHeading from './SectionHeading'

const phases = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    description: 'We understand your business, workflows, users, technical environment, and desired outcomes.',
    checks: ['Business Analysis', 'Workflow Audit', 'Technical Discovery'],
    Icon: Search,
    color: '#4F73E8',
  },
  {
    num: '02',
    title: 'Design & Engineering',
    description: 'We design the product architecture and build the core AI and software systems.',
    checks: ['UX/UI Design', 'System Architecture', 'AI Engineering'],
    Icon: PenTool,
    color: '#6C8EF5',
  },
  {
    num: '03',
    title: 'Integration & Testing',
    description: 'We connect the system with your existing technology stack and validate performance.',
    checks: ['API Integration', 'Automated Testing', 'Security Testing'],
    Icon: Cable,
    color: '#3A5BD4',
  },
  {
    num: '04',
    title: 'Launch & Optimization',
    description: 'We deploy, monitor, measure, and continuously improve the system.',
    checks: ['Cloud Deployment', 'Monitoring', 'Performance Optimization'],
    Icon: Rocket,
    color: '#7C5CE0',
  },
]

export default function Process() {
  return (
    <section id="approach" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="OUR APPROACH"
          title={"From Concept to\nProduction Scale"}
          description="Our structured engineering process transforms ideas into reliable, scalable digital systems."
        />

        <div className="mt-16 md:mt-20 max-w-4xl mx-auto">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex gap-6 md:gap-10 pb-16 last:pb-0"
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 shadow-sm"
                  style={{ borderColor: phase.color, background: `${phase.color}0A` }}
                >
                  <phase.Icon size={20} style={{ color: phase.color }} strokeWidth={1.8} />
                </div>
                {i < phases.length - 1 && (
                  <div className="w-px flex-1 mt-4 bg-edge" />
                )}
              </div>

              {/* Content */}
              <div className="pt-1.5 pb-4">
                <span className="text-[11px] font-bold tracking-wider" style={{ color: phase.color }}>
                  PHASE {phase.num}
                </span>
                <h3 className="mt-2 text-xl md:text-2xl font-bold text-dark tracking-tight">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-body/55 leading-relaxed max-w-lg">
                  {phase.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {phase.checks.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-body/70">
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                        style={{ background: `${phase.color}12` }}
                      >
                        <Check size={12} style={{ color: phase.color }} strokeWidth={2.5} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
