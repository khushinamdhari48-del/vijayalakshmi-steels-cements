import { MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Placeholder } from '../ui/Placeholder'
import { business, fullAddress } from '../../data/business'
import { emailHref, directionsHref } from '../../lib/contact'

const QUICK_LINKS = [
  ['#home', 'Home'],
  ['#about', 'About'],
  ['#products', 'Products'],
  ['#services', 'Services'],
  ['#why-us', 'Why Choose Us'],
  ['#gallery', 'Gallery'],
  ['#contact', 'Contact'],
  ['#quote', 'Get a Quote'],
]

const heading = 'text-xs font-bold tracking-[0.18em] text-steel-400 uppercase'
const linkCls = 'text-steel-300 transition hover:text-accent-400 focus-visible:outline-2 focus-visible:outline-accent-500'

export function Footer() {
  const social = Object.entries(business.social)

  return (
    <footer className="bg-ink-950 pb-24 text-sm text-steel-300 md:pb-0">
      <div className="hazard h-1.5" aria-hidden="true" />
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-4 text-sm text-steel-400" lang="kn">
            {business.nameKannada}
          </p>
          <p className="mt-3 max-w-xs leading-relaxed text-steel-400">
            TMT steel, cement, MS sections, pipes and roofing sheets in {business.address.locality},{' '}
            {business.address.city}. Established {business.established}.
          </p>
          {social.length > 0 && (
            <ul className="mt-6 flex gap-3">
              {social.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className={`${linkCls} capitalize`}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className={heading}>Quick links</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
            {QUICK_LINKS.map(([href, label]) => (
              <li key={href}>
                <a href={href} className={linkCls}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Products</h2>
          <ul className="mt-5 space-y-3">
            {business.products.map((p) => (
              <li key={p.id}>
                <a href="#products" className={linkCls}>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Contact</h2>
          <address className="mt-5 space-y-4 not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
              <span>{fullAddress}</span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
              {business.phones.length ? (
                <span className="flex flex-col gap-1">
                  {business.phones.map((ph) => (
                    <a key={ph.e164} href={`tel:${ph.e164}`} className={linkCls}>
                      {ph.display}
                    </a>
                  ))}
                </span>
              ) : (
                <Placeholder>Phone to be added</Placeholder>
              )}
            </p>
            {emailHref && (
              <p className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
                <a href={emailHref} className={linkCls}>
                  {business.email}
                </a>
              </p>
            )}
            <p className="flex gap-3">
              <Navigation className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={linkCls}>
                Get directions
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <a href={business.justdialUrl} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex items-center gap-1.5 text-steel-500`}>
            Find us on Justdial <ExternalLink className="size-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
