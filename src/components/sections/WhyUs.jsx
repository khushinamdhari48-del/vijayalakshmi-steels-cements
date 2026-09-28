import { BadgeCheck, Layers, MapPin, PhoneCall, ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { business, allBrands } from '../../data/business'

const POINTS = [
  {
    icon: BadgeCheck,
    title: 'Trusted brands',
    text: `${allBrands.slice(0, -1).join(', ')} and ${allBrands.at(-1)}: the names builders ask for, all at one counter.`,
  },
  {
    icon: Layers,
    title: 'The whole structure, one shop',
    text: 'TMT bars, cement, MS sections, pipes and roofing sheets, so you don’t have to run between suppliers.',
  },
  {
    icon: MapPin,
    title: `Right here in ${business.address.locality}`,
    text: `On Nirmala Vidyalaya Road, convenient for sites around ${business.nearby.join(' and ')}.`,
  },
  {
    icon: PhoneCall,
    title: 'Direct lines, clear quotes',
    text: 'Two phone numbers that reach the shop directly. Share your list and get a price before you commit.',
  },
]

export function WhyUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-title"
      className="relative isolate overflow-hidden bg-ink-900 py-20 text-white sm:py-28"
    >
      <div className="blueprint absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div
        className="absolute bottom-[-30%] left-[-10%] -z-10 size-[30rem] rounded-full bg-accent-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="container-x">
        <SectionHeading
          id="why-title"
          tone="dark"
          eyebrow="Why choose us"
          title="Straightforward supply for serious builds"
          description="Known brands, a full structural range and a local shop you can walk into."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 90}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-accent-500/50 hover:bg-white/[0.06]"
            >
              <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-5 grid size-12 place-items-center rounded-2xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/30 transition group-hover:bg-accent-500 group-hover:text-ink-950">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg leading-snug font-bold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel-400">{text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-steel-200">Planning a build? Let’s price your materials.</p>
          <Button href="#quote" iconRight={ArrowRight}>
            Get a Quote
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
