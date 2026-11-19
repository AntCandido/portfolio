import prisma from './prisma'
import { IC_ASSESSORIA_INFO } from '../app/data/ic-assessoria'

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    })
    if (settings) return settings
  } catch (error) {
    console.warn('[DB] Fallback para SiteSettings padrão:', error)
  }

  return {
    id: 'default',
    siteName: IC_ASSESSORIA_INFO.brand.name,
    tagline: IC_ASSESSORIA_INFO.brand.tagline,
    logoUrl: null,
    faviconUrl: null,
    primaryColor: '#f97316',
    footerText: '© {year} IC Assessoria – Vigilância e Análise de Dados em Saúde. Todos os direitos reservados.',
    seoTitle: 'IC Assessoria – Vigilância e Análise de Dados em Saúde | Antônio Cândido',
    seoDescription:
      'Fortalecimento da gestão em saúde por meio da qualificação, organização, monitoramento e análise de informações estratégicas. Assessoria técnica por Antônio Cândido.',
    seoKeywords:
      'IC Assessoria, Antônio Cândido, Vigilância em Saúde, Análise de Dados em Saúde, Monitoramento de Indicadores, Gestão em Saúde, Qualificação de Dados',
  }
}

export async function getHomeContent() {
  try {
    const home = await prisma.homeContent.findUnique({
      where: { id: 'default' },
    })
    if (home) return home
  } catch (error) {
    console.warn('[DB] Fallback para HomeContent padrão:', error)
  }

  return {
    id: 'default',
    badgeText: IC_ASSESSORIA_INFO.hero.badge,
    heroTitle: IC_ASSESSORIA_INFO.hero.title,
    heroSubtitle: IC_ASSESSORIA_INFO.hero.subtitle,
    heroImageUrl: null,
    primaryCtaText: 'Fale com a Assessoria',
    primaryCtaLink: '#contato',
    secondaryCtaText: 'Conheça Nossos Serviços',
    secondaryCtaLink: '#servicos',
    statsData: IC_ASSESSORIA_INFO.hero.stats,
  }
}

export async function getAboutContent() {
  try {
    const about = await prisma.aboutContent.findUnique({
      where: { id: 'default' },
    })
    if (about) return about
  } catch (error) {
    console.warn('[DB] Fallback para AboutContent padrão:', error)
  }

  return {
    id: 'default',
    title: IC_ASSESSORIA_INFO.about.title,
    subtitle: IC_ASSESSORIA_INFO.about.subtitle,
    paragraph1: IC_ASSESSORIA_INFO.about.p1,
    paragraph2: IC_ASSESSORIA_INFO.about.p2,
    paragraph3: IC_ASSESSORIA_INFO.about.p3,
    mission:
      'Fortalecer a gestão e a vigilância em saúde por meio da inteligência de dados, da qualificação rigorosa de registros e do apoio técnico humanizado.',
    vision:
      'Ser referência em assessoria técnica e análise de dados em saúde pública e privada, promovendo decisões assertivas e sustentáveis.',
    values:
      'Rigor metodológico, transparência, ética, compromisso com a saúde coletiva e excelência na gestão orientada por evidências.',
    responsibleName: IC_ASSESSORIA_INFO.about.responsibleCard.name,
    responsibleRole: IC_ASSESSORIA_INFO.about.responsibleCard.role,
    responsibleBio: IC_ASSESSORIA_INFO.about.responsibleCard.bio,
    responsiblePhotoUrl: '/profile.jpeg',
    institutionalImageUrl: null,
  }
}

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
    if (services && services.length > 0) return services
  } catch (error) {
    console.warn('[DB] Fallback para Serviços padrão:', error)
  }

  return IC_ASSESSORIA_INFO.services.map((s, i) => ({
    id: s.id,
    slug: s.id,
    title: s.title,
    shortDescription: s.shortDescription,
    description: s.description,
    iconName: s.iconName,
    imageUrl: null,
    category: 'Assessoria Técnica',
    deliverables: s.deliverables,
    order: i,
    published: true,
  }))
}

export async function getContactSettings() {
  try {
    const contact = await prisma.contactSettings.findUnique({
      where: { id: 'default' },
    })
    if (contact) return contact
  } catch (error) {
    console.warn('[DB] Fallback para ContactSettings padrão:', error)
  }

  return {
    id: 'default',
    title: IC_ASSESSORIA_INFO.contact.title,
    subtitle: IC_ASSESSORIA_INFO.contact.subtitle,
    description: IC_ASSESSORIA_INFO.contact.description,
    whatsapp: '',
    email: 'contato@icassessoria.com.br',
    instagram: '',
    linkedin: 'https://www.linkedin.com',
    address: null,
  }
}

export async function getPublishedArticles() {
  try {
    return await prisma.article.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

export async function getPublishedPortfolio() {
  try {
    return await prisma.portfolioProject.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
  } catch {
    return []
  }
}
