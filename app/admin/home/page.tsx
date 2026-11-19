'use client'

import { useEffect, useState } from 'react'
import AdminGuard from '../components/admin-guard'
import { FiSave, FiEye, FiCheck, FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminHomePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    badgeText: '',
    heroTitle: '',
    heroSubtitle: '',
    primaryCtaText: '',
    primaryCtaLink: '',
    secondaryCtaText: '',
    secondaryCtaLink: '',
    stat1Value: 'Decisões',
    stat1Label: 'Orientadas por Evidências',
    stat1Highlight: '100% técnicas',
    stat2Value: 'Indicadores',
    stat2Label: 'Monitoramento Contínuo',
    stat2Highlight: 'Visão integral',
    stat3Value: 'Bases de Dados',
    stat3Label: 'Qualificação & Consistência',
    stat3Highlight: 'Confiabilidade',
  })

  useEffect(() => {
    async function fetchHome() {
      try {
        const res = await fetch('/api/admin/home')
        if (res.ok) {
          const data = await res.json()
          const stats = Array.isArray(data.statsData) ? data.statsData : []
          setFormData({
            badgeText: data.badgeText || '',
            heroTitle: data.heroTitle || '',
            heroSubtitle: data.heroSubtitle || '',
            primaryCtaText: data.primaryCtaText || '',
            primaryCtaLink: data.primaryCtaLink || '',
            secondaryCtaText: data.secondaryCtaText || '',
            secondaryCtaLink: data.secondaryCtaLink || '',
            stat1Value: stats[0]?.value || 'Decisões',
            stat1Label: stats[0]?.label || 'Orientadas por Evidências',
            stat1Highlight: stats[0]?.highlight || '100% técnicas',
            stat2Value: stats[1]?.value || 'Indicadores',
            stat2Label: stats[1]?.label || 'Monitoramento Contínuo',
            stat2Highlight: stats[1]?.highlight || 'Visão integral',
            stat3Value: stats[2]?.value || 'Bases de Dados',
            stat3Label: stats[2]?.label || 'Qualificação & Consistência',
            stat3Highlight: stats[2]?.highlight || 'Confiabilidade',
          })
        }
      } catch (err) {
        console.error('Erro ao carregar dados da Home:', err)
        toast.error('Erro ao carregar dados atuais.')
      } finally {
        setLoading(false)
      }
    }
    fetchHome()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        badgeText: formData.badgeText,
        heroTitle: formData.heroTitle,
        heroSubtitle: formData.heroSubtitle,
        primaryCtaText: formData.primaryCtaText,
        primaryCtaLink: formData.primaryCtaLink,
        secondaryCtaText: formData.secondaryCtaText,
        secondaryCtaLink: formData.secondaryCtaLink,
        statsData: [
          {
            value: formData.stat1Value,
            label: formData.stat1Label,
            highlight: formData.stat1Highlight,
          },
          {
            value: formData.stat2Value,
            label: formData.stat2Label,
            highlight: formData.stat2Highlight,
          },
          {
            value: formData.stat3Value,
            label: formData.stat3Label,
            highlight: formData.stat3Highlight,
          },
        ],
      }

      const res = await fetch('/api/admin/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao salvar.')
      }

      toast.success('Página inicial atualizada com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar página inicial.')
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
              Gerenciar Página Inicial
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Personalize os textos principais do topo, apresentação da assessoria e destaques numéricos.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white border border-white/10 transition-all"
            >
              <FiEye size={15} />
              <span>Ver no Site</span>
            </a>
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span>Carregando dados da página inicial...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bloco 1: Identificação & Apresentação */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">
                1. Textos em Destaque do Topo (Hero)
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Selo / Badge de Status
                </label>
                <input
                  type="text"
                  name="badgeText"
                  value={formData.badgeText}
                  onChange={handleChange}
                  placeholder="Assessoria Especializada em Saúde"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Título Principal
                </label>
                <input
                  type="text"
                  name="heroTitle"
                  value={formData.heroTitle}
                  onChange={handleChange}
                  placeholder="Inteligência em saúde para decisões mais estratégicas."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Texto de Apresentação / Subtítulo
                </label>
                <textarea
                  name="heroSubtitle"
                  rows={3}
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  placeholder="Transformamos dados em informações estratégicas para fortalecer a gestão..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Bloco 2: Botões de Ação (CTAs) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">
                2. Botões Principais de Ação (CTAs)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Texto do Botão Primário
                  </label>
                  <input
                    type="text"
                    name="primaryCtaText"
                    value={formData.primaryCtaText}
                    onChange={handleChange}
                    placeholder="Fale com a Assessoria"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Link do Botão Primário
                  </label>
                  <input
                    type="text"
                    name="primaryCtaLink"
                    value={formData.primaryCtaLink}
                    onChange={handleChange}
                    placeholder="#contato"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Texto do Botão Secundário
                  </label>
                  <input
                    type="text"
                    name="secondaryCtaText"
                    value={formData.secondaryCtaText}
                    onChange={handleChange}
                    placeholder="Conheça Nossos Serviços"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Link do Botão Secundário
                  </label>
                  <input
                    type="text"
                    name="secondaryCtaLink"
                    value={formData.secondaryCtaLink}
                    onChange={handleChange}
                    placeholder="#servicos"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Bloco 3: 3 Pilares em Destaque */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">
                3. Pilares de Destaque Numérico
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Pilar 1 */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <span className="text-[10px] font-mono text-orange-400 uppercase">Pilar 01</span>
                  <input
                    type="text"
                    name="stat1Value"
                    value={formData.stat1Value}
                    onChange={handleChange}
                    placeholder="Valor"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    name="stat1Label"
                    value={formData.stat1Label}
                    onChange={handleChange}
                    placeholder="Rótulo"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    name="stat1Highlight"
                    value={formData.stat1Highlight}
                    onChange={handleChange}
                    placeholder="Destaque"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>

                {/* Pilar 2 */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <span className="text-[10px] font-mono text-orange-400 uppercase">Pilar 02</span>
                  <input
                    type="text"
                    name="stat2Value"
                    value={formData.stat2Value}
                    onChange={handleChange}
                    placeholder="Valor"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    name="stat2Label"
                    value={formData.stat2Label}
                    onChange={handleChange}
                    placeholder="Rótulo"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    name="stat2Highlight"
                    value={formData.stat2Highlight}
                    onChange={handleChange}
                    placeholder="Destaque"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>

                {/* Pilar 3 */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <span className="text-[10px] font-mono text-orange-400 uppercase">Pilar 03</span>
                  <input
                    type="text"
                    name="stat3Value"
                    value={formData.stat3Value}
                    onChange={handleChange}
                    placeholder="Valor"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    name="stat3Label"
                    value={formData.stat3Label}
                    onChange={handleChange}
                    placeholder="Rótulo"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                  <input
                    type="text"
                    name="stat3Highlight"
                    value={formData.stat3Highlight}
                    onChange={handleChange}
                    placeholder="Destaque"
                    className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Save Button Bar */}
            <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between">
              <span className="text-xs text-slate-400">
                As alterações são salvas diretamente no Supabase e atualizam o site público.
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
