import { ReactNode } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import ContactForm from '../components/contact-form'
import ScrollProgress from '../components/scroll-progress'
import BackgroundEffects from '../components/background-effects'
import BackToTop from '../components/back-to-top'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <BackgroundEffects />
      <Header />
      <main className="relative z-10">{children}</main>
      <ContactForm />
      <Footer />
      <BackToTop />
    </>
  )
}
