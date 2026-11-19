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
    const projects = await prisma.portfolioProject.findMany({
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(projects)
  } catch (error: any) {
    console.error('[PORTFOLIO GET ERROR]', error)
    return NextResponse.json({ error: 'Erro ao listar projetos.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, description, category, imageUrl, projectDate, order, published } = body

    if (!title) {
      return NextResponse.json({ error: 'O título do projeto é obrigatório.' }, { status: 400 })
    }

    const project = await prisma.portfolioProject.create({
      data: {
        title,
        description: description || '',
        category: category || 'Projeto',
        imageUrl: imageUrl || null,
        projectDate: projectDate || null,
        order: Number(order) || 0,
        published: Boolean(published),
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error: any) {
    console.error('[PORTFOLIO POST ERROR]', error)
    return NextResponse.json({ error: 'Erro ao criar projeto.' }, { status: 500 })
  }
}
