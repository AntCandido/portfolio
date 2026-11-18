'use client'

import {
  FiCompass,
  FiBarChart2,
  FiCalendar,
  FiAward,
  FiCheckCircle,
  FiCpu,
  FiArrowRight,
  FiDatabase,
  FiFilter,
  FiPieChart,
  FiShield,
} from 'react-icons/fi'
import SectionTitle from '@/app/components/section-title'
import Reveal from '@/app/components/reveal'
import { IC_ASSESSORIA_INFO } from '@/app/data/ic-assessoria'

const ICON_MAP: Record<string, React.ReactNode> = {
  FiCompass: <FiCompass size={20} />,
  FiBarChart2: <FiBarChart2 size={20} />,
  FiCalendar: <FiCalendar size={20} />,
  FiAward: <FiAward size={20} />,
  FiCheckCircle: <FiCheckCircle size={20} />,
  FiCpu: <FiCpu size={20} />,
}

export default function DataImportanceSection() {
  const { dataImportance } = IC_ASSESSORIA_INFO

  return (
    <section id="importancia-dados" className="container py-24 relative">
      {/* Top Section Header */}
      <div className="max-w-3xl mb-14">
        <Reveal>
          <SectionTitle
            subtitle={dataImportance.subtitle}
            title={dataImportance.title}
          />
          <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
            {dataImportance.intro}
          </p>
        </Reveal>
      </div>

      {/* Illustrative Pipeline: O Ciclo Estratégico da Informação em Saúde */}
      <Reveal delay={0.1} className="mb-14">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-950/25 via-slate-900/80 to-[#07080c] border border-orange-500/20 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400">
                Modelo Conceitual
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                O Ciclo da Inteligência de Dados em Saúde
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Como dados brutos evoluem para intervenções seguras e qualificadas através da assessoria técnica especializada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <FiDatabase size={15} />
                </div>
                <span className="font-mono text-xs text-slate-500">Etapa 1</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Registros & Sistemas
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Coleta inicial em prontuários e sistemas oficiais com mapeamento dos fluxos de dados.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <FiFilter size={15} />
                </div>
                <span className="font-mono text-xs text-slate-500">Etapa 2</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Qualificação & Consistência
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Higienização, consistência e eliminação de duplicidades para assegurar integridade.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <FiPieChart size={15} />
                </div>
                <span className="font-mono text-xs text-slate-500">Etapa 3</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Análise Estratégica
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interpretação epidemiológica e cálculo de indicadores para diagnóstico situacional.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/40 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-400/50 flex items-center justify-center text-orange-300">
                  <FiShield size={15} />
                </div>
                <span className="font-mono text-xs text-orange-300 font-bold">Resultado</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Decisão Fundamentada
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Subsídios técnicos para planejamento assertivo, intervenção oportuna e metas atingidas.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 6 Core Contribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataImportance.items.map((item, index) => (
          <Reveal key={item.id} delay={Math.min(index * 0.08, 0.35)}>
            <div className="group h-full p-6 rounded-3xl bg-slate-900/50 border border-white/[0.08] hover:border-orange-500/35 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 group-hover:scale-105 group-hover:border-orange-400 transition-all">
                    {ICON_MAP[item.iconName] || <FiBarChart2 size={20} />}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    Contribuição 0{index + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-semibold text-orange-400">
                  {item.impact}
                </span>
                <FiArrowRight className="text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" size={14} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
