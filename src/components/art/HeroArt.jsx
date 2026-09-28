import { MapPin } from 'lucide-react'
import { business } from '../../data/business'

export function HeroArt() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-accent-500/10 blur-3xl" aria-hidden="true" />

      <figure className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
        <img
          src="photos/shop-front.jpg"
          alt={`${business.name} shop front in ${business.address.locality}, ${business.address.city}`}
          className="size-full object-cover"
          fetchPriority="high"
          width="831"
          height="773"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" aria-hidden="true" />

        <span className="absolute top-4 right-4 rounded-full bg-ink-950/80 px-3.5 py-1.5 text-xs font-bold tracking-wider text-white uppercase ring-1 ring-white/15 backdrop-blur">
          Est. {business.established}
        </span>

        <figcaption className="absolute right-4 bottom-4 left-4 flex items-end justify-start gap-4 sm:right-6 sm:bottom-6 sm:left-6 xl:justify-end">
          <div className="rounded-2xl border border-white/10 bg-ink-950/80 p-4 backdrop-blur-md">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-accent-400 uppercase">
              <MapPin className="size-3.5" aria-hidden="true" /> Visit the store
            </p>
            <p className="mt-1.5 text-sm leading-snug font-semibold text-white">
              {business.address.locality}, {business.address.city} {business.address.pincode}
            </p>
            <p className="mt-0.5 text-xs text-steel-400">Nirmala Vidyalaya Road</p>
          </div>
        </figcaption>
      </figure>

      <div className="absolute -bottom-8 -left-8 hidden w-44 overflow-hidden rounded-2xl border-4 border-ink-950 shadow-2xl xl:block">
        <img
          src="photos/cement-and-tmt.jpg"
          alt="ACC cement and TMT bars in stock"
          className="aspect-square w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  )
}
