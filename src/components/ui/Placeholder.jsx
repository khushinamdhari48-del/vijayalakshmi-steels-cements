/** Visibly marks a detail that hasn't been supplied yet. Replace via src/data/business.js. */
export function Placeholder({ children = 'To be added', className = '' }) {
  return (
    <span className={`italic opacity-60 ${className}`} title="Placeholder: add this detail in src/data/business.js">
      {children}
    </span>
  )
}
