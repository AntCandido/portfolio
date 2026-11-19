'use client'

import { useEffect, useState } from 'react'
import AdminGuard from '../components/admin-guard'
import {
  FiSave,
  FiRefreshCw,
  FiLock,
  FiCheck,
  FiGlobe,
  FiSliders,
  FiShield,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    siteName: '',
    tagline: '',
    logoUrl: '',
    faviconUrl: '',
    primaryColor: '#f97316',
    footerText: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/admin/settings')
        if (res.ok) {
          const data = await res.json()
          setSettings({
            siteName: data.siteName || '',
            tagline: data.tagline || '',
            logoUrl: data.logoUrl || '',
            faviconUrl: data.faviconUrl || '',
            primaryColor: data.primaryColor || '#f97316',
            footerText: data.footerText || '',
            seoTitle: data.seoTitle || '',
            seoDescription: data.seoDescription || '',
            seoKeywords: data.seoKeywords || '',
          })
        }
      } catch (err) {
        console.error('Erro ao carregar configurações:', err)
        toast.error('Erro ao buscar configurações.')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingSettings(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Erro ao salvar.')
      }

      toast.success('Configurações salvas com sucesso!')
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar configurações.')
    } finally {
      setSavingSettings(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Preencha a senha atual e a nova senha.')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('A confirmação da nova senha não confere.')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('A nova senha deve ter no mínimo 6 caracteres.')
      return
    }

    setSavingPassword(true)
    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erro ao alterar senha.')
      }

      toast.success('Senha alterada com sucesso!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (err: any) {
      toast.error(err.message || 'Erro ao alterar senha.')
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <AdminGuard>
      <div className="p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="pb-6 border-b border-white/[0.08]">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Configurações Gerais & Segurança
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ajustes institucionais de SEO, identidade visual, dados do rodapé e gerenciamento seguro de senha.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span>Carregando configurações...</span>
          </div>
        ) : (
          <>
            {/* Form de Configurações do Site */}
            <form onSubmit={handleSaveSettings} className="space-y-8">
              {/* Identidade Institucional */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
                <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                  <FiSliders className="text-orange-400" />
                  <span>1. Identidade Institucional & Visual</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                      Nome Institucional
                    </label>
                    <input
                      type="text"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleSettingsChange}
                      placeholder="IC Assessoria"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                      Slogan / Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      value={settings.tagline}
                      onChange={handleSettingsChange}
                      placeholder="Vigilância e Análise de Dados em Saúde"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                      Logotipo Personalizado (URL)
                    </label>
                    <input
                      type="text"
                      name="logoUrl"
                      value={settings.logoUrl}
                      onChange={handleSettingsChange}
                      placeholder="URL no Storage ou caminho interno"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                      Favicon (Ícone de Aba do Navegador)
                    </label>
                    <input
                      type="text"
                      name="faviconUrl"
                      value={settings.faviconUrl}
                      onChange={handleSettingsChange}
                      placeholder="/favicon.svg"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Texto de Direitos Autorais do Rodapé
                  </label>
                  <input
                    type="text"
                    name="footerText"
                    value={settings.footerText}
                    onChange={handleSettingsChange}
                    placeholder="© {year} IC Assessoria – Vigilância e Análise de Dados em Saúde. Todos os direitos reservados."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Utilize &#123;year&#125; para exibir automaticamente o ano atual.
                  </span>
                </div>
              </div>

              {/* SEO & Metatags */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
                <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                  <FiGlobe className="text-orange-400" />
                  <span>2. Otimização para Buscas (SEO & Google)</span>
                </h2>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Título da Página (SEO Title)
                  </label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={settings.seoTitle}
                    onChange={handleSettingsChange}
                    placeholder="IC Assessoria – Vigilância e Análise de Dados em Saúde | Antônio Cândido"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Descrição para Mecanismos de Busca (Meta Description)
                  </label>
                  <textarea
                    name="seoDescription"
                    rows={3}
                    value={settings.seoDescription}
                    onChange={handleSettingsChange}
                    placeholder="Fortalecimento da gestão em saúde por meio da qualificação, organização, monitoramento e análise de informações estratégicas..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Palavras-chave (Keywords separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    name="seoKeywords"
                    value={settings.seoKeywords}
                    onChange={handleSettingsChange}
                    placeholder="IC Assessoria, Vigilância em Saúde, Análise de Dados em Saúde..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {savingSettings ? (
                    <>
                      <FiRefreshCw className="animate-spin" size={16} />
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <FiSave size={16} />
                      <span>Salvar Configurações Gerais</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Alteração de Senha do Administrador */}
            <form onSubmit={handleChangePassword} className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] space-y-5">
              <h2 className="text-base font-bold text-white border-b border-white/[0.06] pb-3 flex items-center gap-2">
                <FiLock className="text-orange-400" />
                <span>3. Alterar Senha do Administrador</span>
              </h2>

              <p className="text-xs text-slate-400">
                Você pode atualizar sua senha de acesso a qualquer momento. A nova senha será criptografada com algoritmo seguro bcrypt.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Mínimo 6 dígitos"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-1.5">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Repita a nova senha"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold border border-white/10 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {savingPassword ? (
                    <>
                      <FiRefreshCw className="animate-spin" size={14} />
                      <span>Atualizando...</span>
                    </>
                  ) : (
                    <>
                      <FiShield size={14} className="text-orange-400" />
                      <span>Atualizar Senha</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </AdminGuard>
  )
}
