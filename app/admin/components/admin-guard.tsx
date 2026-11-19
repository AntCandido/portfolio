'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface AdminGuardProps {
  children: ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth/me')
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setAuthenticated(true)
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.error('Erro ao verificar sessão:', err)
      }

      setAuthenticated(false)
      setLoading(false)
      router.push('/admin/login')
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Verificando credenciais...</p>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return <>{children}</>
}
