import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { getAboutContent } from '@/lib/data'

export async function GET(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const content = await getAboutContent()
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
      title,
      subtitle,
      paragraph1,
      paragraph2,
      paragraph3,
      mission,
      vision,
      values,
      responsibleName,
      responsibleRole,
      responsibleBio,
      responsiblePhotoUrl,
      institutionalImageUrl,
    } = body

    const updated = await prisma.aboutContent.upsert({
      where: { id: 'default' },
      update: {
        title: title || undefined,
        subtitle: subtitle || undefined,
        paragraph1: paragraph1 || undefined,
        paragraph2: paragraph2 || undefined,
        paragraph3: paragraph3 || undefined,
        mission: mission !== undefined ? mission : undefined,
        vision: vision !== undefined ? vision : undefined,
        values: values !== undefined ? values : undefined,
        responsibleName: responsibleName || undefined,
        responsibleRole: responsibleRole || undefined,
        responsibleBio: responsibleBio || undefined,
        responsiblePhotoUrl:
          responsiblePhotoUrl !== undefined ? (responsiblePhotoUrl ? responsiblePhotoUrl.trim() : null) : undefined,
        institutionalImageUrl:
          institutionalImageUrl !== undefined ? (institutionalImageUrl ? institutionalImageUrl.trim() : null) : undefined,
      },
      create: {
        id: 'default',
        title: title || 'Sobre a IC Assessoria',
        subtitle: subtitle || 'Nossa Proposta Institucional',
        paragraph1: paragraph1 || '',
        paragraph2: paragraph2 || '',
        paragraph3: paragraph3 || '',
        mission: mission || null,
        vision: vision || null,
        values: values || null,
        responsibleName: responsibleName || 'Antônio Cândido',
        responsibleRole: responsibleRole || 'Responsável pela iniciativa IC Assessoria',
        responsibleBio: responsibleBio || '',
        responsiblePhotoUrl: responsiblePhotoUrl ? responsiblePhotoUrl.trim() : null,
        institutionalImageUrl: institutionalImageUrl ? institutionalImageUrl.trim() : null,
      },
    })

    revalidatePath('/')
    revalidatePath('/#sobre')
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[ABOUT PUT ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao salvar alterações da seção Sobre.' },
      { status: 500 }
    )
  }
}
