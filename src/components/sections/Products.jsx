import { ArrowRight, MessageSquareText } from 'lucide-react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { RoofingArt } from '../art/RoofingArt'
import { business } from '../../data/business'
import { enquireAbout } from '../../lib/contact'

const ART = { roofing: RoofingArt }

function ProductVisual({ product }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.imageAlt}
        loading="lazy"
        className="size-full object-cover transition duration-700 group-hover:scale-105"
      />
    )
  }
  const Art = ART[product.art]
  return (
    <div className="blueprint relative size-full bg-gradient-to-br from-ink-800 to-ink-950">
      {Art && <Art className="absolute inset-0 size-full transition duration-700 group-hover:scale-105" />}
    </div>
  )
}

export function Products() {
  return (
    <section id="products" aria-labelledby="products-title" className="bg-steel-100 py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="products-title"
            eyebrow="Products"
            title="What we supply"
            description="Structural steel, cement and roofing from brands builders know. Enquire for current stock, sizes and pricing."
          />
          <Reveal delay={100}>
            <Button href="#quote" variant="outline-dark" iconRight={ArrowRight}>
              Request a price
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {business.products.map((p, i) => (
            <Reveal
              as="li"
              key={p.id}
              delay={(i % 3) * 100}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-steel-200 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink-900/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                <ProductVisual product={p} />
                <span className="absolute top-4 left-4 rounded-full bg-ink-950/80 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-2xl font-extrabold text-ink-950">{p.name}</h3>
                <p className="mt-3 leading-relaxed text-steel-500">{p.description}</p>
                {p.brands?.length > 0 && (
                  <div className="mt-5 flex-1">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-steel-500 uppercase">Brands</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {p.brands.map((b) => (
                        <li
                          key={b}
                          className="rounded-lg bg-steel-100 px-2.5 py-1 text-sm font-semibold text-ink-800 ring-1 ring-steel-200"
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button
                  href="#quote"
                  onClick={() => enquireAbout(p.option)}
                  variant="dark"
                  className="mt-6 self-start"
                  iconRight={ArrowRight}
                  aria-label={`Enquire now about ${p.name}`}
                >
                  Enquire Now
                </Button>
              </div>
            </Reveal>
          ))}

          <Reveal
            as="li"
            delay={100}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink-950 p-7 text-white sm:p-9 md:col-span-2"
          >
            <div className="blueprint absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="hazard absolute inset-y-0 right-0 w-2" aria-hidden="true" />
            <div className="relative">
              <span className="grid size-12 place-items-center rounded-xl bg-accent-500 text-ink-950">
                <MessageSquareText className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold sm:text-3xl">Need a mix of materials?</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-steel-300">
                Send one list with everything: TMT sizes, cement bags, sections and sheets. We’ll quote it together.
              </p>
            </div>
            <Button
              href="#quote"
              onClick={() => enquireAbout('Multiple products')}
              className="relative mt-8 self-start"
              iconRight={ArrowRight}
            >
              Send Your List
            </Button>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}
