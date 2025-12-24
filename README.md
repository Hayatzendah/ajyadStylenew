# أجياد ستيل للتوريدات | Ajyad Steel for Supplies

موقع ويب كامل وجاهز للإنتاج لشركة أجياد ستيل للتوريدات - مورد معادن رقم 1 في مصر.

A complete, production-ready website for Ajyad Steel for Supplies - Egypt's #1 metal supplier.

## 🌟 Features

- ✅ **Full Arabic RTL Support** - Complete right-to-left layout
- ✅ **React 18 + Vite** - Fast, modern JavaScript framework
- ✅ **Fully Responsive** - Mobile-first design for all devices
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- ✅ **Dark Industrial Theme** - Professional brand colors from logo
- ✅ **7 Pages** - Home, About, Products, Product Detail, Works, Contact, 404
- ✅ **4 Products** - Galvanized Sheet, Stainless Steel, Prepainted Sheet, Cutting Service
- ✅ **Custom Components** - Reusable, maintainable component architecture
- ✅ **No External Dependencies** - Minimal bundle size (only 4 production dependencies)
- ✅ **Accessibility** - WCAG AA compliant, keyboard navigation, semantic HTML
- ✅ **Performance** - Lazy loading, optimized images, fast load times

## 🎨 Brand Colors

The design uses colors extracted from your logo:

- **Primary Blue**: `#2E74B4`
- **Navy Deep**: `#08346D`
- **Accent Red**: `#8B1620`
- **Dark Background**: `#090B14`
- **Dark Surface**: `#1B212F`
- **Muted Gray**: `#4C5767`
- **Light Gray**: `#9DA8B3`

## 📦 Tech Stack

### Core
- React 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.0

### Styling
- TailwindCSS 3.4.0
- Cairo & Tajawal fonts (Google Fonts)

### SEO
- react-helmet-async 2.0.4
- Sitemap.xml
- Robots.txt
- JSON-LD structured data

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
ajyadStylenew/
├── public/
│   ├── images/           # All images (products, works, etc.)
│   ├── robots.txt        # SEO robots file
│   ├── sitemap.xml       # SEO sitemap
│   ├── favicon.ico       # Site favicon
│   └── og-image.png      # Open Graph image
├── src/
│   ├── components/
│   │   ├── common/       # Reusable components (Button, Card, SEO, etc.)
│   │   ├── layout/       # Layout components (Header, Footer, etc.)
│   │   ├── sections/     # Home page sections
│   │   ├── products/     # Product-related components
│   │   └── ui/           # UI components (Forms, Accordions, etc.)
│   ├── pages/            # All page components
│   ├── data/             # Site and product data
│   ├── utils/            # Utility functions (JSON-LD generators)
│   ├── App.jsx           # Main app with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── package.json          # Dependencies
```

## 📄 Pages

### 1. Home (`/`)
- Hero section with company name and stats
- About preview
- Why choose us (6 benefits)
- Products overview (4 products)
- Quality workflow (3 steps)
- Import service (3 steps)
- Works gallery
- Big CTA section

### 2. About (`/about`)
- Company story
- Company fields (5 specializations)
- Why we're the best (expanded)
- Import service details
- Competitive pricing explanation

### 3. Products (`/products`)
- Product filter chips
- Product grid (4 products)
- FAQ accordion (5 questions)

### 4. Product Detail (`/products/:slug`)
Dynamic routes for each product:
- `/products/galvanized-sheet` - الصاج المجلفن
- `/products/stainless-steel` - الستانلس ستيل
- `/products/prepainted-sheet` - الصاج الملون
- `/products/cutting-dissection` - خدمة التقطيع والتشريح

Each page includes:
- Product image and description
- Specifications table
- Quality steps
- Delivery information
- Use cases
- FAQs
- CTA buttons

### 5. Works (`/works`)
- Gallery with filter chips (All, توريدات, تقطيع, تشغيل)
- Lightbox for image viewing
- Customer testimonials
- CTA section

### 6. Contact (`/contact`)
- Contact cards (Phone, Email, Address)
- Google Maps placeholder
- Contact form with validation
- Business hours
- Quick WhatsApp CTA

### 7. 404 Page (`*`)
- Friendly error message
- Navigation buttons

## 🔍 SEO Features

### Meta Tags
- Unique title and description per page
- Open Graph tags for social sharing
- Twitter Cards support
- Canonical URLs

### JSON-LD Structured Data
- **Organization** schema on all pages
- **LocalBusiness** schema on contact page
- **BreadcrumbList** on all inner pages
- **Product** schema on product detail pages
- **ItemList** schema on products page

### Sitemap & Robots
- `sitemap.xml` with all routes and priorities
- `robots.txt` for search engine crawlers

## 🎯 Products Data

All products are centralized in `/src/data/products.js`:

1. **الصاج المجلفن** (Galvanized Sheet)
   - Thickness: 0.25 - 3mm
   - Zinc coating: 30 - 330 microns
   - Grades: DX51 - DX54

2. **الستانلس ستيل** (Stainless Steel)
   - Grades: 316, 304, 201, 430, 410
   - Various finishes available

3. **الصاج الملون** (Prepainted Sheet)
   - RAL colors: 9007, 9016, 9011
   - Coating thickness: 15-35 microns

4. **خدمة التقطيع والتشريح** (Cutting & Dissection Service)
   - Cutting: 50mm - 3000mm
   - Slitting: from 50mm
   - Sandblasting available

## 📱 Responsive Design

- **Mobile** (< 640px): 1 column layout, hamburger menu
- **Tablet** (640px - 1024px): 2 column layout
- **Desktop** (> 1024px): 3-4 column layout

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels for icon buttons
- Keyboard navigation support
- Focus visible styles
- Sufficient color contrast (WCAG AA)
- Alt text for all images
- One H1 per page
- Proper heading hierarchy

## 🎨 Customization

### Update Company Information
Edit `/src/data/site.js` to update:
- Company name, description, contact info
- Social media links
- Navigation items
- Company benefits (Why Us section)
- Import service steps
- Quality workflow steps

### Update Products
Edit `/src/data/products.js` to:
- Add/remove products
- Update product specifications
- Change product images
- Modify FAQs

### Change Colors
Edit `/tailwind.config.js` to update brand colors in the `extend.colors` section.

### Replace Images
Replace placeholder images in `/public/images/`:
- `logo.png` - Your company logo
- `og-image.png` - Social media sharing image (1200x630px)
- `hero-bg.jpg` - Homepage hero background
- `about-img.jpg` - About page image
- `products/*.jpg` - Product images
- `works/*.jpg` - Gallery images

## 🌐 Deployment

### Before Deployment
1. **Update domain** in:
   - `/public/sitemap.xml`
   - `/src/utils/jsonLd.js` (all schema generators)
   - `/src/components/common/SEO.jsx`

2. **Add real Google Maps link** in `/src/data/site.js`

3. **Add Facebook page URL** in `/src/data/site.js`

4. **Replace placeholder images** with actual photos

### Recommended Hosting
- **Vercel** (Recommended - automatic deployment)
- **Netlify** (Great for SPAs)
- **GitHub Pages** (Free hosting)
- **Any static hosting service**

### Build Command
```bash
npm run build
```

Output will be in the `/dist` folder.

## 📧 Contact Form

The contact form currently:
- ✅ Validates all inputs (name, email, message)
- ✅ Shows success/error messages in Arabic
- ❌ Does NOT send actual emails (front-end only)

### To Add Email Functionality:
You can integrate with:
- **EmailJS** - Simple email service
- **Formspree** - Form backend service
- **Custom backend API** - Full control

## 📝 Post-Implementation Checklist

- [ ] Replace all placeholder images with actual photos
- [ ] Update domain name in sitemap.xml
- [ ] Update domain name in SEO component
- [ ] Add actual Google Maps link
- [ ] Add Facebook page URL
- [ ] Test all routes
- [ ] Test contact form
- [ ] Test mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Add email backend (optional)
- [ ] Deploy to hosting service

## 🤝 Support

For issues or questions:
- Phone: 01117741890
- Email: agyadsteelforsupllies@gmail.com

## 📄 License

Copyright © 2024 أجياد ستيل للتوريدات. All rights reserved.

---

Built with ❤️ using React + Vite + TailwindCSS
