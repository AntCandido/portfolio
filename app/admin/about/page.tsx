'use client'

import { useEffect, useState } from 'react'
import AdminGuard from '../components/admin-guard'
import { FiSave, FiEye, FiRefreshCw, FiUser, FiInfo } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
    mission: '',
    vision: '',
    values: '',
    responsibleName: '',
    responsibleRole: '',
    responsibleBio: '',
    responsiblePhotoUrl: '',
    institutionalImageUrl: '',
  })

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch('/api/admin/about')
        if (res.ok) {
          const data = await res.json()
          setFormData({
            title: data.title || '',
            subtitle: data.subtitle || '',
            paragraph1: data.paragraph1 || '',
            paragraph2: data.paragraph2 || '',
            paragraph3: data.paragraph3 || '',
            mission: data.mission || '',
            vision: data.vision || '',
            values: data.values || '',
            responsibleName: data.responsibleName || '',
            responsibleRole: data.responsibleRole || '',
            responsibleBio: data.responsibleBio || '',
            responsiblePhotoUrl: data.responsiblePhotoUrl || '',
            institutionalImageUrl: data.institutionalImageUrl || '',
          })
        }
      } catch (err) {
        console.error('Erro ao carregar dados do Sobre:', err)
        toast.error('Erro ao carregar dados atuais.')
      } finally {
        setLoading(false)
      }
    }
    fetchAbout()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao salvar.')
      }

      toast.success('Informações institucionais atualizadas com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar dados.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminGuard>
      <div className="p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sobre a IC Assessoria
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Gerencie a apresentação institucional, missão, visão, valores e dados do responsável técnico Antônio Cândido.
            </p>
          </div>
          <a
            href="/#sobre"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white border border-white/10 transition-all self-start sm:self-auto"
          >
            <FiEye size={15} />
            <span>Ver no Site</span>
          </a>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span>Carregando dados institucionais...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bloco 1: Apresentação Institucional */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                <FiInfo className="text-orange-400" />
                <span>1. Apresentação e Proposta Institucional</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Título da Seção
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Subtítulo / Rótulo
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Parágrafo 1 (Destaque Principal)
                </label>
                <textarea
                  name="paragraph1"
                  rows={3}
                  value={formData.paragraph1}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Parágrafo 2 (Objetivo e Transformação de Dados)
                </label>
                <textarea
                  name="paragraph2"
                  rows={3}
                  value={formData.paragraph2}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Parágrafo 3 (Atuação Técnica Especializada)
                </label>
                <textarea
                  name="paragraph3"
                  rows={3}
                  value={formData.paragraph3}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Bloco 2: Missão, Visão e Valores */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">
                2. Missão, Visão e Valores
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Missão
                  </label>
                  <textarea
                    name="mission"
                    rows={4}
                    value={formData.mission}
                    onChange={handleChange}
                    placeholder="Fortalecer a gestão e a vigilância em saúde..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Visão
                  </label>
                  <textarea
                    name="vision"
                    rows={4}
                    value={formData.vision}
                    onChange={handleChange}
                    placeholder="Ser referência em assessoria técnica..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Valores
                  </label>
                  <textarea
                    name="values"
                    rows={4}
                    value={formData.values}
                    onChange={handleChange}
                    placeholder="Rigor metodológico, transparência, ética..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 3: Perfil do Responsável Técnico (Antônio Cândido) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                <FiUser className="text-orange-400" />
                <span>3. Informações do Responsável Técnico</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="responsibleName"
                    value={formData.responsibleName}
                    onChange={handleChange}
                    placeholder="Antônio Cândido"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Cargo / Atuação
                  </label>
                  <input
                    type="text"
                    name="responsibleRole"
                    value={formData.responsibleRole}
                    onChange={handleChange}
                    placeholder="Responsável pela iniciativa IC Assessoria"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Biografia e Atuação Técnica
                </label>
                <textarea
                  name="responsibleBio"
                  rows={4}
                  value={formData.responsibleBio}
                  onChange={handleChange}
                  placeholder="Atuação orientada ao fortalecimento da gestão e da vigilância em saúde por meio da organização e qualificação de dados..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Foto do Responsável (URL ou caminho)
                  </label>
                  <input
                    type="text"
                    name="responsiblePhotoUrl"
                    value={formData.responsiblePhotoUrl}
                    onChange={handleChange}
                    placeholder="/profile.jpeg ou URL do Supabase Storage"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Imagem Institucional Complementar (opcional)
                  </label>
                  <input
                    type="text"
                    name="institutionalImageUrl"
                    value={formData.institutionalImageUrl}
                    onChange={handleChange}
                    placeholder="URL no Storage"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Os dados são gravados com versionamento no banco Supabase.
              </span>
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
                    <span>Salvar Alterações</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminGuard>
  )
}
