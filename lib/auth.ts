import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import prisma from './prisma'

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ||
    process.env.JWT_SECRET ||
    'ic-assessoria-secret-key-2026-safe-production-fallback-key'
)

export const SESSION_COOKIE_NAME = 'ic_admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface AdminSessionPayload {
  userId: string
  email: string
  role: string
  name: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function signAdminToken(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as string,
      name: payload.name as string,
    }
  } catch {
    return null
  }
}

export async function getCurrentAdminSession(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
    if (!token) return null
    return await verifyAdminToken(token)
  } catch {
    return null
  }
}

export async function authenticateRequest(
  req: NextRequest
): Promise<AdminSessionPayload | null> {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value
  if (!token) {
    const authHeader = req.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      return verifyAdminToken(authHeader.substring(7))
    }
    return null
  }
  return verifyAdminToken(token)
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

/**
 * Assures at least one administrator exists in the database.
 * If no admin is found, provisions the default administrator using ADMIN_EMAIL and ADMIN_PASSWORD.
 */
export async function ensureDefaultAdmin() {
  try {
    const count = await prisma.adminUser.count()
    if (count === 0) {
      const email = (process.env.ADMIN_EMAIL || 'admin@icassessoria.com.br').trim().toLowerCase()
      const rawPassword = process.env.ADMIN_PASSWORD || 'ICAssessoria#2026'
      const passwordHash = await hashPassword(rawPassword)

      const created = await prisma.adminUser.create({
        data: {
          email,
          passwordHash,
          name: 'Antônio Cândido',
          role: 'ADMIN',
        },
      })
      console.log(`[AUTH] Administrador inicial criado com sucesso: ${email}`)
      return created
    }
  } catch (err) {
    console.warn('[AUTH] Aviso ao verificar/criar administrador padrão:', err)
  }
  return null
}
