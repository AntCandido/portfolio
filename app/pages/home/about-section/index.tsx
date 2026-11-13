'use client'

import { FiShield, FiTrendingUp, FiTarget, FiUserCheck, FiLayers } from 'react-icons/fi'
import SectionTitle from '@/app/components/section-title'
import Reveal from '@/app/components/reveal'
import Logo from '@/app/components/brand/logo'
import { IC_ASSESSORIA_INFO } from '@/app/data/ic-assessoria'

export default function AboutSection() {
  const { about, brand } = IC_ASSESSORIA_INFO

  return (
    <section id="sobre" className="container py-24 relative">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-orange-600/10 blur-[130px] rounded-full"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left Column: Institutional Text & Mission */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Reveal>
            <SectionTitle
              subtitle="Institucional"
              title="Transformando dados em decisões assertivas para a saúde pública e privada."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="p-4 rounded-2xl bg-orange-950/20 border-l-2 border-orange-500 text-slate-200">
                {about.p1}
              </p>

              <p>
                {about.p2}
              </p>

              <p className="text-slate-400">
                {about.p3}
              </p>
            </div>
          </Reveal>

          {/* Three Operational Pillars */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/[0.08] hover:border-orange-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2.5">
                  <FiShield size={16} />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  Qualificação
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tratamento e consistência de dados para assegurar integridade e precisão das bases de saúde.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/[0.08] hover:border-orange-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2.5">
                  <FiTrendingUp size={16} />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  Inteligência
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Identificação oportuna de tendências epidemiológicas e áreas prioritárias de intervenção.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/[0.08] hover:border-orange-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2.5">
                  <FiTarget size={16} />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  Evidências
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Subsídios técnicos fundamentados para gestão estratégica e alocação eficiente de recursos.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Professional Profile Card of Antônio Cândido */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Reveal delay={0.2}>
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] via-slate-900/90 to-[#07080c] border border-white/10 backdrop-blur-xl shadow-photo overflow-hidden">
              {/* Subtle top-right decorative graphic */}
              <div
                aria-hidden="true"
                className="absolute -top-12 -right-12 w-36 h-36 bg-orange-500/15 rounded-full blur-2xl pointer-events-none"
              />

              <div className="flex items-center gap-3 mb-6">
                <Logo size="md" layout="mark-only" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400 bg-orange-950/40 border border-orange-500/30 px-2.5 py-0.5 rounded-full">
                    Responsabilidade Técnica
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {brand.responsible}
                  </h3>
                </div>
              </div>

              <div className="space-y-3 text-slate-300 text-sm leading-relaxed mb-6">
                <p>
                  À frente da <strong className="text-white">IC Assessoria</strong>, Antônio Cândido atua diretamente no apoio técnico a instituições, gestores e equipes na área da saúde.
                </p>
                <p className="text-slate-400">
                  Sua atuação é concentrada na vigilância em saúde, monitoramento e análise de indicadores, qualificação do uso dos sistemas de informação e elaboração de subsídios técnicos estratégicos para a tomada de decisões.
                </p>
              </div>

              {/* Competency Badges */}
              <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <FiUserCheck className="text-orange-400 shrink-0" size={15} />
                  <span>Apoio consultivo personalizado a equipes de saúde</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <FiLayers className="text-orange-400 shrink-0" size={15} />
                  <span>Organização e integração de sistemas e prontuários</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <FiTarget className="text-orange-400 shrink-0" size={15} />
                  <span>Orientação técnica com foco em impacto e resolutividade</span>
                </div>
              </div>

              {/* Bottom Quote Pill */}
              <div className="mt-6 p-4 rounded-2xl bg-orange-950/30 border border-orange-500/20 text-xs text-orange-200/90 italic leading-relaxed">
                &ldquo;Transformar números em inteligência aplicada à saúde para que cada decisão proteja e fortaleça vidas.&rdquo;
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
