import { useEffect, useId, useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Phone, Navigation, Check, ChevronDown } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { business, productOptions } from '../../data/business'
import { directionsHref } from '../../lib/contact'
import { cn } from '../../lib/cn'

const EMPTY = { name: '', phone: '', email: '', product: '', quantity: '', message: '', company: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  const digits = v.phone.replace(/[\s\-()]/g, '')
  if (!digits) e.phone = 'Please enter your phone number.'
  else if (!/^(\+?91|0)?[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit Indian mobile number.'
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (!v.product) e.product = 'Please choose a product.'
  if (v.message.length > 1000) e.message = 'Please keep the message under 1000 characters.'
  return e
}

function toMessage(v) {
  return [
    `New enquiry for ${business.name}`,
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    `Product: ${v.product}`,
    v.quantity && `Quantity: ${v.quantity}`,
    v.message && `Message: ${v.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

/** Sends the enquiry via the first configured channel. Returns 'sent' | 'handoff' | 'unconfigured'. */
async function submitEnquiry(values) {
  if (business.enquiryEndpoint) {
    const res = await fetch(business.enquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    })
    if (!res.ok) throw new Error('Request failed')
    return 'sent'
  }
  const text = toMessage(values)
  if (business.whatsapp) {
    window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    return 'handoff'
  }
  if (business.email) {
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      `Quote request: ${values.product}`,
    )}&body=${encodeURIComponent(text)}`
    return 'handoff'
  }
  return 'unconfigured'
}

const inputBase =
  'block w-full rounded-xl border bg-white px-4 py-3.5 text-base text-ink-950 placeholder:text-steel-400 transition focus:outline-none focus:ring-4'

function Field({ label, error, required, optional, children, id, className }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-semibold text-ink-900">
        <span>
          {label}
          {required && (
            <span className="text-accent-700" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </span>
        {optional && <span className="text-xs font-normal text-steel-500">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-1.5 text-sm text-red-700">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  )
}

export function QuoteForm() {
  const uid = useId()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | sent | handoff | unconfigured | error

  useEffect(() => {
    const onEnquire = (e) => {
      if (productOptions.includes(e.detail)) setValues((v) => ({ ...v, product: e.detail }))
    }
    window.addEventListener('enquire', onEnquire)
    return () => window.removeEventListener('enquire', onEnquire)
  }, [])

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (touched[key]) setErrors(validate(next))
  }
  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.company) return // honeypot
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, phone: true, email: true, product: true, message: true })
    if (Object.keys(found).length) {
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      const result = await submitEnquiry(values)
      setStatus(result)
      if (result !== 'unconfigured') setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (key) => ({
    id: `${uid}-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    onBlur: blur(key),
    'aria-invalid': errors[key] && touched[key] ? true : undefined,
    'aria-describedby': errors[key] && touched[key] ? `${uid}-${key}-error` : undefined,
    className: cn(
      inputBase,
      errors[key] && touched[key]
        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
        : 'border-steel-300 focus:border-accent-500 focus:ring-accent-500/20',
    ),
  })
  const err = (key) => (touched[key] ? errors[key] : undefined)

  return (
    <section
      id="quote"
      aria-labelledby="quote-title"
      className="relative isolate overflow-hidden bg-ink-950 py-20 text-white sm:py-28"
    >
      <div className="blueprint absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute top-[-20%] right-[-10%] -z-10 size-[32rem] rounded-full bg-accent-500/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            id="quote-title"
            tone="dark"
            eyebrow="Request a quote"
            title="Tell us what you need"
            description="Share a few details and we’ll get back to you with a price."
          />
          <Reveal delay={100}>
            <ul className="mt-8 space-y-3">
              {['Product: TMT, cement, sections or sheets', 'Size or grade, if you know it', 'Quantity and when you need it'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3 text-steel-300">
                    <span className="grid size-6 place-items-center rounded-full bg-accent-500/15 text-accent-400">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
          <Reveal delay={160} className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-steel-400">Prefer to talk?</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {business.phones.length ? (
                business.phones.map((ph) => (
                  <Button key={ph.e164} href={`tel:${ph.e164}`} variant="outline-light" size="sm" icon={Phone}>
                    {ph.display}
                  </Button>
                ))
              ) : (
                <Button href={directionsHref} external variant="outline-light" size="sm" icon={Navigation}>
                  Visit the shop
                </Button>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-3xl bg-white p-6 text-ink-950 shadow-2xl shadow-black/40 sm:p-10"
            aria-describedby={`${uid}-req`}
          >
            <p id={`${uid}-req`} className="mb-6 text-sm text-steel-500">
              Fields marked <span className="text-accent-700">*</span> are required.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required id={`${uid}-name`} error={err('name')}>
                <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
              </Field>
              <Field label="Phone number" required id={`${uid}-phone`} error={err('phone')}>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  {...fieldProps('phone')}
                />
              </Field>
              <Field label="Email" optional id={`${uid}-email`} error={err('email')}>
                <input type="email" autoComplete="email" placeholder="you@example.com" {...fieldProps('email')} />
              </Field>
              <Field label="Product interested in" required id={`${uid}-product`} error={err('product')}>
                <div className="relative">
                  <select {...fieldProps('product')} className={cn(fieldProps('product').className, 'appearance-none pr-11')}>
                    <option value="">Select a product</option>
                    {productOptions.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-steel-500"
                    aria-hidden="true"
                  />
                </div>
              </Field>
              <Field label="Quantity" optional id={`${uid}-quantity`} className="sm:col-span-2">
                <input type="text" placeholder="e.g. 2 tonnes of 12 mm TMT, 100 bags cement" {...fieldProps('quantity')} />
              </Field>
              <Field label="Message" optional id={`${uid}-message`} error={err('message')} className="sm:col-span-2">
                <textarea
                  rows={4}
                  placeholder="Sizes, grade, site location, when you need it…"
                  {...fieldProps('message')}
                  className={cn(fieldProps('message').className, 'resize-y')}
                />
              </Field>
              {/* honeypot */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Company <input tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
                </label>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-8 w-full sm:w-auto"
              icon={Send}
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Request a Quote'}
            </Button>

            <div aria-live="polite" className="empty:hidden mt-6">
              {(status === 'sent' || status === 'handoff') && (
                <p className="flex items-start gap-3 rounded-xl bg-green-50 p-4 text-sm text-green-900 ring-1 ring-green-200">
                  <CheckCircle2 className="size-5 shrink-0 text-green-700" aria-hidden="true" />
                  {status === 'sent'
                    ? 'Thanks! Your enquiry has been sent. We’ll get back to you soon.'
                    : 'Almost done: send the pre-filled message that just opened to complete your enquiry.'}
                </p>
              )}
              {status === 'unconfigured' && (
                <p className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
                  <AlertCircle className="size-5 shrink-0 text-amber-700" aria-hidden="true" />
                  <span>
                    Thanks! Online enquiries are still being set up, so please call us to confirm your order:{' '}
                    {business.phones.map((ph, i) => (
                      <span key={ph.e164}>
                        {i > 0 && ' or '}
                        <a href={`tel:${ph.e164}`} className="font-semibold underline underline-offset-2">
                          {ph.display}
                        </a>
                      </span>
                    ))}
                    .
                  </span>
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-900 ring-1 ring-red-200">
                  <AlertCircle className="size-5 shrink-0 text-red-700" aria-hidden="true" />
                  Something went wrong sending your enquiry. Please try again or contact us directly.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
