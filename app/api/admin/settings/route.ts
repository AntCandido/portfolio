import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { getSiteSettings } from '@/lib/data'

export async function GET(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const settings = await getSiteSettings()
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      siteName,
      tagline,
      logoUrl,
      faviconUrl,
      primaryColor,
      footerText,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = body

    const updated = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {
        siteName: siteName || undefined,
        tagline: tagline || undefined,
        logoUrl: logoUrl !== undefined ? logoUrl : undefined,
        faviconUrl: faviconUrl !== undefined ? faviconUrl : undefined,
        primaryColor: primaryColor || undefined,
        footerText: footerText || undefined,
        seoTitle: seoTitle || undefined,
        seoDescription: seoDescription !== undefined ? seoDescription : undefined,
        seoKeywords: seoKeywords !== undefined ? seoKeywords : undefined,
      },
      create: {
        id: 'default',
        siteName: siteName || 'IC Assessoria',
        tagline: tagline || 'Vigilância e Análise de Dados em Saúde',
        logoUrl: logoUrl || null,
        faviconUrl: faviconUrl || null,
        primaryColor: primaryColor || '#f97316',
        footerText: footerText || '© {year} IC Assessoria – Vigilância e Análise de Dados em Saúde. Todos os direitos reservados.',
        seoTitle: seoTitle || 'IC Assessoria – Vigilância e Análise de Dados em Saúde | Antônio Cândido',
        seoDescription: seoDescription || '',
        seoKeywords: seoKeywords || '',
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[SETTINGS PUT ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar configurações gerais.' },
      { status: 500 }
    )
  }
}
