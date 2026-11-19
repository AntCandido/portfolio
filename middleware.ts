import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ||
    process.env.JWT_SECRET ||
    'ic-assessoria-secret-key-2026-safe-production-fallback-key'
)

export const SESSION_COOKIE_NAME = 'ic_admin_session'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Ignore public routes, assets, api except /api/admin
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/favicon') ||
    pathname === '/admin/login' ||
    pathname === '/api/admin/auth/login' ||
    pathname === '/api/admin/auth/logout'
  ) {
    return NextResponse.next()
  }

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value

    if (!token) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      const loginUrl = new URL('/admin/login', req.url)
      const res = NextResponse.redirect(loginUrl)
      res.cookies.delete(SESSION_COOKIE_NAME)
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
