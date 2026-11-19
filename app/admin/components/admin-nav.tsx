'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '@/app/components/brand/logo'
import {
  FiGrid,
  FiHome,
  FiInfo,
  FiActivity,
  FiFileText,
  FiBriefcase,
  FiImage,
  FiPhone,
  FiSettings,
  FiLogOut,
  FiExternalLink,
  FiMenu,
  FiX,
  FiUser,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

interface AdminNavProps {
  user?: {
    name?: string
    email?: string
    role?: string
  } | null
}

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: FiGrid },
  { href: '/admin/home', label: 'Página Inicial', icon: FiHome },
  { href: '/admin/about', label: 'Sobre a IC Assessoria', icon: FiInfo },
  { href: '/admin/services', label: 'Serviços', icon: FiActivity },
  { href: '/admin/articles', label: 'Conteúdos & Artigos', icon: FiFileText },
  { href: '/admin/portfolio', label: 'Portfólio & Experiências', icon: FiBriefcase },
  { href: '/admin/media', label: 'Biblioteca de Mídia', icon: FiImage },
  { href: '/admin/contact', label: 'Informações de Contato', icon: FiPhone },
  { href: '/admin/settings', label: 'Configurações Gerais', icon: FiSettings },
]

export default function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      toast.success('Sessão encerrada com sucesso.')
      router.push('/admin/login')
      router.refresh()
    } catch {
      toast.error('Erro ao sair. Tente novamente.')
    } finally {
      setLoggingOut(false)
    }
  }

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <div>
              <span className="font-bold text-white text-sm tracking-tight block">
                IC Assessoria
              </span>
              <span className="text-[10px] font-mono text-orange-400 uppercase tracking-wider block">
                Painel Administrativo
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Links Navigation */}
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Info & Actions */}
      <div className="p-4 border-t border-white/[0.08] space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
        >
          <span className="flex items-center gap-2">
            <FiExternalLink size={14} className="text-orange-400" />
            Visualizar Site Público
          </span>
          <span className="text-[10px] text-slate-400 font-mono">↗</span>
        </a>

        {/* User Card */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-white/[0.06]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <FiUser size={14} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user?.name || 'Antônio Cândido'}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.email || 'admin@icassessoria.com.br'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title="Sair do Painel"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <FiLogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Topbar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-950/90 backdrop-blur-md border-b border-white/[0.08]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <Logo size="sm" showTagline={false} />
          <span className="font-bold text-white text-sm">Painel IC Assessoria</span>
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-orange-400 text-xs"
            title="Ver site"
          >
            <FiExternalLink size={18} />
          </a>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-white/[0.05] text-white hover:bg-white/[0.1]"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] h-full bg-slate-950 border-r border-white/[0.1]"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 bg-[#08090e] border-r border-white/[0.08] overflow-y-auto">
        {navContent}
      </aside>
    </>
  )
}
