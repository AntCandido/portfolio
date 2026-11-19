'use client'

import { useEffect, useState } from 'react'
import AdminGuard from '../components/admin-guard'
import { FiSave, FiEye, FiRefreshCw, FiPhone, FiMail, FiLinkedin, FiInstagram, FiMapPin } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    whatsapp: '',
    email: '',
    instagram: '',
    linkedin: '',
    address: '',
  })

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch('/api/admin/contact')
        if (res.ok) {
          const data = await res.json()
          setFormData({
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            whatsapp: data.whatsapp || '',
            email: data.email || '',
            instagram: data.instagram || '',
            linkedin: data.linkedin || '',
            address: data.address || '',
          })
        }
      } catch (err) {
        console.error('Erro ao carregar dados de contato:', err)
        toast.error('Erro ao buscar dados atuais.')
      } finally {
        setLoading(false)
      }
    }
    fetchContact()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao salvar.')
      }

      toast.success('Informações de contato salvas com sucesso!')
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar dados de contato.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminGuard>
      <div className="p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Informações de Contato & Canais
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Configure o número do WhatsApp profissional, e-mail institucional, LinkedIn e chamadas para contato.
            </p>
          </div>
          <a
            href="/#contato"
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
            <span>Carregando dados de contato...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Bloco 1: Textos da Chamada de Contato */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">
                1. Textos da Seção de Contato
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Título da Chamada
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Vamos conversar sobre a gestão em saúde?"
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
                    placeholder="Entre em Contato"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                  Texto Explicativo de Apoio
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Converse com a IC Assessoria para avaliar as necessidades da sua gestão..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Bloco 2: Canais Diretos */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3">
                2. Canais Diretos de Atendimento
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                    <FiPhone className="text-emerald-400" />
                    WhatsApp Profissional (DDD + Número)
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Ex: 5584999999999"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Utilize apenas dígitos com código do país (55) e DDD.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                    <FiMail className="text-amber-400" />
                    E-mail Institucional
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contato@icassessoria.com.br"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                    <FiLinkedin className="text-blue-400" />
                    LinkedIn Profissional (URL)
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                    <FiInstagram className="text-pink-400" />
                    Instagram Profissional (URL ou @)
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5 flex items-center gap-1.5">
                  <FiMapPin className="text-orange-400" />
                  Localização / Endereço Comercial (Opcional)
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Cidade - UF ou endereço completo, se aplicável"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-slate-900/95 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Os canais atualizados serão exibidos nos botões e no rodapé do site.
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
                    <span>Salvar Contatos</span>
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
