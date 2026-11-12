'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSend, FiArrowUpRight } from 'react-icons/fi'
import Logo from '@/app/components/brand/logo'

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Dados na Saúde', href: '#importancia-dados' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Contato', href: '#contato' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#07080c]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#inicio" aria-label="IC Assessoria - Início">
          <Logo size="sm" showTagline={false} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-white/[0.07] backdrop-blur-md rounded-full px-4 py-1.5 shadow-inner">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1 text-sm font-medium text-slate-300 hover:text-orange-400 rounded-full transition-all duration-200 hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Status */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-orange-300 bg-orange-950/40 border border-orange-500/30 px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span>Assessoria Especializada</span>
          </div>

          <a
            href="#contato"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.35)] hover:shadow-[0_0_25px_rgba(251,146,60,0.5)] hover:-translate-y-0.5"
          >
            <span>Fale Conosco</span>
            <FiSend size={13} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
          className="lg:hidden p-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-white/[0.08] bg-[#07080c]/98 backdrop-blur-xl px-6 py-5 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-orange-300 bg-orange-950/40 border border-orange-500/30 px-3 py-1.5 rounded-full w-max mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                <span>Assessoria Especializada em Saúde</span>
              </div>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-slate-300 hover:text-orange-400 py-2 border-b border-white/[0.04]"
                >
                  <span>{link.label}</span>
                  <FiArrowUpRight className="text-slate-500" size={16} />
                </a>
              ))}

              <a
                href="#contato"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)]"
              >
                <span>Fale Conosco</span>
                <FiSend size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
