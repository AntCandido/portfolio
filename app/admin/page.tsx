'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminGuard from './components/admin-guard'
import {
  FiActivity,
  FiFileText,
  FiBriefcase,
  FiImage,
  FiHome,
  FiInfo,
  FiPhone,
  FiSettings,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiDatabase,
} from 'react-icons/fi'

interface DashboardData {
  counts: {
    services: number
    servicesPublished: number
    articles: number
    articlesPublished: number
    projects: number
    projectsPublished: number
    media: number
  }
  recentActivity: Array<{
    id: string
    type: string
    title: string
    updatedAt: string
    published: boolean
    editUrl: string
  }>
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch('/api/admin/dashboard')
        if (res.ok) {
          const json = await res.json()
          setData(json)
        }
      } catch (err) {
        console.error('Erro ao carregar métricas:', err)
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [])

  return (
    <AdminGuard>
      <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8">
        {/* Welcome Top Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Sistema Operacional
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Painel de Controle
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Gerencie todas as informações institucionais, serviços, publicações e mídias da IC Assessoria.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all"
            >
              <FiPlus size={16} />
              <span>Novo Serviço</span>
            </Link>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium text-xs border border-white/10 transition-all"
            >
              <FiPlus size={16} />
              <span>Nova Publicação</span>
            </Link>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Serviços */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-orange-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Serviços</span>
              <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <FiActivity size={18} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white font-mono">
              {loading ? '-' : data?.counts.servicesPublished ?? 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {loading ? 'Carregando...' : `${data?.counts.services ?? 0} serviços cadastrados`}
            </p>
            <Link
              href="/admin/services"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              <span>Gerenciar serviços</span>
              <FiArrowRight size={12} />
            </Link>
          </div>

          {/* Artigos / Publicações */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-orange-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Publicações</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <FiFileText size={18} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white font-mono">
              {loading ? '-' : data?.counts.articlesPublished ?? 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {loading ? 'Carregando...' : `${data?.counts.articles ?? 0} artigos/conteúdos`}
            </p>
            <Link
              href="/admin/articles"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              <span>Ver publicações</span>
              <FiArrowRight size={12} />
            </Link>
          </div>

          {/* Portfólio & Experiências */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-orange-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Portfólio</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <FiBriefcase size={18} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white font-mono">
              {loading ? '-' : data?.counts.projectsPublished ?? 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {loading ? 'Carregando...' : `${data?.counts.projects ?? 0} projetos registrados`}
            </p>
            <Link
              href="/admin/portfolio"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              <span>Acessar portfólio</span>
              <FiArrowRight size={12} />
            </Link>
          </div>

          {/* Biblioteca de Mídia */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-orange-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">Mídias</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FiImage size={18} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white font-mono">
              {loading ? '-' : data?.counts.media ?? 0}
            </div>
            <p className="text-xs text-slate-400 mt-1">Imagens no Storage</p>
            <Link
              href="/admin/media"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              <span>Gerenciar mídias</span>
              <FiArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Quick Edit Shortcuts */}
        <div>
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span>Atalhos de Conteúdo Institucional</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/home"
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/40 hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 mb-3 group-hover:scale-105 transition-transform">
                <FiHome size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white">Página Inicial</h3>
              <p className="text-xs text-slate-400 mt-1">
                Títulos, apresentação, botões e destaques do início.
              </p>
            </Link>

            <Link
              href="/admin/about"
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/40 hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 mb-3 group-hover:scale-105 transition-transform">
                <FiInfo size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white">Sobre a IC Assessoria</h3>
              <p className="text-xs text-slate-400 mt-1">
                Proposta, missão, visão e perfil de Antônio Cândido.
              </p>
            </Link>

            <Link
              href="/admin/contact"
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/40 hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 mb-3 group-hover:scale-105 transition-transform">
                <FiPhone size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white">Canais de Contato</h3>
              <p className="text-xs text-slate-400 mt-1">
                WhatsApp, e-mail institucional e redes profissionais.
              </p>
            </Link>

            <Link
              href="/admin/settings"
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/40 hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 mb-3 group-hover:scale-105 transition-transform">
                <FiSettings size={18} />
              </div>
              <h3 className="text-sm font-semibold text-white">Configurações Gerais</h3>
              <p className="text-xs text-slate-400 mt-1">
                SEO, logotipo, rodapé e alteração de senha de acesso.
              </p>
            </Link>
          </div>
        </div>

        {/* Recent Updates & Activity */}
        <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <FiClock size={18} className="text-orange-400" />
              <span>Últimas Atualizações Registradas</span>
            </h2>
            <span className="text-xs text-slate-400">
              Registrado via Prisma ORM
            </span>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Carregando atividades recentes...
            </div>
          ) : !data?.recentActivity || data.recentActivity.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              Nenhuma alteração recente registrada no momento.
            </div>
          ) : (
            <div className="divide-y divide-white/[0.06]">
              {data.recentActivity.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 shrink-0">
                      {item.type}
                    </span>
                    <span className="text-sm font-medium text-white truncate">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${
                        item.published
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {item.published ? 'Publicado' : 'Rascunho'}
                    </span>
                    <Link
                      href={item.editUrl}
                      className="text-xs text-orange-400 hover:text-orange-300 font-medium"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  )
}
