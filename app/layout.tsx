import localFont from 'next/font/local'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'

import Header from './components/header'
import Footer from './components/footer'
import ContactForm from './components/contact-form'
import AppToaster from './components/toaster'
import ScrollProgress from './components/scroll-progress'
import BackgroundEffects from './components/background-effects'
import BackToTop from './components/back-to-top'

const inter = localFont({
  src: [
    {
      path: './fonts/inter-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/inter-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/inter-latin-600-normal.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const plexMono = localFont({
  src: [
    {
      path: './fonts/ibm-plex-mono-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/ibm-plex-mono-latin-500-normal.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'IC Assessoria – Vigilância e Análise de Dados em Saúde | Antônio Cândido',
  description:
    'Fortalecimento da gestão em saúde por meio da qualificação, organização, monitoramento e análise de informações estratégicas. Assessoria técnica por Antônio Cândido.',
  keywords: [
    'IC Assessoria',
    'Antônio Cândido',
    'Vigilância em Saúde',
    'Análise de Dados em Saúde',
    'Monitoramento de Indicadores',
    'Gestão em Saúde',
    'Sistemas de Informação em Saúde',
    'Qualificação de Dados',
  ],
  authors: [{ name: 'Antônio Cândido' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'IC Assessoria – Vigilância e Análise de Dados em Saúde',
    description:
      'Transformamos dados em informações estratégicas para fortalecer a gestão, qualificar processos e apoiar decisões em saúde.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="font-sans relative selection:bg-orange-500/30 selection:text-orange-100">
        <ScrollProgress />
        <BackgroundEffects />
        <Header />
        <main className="relative z-10">{children}</main>
        {/* <ContactForm /> */}
        {/* <Footer /> */}
        <BackToTop />
        <AppToaster />
      </body>
    </html>
  )
}
