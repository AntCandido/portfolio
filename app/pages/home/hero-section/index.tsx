'use client'

import { HiArrowNarrowRight } from 'react-icons/hi'
import {
  FiActivity,
  FiTrendingUp,
  FiDatabase,
  FiShield,
  FiCheckCircle,
  FiFileText,
} from 'react-icons/fi'
import Button from '@/app/components/button'
import Reveal from '@/app/components/reveal'
import Logo from '@/app/components/brand/logo'
import { IC_ASSESSORIA_INFO } from '@/app/data/ic-assessoria'

export default function HeroSection() {
  const { hero, brand } = IC_ASSESSORIA_INFO

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 lg:py-28 overflow-hidden"
    >
      {/* Ambient Orange & Warm Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[380px] bg-orange-600/15 blur-[140px] rounded-full"
      />

      <div className="container relative z-10 flex items-center justify-between flex-col lg:flex-row gap-12 lg:gap-14">
        {/* Left Column: Presentation, Title, Value Prop, CTAs */}
        <Reveal className="w-full lg:max-w-[620px]">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-950/40 border border-orange-500/35 backdrop-blur-md mb-6 shadow-[0_0_18px_rgba(249,115,22,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className="font-mono text-xs font-semibold text-orange-300">
              {hero.badge}
            </span>
          </div>

          <div className="mb-4">
            <Logo size="md" showTagline={false} className="mb-3" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
            Inteligência em saúde para decisões mais{' '}
            <span className="text-gradient-orange">estratégicas.</span>
          </h1>

          <p className="text-slate-300 my-6 text-base sm:text-lg leading-relaxed max-w-xl">
            {hero.subtitle}
          </p>

          {/* Quick Pillars Highlights */}
          <div className="grid grid-cols-3 gap-3 py-4 my-6 border-y border-white/[0.08] max-w-lg">
            {hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col ${
                  i !== 0 ? 'border-l border-white/[0.08] pl-3.5 sm:pl-4' : ''
                }`}
              >
                <span className="font-bold text-white text-base sm:text-lg flex items-center gap-1">
                  {stat.value}
                </span>
                <span className="text-xs text-orange-400/90 font-medium mt-0.5">
                  {stat.label}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                  {stat.highlight}
                </span>
              </div>
            ))}
          </div>

          {/* Area Badges */}
          <div className="flex flex-wrap gap-2 max-w-lg mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300">
              <FiActivity className="text-orange-400" size={13} />
              Vigilância em Saúde
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300">
              <FiTrendingUp className="text-orange-400" size={13} />
              Monitoramento de Indicadores
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300">
              <FiDatabase className="text-orange-400" size={13} />
              Qualificação de Dados
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a href="#contato">
              <Button size="lg" className="w-full sm:w-auto">
                <span>Fale com a Assessoria</span>
                <HiArrowNarrowRight size={18} />
              </Button>
            </a>

            <a href="#servicos">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <FiFileText size={16} className="text-orange-400" />
                <span>Conhecer Serviços</span>
              </Button>
            </a>
          </div>
        </Reveal>

        {/* Right Column: High-End Health Intelligence Visual Card */}
        <Reveal delay={0.15} className="relative w-full lg:w-auto shrink-0 flex items-center justify-center">
          {/* Ambient Glow behind card */}
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-orange-600/25 via-amber-500/15 to-transparent blur-3xl opacity-75"
          />

          {/* Visual Showcase Card: Health Analytics & Surveillance Monitor */}
          <div className="relative w-full max-w-[440px] p-6 rounded-3xl bg-gradient-to-b from-white/[0.08] via-slate-900/80 to-[#07080c] border border-white/10 backdrop-blur-xl shadow-photo">
            {/* Header of showcase card */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <FiActivity size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Painel Situacional de Saúde
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Monitoramento Estratégico Contínuo
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Ativo
              </span>
            </div>

            {/* Illustrative Trend Wave / Epidemiological Curve */}
            <div className="my-5 p-4 rounded-2xl bg-slate-950/60 border border-white/[0.06]">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <FiTrendingUp className="text-orange-400" />
                  Evolução de Indicadores Prioritários
                </span>
                <span className="text-[11px] font-mono text-orange-400 bg-orange-950/50 px-2 py-0.5 rounded border border-orange-500/30">
                  Tendência Positiva
                </span>
              </div>

              {/* SVG Health Indicator Curve Graphic */}
              <div className="h-28 w-full relative">
                <svg
                  viewBox="0 0 320 100"
                  className="w-full h-full overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#ea580c" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="320" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />

                  {/* Shaded Area under curve */}
                  <path
                    d="M 10,75 Q 60,80 110,50 T 210,35 T 310,15 L 310,95 L 10,95 Z"
                    fill="url(#areaGradient)"
                  />

                  {/* Main Trend Line */}
                  <path
                    d="M 10,75 Q 60,80 110,50 T 210,35 T 310,15"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Metric Anchor Points */}
                  <circle cx="110" cy="50" r="4" fill="#07080c" stroke="#f97316" strokeWidth="2" />
                  <circle cx="210" cy="35" r="4" fill="#07080c" stroke="#fb923c" strokeWidth="2" />
                  <circle cx="310" cy="15" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-white/[0.04]">
                <span>Diagnóstico Inicial</span>
                <span>Qualificação de Registros</span>
                <span className="text-orange-400 font-semibold">Meta Atingida</span>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <FiShield className="text-orange-400" size={13} />
                  <span>Consistência</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">100%</div>
                <div className="text-[10px] text-slate-400">Bases auditadas</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <FiCheckCircle className="text-orange-400" size={13} />
                  <span>Evidências</span>
                </div>
                <div className="text-lg font-bold text-white font-mono">Decisão Segura</div>
                <div className="text-[10px] text-slate-400">Subsídios técnicos</div>
              </div>
            </div>

            {/* Bottom Signature Badge */}
            <div className="p-3.5 rounded-2xl bg-orange-950/30 border border-orange-500/25 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  {brand.responsible}
                </p>
                <p className="text-[11px] text-orange-400/90 font-medium">
                  {brand.name} – Vigilância & Dados
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                Saúde Pública & Privada
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
