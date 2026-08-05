import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE, CONTACT } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE =
  "Rankflow — AI Search Optimisation & SEO for Businesses Across India";
const DESCRIPTION =
  "Get found and cited by ChatGPT, Perplexity and Google's AI answers. AI search optimisation, SEO and local visibility for businesses across India — with every price published up front.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: "%s | Rankflow",
  },
  description: DESCRIPTION,
  keywords: [
    "ai seo agency india",
    "ai search optimisation",
    "generative engine optimisation",
    "chatgpt seo",
    "perplexity seo",
    "google ai overview optimisation",
    "seo agency india",
    "seo agency chandigarh",
  ],
  authors: [{ name: "Rankflow" }],
  creator: "Rankflow",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: "Rankflow",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Rankflow — digital marketing for Chandigarh professional firms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* LocalBusiness schema — this is what feeds the Google map pack.
   Update the address block once the registered business address is final. */
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  name: "Rankflow",
  url: SITE.url,
  email: CONTACT.email,
  ...(CONTACT.phoneE164 ? { telephone: CONTACT.phoneE164 } : {}),
  description: DESCRIPTION,
  founder: { "@type": "Person", name: "Karan Puri" },
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chandigarh",
    addressRegion: "Chandigarh",
    postalCode: SITE.postalCode,
    addressCountry: "IN",
  },
  areaServed: { "@type": "Country", name: "India" },
  priceRange: "₹₹",
  knowsAbout: [
    "AI search optimisation",
    "Generative engine optimisation",
    "Search Engine Optimisation",
    "Structured data and schema markup",
    "Google Business Profile optimisation",
    "Content marketing",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI Visibility Audit",
        description:
          "One-time audit of how ChatGPT, Perplexity and Google's AI answers represent your business, with a prioritised fix list.",
      },
      price: "9000",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Foundation",
        description:
          "Monthly entity and structured-data groundwork, technical SEO, local visibility and citable content.",
      },
      price: "18000",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Growth",
        description:
          "AI search optimisation with expanded content, competitor citation tracking and landing pages.",
      },
      price: "35000",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Scale",
        description:
          "Full AI search programme with digital PR aimed at the sources AI engines cite.",
      },
      price: "65000",
      priceCurrency: "INR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* GA4 — renders only once NEXT_PUBLIC_GA_ID is set in the environment. */}
        {SITE.gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${SITE.gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
