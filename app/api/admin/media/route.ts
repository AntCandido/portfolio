import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { supabaseAdmin, STORAGE_BUCKET, isSupabaseConfigured } from '@/lib/supabase'
import fs from 'fs/promises'
import path from 'path'

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export async function GET(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const items = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (error: any) {
    console.error('[MEDIA GET ERROR]', error)
    return NextResponse.json({ error: 'Erro ao listar mídias.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const alt = (formData.get('alt') as string) || ''

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Formato não suportado. Envie imagens JPG, PNG, WEBP, SVG ou GIF.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Tamanho excedido. O arquivo deve ter no máximo 5MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || `.${file.type.split('/')[1]}`
    const sanitizedBase = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
    const uniqueFilename = `${Date.now()}-${sanitizedBase}${ext}`

    let fileUrl = ''

    // Tenta upload no Supabase Storage caso configurado
    if (isSupabaseConfigured && supabaseAdmin) {
      try {
        // Tenta garantir que o bucket exista
        const { data: buckets } = await supabaseAdmin.storage.listBuckets()
        const bucketExists = buckets?.some((b) => b.name === STORAGE_BUCKET)
        if (!bucketExists) {
          await supabaseAdmin.storage.createBucket(STORAGE_BUCKET, {
            public: true,
          })
        }

        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from(STORAGE_BUCKET)
          .upload(uniqueFilename, buffer, {
            contentType: file.type,
            upsert: false,
          })

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(uniqueFilename)

          fileUrl = publicUrlData.publicUrl
        }
      } catch (storageErr) {
        console.warn('[STORAGE] Falha no Supabase Storage, utilizando fallback local:', storageErr)
      }
    }

    // Fallback: Armazenamento local em public/uploads caso Supabase Storage ainda não esteja configurado
    if (!fileUrl) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadsDir, { recursive: true })
      const filePath = path.join(uploadsDir, uniqueFilename)
      await fs.writeFile(filePath, new Uint8Array(bytes))
      fileUrl = `/uploads/${uniqueFilename}`
    }

    // Salva registro no Prisma Media
    const mediaRecord = await prisma.media.create({
      data: {
        filename: uniqueFilename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: fileUrl,
        alt: alt || file.name,
      },
    })

    return NextResponse.json({ success: true, data: mediaRecord }, { status: 201 })
  } catch (error: any) {
    console.error('[MEDIA UPLOAD ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao enviar e processar o arquivo de mídia.' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID da mídia não informado.' }, { status: 400 })
    }

    const item = await prisma.media.findUnique({
      where: { id },
    })

    if (!item) {
      return NextResponse.json({ error: 'Arquivo de mídia não encontrado.' }, { status: 404 })
    }

    // Se estiver no Supabase Storage
    if (isSupabaseConfigured && supabaseAdmin && item.url.includes(STORAGE_BUCKET)) {
      try {
        await supabaseAdmin.storage.from(STORAGE_BUCKET).remove([item.filename])
      } catch (err) {
        console.warn('[STORAGE] Erro ao remover do Supabase Storage:', err)
      }
    } else if (item.url.startsWith('/uploads/')) {
      // Local file
      try {
        const filePath = path.join(process.cwd(), 'public', item.url.replace(/^\//, ''))
        await fs.unlink(filePath)
      } catch (err) {
        console.warn('[STORAGE] Erro ao excluir arquivo local:', err)
      }
    }

    await prisma.media.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Mídia excluída com sucesso.' })
  } catch (error: any) {
    console.error('[MEDIA DELETE ERROR]', error)
    return NextResponse.json({ error: 'Erro ao excluir mídia.' }, { status: 500 })
  }
}
