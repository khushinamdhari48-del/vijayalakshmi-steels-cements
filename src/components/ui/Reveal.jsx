import { useReveal } from '../../hooks/useReveal'
import { cn } from '../../lib/cn'

export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn('reveal', visible && 'is-visible', className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
