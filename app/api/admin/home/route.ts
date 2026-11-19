import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { getHomeContent } from '@/lib/data'

export async function GET(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const content = await getHomeContent()
  return NextResponse.json(content)
}

export async function PUT(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      badgeText,
      heroTitle,
      heroSubtitle,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      statsData,
    } = body

    const updated = await prisma.homeContent.upsert({
      where: { id: 'default' },
      update: {
        badgeText: badgeText || undefined,
        heroTitle: heroTitle || undefined,
        heroSubtitle: heroSubtitle || undefined,
        primaryCtaText: primaryCtaText || undefined,
        primaryCtaLink: primaryCtaLink || undefined,
        secondaryCtaText: secondaryCtaText || undefined,
        secondaryCtaLink: secondaryCtaLink || undefined,
        statsData: statsData !== undefined ? statsData : undefined,
      },
      create: {
        id: 'default',
        badgeText: badgeText || 'Assessoria Especializada em Saúde',
        heroTitle: heroTitle || 'Inteligência em saúde para decisões mais estratégicas.',
        heroSubtitle:
          heroSubtitle ||
          'Transformamos dados em informações estratégicas para fortalecer a gestão, qualificar processos e apoiar decisões em saúde.',
        primaryCtaText: primaryCtaText || 'Fale com a Assessoria',
        primaryCtaLink: primaryCtaLink || '#contato',
        secondaryCtaText: secondaryCtaText || 'Conheça Nossos Serviços',
        secondaryCtaLink: secondaryCtaLink || '#servicos',
        statsData: statsData || null,
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[HOME PUT ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao salvar alterações da página inicial.' },
      { status: 500 }
    )
  }
}
