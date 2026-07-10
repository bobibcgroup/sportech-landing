import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Cairo } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const SITE_URL = "https://sportech.com.sa";
const TITLE = "Sportech — The Fan Engagement Infrastructure";
const DESCRIPTION =
  "Patented player camera technology, live predictions, fan voting, AR match view, and more. Zero cost to your club. Earn your share of every dollar your fans spend. Launch in days.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Sportech",
  },
  description: DESCRIPTION,
  keywords: [
    "fan engagement platform",
    "sports club app",
    "white label sports app",
    "fan monetization",
    "Saudi sports technology",
    "player camera",
    "sports revenue",
    "club digital platform",
  ],
  authors: [{ name: "Sportech", url: SITE_URL }],
  creator: "Sportech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sportech",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sportech — The Fan Engagement Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
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
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sportech",
  url: SITE_URL,
  email: "contact@sportech.com.sa",
  telephone: "+966114222225",
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  sameAs: [
    "https://x.com/SportechHQ",
    "https://linkedin.com/company/sportechsa/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas text-on-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
