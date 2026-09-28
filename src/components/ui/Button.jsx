import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-accent-500 text-ink-950 hover:bg-accent-400 shadow-lg shadow-accent-500/20',
  dark: 'bg-ink-900 text-white hover:bg-ink-700',
  light: 'bg-white text-ink-900 hover:bg-steel-100',
  whatsapp: 'bg-whatsapp text-ink-950 hover:brightness-110',
  'outline-light': 'text-white ring-1 ring-inset ring-white/25 hover:bg-white/10 hover:ring-white/40',
  'outline-dark': 'text-ink-900 ring-1 ring-inset ring-ink-900/20 hover:bg-ink-900/5 hover:ring-ink-900/40',
}

const sizes = {
  sm: 'h-10 px-4 text-sm gap-2',
  md: 'h-12 px-6 text-[15px] gap-2.5',
  lg: 'h-14 px-7 text-base gap-3',
}

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  external,
  ...props
}) {
  const classes = cn(
    'group inline-flex items-center justify-center rounded-xl font-semibold whitespace-nowrap',
    'transition duration-200 active:scale-[0.98]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variants[variant],
    sizes[size],
    className,
  )
  const content = (
    <>
      {Icon && <Icon className="size-[1.15em] shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && (
        <IconRight
          className="size-[1.1em] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
