'use client'

import { FiShield, FiTrendingUp, FiTarget, FiUserCheck, FiLayers } from 'react-icons/fi'
import SectionTitle from '@/app/components/section-title'
import Reveal from '@/app/components/reveal'
import Logo from '@/app/components/brand/logo'
import { IC_ASSESSORIA_INFO } from '@/app/data/ic-assessoria'

export interface AboutSectionProps {
  initialData?: {
    title?: string
    subtitle?: string
    paragraph1?: string
    paragraph2?: string
    paragraph3?: string
    mission?: string | null
    vision?: string | null
    values?: string | null
    responsibleName?: string
    responsibleRole?: string
    responsibleBio?: string
    responsiblePhotoUrl?: string | null
    institutionalImageUrl?: string | null
  }
}

export default function AboutSection({ initialData }: AboutSectionProps = {}) {
  const { about, brand } = IC_ASSESSORIA_INFO

  const p1 = initialData?.paragraph1 || about.p1
  const p2 = initialData?.paragraph2 || about.p2
  const p3 = initialData?.paragraph3 || about.p3
  const responsibleName = initialData?.responsibleName || brand.responsible
  const responsibleRole = initialData?.responsibleRole || about.responsibleCard.role
  const responsibleBio = initialData?.responsibleBio || about.responsibleCard.bio
  const responsiblePhotoUrl = initialData?.responsiblePhotoUrl || null
  const institutionalImageUrl = initialData?.institutionalImageUrl || null

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
              title={
                initialData?.title
                  ? initialData.title
                  : 'Transformando dados em decisões assertivas para a saúde pública e privada.'
              }
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="p-4 rounded-2xl bg-orange-950/20 border-l-2 border-orange-500 text-slate-200">
                {p1}
              </p>

              <p>{p2}</p>

              <p className="text-slate-400">{p3}</p>
            </div>
          </Reveal>

          {/* Three Operational Pillars */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/[0.08] hover:border-orange-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2.5">
                  <FiShield size={16} />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">Qualificação</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tratamento e consistência de dados para assegurar integridade e precisão das bases de saúde.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/[0.08] hover:border-orange-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2.5">
                  <FiTrendingUp size={16} />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">Inteligência</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Identificação oportuna de tendências epidemiológicas e áreas prioritárias de intervenção.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/[0.08] hover:border-orange-500/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2.5">
                  <FiTarget size={16} />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">Evidências</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Subsídios técnicos fundamentados para gestão estratégica e alocação eficiente de recursos.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Institutional Image Banner if provided */}
          {institutionalImageUrl && (
            <Reveal delay={0.18}>
              <div className="mt-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative aspect-[21/9] sm:aspect-[2.4/1] bg-slate-950/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={institutionalImageUrl}
                  alt="Imagem Institucional IC Assessoria"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          )}
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

              <div className="flex items-center gap-3.5 mb-6">
                {responsiblePhotoUrl ? (
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.25)] shrink-0 bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={responsiblePhotoUrl}
                      alt={responsibleName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Logo size="md" layout="mark-only" />
                )}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400 bg-orange-950/40 border border-orange-500/30 px-2.5 py-0.5 rounded-full">
                    Responsabilidade Técnica
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {responsibleName}
                  </h3>
                  {responsibleRole && (
                    <p className="text-xs text-slate-400 mt-0.5">{responsibleRole}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3 text-slate-300 text-sm leading-relaxed mb-6">
                <p>
                  À frente da <strong className="text-white">IC Assessoria</strong>, {responsibleName} atua diretamente no apoio técnico a instituições, gestores e equipes na área da saúde.
                </p>
                <p className="text-slate-400">{responsibleBio}</p>
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
