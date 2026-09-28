import { Package, Users, MapPin, Clock, CalendarCheck } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Placeholder } from '../ui/Placeholder'
import { business, fullAddress } from '../../data/business'

export function About() {
  const facts = [
    { icon: Package, label: 'What we sell', value: 'TMT, cement, MS sections, pipes & roofing' },
    { icon: Users, label: 'Who we serve', value: 'Homeowners, builders & contractors' },
    business.established && { icon: CalendarCheck, label: 'Established', value: `February ${business.established}` },
    {
      icon: Clock,
      label: 'Business hours',
      value: business.hours.length ? business.hours.map((h) => `${h.days}: ${h.time}`).join(' · ') : null,
    },
  ].filter(Boolean)

  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-white py-20 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About us"
            title={`Your local steel & cement dealer in ${business.address.locality}`}
          />
          <Reveal delay={100} className="mt-6 space-y-4 text-base leading-relaxed text-steel-500 sm:text-lg">
            <p>
              Since {business.established}, <strong className="text-ink-900">{business.name}</strong> has supplied
              building materials from our store on Nirmala Vidyalaya Road, {business.address.locality}. We stock{' '}
              <strong className="text-ink-900">TMT bars</strong> from Tata, Meenakshi, Indus and JSW,{' '}
              <strong className="text-ink-900">ACC cement</strong>, MS sections and pipes from Apollo and Tata, and
              roofing sheets from Apollo and Ganga.
            </p>
            <p>
              Whether it’s a new house, an extension or a site you’re managing, walk in, call or send us your list.
              We’ll talk it through and give you a clear quote.
            </p>
          </Reveal>
          <Reveal delay={160} className="mt-8 flex items-start gap-3 rounded-2xl bg-steel-100 p-5">
            <MapPin className="mt-0.5 size-5 shrink-0 text-accent-700" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-ink-700">
              <span className="font-semibold text-ink-900">Find us at</span>
              <br />
              {fullAddress}
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <div className="blueprint-light absolute -inset-4 rounded-[2rem] sm:-inset-6" aria-hidden="true" />
          <div className="relative grid gap-4 sm:grid-cols-2">
            <Reveal className="relative overflow-hidden rounded-2xl sm:col-span-2">
              <img
                src="photos/store-interior.jpg"
                alt="Store interior with ACC cement stacks, wire mesh rolls and the billing office"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="hazard absolute inset-x-0 bottom-0 h-1.5" aria-hidden="true" />
            </Reveal>
            <dl className="contents">
              {facts.map(({ icon: Icon, label, value }, i) => (
                <Reveal
                  key={label}
                  delay={i * 80}
                  className="group rounded-2xl border border-steel-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-xl hover:shadow-ink-900/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink-900 text-accent-400 transition-colors group-hover:bg-accent-500 group-hover:text-ink-950">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <dt className="text-xs font-bold tracking-[0.14em] text-steel-500 uppercase">{label}</dt>
                  </div>
                  <dd className="mt-3 font-display text-base leading-snug font-bold text-ink-950">
                    {value ?? <Placeholder>Hours to be added</Placeholder>}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
