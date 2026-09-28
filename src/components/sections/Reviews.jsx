import { Star, Quote, ExternalLink } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { business } from '../../data/business'
import { cn } from '../../lib/cn'

function Stars({ value, className }) {
  return (
    <span className={cn('flex gap-0.5', className)} role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn('size-4', i < Math.round(value) ? 'fill-accent-500 text-accent-500' : 'text-steel-300')}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

export function Reviews() {
  const { reviews, rating } = business

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-steel-100 py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="reviews-title" eyebrow="Reviews" title="What customers say" />
          {rating && (
            <Reveal className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-steel-200">
              <span className="font-display text-4xl font-black text-ink-950">{rating.value.toFixed(1)}</span>
              <span>
                <Stars value={rating.value} />
                <span className="mt-1 block text-sm text-steel-500">
                  {rating.count} ratings{rating.source ? ` on ${rating.source}` : ''}
                </span>
              </span>
            </Reveal>
          )}
        </div>

        {reviews.length ? (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal
                as="li"
                key={`${r.name}-${i}`}
                delay={(i % 3) * 90}
                className="flex flex-col rounded-3xl bg-white p-7 ring-1 ring-steel-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5"
              >
                <Quote className="size-8 text-accent-500" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-ink-700">“{r.text}”</blockquote>
                <footer className="mt-6 flex items-center justify-between border-t border-steel-200 pt-5">
                  <span>
                    <cite className="block font-semibold text-ink-950 not-italic">{r.name}</cite>
                    {r.date && <span className="text-xs text-steel-500">{r.date}</span>}
                  </span>
                  <Stars value={r.rating} />
                </footer>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="mt-12 flex flex-col items-start gap-6 rounded-3xl bg-white p-8 ring-1 ring-steel-200 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-ink-900 text-accent-400">
                <Star className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-xl font-bold text-ink-950">Bought from us?</p>
                <p className="mt-1.5 max-w-lg leading-relaxed text-steel-500">
                  Your review helps other builders in {business.address.locality} find a dealer they can rely on.
                </p>
              </div>
            </div>
            <Button href={business.justdialUrl} external variant="outline-dark" iconRight={ExternalLink}>
              Leave a review on Justdial
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  )
}
