'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FiArrowLeft,
  FiSave,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiActivity,
  FiTrendingUp,
  FiCheckSquare,
  FiDatabase,
  FiFileText,
  FiTarget,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

const AVAILABLE_ICONS = [
  { name: 'FiActivity', label: 'Atividade / Pulso', icon: FiActivity },
  { name: 'FiTrendingUp', label: 'Tendência / Gráfico', icon: FiTrendingUp },
  { name: 'FiCheckSquare', label: 'Validação / Check', icon: FiCheckSquare },
  { name: 'FiDatabase', label: 'Banco / Dados', icon: FiDatabase },
  { name: 'FiFileText', label: 'Documento / Relatório', icon: FiFileText },
  { name: 'FiTarget', label: 'Alvo / Estratégia', icon: FiTarget },
]

interface ServiceFormProps {
  id?: string
}

export default function ServiceForm({ id }: ServiceFormProps) {
  const router = useRouter()
  const isEditing = Boolean(id && id !== 'new')
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    iconName: 'FiActivity',
    category: 'Assessoria Técnica',
    order: 0,
    published: true,
  })

  const [deliverables, setDeliverables] = useState<string[]>([
    'Estruturação de rotinas e fluxos de vigilância',
    'Monitoramento de agravos e eventos prioritários',
  ])
  const [newDeliverable, setNewDeliverable] = useState('')

  useEffect(() => {
    if (!isEditing) return

    async function fetchService() {
      try {
        const res = await fetch(`/api/admin/services/${id}`)
        if (res.ok) {
          const data = await res.json()
          setFormData({
            title: data.title || '',
            slug: data.slug || '',
            shortDescription: data.shortDescription || '',
            description: data.description || '',
            iconName: data.iconName || 'FiActivity',
            category: data.category || 'Assessoria Técnica',
            order: data.order ?? 0,
            published: data.published ?? true,
          })
          if (Array.isArray(data.deliverables)) {
            setDeliverables(data.deliverables)
          } else if (typeof data.deliverables === 'string') {
            try {
              setDeliverables(JSON.parse(data.deliverables))
            } catch {
              setDeliverables([])
            }
          }
        } else {
          toast.error('Serviço não encontrado.')
          router.push('/admin/services')
        }
      } catch (err) {
        console.error('Erro ao carregar serviço:', err)
        toast.error('Erro ao buscar dados do serviço.')
      } finally {
        setLoading(false)
      }
    }

    fetchService()
  }, [id, isEditing, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value
    setFormData((prev) => ({ ...prev, [e.target.name]: value }))
  }

  const handleAddDeliverable = () => {
    if (!newDeliverable.trim()) return
    setDeliverables((prev) => [...prev, newDeliverable.trim()])
    setNewDeliverable('')
  }

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      toast.error('O título do serviço é obrigatório.')
      return
    }

    setSaving(true)
    try {
      const url = isEditing ? `/api/admin/services/${id}` : '/api/admin/services'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          order: Number(formData.order) || 0,
          deliverables,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao salvar serviço.')
      }

      toast.success(
        isEditing ? 'Serviço atualizado com sucesso!' : 'Novo serviço cadastrado com sucesso!'
      )
      router.push('/admin/services')
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Erro ao processar serviço.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <span>Carregando dados do serviço...</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {isEditing ? 'Editar Serviço' : 'Novo Serviço'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEditing
                ? 'Atualize as informações deste serviço da IC Assessoria.'
                : 'Preencha os dados do novo serviço que será disponibilizado.'}
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
            Título do Serviço *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Vigilância em Saúde"
            required
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Categoria
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ex: Assessoria Técnica"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
              Ordem de Exibição (0, 1, 2...)
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
            Descrição Curta (Resumo)
          </label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Breve frase de destaque do serviço"
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
            Descrição Completa
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detalhamento do serviço, método de trabalho e objetivos práticos..."
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Escolha do Ícone */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-2">
            Ícone Representativo
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {AVAILABLE_ICONS.map((item) => {
              const Icon = item.icon
              const isSelected = formData.iconName === item.name
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, iconName: item.name }))}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-orange-500/20 border-orange-500 text-white'
                      : 'bg-black/30 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Icon size={18} className={isSelected ? 'text-orange-400' : 'text-slate-400'} />
                  <span className="text-xs font-medium truncate">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Escopo de Entregas / Deliverables */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-4">
        <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">
          Escopo de Apoio Técnico e Entregas
        </h2>
        <p className="text-xs text-slate-400">
          Adicione itens que especificam as entregas práticas e rotinas inclusas neste serviço.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={newDeliverable}
            onChange={(e) => setNewDeliverable(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddDeliverable()
              }
            }}
            placeholder="Ex: Acompanhamento sistemático de metas de saúde"
            className="flex-1 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
          />
          <button
            type="button"
            onClick={handleAddDeliverable}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <FiPlus size={14} />
            <span>Adicionar</span>
          </button>
        </div>

        {deliverables.length > 0 && (
          <div className="space-y-2 pt-2">
            {deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveDeliverable(idx)}
                  className="p-1 text-slate-400 hover:text-red-400"
                  title="Remover item"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between">
        <Link
          href="/admin/services"
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
              <span>Salvar Serviço</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
