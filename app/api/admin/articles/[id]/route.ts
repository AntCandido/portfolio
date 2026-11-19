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
    const article = await prisma.article.findUnique({
      where: { id },
    })

    if (!article) {
      return NextResponse.json({ error: 'Artigo não encontrado.' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error: any) {
    console.error('[ARTICLE GET ID ERROR]', error)
    return NextResponse.json({ error: 'Erro ao buscar artigo.' }, { status: 500 })
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
    const { title, slug, excerpt, content, coverImageUrl, author, published, publishedAt } = body

    const updated = await prisma.article.update({
      where: { id },
      data: {
        title: title || undefined,
        slug: slug || undefined,
        excerpt: excerpt !== undefined ? excerpt : undefined,
        content: content !== undefined ? content : undefined,
        coverImageUrl: coverImageUrl !== undefined ? coverImageUrl : undefined,
        author: author || undefined,
        published: published !== undefined ? Boolean(published) : undefined,
        publishedAt:
          published !== undefined
            ? published
              ? publishedAt
                ? new Date(publishedAt)
                : new Date()
              : null
            : undefined,
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[ARTICLE PUT ERROR]', error)
    return NextResponse.json({ error: 'Erro ao atualizar artigo.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const { id } = await params
  try {
    await prisma.article.delete({
      where: { id },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, message: 'Artigo excluído com sucesso.' })
  } catch (error: any) {
    console.error('[ARTICLE DELETE ERROR]', error)
    return NextResponse.json({ error: 'Erro ao excluir artigo.' }, { status: 500 })
  }
}
