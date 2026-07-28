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
  "Rankflow — SEO & Digital Marketing for Chandigarh Professional Firms";
const DESCRIPTION =
  "Chandigarh-based digital marketing for consultancies, law firms, clinics and professional practices. SEO, Google Business Profile, content and ads — with every price published up front.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: "%s | Rankflow",
  },
  description: DESCRIPTION,
  keywords: [
    "seo agency chandigarh",
    "seo company in chandigarh",
    "digital marketing company in chandigarh",
    "seo company in mohali",
    "seo company in panchkula",
    "google business profile chandigarh",
    "digital marketing for small business",
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
  areaServed: [
    { "@type": "City", name: "Chandigarh" },
    { "@type": "City", name: "Mohali" },
    { "@type": "City", name: "Panchkula" },
    { "@type": "City", name: "Zirakpur" },
  ],
  priceRange: "₹₹",
  knowsAbout: [
    "Search Engine Optimisation",
    "Google Business Profile optimisation",
    "Content marketing",
    "Google Ads",
    "Meta Ads",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Google Profile Rescue",
        description:
          "One-time Google Business Profile claim and optimisation with local citations.",
      },
      price: "5000",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Local Starter",
        description:
          "Monthly Google Business Profile management, citations and content.",
      },
      price: "12000",
      priceCurrency: "INR",
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Growth",
        description: "SEO, content and reporting for professional practices.",
      },
      price: "22000",
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
