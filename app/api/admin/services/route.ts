import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(services)
  } catch (error: any) {
    console.error('[SERVICES GET ERROR]', error)
    return NextResponse.json({ error: 'Erro ao listar serviços.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      title,
      slug,
      shortDescription,
      description,
      iconName,
      imageUrl,
      category,
      deliverables,
      order,
      published,
    } = body

    if (!title) {
      return NextResponse.json({ error: 'O título do serviço é obrigatório.' }, { status: 400 })
    }

    const finalSlug = (slug || title)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    // Check unique slug
    const existing = await prisma.service.findUnique({
      where: { slug: finalSlug },
    })

    const uniqueSlug = existing ? `${finalSlug}-${Date.now().toString().slice(-4)}` : finalSlug

    const service = await prisma.service.create({
      data: {
        title,
        slug: uniqueSlug,
        shortDescription: shortDescription || '',
        description: description || '',
        iconName: iconName || 'FiActivity',
        imageUrl: imageUrl || null,
        category: category || 'Assessoria Técnica',
        deliverables: deliverables || [],
        order: Number(order) || 0,
        published: published !== undefined ? Boolean(published) : true,
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: service }, { status: 201 })
  } catch (error: any) {
    console.error('[SERVICES POST ERROR]', error)
    return NextResponse.json({ error: 'Erro ao cadastrar serviço.' }, { status: 500 })
  }
}
