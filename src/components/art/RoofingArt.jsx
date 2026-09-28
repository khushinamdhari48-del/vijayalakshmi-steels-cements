import { useId } from 'react'

/** Illustrated stack of corrugated roofing sheets (used until a real photo is added). */
export function RoofingArt({ className }) {
  const uid = useId().replace(/:/g, '')
  const wave = `wave-${uid}`
  const sheet = `sheet-${uid}`

  return (
    <svg viewBox="0 0 480 360" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={sheet} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d97a3" />
          <stop offset=".5" stopColor="#dfe4ea" />
          <stop offset="1" stopColor="#7c8692" />
        </linearGradient>
        <pattern id={wave} width="28" height="10" patternUnits="userSpaceOnUse">
          <rect width="14" height="10" fill="#000" fillOpacity=".22" />
          <rect x="14" width="14" height="10" fill="#fff" fillOpacity=".12" />
        </pattern>
      </defs>
      <ellipse cx="240" cy="300" rx="210" ry="26" fill="#000" opacity=".35" />
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 230 - i * 26
        const x = 70 + (i % 2) * 14
        return (
          <g key={i} transform={`skewX(-18) translate(${60 + i * 6} 0)`}>
            <rect x={x} y={y} width="300" height="22" rx="2" fill={i === 4 ? '#f26b1d' : `url(#${sheet})`} />
            <rect x={x} y={y} width="300" height="22" rx="2" fill={`url(#${wave})`} />
            <rect x={x} y={y + 18} width="300" height="4" fill="#000" fillOpacity=".25" />
          </g>
        )
      })}
    </svg>
  )
}
