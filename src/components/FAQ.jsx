import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data/faqs'
import SectionHeading from './SectionHeading'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border rounded-2xl transition-colors duration-300 ${isOpen ? 'border-primary/25 bg-primary/[0.02]' : 'border-edge bg-white'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-semibold text-dark tracking-tight pr-4">
          {faq.question}
        </span>
        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 ${
          isOpen ? 'bg-primary border-primary rotate-45' : 'border-edge bg-soft rotate-0'
        }`}>
          <Plus size={16} className={isOpen ? 'text-white' : 'text-body/50'} strokeWidth={2} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm md:text-base text-body/55 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-soft">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title={"Everything You Need\nTo Know"}
          description="Questions about timelines, technology, security, or implementation?"
        />

        <div className="mt-14 space-y-3">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <FAQItem
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
