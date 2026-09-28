import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight, Phone } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { telHref } from '../../lib/contact'
import { primaryPhone } from '../../data/business'
import { cn } from '../../lib/cn'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Choose Us' },
  { id: 'contact', label: 'Contact' },
]
const IDS = LINKS.map((l) => l.id)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open ? 'border-b border-white/10 bg-ink-950/90 backdrop-blur-lg' : 'bg-transparent',
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between lg:h-20" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === l.id ? 'true' : undefined}
                className={cn(
                  'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  'focus-visible:outline-2 focus-visible:outline-accent-500',
                  active === l.id ? 'text-white' : 'text-steel-300 hover:text-white',
                )}
              >
                {l.label}
                <span
                  className={cn(
                    'absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent-500 transition-transform duration-300',
                    active === l.id ? 'scale-x-100' : 'scale-x-0',
                  )}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {telHref && (
            <a
              href={telHref}
              className="hidden items-center gap-2 px-3 text-sm font-semibold text-white hover:text-accent-400 xl:flex"
            >
              <Phone className="size-4" aria-hidden="true" /> {primaryPhone.display}
            </a>
          )}
          <span className="hidden sm:contents">
            <Button href="#quote" size="sm" iconRight={ArrowRight}>
              Get a Quote
            </Button>
          </span>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-white ring-1 ring-white/15 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-accent-500 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ink-950 lg:hidden"
      >
        <ul className="container-x flex flex-col py-4">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={close}
                className={cn(
                  'flex items-center justify-between border-b border-white/5 py-4 font-display text-xl font-bold',
                  active === l.id ? 'text-accent-400' : 'text-white',
                )}
                style={{ fontStretch: '110%' }}
              >
                {l.label}
                <ArrowRight className="size-5 text-steel-500" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <div className="container-x pb-8">
          <Button href="#quote" onClick={close} size="lg" className="w-full" iconRight={ArrowRight}>
            Get a Quote
          </Button>
        </div>
      </div>
    </header>
  )
}
