'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft, FiSave, FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface PortfolioFormProps {
  id?: string
}

export default function PortfolioForm({ id }: PortfolioFormProps) {
  const router = useRouter()
  const isEditing = Boolean(id && id !== 'new')
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Assessoria Técnica',
    imageUrl: '',
    projectDate: '',
    order: 0,
    published: true,
  })

  useEffect(() => {
    if (!isEditing) return

    async function fetchProject() {
      try {
        const res = await fetch(`/api/admin/portfolio/${id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            title: data.title || '',
            description: data.description || '',
            category: data.category || 'Assessoria Técnica',
            imageUrl: data.imageUrl || '',
            projectDate: data.projectDate || '',
            order: data.order ?? 0,
            published: data.published ?? true,
          })
        } else {
          toast.error('Projeto não encontrado.')
          router.push('/admin/portfolio')
        }
      } catch (err) {
        console.error('Erro ao buscar projeto:', err)
        toast.error('Erro ao carregar dados.')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
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
      toast.error('O título do projeto é obrigatório.')
      return
    }

    setSaving(true)
    try {
      const url = isEditing ? `/api/admin/portfolio/${id}` : '/api/admin/portfolio'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: Number(formData.order) || 0,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao salvar projeto.')
      }

      toast.success(
        isEditing ? 'Projeto atualizado com sucesso!' : 'Novo projeto cadastrado com sucesso!'
      )
      router.push('/admin/portfolio')
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
        <span>Carregando dados do projeto...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/portfolio"
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isEditing ? 'Editar Projeto' : 'Novo Projeto de Portfólio'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Registre histórico técnico, estudos de caso e projetos da IC Assessoria.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer bg-slate-900/80 px-3.5 py-2 rounded-xl border border-white/10">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="accent-orange-500 rounded w-4 h-4 cursor-pointer"
            />
            <span>Publicado no site</span>
          </label>
        </div>
      </div>

      {/* Main Details */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
            Título do Projeto *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Qualificação das Bases de Vigilância Epidemiológica Municipal"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Categoria
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ex: Análise de Dados"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Data / Período
            </label>
            <input
              type="text"
              name="projectDate"
              value={formData.projectDate}
              onChange={handleChange}
              placeholder="Ex: 2024 / 1º Semestre"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Ordem
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
            Imagem Ilustrativa (URL ou Storage)
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="URL da imagem (opcional)"
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
            Descrição do Projeto e Resultados
          </label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Descreva o escopo da atuação, metodologia aplicada e impactos gerados..."
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between">
        <Link
          href="/admin/portfolio"
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Cancelar
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
              <span>Salvar Projeto</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
