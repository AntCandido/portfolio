import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  verifyPassword,
  signAdminToken,
  setSessionCookie,
  ensureDefaultAdmin,
} from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = (body.email || '').trim().toLowerCase()
    const password = body.password || ''

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Por favor, informe e-mail e senha.' },
        { status: 400 }
      )
    }

    // Garante que o administrador inicial exista caso o banco tenha acabado de ser criado
    await ensureDefaultAdmin()

    // Busca usuário administrador
    const user = await prisma.adminUser.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas. Verifique o e-mail ou a senha.' },
        { status: 401 }
      )
    }

    const isValid = await verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Credenciais inválidas. Verifique o e-mail ou a senha.' },
        { status: 401 }
      )
    }

    const token = await signAdminToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    setSessionCookie(response, token)
    return response
  } catch (error: any) {
    console.error('[AUTH LOGIN ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao processar autenticação. Tente novamente mais tarde.' },
      { status: 500 }
    )
  }
}
