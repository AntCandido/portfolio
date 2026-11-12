'use client'

import { useForm } from 'react-hook-form'
import { HiArrowNarrowRight } from 'react-icons/hi'
import {
  FiMail,
  FiMessageSquare,
  FiLinkedin,
  FiSend,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SectionTitle from '../section-title'
import Button from '../button'
import axios from 'axios'
import toast from 'react-hot-toast'
import Reveal from '../reveal'
import { IC_ASSESSORIA_INFO } from '@/app/data/ic-assessoria'

const contactFormSchema = z.object({
  name: z.string().min(3, 'Por favor, informe seu nome completo').max(100),
  email: z.string().email('Por favor, informe um e-mail válido'),
  subject: z.string().optional(),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres').max(800),
})

type ContactFormData = z.infer<typeof contactFormSchema>

const fieldClassName =
  'w-full bg-slate-900/70 border border-white/10 rounded-xl placeholder:text-slate-500 text-slate-100 p-4 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 backdrop-blur-md transition-all'

export default function ContactForm() {
  const { contact } = IC_ASSESSORIA_INFO

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post('/api/contact', data)
      toast.success('Mensagem enviada com sucesso! Responderemos em breve.')
      reset()
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente ou use os canais diretos.')
    }
  }

  return (
    <section
      id="contato"
      className="relative py-24 px-4 sm:px-6 flex items-center justify-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.12),transparent_65%)]"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Contact Channels & Context */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal>
              <SectionTitle
                subtitle={contact.subtitle}
                title={contact.title}
              />
              <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
                {contact.description}
              </p>
            </Reveal>

            {/* Direct Channels Cards */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3.5 mt-2">
                {/* WhatsApp Channel */}
                <a
                  href={contact.channels[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-orange-500/40 hover:bg-slate-900/90 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-all">
                      <FiMessageSquare size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                        {contact.channels[0].label}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {contact.channels[0].note}
                      </p>
                    </div>
                  </div>
                  <HiArrowNarrowRight className="text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" size={18} />
                </a>

                {/* Email Channel */}
                <a
                  href={contact.channels[1].href}
                  className="group p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-orange-500/40 hover:bg-slate-900/90 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-all">
                      <FiMail size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                        {contact.channels[1].label}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {contact.channels[1].note}
                      </p>
                    </div>
                  </div>
                  <HiArrowNarrowRight className="text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" size={18} />
                </a>

                {/* LinkedIn Channel */}
                <a
                  href={contact.channels[2].href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-4 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-orange-500/40 hover:bg-slate-900/90 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-all">
                      <FiLinkedin size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-orange-300 transition-colors">
                        {contact.channels[2].label}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {contact.channels[2].note}
                      </p>
                    </div>
                  </div>
                  <HiArrowNarrowRight className="text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" size={18} />
                </a>
              </div>
            </Reveal>

            {/* Response Time Notice */}
            <div className="p-4 rounded-2xl bg-orange-950/25 border border-orange-500/20 flex items-center gap-3">
              <FiClock className="text-orange-400 shrink-0" size={18} />
              <p className="text-xs text-slate-300 leading-relaxed">
                Todas as solicitações institucionais são avaliadas com sigilo técnico e retorno ágil.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-photo">
                <h3 className="text-lg font-bold text-white mb-1">
                  Envie uma mensagem direta
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  Preencha o formulário abaixo para solicitar propostas, agendar reuniões ou tirar dúvidas técnicas.
                </p>

                <form
                  className="w-full flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Nome completo *
                    </label>
                    <input
                      placeholder="Seu nome ou do responsável"
                      className={`${fieldClassName} h-12`}
                      {...register('name')}
                    />
                    {errors.name && (
                      <span className="text-xs text-rose-400 mt-1 block">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        E-mail para retorno *
                      </label>
                      <input
                        placeholder="seuemail@instituicao.com"
                        type="email"
                        className={`${fieldClassName} h-12`}
                        {...register('email')}
                      />
                      {errors.email && (
                        <span className="text-xs text-rose-400 mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Instituição / Secretaria / Assunto
                      </label>
                      <input
                        placeholder="Ex: Secretaria de Saúde, Clínica, Hospital..."
                        className={`${fieldClassName} h-12`}
                        {...register('subject')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Como podemos apoiar sua instituição? *
                    </label>
                    <textarea
                      placeholder="Descreva brevemente sua necessidade, objetivos com vigilância, qualificação de bases ou indicadores de saúde..."
                      className={`${fieldClassName} resize-none h-32`}
                      {...register('message')}
                      maxLength={800}
                    />
                    {errors.message && (
                      <span className="text-xs text-rose-400 mt-1 block">
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <FiCheckCircle className="text-orange-400" size={13} />
                      Atendimento técnico personalizado
                    </p>

                    <Button
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      <FiSend size={15} />
                      <span>{isSubmitting ? 'Enviando mensagem...' : 'Enviar Mensagem'}</span>
                    </Button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
