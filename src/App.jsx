import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Products } from './components/sections/Products'
import { WhyUs } from './components/sections/WhyUs'
import { Brands } from './components/sections/Brands'
import { Services } from './components/sections/Services'
import { CtaBand } from './components/sections/CtaBand'
import { Gallery } from './components/sections/Gallery'
import { Reviews } from './components/sections/Reviews'
import { Contact } from './components/sections/Contact'
import { QuoteForm } from './components/sections/QuoteForm'
import { Footer } from './components/sections/Footer'
import { MobileCTABar } from './components/sections/MobileCTABar'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-lg bg-accent-500 px-4 py-2 font-semibold text-ink-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Products />
        <WhyUs />
        <Brands />
        <Services />
        <CtaBand />
        <Gallery />
        <Reviews />
        <Contact />
        <QuoteForm />
      </main>
      <Footer />
      <MobileCTABar />
    </>
  )
}
