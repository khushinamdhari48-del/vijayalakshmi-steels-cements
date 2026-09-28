import { business } from '../../data/business'
import { cn } from '../../lib/cn'

/** Typographic wordmark. Swap for the real logo file when one is supplied. */
export function Logo({ tone = 'dark', className }) {
  return (
    <a
      href="#home"
      className={cn(
        'group flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-500',
        className,
      )}
      aria-label={`${business.name}, back to top`}
    >
      <svg viewBox="0 0 64 64" className="size-10 shrink-0" aria-hidden="true">
        <rect width="64" height="64" rx="14" className={tone === 'dark' ? 'fill-white/5' : 'fill-ink-900'} />
        <rect width="63" height="63" x=".5" y=".5" rx="13.5" fill="none" className="stroke-white/15" />
        <path d="M14 16h10l8 22 8-22h10L37 48H27z" className="fill-accent-500" />
        <rect x="14" y="52" width="36" height="4" rx="2" className="fill-steel-400" />
      </svg>
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-[17px] font-extrabold tracking-tight',
            tone === 'dark' ? 'text-white' : 'text-ink-950',
          )}
          style={{ fontStretch: '115%' }}
        >
          {business.shortName}
        </span>
        <span
          className={cn(
            'mt-1 block text-[10.5px] font-semibold tracking-[0.22em] uppercase',
            tone === 'dark' ? 'text-steel-400' : 'text-steel-500',
          )}
        >
          {business.wordmarkSub}
        </span>
      </span>
    </a>
  )
}
