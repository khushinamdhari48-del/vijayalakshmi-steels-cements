import { business } from '../../data/business'
import { cn } from '../../lib/cn'

/** Brand lockup: hex-nut badge (public/brand/logo-mark.svg) + live-text wordmark. */
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
      <img
        src="brand/logo-mark.svg"
        alt=""
        width="44"
        height="44"
        className="size-11 shrink-0 transition-transform duration-300 group-hover:rotate-[-6deg]"
      />
      <span className="leading-none">
        <span
          className={cn(
            'block font-display text-[17px] font-black tracking-tight uppercase',
            tone === 'dark' ? 'text-white' : 'text-ink-950',
          )}
          style={{ fontStretch: '118%' }}
        >
          {business.shortName}
        </span>
        <span className="mt-1.5 block h-0.5 w-6 rounded-full bg-accent-500" aria-hidden="true" />
        <span
          className={cn(
            'mt-1.5 block text-[10px] font-semibold tracking-[0.3em] uppercase',
            tone === 'dark' ? 'text-steel-400' : 'text-steel-500',
          )}
        >
          {business.wordmarkSub}
        </span>
      </span>
    </a>
  )
}
