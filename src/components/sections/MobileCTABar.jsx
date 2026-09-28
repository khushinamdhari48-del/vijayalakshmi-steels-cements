import { Phone, Navigation, FileText } from 'lucide-react'
import { WhatsAppIcon } from '../ui/WhatsAppIcon'
import { telHref, whatsappHref, directionsHref } from '../../lib/contact'

const item =
  'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold tracking-wide uppercase focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-500'

/** Sticky conversion bar, mobile only. */
export function MobileCTABar() {
  const wa = whatsappHref()

  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-ink-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:hidden"
    >
      {telHref ? (
        <a href={telHref} className={`${item} text-white`}>
          <Phone className="size-5 text-accent-400" aria-hidden="true" /> Call Now
        </a>
      ) : (
        <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={`${item} text-white`}>
          <Navigation className="size-5 text-accent-400" aria-hidden="true" /> Directions
        </a>
      )}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} border-l border-white/10 text-white`}
        >
          <WhatsAppIcon className="size-5 text-whatsapp" /> WhatsApp
        </a>
      )}
      <a href="#quote" className={`${item} bg-accent-500 text-ink-950`}>
        <FileText className="size-5" aria-hidden="true" /> Get a Quote
      </a>
    </nav>
  )
}
