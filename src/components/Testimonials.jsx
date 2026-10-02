import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1))
  const next = () => setActive((p) => (p === testimonials.length - 1 ? 0 : p + 1))

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="What Our Clients Say" />

        <div className="mt-14 relative">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center p-8 md:p-12 rounded-2xl border border-edge bg-soft"
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl text-dark font-medium leading-relaxed tracking-tight max-w-2xl mx-auto">
              &ldquo;{testimonials[active].quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="mt-8">
              <p className="font-bold text-dark">{testimonials[active].name}</p>
              <p className="text-sm text-body/50 mt-0.5">
                {testimonials[active].role}, {testimonials[active].company}
              </p>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl border border-edge flex items-center justify-center hover:bg-soft transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === active ? 'bg-primary w-6' : 'bg-edge'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl border border-edge flex items-center justify-center hover:bg-soft transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
