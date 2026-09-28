import { ArrowRight, Phone, Navigation, BadgeCheck, MapPin, CalendarCheck } from 'lucide-react'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { HeroArt } from '../art/HeroArt'
import { business } from '../../data/business'
import { telHref, whatsappHref, directionsHref } from '../../lib/contact'

export function Hero() {
  const wa = whatsappHref()
  const trust = [
    { icon: BadgeCheck, label: 'ACC, Tata, JSW, Meenakshi & more' },
    business.established && { icon: CalendarCheck, label: `Established ${business.established}` },
    { icon: MapPin, label: `${business.address.locality}, ${business.address.city} ${business.address.pincode ?? ''}`.trim() },
  ].filter(Boolean)

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink-950 pt-28 pb-16 text-white sm:pt-32 lg:pt-40 lg:pb-24"
    >
      <div
        className="blueprint absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 right-[-10%] -z-10 size-[36rem] rounded-full bg-accent-500/15 blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pr-4 pl-2 text-xs font-semibold text-steel-300 sm:text-sm">
              <span className="rounded-full bg-accent-500 px-2 py-0.5 text-[11px] font-bold text-ink-950 uppercase">
                Steel &amp; Cement Dealer
              </span>
              {business.address.locality}, {business.address.city}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 id="hero-title" className="mt-6 text-[2.5rem] leading-[1.03] font-black sm:text-6xl lg:text-[4.25rem]">
              Strong builds start with the <span className="text-accent-500">right steel &amp; cement.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-300">
              <strong className="font-semibold text-white">{business.name}</strong> stocks TMT bars, ACC cement, MS
              sections, pipes and roofing sheets in {business.address.locality}, {business.address.city}. Call us or send
              your requirement for a quote.
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="#quote" size="lg" iconRight={ArrowRight}>
              Get a Quote
            </Button>
            {telHref ? (
              <Button href={telHref} variant="outline-light" size="lg" icon={Phone}>
                Call Now
              </Button>
            ) : (
              <Button href={directionsHref} external variant="outline-light" size="lg" icon={Navigation}>
                Get Directions
              </Button>
            )}
            {wa && (
              <Button href={wa} external variant="whatsapp" size="lg" icon={WhatsAppIcon}>
                WhatsApp Us
              </Button>
            )}
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm font-medium text-steel-300">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/5 text-accent-400 ring-1 ring-white/10">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <HeroArt />
        </Reveal>
      </div>

      <div className="hazard absolute inset-x-0 bottom-0 h-1.5 opacity-90" aria-hidden="true" />
    </section>
  )
}
