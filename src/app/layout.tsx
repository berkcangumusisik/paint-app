import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paint App - Online Çizim ve Beyaz Tahta Uygulaması",
  description: "Ücretsiz online çizim uygulaması. Beyaz tahta, şekil çizimi, yapışkan notlar, PDF yükleme ve daha fazlası. Hemen çizmeye başlayın!",
  keywords: [
    "online çizim",
    "beyaz tahta",
    "çizim uygulaması",
    "şekil çizimi",
    "yapışkan notlar",
    "PDF yükleme",
    "ücretsiz çizim",
    "dijital çizim",
    "web çizim",
    "çizim araçları"
  ],
  authors: [{ name: "Paint App" }],
  creator: "Paint App",
  publisher: "Paint App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://paint-app-seven.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Paint App - Online Çizim ve Beyaz Tahta Uygulaması",
    description: "Ücretsiz online çizim uygulaması. Beyaz tahta, şekil çizimi, yapışkan notlar, PDF yükleme ve daha fazlası. Hemen çizmeye başlayın!",
    url: 'https://paint-app-seven.vercel.app',
    siteName: 'Paint App',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Paint App - Online Çizim Uygulaması',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Paint App - Online Çizim ve Beyaz Tahta Uygulaması",
    description: "Ücretsiz online çizim uygulaması. Beyaz tahta, şekil çizimi, yapışkan notlar, PDF yükleme ve daha fazlası.",
    images: ['/og-image.png'],
    creator: '@paintapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Paint App",
    "description": "Ücretsiz online çizim ve beyaz tahta uygulaması",
    "url": "https://paint-app-seven.vercel.app",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Paint App"
    },
    "featureList": [
      "Online çizim",
      "Beyaz tahta",
      "Şekil çizimi",
      "Yapışkan notlar",
      "PDF yükleme",
      "Ücretsiz kullanım"
    ]
  };

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
