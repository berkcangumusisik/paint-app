import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Paint App - Online Çizim Uygulaması',
    short_name: 'Paint App',
    description: 'Ücretsiz online çizim ve beyaz tahta uygulaması',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'utilities', 'education'],
    lang: 'tr',
    dir: 'ltr',
    orientation: 'any',
    scope: '/',
    prefer_related_applications: false,
  }
} 