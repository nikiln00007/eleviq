import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Loader2, AlertCircle } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { validateForm, submitRsvp } from '../services/rsvpService'

const SERVICE_OPTIONS = [
  'AI Engineering',
  'AI Automation',
  'Web Development',
  'Mobile App Development',
  'Data & Analytics',
  'Custom Software',
  'AI Consulting',
  'Other',
]

const infoCards = [
  { Icon: Mail, label: 'Email', value: 'info@eleviq.com' },
  { Icon: Phone, label: 'Phone', value: '+91 87780 14893' },
  { Icon: MapPin, label: 'Location', value: 'India' },
  { Icon: Clock, label: 'Response time', value: 'Usually within 1 business day' },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    service: '', budget: '', timeline: '', description: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [submitError, setSubmitError] = useState('')
  const isSubmittingRef = useRef(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Prevent duplicate concurrent submissions
    if (isSubmittingRef.current || status === 'loading') return

    const errs = validateForm(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    isSubmittingRef.current = true
    setStatus('loading')
    setSubmitError('')

    try {
      await submitRsvp(form)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setSubmitError(
        err.message || 'We were unable to record your RSVP right now. Please try again.'
      )
    } finally {
      isSubmittingRef.current = false
    }
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }))
    if (submitError) setSubmitError('')
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 text-sm bg-soft rounded-xl border outline-none transition-colors duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 ${
      errors[field] ? 'border-red-300' : 'border-edge'
    }`

  if (status === 'success') {
    return (
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto text-center p-12 rounded-2xl border border-primary/20 bg-primary/[0.03]"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Send size={22} className="text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-dark">Message Sent!</h3>
          <p className="mt-3 text-body/55">We&apos;ll get back to you within one business day.</p>
          <button
            onClick={() => {
              setStatus('idle')
              setSubmitError('')
              setForm({ name: '', company: '', email: '', phone: '', service: '', budget: '', timeline: '', description: '' })
            }}
            className="mt-6 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors"
          >
            Send Another Message
          </button>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={"Let's Build Something\nIntelligent"}
          description="Tell us about your project, challenge, or automation opportunity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-16">
          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-4">
            {infoCards.map(({ Icon, label, value }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-5 rounded-2xl border border-edge bg-soft flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/[0.07] flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-body/40 uppercase tracking-wider">{label}</p>
                  <p className="mt-1 text-sm font-medium text-dark">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 p-8 md:p-10 rounded-2xl border border-edge bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-body/50 mb-1.5">Full Name *</label>
                <input id="name" type="text" value={form.name} onChange={handleChange('name')} className={inputClass('name')} />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="company" className="block text-xs font-semibold text-body/50 mb-1.5">Company Name</label>
                <input id="company" type="text" value={form.company} onChange={handleChange('company')} className={inputClass('company')} />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-body/50 mb-1.5">Work Email *</label>
                <input id="email" type="email" value={form.email} onChange={handleChange('email')} className={inputClass('email')} />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-body/50 mb-1.5">Phone Number</label>
                <input id="phone" type="tel" value={form.phone} onChange={handleChange('phone')} className={inputClass('phone')} />
              </div>
              <div>
                <label htmlFor="service" className="block text-xs font-semibold text-body/50 mb-1.5">Service Required *</label>
                <select id="service" value={form.service} onChange={handleChange('service')} className={inputClass('service')}>
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
              </div>
              <div>
                <label htmlFor="budget" className="block text-xs font-semibold text-body/50 mb-1.5">Project Budget</label>
                <input id="budget" type="text" value={form.budget} onChange={handleChange('budget')} className={inputClass('budget')} placeholder="e.g. ₹10k – ₹15k" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="timeline" className="block text-xs font-semibold text-body/50 mb-1.5">Project Timeline</label>
                <input id="timeline" type="text" value={form.timeline} onChange={handleChange('timeline')} className={inputClass('timeline')} placeholder="e.g. 4–6 weeks" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-xs font-semibold text-body/50 mb-1.5">Project Description *</label>
                <textarea id="description" rows={4} value={form.description} onChange={handleChange('description')} className={inputClass('description')} />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>
            </div>

            {submitError && (
              <div
                role="alert"
                className="mt-5 p-4 rounded-xl border border-red-200 bg-red-50/80 text-red-700 text-sm flex items-start gap-3"
              >
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
                <div className="flex-1">
                  <p className="font-semibold text-red-900 text-xs uppercase tracking-wider">Submission Error</p>
                  <p className="text-xs text-red-700/90 mt-1 leading-relaxed">{submitError}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed group"
            >
              {status === 'loading' ? (
                <><Loader2 size={16} className="animate-spin" /> Submitting...</>
              ) : (
                <>Send Project Request <Send size={14} className="transition-transform group-hover:translate-x-0.5" /></>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
