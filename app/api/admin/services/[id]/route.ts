import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const { id } = await params
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    })

    if (!service) {
      return NextResponse.json({ error: 'Serviço não encontrado.' }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error: any) {
    console.error('[SERVICE GET ID ERROR]', error)
    return NextResponse.json({ error: 'Erro ao buscar serviço.' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const { id } = await params
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

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title: title || undefined,
        slug: slug || undefined,
        shortDescription: shortDescription !== undefined ? shortDescription : undefined,
        description: description !== undefined ? description : undefined,
        iconName: iconName || undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        category: category || undefined,
        deliverables: deliverables !== undefined ? deliverables : undefined,
        order: order !== undefined ? Number(order) : undefined,
        published: published !== undefined ? Boolean(published) : undefined,
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[SERVICE PUT ERROR]', error)
    return NextResponse.json({ error: 'Erro ao atualizar serviço.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const { id } = await params
  try {
    await prisma.service.delete({
      where: { id },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, message: 'Serviço excluído com sucesso.' })
  } catch (error: any) {
    console.error('[SERVICE DELETE ERROR]', error)
    return NextResponse.json({ error: 'Erro ao excluir serviço.' }, { status: 500 })
  }
}
