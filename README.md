# Paikari Bazar — Marketplace Website Frontend (Next.js)

Production-grade Next.js frontend implementation for **Paikari Bazar** (Bangladesh's Largest B2B Wholesale & Scrap Marketplace), built strictly according to the reference mockups and `plan.md` architectural specifications.

---

## 🚀 How to Run

Navigate to the website directory and start the development server:

```bash
cd paikari-bazar/website
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Implemented Pages & Reference Match

| Page Route | Description | Visual Reference |
| :--- | :--- | :--- |
| `/` | **Marketplace Homepage** — Includes Live Scrap Price Ticker, Hero Section, 5 Category Grid, Verified Supplier Showcase, Featured Scrap Lots, and Trust Assurance. | Image 2 (`fe4a2f77...jpg`) |
| `/seller/seller-1` | **Seller Profile & Inventory Storefront** — Displays *Shuvo Battery Solution* (`Shuvo ব্যাটারি সলিউশন`), Official NID Verified & Paikari Bazar Approved banner, ratings, bio, Message/Callback modal, and 8-item scrap inventory grid. | Image 1 (`a65b77f9...jpg`) |
| `/categories` | **Category Explorer & Filter Board** — Filter by Scrap Batteries, Machinery, Solar/Electronics, Metals, and Districts (Dhaka, Chittagong, Gazipur, Narayanganj). | Aligned with `plan.md` |
| `/products/[id]` | **Product Details View** — Technical specifications, minimum order quantity, BDT lot pricing, and 1-click WhatsApp inquiry. | Aligned with `plan.md` |
| `/buy-leads` | **B2B Buy Leads & RFQ Board** — View and post bulk buyer requirements. | Aligned with `plan.md` |
| `/post-ad` | **Post Scrap Ad Flow** — Dealer onboarding and scrap lot submission wizard. | Aligned with `plan.md` |

---

## 🛠️ Tech Stack & Key Features

- **Framework**: Next.js 14+ (App Router, Server-Side Rendering, SSG & Dynamic Routes)
- **Styling**: Tailwind CSS with custom branding (`#0B2A4A` Navy, `#F26B1D` Orange, `#1E6FD9` Blue, `#16A34A` Green)
- **Typography**: Dual Font Architecture (`Hind Siliguri` for Bengali + `Inter` for English & Numerics)
- **Live Scrap Price Ticker**: Smooth infinite marquee displaying commodity rates (BDT/KG) with live trend arrows.
- **Direct WhatsApp Integration**: Automatically formats phone numbers into `wa.me` links with pre-filled inquiry text.
- **Type Safety**: Domain interfaces strictly aligned with `mock-api` schema for future Admin Panel integration.

