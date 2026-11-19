import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { IC_ASSESSORIA_INFO } from '../app/data/ic-assessoria'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Iniciando Seed IC Assessoria ---')

  // 1. Criar ou Atualizar Administrador Inicial
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@icassessoria.com.br').trim().toLowerCase()
  const rawPassword = process.env.ADMIN_PASSWORD || 'ICAssessoria#2026'
  const passwordHash = await bcrypt.hash(rawPassword, 12)

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Antônio Cândido',
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      passwordHash,
      name: 'Antônio Cândido',
      role: 'ADMIN',
    },
  })
  console.log(`✓ Administrador verificado/criado: ${admin.email}`)

  // 2. Configurações Gerais do Site
  const settings = await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      siteName: IC_ASSESSORIA_INFO.brand.name,
      tagline: IC_ASSESSORIA_INFO.brand.tagline,
      primaryColor: '#f97316',
      footerText: '© {year} IC Assessoria – Vigilância e Análise de Dados em Saúde. Todos os direitos reservados.',
      seoTitle: 'IC Assessoria – Vigilância e Análise de Dados em Saúde | Antônio Cândido',
      seoDescription:
        'Fortalecimento da gestão em saúde por meio da qualificação, organização, monitoramento e análise de informações estratégicas. Assessoria técnica por Antônio Cândido.',
      seoKeywords:
        'IC Assessoria, Antônio Cândido, Vigilância em Saúde, Análise de Dados em Saúde, Monitoramento de Indicadores, Gestão em Saúde, Qualificação de Dados',
    },
  })
  console.log('✓ Configurações gerais do site salvas.')

  // 3. Conteúdo da Página Inicial (Home)
  const home = await prisma.homeContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      badgeText: IC_ASSESSORIA_INFO.hero.badge,
      heroTitle: IC_ASSESSORIA_INFO.hero.title,
      heroSubtitle: IC_ASSESSORIA_INFO.hero.subtitle,
      primaryCtaText: 'Fale com a Assessoria',
      primaryCtaLink: '#contato',
      secondaryCtaText: 'Conheça Nossos Serviços',
      secondaryCtaLink: '#servicos',
      statsData: IC_ASSESSORIA_INFO.hero.stats,
    },
  })
  console.log('✓ Conteúdo da Home salvo.')

  // 4. Conteúdo Sobre
  const about = await prisma.aboutContent.upsert({
    where: { id: 'default' },
    update: {},
    create: {
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
    },
  })
  console.log('✓ Conteúdo Sobre salvo.')

  // 5. Serviços Iniciais
  for (let i = 0; i < IC_ASSESSORIA_INFO.services.length; i++) {
    const s = IC_ASSESSORIA_INFO.services[i]
    await prisma.service.upsert({
      where: { slug: s.id },
      update: {},
      create: {
        slug: s.id,
        title: s.title,
        shortDescription: s.shortDescription,
        description: s.description,
        iconName: s.iconName,
        category: 'Assessoria Técnica',
        deliverables: s.deliverables,
        order: i,
        published: true,
      },
    })
  }
  console.log(`✓ ${IC_ASSESSORIA_INFO.services.length} serviços cadastrados.`)

  // 6. Informações de Contato
  const contact = await prisma.contactSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      title: IC_ASSESSORIA_INFO.contact.title,
      subtitle: IC_ASSESSORIA_INFO.contact.subtitle,
      description: IC_ASSESSORIA_INFO.contact.description,
      whatsapp: '5584999999999',
      email: 'contato@icassessoria.com.br',
      instagram: '',
      linkedin: 'https://www.linkedin.com',
      address: '',
    },
  })
  console.log('✓ Informações de contato salvas.')

  console.log('--- Seed Concluído com Sucesso ---')
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
