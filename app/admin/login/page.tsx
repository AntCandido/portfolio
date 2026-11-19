'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/app/components/brand/logo'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Informe o e-mail e a senha.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Credenciais inválidas.')
        setLoading(false)
        return
      }

      toast.success('Login realizado com sucesso!')
      router.push('/admin')
      router.refresh()
    } catch {
      toast.error('Erro de conexão com o servidor. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#07080c]">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-orange-600/15 blur-[140px] rounded-full"
      />

      <div className="w-full max-w-md relative z-10">
        {/* Top Header Card */}
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="text-center flex flex-col items-center">
            <Logo size="md" layout="mark-only" className="mb-4" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Painel Administrativo
            </h1>
            <p className="text-xs text-slate-400 mt-1.5">
              IC Assessoria – Vigilância e Análise de Dados em Saúde
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* E-mail Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                E-mail do Administrador
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiMail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@icassessoria.com.br"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider font-mono">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiLock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Acessando...
                </>
              ) : (
                <>
                  <span>Entrar no Painel</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-white/[0.08] flex items-start gap-2.5 text-[11px] text-slate-400">
            <FiShield size={14} className="text-orange-400 shrink-0 mt-0.5" />
            <span>
              Área de acesso restrito. As credenciais do primeiro administrador são configuradas com segurança pelo arquivo de variáveis de ambiente do projeto.
            </span>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-4">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-orange-400 transition-colors"
          >
            ← Voltar para o site público
          </a>
        </div>
      </div>
    </div>
  )
}
