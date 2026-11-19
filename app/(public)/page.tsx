import AboutSection from '../pages/home/about-section'
import HeroSection from '../pages/home/hero-section'
import ServicesSection from '../pages/home/services-section'
import DataImportanceSection from '../pages/home/data-importance-section'
import DifferentialsSection from '../pages/home/differentials-section'
import { getHomeContent, getAboutContent, getServices } from '@/lib/data'

export const revalidate = 60 // Revalida a cada 60s ou sob demanda via revalidatePath

export default async function Home() {
  const [homeData, aboutData, servicesData] = await Promise.all([
    getHomeContent(),
    getAboutContent(),
    getServices(),
  ])

  return (
    <>
      <HeroSection initialData={homeData} />
      <AboutSection initialData={aboutData} />
      <ServicesSection initialData={servicesData} />
      <DataImportanceSection />
      <DifferentialsSection />
    </>
  )
}
