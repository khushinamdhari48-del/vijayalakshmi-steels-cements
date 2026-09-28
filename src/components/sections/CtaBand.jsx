import { ArrowRight, Phone, Navigation } from 'lucide-react'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { telHref, directionsHref } from '../../lib/contact'

export function CtaBand() {
  return (
    <section aria-label="Get a quote" className="relative overflow-hidden bg-accent-500">
      <div className="blueprint-light absolute inset-0 opacity-60" aria-hidden="true" />
      <Reveal className="container-x relative flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight font-black text-ink-950 sm:text-4xl">
            Need steel or cement for your project?
          </h2>
          <p className="mt-3 text-lg font-medium text-ink-900/80">Send your requirement. We’ll get back with a quote.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#quote" variant="dark" size="lg" iconRight={ArrowRight}>
            Request a Quote
          </Button>
          {telHref ? (
            <Button href={telHref} variant="light" size="lg" icon={Phone}>
              Call Now
            </Button>
          ) : (
            <Button href={directionsHref} external variant="light" size="lg" icon={Navigation}>
              Get Directions
            </Button>
          )}
        </div>
      </Reveal>
    </section>
  )
}
