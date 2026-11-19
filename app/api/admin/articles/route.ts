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
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(articles)
  } catch (error: any) {
    console.error('[ARTICLES GET ERROR]', error)
    return NextResponse.json({ error: 'Erro ao listar artigos.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, slug, excerpt, content, coverImageUrl, author, published, publishedAt } = body

    if (!title) {
      return NextResponse.json({ error: 'O título do artigo é obrigatório.' }, { status: 400 })
    }

    const finalSlug = (slug || title)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    const existing = await prisma.article.findUnique({
      where: { slug: finalSlug },
    })

    const uniqueSlug = existing ? `${finalSlug}-${Date.now().toString().slice(-4)}` : finalSlug

    const article = await prisma.article.create({
      data: {
        title,
        slug: uniqueSlug,
        excerpt: excerpt || '',
        content: content || '',
        coverImageUrl: coverImageUrl || null,
        author: author || session.name || 'Antônio Cândido',
        published: Boolean(published),
        publishedAt: published ? (publishedAt ? new Date(publishedAt) : new Date()) : null,
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: article }, { status: 201 })
  } catch (error: any) {
    console.error('[ARTICLES POST ERROR]', error)
    return NextResponse.json({ error: 'Erro ao criar artigo.' }, { status: 500 })
  }
}
