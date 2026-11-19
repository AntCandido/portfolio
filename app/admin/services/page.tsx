'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AdminGuard from '../components/admin-guard'
import DeleteModal from '../components/delete-modal'
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLayers,
  FiActivity,
  FiArrowUp,
  FiArrowDown,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

interface ServiceItem {
  id: string
  slug: string
  title: string
  shortDescription: string
  description: string
  iconName: string
  category: string
  order: number
  published: boolean
  deliverables?: any
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadServices = async () => {
    try {
      const res = await fetch('/api/admin/services')
      if (res.ok) {
        const json = await res.json()
        setServices(json)
      }
    } catch (err) {
      console.error('Erro ao carregar serviços:', err)
      toast.error('Erro ao buscar lista de serviços.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  const handleTogglePublished = async (service: ServiceItem) => {
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !service.published }),
      })

      if (res.ok) {
        toast.success(
          service.published ? 'Serviço despublicado.' : 'Serviço publicado no site!'
        )
        setServices((prev) =>
          prev.map((s) => (s.id === service.id ? { ...s, published: !s.published } : s))
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
      const res = await fetch(`/api/admin/services/${deleteTarget.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        toast.success('Serviço excluído com sucesso!')
        setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id))
        setDeleteTarget(null)
      } else {
        toast.error('Erro ao excluir serviço.')
      }
    } catch {
      toast.error('Erro de comunicação com o servidor.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AdminGuard>
      <div className="p-6 sm:p-8 lg:p-10 max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Gerenciamento de Serviços
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Cadastre, edite, ordene e publique os serviços especializados de apoio em saúde.
            </p>
          </div>
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-lg shadow-orange-500/20 transition-all self-start sm:self-auto"
          >
            <FiPlus size={16} />
            <span>Adicionar Novo Serviço</span>
          </Link>
        </div>

        {/* Content Table / Cards */}
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span>Carregando serviços...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="py-16 p-8 text-center rounded-3xl bg-slate-900/40 border border-white/[0.08] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/15 text-orange-400 flex items-center justify-center mx-auto">
              <FiActivity size={24} />
            </div>
            <h3 className="text-base font-bold text-white">Nenhum serviço cadastrado</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Comece adicionando seu primeiro serviço ou execute o seed inicial do banco para carregar os serviços padrão da IC Assessoria.
            </p>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold"
            >
              <FiPlus size={14} />
              <span>Cadastrar Primeiro Serviço</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>{services.length} serviços cadastrados</span>
              <span>{services.filter((s) => s.published).length} visíveis no site</span>
            </div>

            <div className="divide-y divide-white/[0.06] rounded-3xl bg-slate-900/60 border border-white/[0.08] overflow-hidden">
              {services.map((service, index) => {
                const deliverablesCount = Array.isArray(service.deliverables)
                  ? service.deliverables.length
                  : 0

                return (
                  <div
                    key={service.id}
                    className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0 font-mono text-sm font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-base font-bold text-white truncate">
                            {service.title}
                          </h3>
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                              service.published
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 text-slate-400 border border-white/10'
                            }`}
                          >
                            {service.published ? 'Publicado' : 'Rascunho'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-full">
                            {service.category}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                          {service.description || service.shortDescription}
                        </p>

                        <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2 font-mono">
                          <span>Ícone: {service.iconName}</span>
                          {deliverablesCount > 0 && (
                            <span>• {deliverablesCount} entregas/escopo</span>
                          )}
                          <span>• Ordem: #{service.order}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => handleTogglePublished(service)}
                        title={service.published ? 'Despublicar' : 'Publicar'}
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                          service.published
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                            : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {service.published ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                        <span className="hidden sm:inline">
                          {service.published ? 'Visível' : 'Oculto'}
                        </span>
                      </button>

                      <Link
                        href={`/admin/services/${service.id}`}
                        className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors"
                        title="Editar Serviço"
                      >
                        <FiEdit size={15} />
                      </Link>

                      <button
                        onClick={() => setDeleteTarget(service)}
                        className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                        title="Excluir Serviço"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteModal
          isOpen={Boolean(deleteTarget)}
          title="Excluir Serviço"
          message={`Tem certeza que deseja excluir o serviço "${deleteTarget?.title}"? Esta ação removerá o registro do banco de dados.`}
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    </AdminGuard>
  )
}
