'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave, FiEye, FiRefreshCw, FiImage, FiFileText } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface ArticleFormProps {
  id?: string
}

export default function ArticleForm({ id }: ArticleFormProps) {
  const router = useRouter()
  const isEditing = Boolean(id && id !== 'new')
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImageUrl: '',
    author: 'Antônio Cândido',
    published: false,
    publishedAt: new Date().toISOString().split('T')[0],
  })

  useEffect(() => {
    if (!isEditing) return

    async function fetchArticle() {
      try {
        const res = await fetch(`/api/admin/articles/${id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            excerpt: data.excerpt || '',
            content: data.content || '',
            coverImageUrl: data.coverImageUrl || '',
            author: data.author || 'Antônio Cândido',
            published: data.published ?? false,
            publishedAt: data.publishedAt
              ? new Date(data.publishedAt).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0],
          })
        } else {
          toast.error('Artigo não encontrado.')
          router.push('/admin/articles')
        }
      } catch (err) {
        console.error('Erro ao buscar artigo:', err)
        toast.error('Erro ao carregar dados.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id, isEditing, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
    setFormData((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('O título do artigo é obrigatório.')
      return
    }

    setSaving(true)
    try {
      const url = isEditing ? `/api/admin/articles/${id}` : '/api/admin/articles'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao salvar artigo.')
      }

      toast.success(
        isEditing ? 'Artigo atualizado com sucesso!' : 'Publicação criada com sucesso!'
      )
      router.push('/admin/articles')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erro ao processar requisição.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <span>Carregando publicação...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isEditing ? 'Editar Conteúdo / Artigo' : 'Nova Publicação'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Redija artigos técnicos, informativos e notas sobre vigilância em saúde.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all ${
              previewMode
                ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <FiEye size={14} />
              {previewMode ? 'Modo Editor' : 'Pré-visualizar'}
            </span>
          </button>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer bg-slate-900/80 px-3.5 py-2 rounded-xl border border-white/10">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="accent-orange-500 rounded w-4 h-4 cursor-pointer"
            />
            <span>Publicado</span>
          </label>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
          <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
            Pré-visualização do Artigo
          </span>
          <h1 className="text-3xl font-bold text-white">{formData.title || 'Título do Artigo'}</h1>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>Por {formData.author}</span>
            <span>• Data: {formData.publishedAt}</span>
          </div>
          {formData.excerpt && (
            <p className="text-base text-slate-300 italic border-l-2 border-orange-500 pl-4">
              {formData.excerpt}
            </p>
          )}
          <div className="whitespace-pre-line text-sm text-slate-200 leading-relaxed pt-4 border-t border-white/[0.06]">
            {formData.content || 'Nenhum conteúdo digitado ainda.'}
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Título da Publicação *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: A Importância dos Indicadores Estratégicos na Gestão do SUS"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                Autor
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Antônio Cândido"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                Data de Publicação
              </label>
              <input
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Imagem de Capa (URL ou Biblioteca de Mídia)
            </label>
            <input
              type="text"
              name="coverImageUrl"
              value={formData.coverImageUrl}
              onChange={handleChange}
              placeholder="URL da imagem (ex: do Supabase Storage)"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Resumo / Sinopse
            </label>
            <textarea
              name="excerpt"
              rows={2}
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Breve resumo introdutório que aparecerá na listagem de conteúdos..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Conteúdo Completo (Suporta texto formatado e Markdown)
              </label>
              <span className="text-[11px] text-slate-400">
                Parágrafos, títulos e listas são suportados
              </span>
            </div>
            <textarea
              name="content"
              rows={12}
              value={formData.content}
              onChange={handleChange}
              placeholder="Escreva aqui o artigo completo..."
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 font-sans leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between">
        <Link
          href="/admin/articles"
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Voltar para a lista
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <FiRefreshCw className="animate-spin" size={16} />
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <FiSave size={16} />
              <span>Salvar Publicação</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
