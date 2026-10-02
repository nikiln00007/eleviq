import { motion } from 'framer-motion'

export default function SectionHeading({ label, title, description, center = true, light = false }) {
  return (
    <div className={center ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}>
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] text-primary mb-4 uppercase"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.15] tracking-tight whitespace-pre-line ${
          light ? 'text-white' : 'text-dark'
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-5 text-[clamp(0.95rem,1.2vw,1.125rem)] leading-relaxed ${
            light ? 'text-white/70' : 'text-body/60'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
