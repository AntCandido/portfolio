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
  FiFileText,
  FiCalendar,
  FiUser,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

interface ArticleItem {
  id: string
  slug: string
  title: string
  excerpt: string
  author: string
  published: boolean
  publishedAt: string | null
  createdAt: string
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<ArticleItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles')
      if (res.ok) {
        const json = await res.json()
        setArticles(json)
      }
    } catch (err) {
      console.error('Erro ao listar artigos:', err)
      toast.error('Erro ao buscar publicações.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  const handleTogglePublished = async (article: ArticleItem) => {
    try {
      const res = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !article.published }),
      })

      if (res.ok) {
        toast.success(
          article.published ? 'Publicação salva como rascunho.' : 'Artigo publicado no site!'
        )
        setArticles((prev) =>
          prev.map((a) => (a.id === article.id ? { ...a, published: !a.published } : a))
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
      const res = await fetch(`/api/admin/articles/${deleteTarget.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success('Artigo excluído com sucesso!')
        setArticles((prev) => prev.filter((a) => a.id !== deleteTarget.id))
        setDeleteTarget(null)
      } else {
        toast.error('Erro ao excluir artigo.')
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
              Conteúdos & Artigos Técnicos
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Publique artigos, relatórios técnicos, notícias e informativos da IC Assessoria.
            </p>
          </div>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all self-start sm:self-auto"
          >
            <FiPlus size={16} />
            <span>Nova Publicação</span>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span>Carregando publicações...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-16 p-8 text-center rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto">
              <FiFileText size={24} />
            </div>
            <h3 className="text-base font-bold text-white">Nenhum artigo publicado ainda</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Esta área está preparada para receber artigos técnicos sobre vigilância em saúde, análise de indicadores e notas técnicas produzidas por Antônio Cândido.
            </p>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold"
            >
              <FiPlus size={14} />
              <span>Criar Primeira Publicação</span>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.06] rounded-3xl bg-slate-900/60 border border-white/[0.08] overflow-hidden">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-base font-bold text-white truncate">
                      {article.title}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        article.published
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {article.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>

                  {article.excerpt && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <FiUser size={12} className="text-orange-400" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} className="text-slate-400" />
                      {new Date(article.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleTogglePublished(article)}
                    title={article.published ? 'Mudar para rascunho' : 'Publicar'}
                    className={`p-2.5 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                      article.published
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {article.published ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                    <span className="hidden sm:inline">
                      {article.published ? 'Publicado' : 'Rascunho'}
                    </span>
                  </button>

                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors"
                    title="Editar Publicação"
                  >
                    <FiEdit size={15} />
                  </Link>

                  <button
                    onClick={() => setDeleteTarget(article)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                    title="Excluir Artigo"
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
          title="Excluir Artigo"
          message={`Tem certeza que deseja excluir "${deleteTarget?.title}"? Esta ação não pode ser desfeita.`}
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminGuard>
  )
}
