import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authenticateRequest } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { getContactSettings } from '@/lib/data'

export async function GET(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  const contact = await getContactSettings()
  return NextResponse.json(contact)
}

export async function PUT(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, subtitle, description, whatsapp, email, instagram, linkedin, address } = body

    const updated = await prisma.contactSettings.upsert({
      where: { id: 'default' },
      update: {
        title: title || undefined,
        subtitle: subtitle || undefined,
        description: description !== undefined ? description : undefined,
        whatsapp: whatsapp !== undefined ? whatsapp : undefined,
        email: email !== undefined ? email : undefined,
        instagram: instagram !== undefined ? instagram : undefined,
        linkedin: linkedin !== undefined ? linkedin : undefined,
        address: address !== undefined ? address : undefined,
      },
      create: {
        id: 'default',
        title: title || 'Vamos conversar sobre a gestão em saúde?',
        subtitle: subtitle || 'Entre em Contato',
        description: description || '',
        whatsapp: whatsapp || '',
        email: email || 'contato@icassessoria.com.br',
        instagram: instagram || '',
        linkedin: linkedin || 'https://www.linkedin.com',
        address: address || null,
      },
    })

    revalidatePath('/')
    return NextResponse.json({ success: true, data: updated })
  } catch (error: any) {
    console.error('[CONTACT PUT ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar dados de contato.' },
      { status: 500 }
    )
  }
}
