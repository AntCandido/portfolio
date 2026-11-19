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
    const project = await prisma.portfolioProject.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json({ error: 'Projeto não encontrado.' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error: any) {
    console.error('[PORTFOLIO GET ID ERROR]', error)
    return NextResponse.json({ error: 'Erro ao buscar projeto.' }, { status: 500 })
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
    const { title, description, category, imageUrl, projectDate, order, published } = body

    const updated = await prisma.portfolioProject.update({
      where: { id },
      data: {
        title: title || undefined,
        description: description !== undefined ? description : undefined,
        category: category || undefined,
        imageUrl: imageUrl !== undefined ? imageUrl : undefined,
        projectDate: projectDate !== undefined ? projectDate : undefined,
        order: order !== undefined ? Number(order) : undefined,
        published: published !== undefined ? Boolean(published) : undefined,
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[PORTFOLIO PUT ERROR]', error)
    return NextResponse.json({ error: 'Erro ao atualizar projeto.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const { id } = await params
  try {
    await prisma.portfolioProject.delete({
      where: { id },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, message: 'Projeto excluído com sucesso.' })
  } catch (error: any) {
    console.error('[PORTFOLIO DELETE ERROR]', error)
    return NextResponse.json({ error: 'Erro ao excluir projeto.' }, { status: 500 })
  }
}
