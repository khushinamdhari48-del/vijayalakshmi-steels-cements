import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'light', id }) {
  const dark = tone === 'dark'
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p
          className={cn(
            'mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase',
            dark ? 'text-accent-400' : 'text-accent-700',
          )}
        >
          <span className="h-px w-6 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          'text-3xl leading-[1.1] font-extrabold sm:text-4xl lg:text-[2.75rem]',
          dark ? 'text-white' : 'text-ink-950',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-5 text-base leading-relaxed sm:text-lg', dark ? 'text-steel-300' : 'text-steel-500')}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
