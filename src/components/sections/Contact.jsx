import { MapPin, Phone, Mail, Clock, Navigation, ArrowRight } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { Placeholder } from '../ui/Placeholder'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { business, fullAddress } from '../../data/business'
import { telHref, whatsappHref, emailHref, directionsHref, mapEmbedSrc } from '../../lib/contact'

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4 py-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink-900 text-accent-400">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-bold tracking-[0.14em] text-steel-500 uppercase">{label}</dt>
        <dd className="mt-1 font-medium break-words text-ink-900">{children}</dd>
      </div>
    </div>
  )
}

const link = 'underline-offset-4 hover:text-accent-700 hover:underline'

export function Contact() {
  const wa = whatsappHref()

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="contact-title"
          eyebrow="Visit or contact us"
          title={`Find us in ${business.address.locality}, ${business.address.city}`}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="rounded-3xl border border-steel-200 p-6 sm:p-8">
            <address className="not-italic">
              <dl className="divide-y divide-steel-200">
                <Row icon={MapPin} label="Address">
                  {fullAddress}
                </Row>
                <Row icon={Phone} label={business.phones.length > 1 ? 'Phone numbers' : 'Phone'}>
                  {business.phones.length ? (
                    <span className="flex flex-col gap-0.5">
                      {business.phones.map((ph) => (
                        <a key={ph.e164} href={`tel:${ph.e164}`} className={link}>
                          {ph.display}
                        </a>
                      ))}
                    </span>
                  ) : (
                    <Placeholder>Phone number to be added</Placeholder>
                  )}
                </Row>
                <Row icon={WhatsAppIcon} label="WhatsApp">
                  {wa ? (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className={link}>
                      Chat on WhatsApp
                    </a>
                  ) : (
                    <Placeholder>WhatsApp number to be added</Placeholder>
                  )}
                </Row>
                <Row icon={Mail} label="Email">
                  {emailHref ? (
                    <a href={emailHref} className={link}>
                      {business.email}
                    </a>
                  ) : (
                    <Placeholder>Email to be added</Placeholder>
                  )}
                </Row>
                <Row icon={Clock} label="Business hours">
                  {business.hours.length ? (
                    <ul className="space-y-0.5">
                      {business.hours.map((h) => (
                        <li key={h.days}>
                          <span className="text-steel-500">{h.days}:</span> {h.time}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Placeholder>Hours to be added</Placeholder>
                  )}
                </Row>
              </dl>
            </address>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={directionsHref} external icon={Navigation}>
                Get Directions
              </Button>
              <Button href={telHref ?? '#quote'} variant="outline-dark" icon={telHref ? Phone : undefined} iconRight={telHref ? undefined : ArrowRight}>
                {telHref ? 'Call Us' : 'Contact Us'}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative min-h-[360px] overflow-hidden rounded-3xl bg-steel-100 ring-1 ring-steel-200">
            <iframe
              title={`Map showing ${business.name}, ${business.address.locality}`}
              src={mapEmbedSrc}
              className="absolute inset-0 size-full border-0 grayscale-[35%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
