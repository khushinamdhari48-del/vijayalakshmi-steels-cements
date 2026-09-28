import { useCallback, useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, Camera, Expand } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { business } from '../../data/business'
import { cn } from '../../lib/cn'

const PLACEHOLDER_TILES = ['Shop front', 'Steel stock', 'Cement stock', 'Inside the store', 'At the counter']

function Lightbox({ items, index, onClose, onNav }) {
  const closeRef = useRef(null)
  const item = items[index]

  useEffect(() => {
    const prevFocus = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prevFocus?.focus?.()
    }
  }, [onClose, onNav])

  const ctrl =
    'grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-accent-500'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4 sm:p-10"
      onClick={onClose}
    >
      <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="max-h-[80vh] w-auto rounded-2xl object-contain" />
        {item.caption && <figcaption className="mt-4 text-center text-sm text-steel-300">{item.caption}</figcaption>}
      </figure>
      <button ref={closeRef} type="button" className={cn(ctrl, 'absolute top-4 right-4')} onClick={onClose} aria-label="Close">
        <X className="size-5" />
      </button>
      {items.length > 1 && (
        <>
          <button
            type="button"
            className={cn(ctrl, 'absolute top-1/2 left-3 -translate-y-1/2 sm:left-6')}
            onClick={(e) => (e.stopPropagation(), onNav(-1))}
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            className={cn(ctrl, 'absolute top-1/2 right-3 -translate-y-1/2 sm:right-6')}
            onClick={(e) => (e.stopPropagation(), onNav(1))}
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}
    </div>
  )
}

export function Gallery() {
  const items = business.gallery
  const [open, setOpen] = useState(null)
  const close = useCallback(() => setOpen(null), [])
  const nav = useCallback((d) => setOpen((i) => (i + d + items.length) % items.length), [items.length])

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title="A look at the shop"
          description={items.length ? 'Photos from our store and stock.' : 'Shop and stock photos are coming soon.'}
        />

        {items.length ? (
          <ul className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((img, i) => (
              <Reveal as="li" key={img.src} delay={(i % 3) * 80} className="mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                  aria-label={`View larger: ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink-950/70 via-transparent p-4 opacity-0 transition group-hover:opacity-100">
                    <span className="text-sm font-semibold text-white">{img.caption}</span>
                    <Expand className="size-5 text-white" aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        ) : (
          <ul className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] lg:grid-cols-4">
            {PLACEHOLDER_TILES.map((label, i) => (
              <Reveal
                as="li"
                key={label}
                delay={i * 70}
                className={cn(
                  'blueprint-light relative flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-steel-300 bg-steel-100 text-center',
                  i === 0 && 'col-span-2 row-span-2',
                )}
              >
                <Camera className="size-6 text-steel-400" aria-hidden="true" />
                <span className="text-sm font-semibold text-ink-700">{label}</span>
                <span className="text-xs text-steel-500">Photo coming soon</span>
              </Reveal>
            ))}
          </ul>
        )}
      </div>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onNav={nav} />}
    </section>
  )
}
