import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
          style={{
            background: 'linear-gradient(135deg, #F0F4FF 0%, #E8EEFF 50%, #F5F7FF 100%)',
          }}
        >
          {/* Subtle background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-light/[0.05] blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold text-dark leading-[1.15] tracking-tight">
              Have a Problem Worth{'\n'}Solving?
            </h2>
            <p className="mt-4 text-lg text-body/55 max-w-md mx-auto">
              Let&apos;s design the technology to solve it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-[0_4px_16px_rgba(79,115,232,0.25)] group"
              >
                Book a Consultation
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-body/70 bg-white border border-edge rounded-xl hover:bg-soft transition-colors"
              >
                <MessageSquare size={16} />
                Talk to Our Team
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
