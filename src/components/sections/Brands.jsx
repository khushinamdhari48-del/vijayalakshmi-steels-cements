import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { business } from '../../data/business'

/** Brand names as listed on the shop's signboard. Renders only when brands are set. */
export function Brands() {
  if (!business.brands.length) return null

  return (
    <section id="brands" aria-labelledby="brands-title" className="border-b border-steel-200 bg-white py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          id="brands-title"
          eyebrow="Brands we deal in"
          title="Names you already trust"
          description="As listed at our store in Gattahalli."
          align="center"
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {business.brands.map((group, i) => (
            <Reveal
              as="li"
              key={group.category}
              delay={i * 80}
              className="rounded-3xl border border-steel-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-xl hover:shadow-ink-900/5"
            >
              <p className="text-xs font-bold tracking-[0.16em] text-accent-700 uppercase">{group.category}</p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {group.names.map((n) => (
                  <li
                    key={n}
                    className="font-display text-2xl font-black tracking-tight text-ink-900"
                    style={{ fontStretch: '118%' }}
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
