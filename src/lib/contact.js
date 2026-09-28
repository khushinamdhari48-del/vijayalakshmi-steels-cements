import { business, primaryPhone } from '../data/business'

export const telHref = primaryPhone ? `tel:${primaryPhone.e164}` : null

export const whatsappHref = (text = `Hi ${business.name}, I'd like to enquire about steel / cement.`) =>
  business.whatsapp
    ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`
    : null

export const emailHref = business.email ? `mailto:${business.email}` : null

export const directionsHref =
  business.mapsUrl ??
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapQuery)}`

export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  business.mapQuery,
)}&z=15&output=embed`

/** Pre-select a product in the quote form, then scroll to it. */
export function enquireAbout(product) {
  window.dispatchEvent(new CustomEvent('enquire', { detail: product }))
}
