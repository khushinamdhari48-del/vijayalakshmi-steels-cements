# Vijayalakshmi Steels & Cements — website

React + Vite + Tailwind CSS v4 + Lucide icons.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run deploy   # build and publish to GitHub Pages (gh-pages branch)
```

## Filling in business details

Every business fact lives in **`src/data/business.js`**. Anything set to `null` / `[]` shows a
marked placeholder or hides its section. Add only details you've confirmed with the shop.

| Field | Effect when filled |
| --- | --- |
| `phones` | Call Now buttons use the first number; contact/footer list all |
| `whatsapp` | Adds WhatsApp buttons; the quote form sends via WhatsApp |
| `email` | Contact/footer email; the form falls back to email |
| `enquiryEndpoint` | Form POSTs JSON here (e.g. a Formspree URL) and takes priority |
| `hours`, `established`, `rating` | Shown in About / Contact / Hero / Reviews |
| `brands` | Brand groups (from the shop signboard) |
| `gallery` | Replaces placeholder tiles with a masonry gallery + lightbox (put images in `public/photos/`) |
| `reviews` | Real reviews only; replaces the "leave a review" card |
| `products[].image` | Uses a real photo instead of the illustration |
| `mapsUrl`, `address.pincode` | Exact directions link / full address |

Also update `index.html`: the JSON-LD block (telephone, openingHours, url, image), and the
canonical URL / `og:url` / `og:image` once the domain is known.

Source material (Justdial screenshots) is in `listings/`; cropped photos are in `public/photos/`.
