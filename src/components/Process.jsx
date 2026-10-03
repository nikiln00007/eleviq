import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const phases = [
  {
    num: '/01',
    phaseLabel: 'PHASE 01 — ARCHITECTURE & DATA AUDIT',
    title: 'Cognitive Strategy & Data Auditing',
    description:
      'We evaluate your current enterprise data schemas, security constraints, and operational bottlenecks to define exact model requirements and ROI benchmarks.',
    checks: ['Data Pipeline Readiness Audit', 'Custom LLM Specs', 'SOC2 Security Plan'],
    icon: '/icon-01.png',
  },
  {
    num: '/02',
    phaseLabel: 'PHASE 02 — MODEL ENGINEERING & FINE-TUNING',
    title: 'Neural Fine-Tuning & Swarm Engineering',
    description:
      'Our research team trains domain-adapted neural networks, fine-tunes LLMs on your proprietary data, and constructs resilient RAG vector search pipelines.',
    checks: ['Domain-Adapted Model Checkpoints', 'Vector Index Sync', 'Human-In-The-Loop UI'],
    icon: '/icon-02.png',
  },
  {
    num: '/03',
    phaseLabel: 'PHASE 03 — INTEGRATION & STAGING TEST',
    title: 'Zero-Downtime Microservice Orchestration',
    description:
      'We integrate the AI engine into your existing ERP/CRM via high-throughput REST/gRPC API microservices with fail-safe fallback circuits.',
    checks: ['Sub-500ms API Endpoints', 'Automated Test Suite', 'Real-Time Telemetry Dashboard'],
    icon: '/icon-03.png',
  },
  {
    num: '/04',
    phaseLabel: 'PHASE 04 — DEPLOYMENT & SLM MONITORING',
    title: 'Autonomous Scaling & Continuous Optimization',
    description:
      'Post-deployment, our automated telemetry system tracks model precision drift, cost efficiency, and latency while executing automated model retraining loops.',
    checks: ['Automated Drift Detection', 'Monthly Tuning Reports', '24/7 Enterprise SLA Support'],
    icon: '/icon-04.png',
  },
]

export default function Process() {
  return (
    <section id="approach" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="OUR APPROACH"
          title={"From Concept to\nProduction Scale"}
          description="Our structured engineering process transforms ideas into reliable, scalable digital systems."
        />

        <div className="mt-16 md:mt-24 max-w-6xl mx-auto space-y-16 md:space-y-24">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-12 lg:gap-16 group"
            >
              {/* Left Column: Number + 3D Isometric Illustration with Ambient Blue Glow */}
              <div className="flex items-center gap-6 sm:gap-10 shrink-0 w-full lg:w-[460px] justify-center lg:justify-start">
                {/* Number indicator */}
                <span className="text-xl sm:text-2xl font-light text-slate-400 select-none tracking-tight shrink-0">
                  {phase.num}
                </span>

                {/* 3D Graphic Container with Soft Radial Illumination */}
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center">
                  {/* Ambient Soft Cyan/Blue Glow Aura */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none transform -translate-x-2"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(147, 197, 253, 0.42) 0%, rgba(191, 219, 254, 0.22) 42%, rgba(255, 255, 255, 0) 70%)',
                      filter: 'blur(20px)',
                    }}
                  />
                  {/* Outer Secondary Diffusion */}
                  <div
                    className="absolute -inset-6 rounded-full pointer-events-none opacity-60"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(186, 230, 253, 0.35) 0%, rgba(255, 255, 255, 0) 65%)',
                      filter: 'blur(36px)',
                    }}
                  />

                  {/* 3D Asset */}
                  <img
                    src={phase.icon}
                    alt={phase.title}
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(79,115,232,0.12)] select-none transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Column: Content Block */}
              <div className="flex-1 text-left">
                {/* Phase Subtitle */}
                <p className="text-xs sm:text-[13px] font-semibold tracking-[0.14em] text-slate-900 uppercase">
                  {phase.phaseLabel}
                </p>

                {/* Phase Title */}
                <h3 className="mt-2.5 text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-950 tracking-tight leading-tight">
                  {phase.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                  {phase.description}
                </p>

                {/* Key Deliverables / Checkpoints */}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-800">
                  {phase.checks.map((item) => (
                    <div key={item} className="inline-flex items-center gap-2">
                      <span className="text-slate-900 font-bold select-none text-sm">✓</span>
                      <span className="text-slate-700 font-normal">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
