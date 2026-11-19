import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { authenticateRequest, verifyPassword, hashPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await authenticateRequest(req)
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  try {
    const { currentPassword, newPassword } = await req.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Por favor, informe a senha atual e a nova senha.' },
        { status: 400 }
      )
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'A nova senha deve possuir no mínimo 6 caracteres.' },
        { status: 400 }
      )
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: session.userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário administrador não encontrado.' },
        { status: 404 }
      )
    }

    const isMatch = await verifyPassword(currentPassword, user.passwordHash)
    if (!isMatch) {
      return NextResponse.json(
        { error: 'A senha atual informada está incorreta.' },
        { status: 400 }
      )
    }

    const newHash = await hashPassword(newPassword)
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { passwordHash: newHash },
    })

    return NextResponse.json({
      success: true,
      message: 'Senha alterada com sucesso!',
    })
  } catch (error: any) {
    console.error('[CHANGE PASSWORD ERROR]', error)
    return NextResponse.json(
      { error: 'Erro ao alterar senha.' },
      { status: 500 }
    )
  }
}
