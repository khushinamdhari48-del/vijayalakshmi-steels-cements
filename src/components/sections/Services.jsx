import { Store, ClipboardList, PhoneCall, ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'

// Only services implied by the listing. Add delivery / bulk supply etc. here once the shop confirms them.
const SERVICES = [
  {
    icon: Store,
    title: 'Walk-in counter sales',
    text: 'Visit our store on Nirmala Vidyalaya Road, Gattahalli. See the stock and buy what you need.',
  },
  {
    icon: ClipboardList,
    title: 'Quotes for your project',
    text: 'Send your list of sizes and quantities. We’ll price it so you can plan ahead.',
  },
  {
    icon: PhoneCall,
    title: 'Enquire by phone',
    text: 'Call +91 63638 40973 or +91 94480 72753 to check availability and prices before you travel.',
  },
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-white py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="How we can help"
            description="Simple ways to buy from us, whether you’re at the counter or planning from site."
          />
          <Reveal delay={120} className="mt-8">
            <Button href="#quote" iconRight={ArrowRight}>
              Enquire Now
            </Button>
          </Reveal>
        </div>

        <ol className="relative space-y-5">
          {SERVICES.map(({ icon: Icon, title, text }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 100}
              className="group flex gap-5 rounded-3xl border border-steel-200 bg-white p-6 transition duration-300 hover:border-ink-900 hover:shadow-xl hover:shadow-ink-900/5 sm:gap-7 sm:p-8"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-steel-100 text-ink-900 transition group-hover:bg-accent-500">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-ink-950">{title}</h3>
                <p className="mt-2 leading-relaxed text-steel-500">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
