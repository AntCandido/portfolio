'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminGuard from '../components/admin-guard'
import DeleteModal from '../components/delete-modal'
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiBriefcase,
  FiCalendar,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

interface ProjectItem {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string | null
  projectDate: string | null
  order: number
  published: boolean
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<ProjectItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/admin/portfolio')
      if (res.ok) {
        const json = await res.json()
        setProjects(json)
      }
    } catch (err) {
      console.error('Erro ao listar portfólio:', err)
      toast.error('Erro ao buscar projetos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleTogglePublished = async (project: ProjectItem) => {
    try {
      const res = await fetch(`/api/admin/portfolio/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !project.published }),
      })

      if (res.ok) {
        toast.success(
          project.published ? 'Projeto mantido em rascunho.' : 'Projeto publicado no site!'
        )
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, published: !p.published } : p))
        )
      } else {
        toast.error('Erro ao atualizar status.')
      }
    } catch {
      toast.error('Erro na requisição.')
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/portfolio/${deleteTarget.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success('Projeto excluído com sucesso!')
        setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id))
        setDeleteTarget(null)
      } else {
        toast.error('Erro ao excluir projeto.')
      }
    } catch {
      toast.error('Erro ao excluir.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AdminGuard>
      <div className="p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Portfólio & Experiências Profissionais
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Cadastre e gerencie projetos realizados, estudos de caso e experiências técnicas reais.
            </p>
          </div>
          <Link
            href="/admin/portfolio/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all self-start sm:self-auto"
          >
            <FiPlus size={16} />
            <span>Adicionar Projeto</span>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span>Carregando portfólio...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 p-8 text-center rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center mx-auto">
              <FiBriefcase size={24} />
            </div>
            <h3 className="text-base font-bold text-white">Nenhum projeto cadastrado no momento</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Esta seção está pronta para receber projetos reais e histórico de experiências da IC Assessoria conforme forem disponibilizados por Antônio Cândido.
            </p>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold"
            >
              <FiPlus size={14} />
              <span>Cadastrar Primeiro Projeto</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06] rounded-3xl bg-slate-900/60 border border-white/[0.08] overflow-hidden">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-white truncate">
                      {project.title}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        project.published
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-white/10'
                      }`}
                    >
                      {project.published ? 'Publicado' : 'Rascunho'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                    {project.projectDate && (
                      <span className="flex items-center gap-1">
                        <FiCalendar size={12} className="text-orange-400" />
                        {project.projectDate}
                      </span>
                    )}
                    <span>Ordem: #{project.order}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleTogglePublished(project)}
                    title={project.published ? 'Mudar para rascunho' : 'Publicar'}
                    className={`p-2.5 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                      project.published
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {project.published ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                    <span className="hidden sm:inline">
                      {project.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </button>

                  <Link
                    href={`/admin/portfolio/${project.id}`}
                    className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Editar Projeto"
                  >
                    <FiEdit size={15} />
                  </Link>

                  <button
                    onClick={() => setDeleteTarget(project)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                    title="Excluir Projeto"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <DeleteModal
          isOpen={Boolean(deleteTarget)}
          title="Excluir Projeto do Portfólio"
          message={`Tem certeza que deseja excluir "${deleteTarget?.title}"?`}
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminGuard>
  )
}
