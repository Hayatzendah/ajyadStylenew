import { siteData } from '../data/site.js'

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteData.company.name,
    "alternateName": siteData.company.nameEn,
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/images/logo.png",
    "description": siteData.company.description,
    "foundingDate": siteData.company.founded,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteData.contact.phoneFormatted,
      "contactType": "customer service",
      "availableLanguage": "Arabic"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteData.contact.address,
      "addressLocality": "الجيزه",
      "addressRegion": "الجيزه",
      "addressCountry": "EG"
    },
    "sameAs": [
      siteData.social.facebook,
      siteData.social.whatsapp
    ]
  }
}

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteData.company.name,
    "image": "https://yourdomain.com/images/logo.png",
    "description": siteData.company.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteData.contact.address,
      "addressLocality": "الجيزه",
      "addressRegion": "الجيزه",
      "postalCode": "",
      "addressCountry": "EG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "30.0444",
      "longitude": "31.2357"
    },
    "url": "https://yourdomain.com",
    "telephone": siteData.contact.phoneFormatted,
    "email": siteData.contact.email,
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  }
}

export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://yourdomain.com${item.path}`
    }))
  }
}

export const generateProductSchema = (product) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.fullDesc,
    "image": `https://yourdomain.com${product.image}`,
    "brand": {
      "@type": "Brand",
      "name": siteData.company.name
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "EGP",
      "seller": {
        "@type": "Organization",
        "name": siteData.company.name
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50"
    }
  }
}

export const generateItemListSchema = (products) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.shortDesc,
        "image": `https://yourdomain.com${product.image}`,
        "url": `https://yourdomain.com/products/${product.slug}`
      }
    }))
  }
}
