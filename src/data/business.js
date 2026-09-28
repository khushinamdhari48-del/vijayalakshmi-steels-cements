/**
 * Single source of truth for all business details shown on the site.
 *
 * Sources: Justdial listing screenshots (/listings) — address, year of establishment,
 * photos — and the shop's own signboards visible in those photos — phone numbers,
 * brands and product lines.
 *
 * null / [] = NOT yet known. The UI shows a marked placeholder or hides the section.
 * Never guess values here.
 */

export const business = {
  name: 'Vijayalakshmi Steels & Cements', // Justdial name (signboard reads "Vijayalakshmi Steel & Cements")
  nameKannada: 'ವಿಜಯಲಕ್ಷ್ಮೀ ಸ್ಟೀಲ್ & ಸಿಮೆಂಟ್ಸ್', // from the storefront sign
  shortName: 'Vijayalakshmi',
  wordmarkSub: 'Steels & Cements',

  // Justdial "Address" panel
  address: {
    street: 'Opposite Pioneer Lake District, Nirmala Vidyalaya Road',
    locality: 'Gattahalli',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560099',
  },
  // Nearby areas named on the shop's signboard
  nearby: ['Shanthipura', 'Huskur'],

  mapQuery: 'Nirmala Vidyalaya Road, Gattahalli, Bangalore 560099',
  mapsUrl: null, // paste the exact Google Maps share link here for precise directions

  // Both numbers appear on the signboard and the front pillar
  phones: [
    { e164: '+916363840973', display: '+91 63638 40973' },
    { e164: '+919448072753', display: '+91 94480 72753' },
  ],
  whatsapp: null, // set to e.g. '916363840973' once the shop confirms which number is on WhatsApp
  email: null,
  hours: [], // not on the listing, e.g. [{ days: 'Mon – Sat', time: '9:00 AM – 8:00 PM' }]
  established: 2023, // Justdial: "Year of Establishment 02-2023"
  rating: null,
  social: {},

  // Where enquiry-form submissions go (first one configured wins):
  //   endpoint → POST JSON (Formspree, Getform, your own API)
  //   whatsapp → opens WhatsApp with the enquiry pre-filled
  //   email    → opens the visitor's mail app
  // With none set, the form asks the visitor to call the shop.
  enquiryEndpoint: null,

  justdialUrl:
    'https://www.justdial.com/Bangalore/Vijayalakshmi-Steels-Cements-Closed-Down-Gattahalli/080PXX80-XX80-240126160203-W9M5_BZDET',

  // From the pillar sign: "Cement = ACC · Steels = TATA, MEENAKSHI, INDUS, JSW ·
  // MS Sections (APOLLO, TATA) · Angles, Flats, Pipes, Channels, Rods · Roofing Sheets (APOLLO, GANGA)"
  products: [
    {
      id: 'tmt',
      name: 'TMT Steel Bars',
      option: 'TMT Steel Bars',
      image: 'photos/tmt-stock.jpg',
      imageAlt: 'Bundles of TMT steel bars stocked at the Gattahalli store',
      brands: ['Tata', 'Meenakshi', 'Indus', 'JSW'],
      description: 'Reinforcement bars for foundations, columns, beams and slabs.',
    },
    {
      id: 'cement',
      name: 'Cement',
      option: 'Cement',
      image: 'photos/cement-and-tmt.jpg',
      imageAlt: 'Stacks of ACC cement bags inside the store',
      brands: ['ACC'],
      description: 'For concrete, masonry and plastering. Ask us for current stock and pricing.',
    },
    {
      id: 'ms',
      name: 'MS Sections & Pipes',
      option: 'MS Sections / Pipes',
      image: 'photos/ms-sections-rack.jpg',
      imageAlt: 'Rack of MS pipes, square and rectangular hollow sections and rods',
      brands: ['Apollo', 'Tata'],
      description: 'Angles, flats, channels, pipes and rods for fabrication, gates, sheds and structures.',
    },
    {
      id: 'roofing',
      name: 'Roofing Sheets',
      option: 'Roofing Sheets',
      image: null,
      art: 'roofing',
      imageAlt: '',
      brands: ['Apollo', 'Ganga'],
      description: 'Roofing sheets for sheds, extensions and industrial roofs.',
    },
  ],

  // Grouped exactly as the signboard lists them
  brands: [
    { category: 'Cement', names: ['ACC'] },
    { category: 'TMT Steel', names: ['Tata', 'Meenakshi', 'Indus', 'JSW'] },
    { category: 'MS Sections', names: ['Apollo', 'Tata'] },
    { category: 'Roofing Sheets', names: ['Apollo', 'Ganga'] },
  ],

  gallery: [
    { src: 'photos/cement-and-tmt.jpg', alt: 'ACC cement bags stacked behind bundles of TMT bars', caption: 'Cement & TMT stock' },
    { src: 'photos/ms-sections-rack.jpg', alt: 'Steel rack holding MS pipes, hollow sections and rods', caption: 'MS sections & pipes' },
    { src: 'photos/shop-front.jpg', alt: 'Shop front with Meenakshi TMT banner and product list painted on the pillar', caption: 'Shop front' },
    { src: 'photos/store-interior.jpg', alt: 'Store interior with cement stacks, wire mesh rolls and the billing office', caption: 'Inside the store' },
    { src: 'photos/tmt-stock.jpg', alt: 'Long TMT bars laid out on the store floor', caption: 'TMT bar stock' },
  ],

  // No reviews in the listing screenshots. Add real ones only.
  reviews: [],
}

export const primaryPhone = business.phones[0] ?? null

export const fullAddress = [
  business.address.street,
  business.address.locality,
  `${business.address.city}${business.address.pincode ? ` ${business.address.pincode}` : ''}`,
  business.address.state,
]
  .filter(Boolean)
  .join(', ')

export const allBrands = [...new Set(business.brands.flatMap((b) => b.names))]

export const productOptions = [...business.products.map((p) => p.option), 'Multiple products', 'Other / not sure']
