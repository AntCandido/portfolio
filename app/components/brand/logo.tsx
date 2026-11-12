import { cn } from '@/app/utils/cn'

type LogoProps = {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  layout?: 'horizontal' | 'vertical' | 'mark-only'
}

export default function Logo({
  className,
  size = 'md',
  showTagline = true,
  layout = 'horizontal',
}: LogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
  }

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  }

  const isVertical = layout === 'vertical'
  const isMarkOnly = layout === 'mark-only'

  return (
    <div
      className={cn(
        'group flex items-center transition-all duration-300',
        isVertical ? 'flex-col text-center gap-3' : 'gap-3',
        className,
      )}
    >
      {/* Icon / Emblem */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent border border-orange-500/40 group-hover:border-orange-400 group-hover:shadow-[0_0_24px_rgba(249,115,22,0.4)] transition-all duration-300 shrink-0 overflow-hidden',
          iconSizes[size],
        )}
      >
        {/* Geometric Health / Data grid subtle glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.35),transparent_70%)]"
        />

        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/4 h-3/4 relative z-10"
        >
          {/* Health Cross & Analytical Hex Nodes */}
          <path
            d="M18 4L28.3923 10V22L18 28L7.6077 22V10L18 4Z"
            stroke="rgba(249,115,22,0.5)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Central IC Graphic */}
          <path
            d="M13 13V23"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M23 14C21.5 13 18.5 13.5 18.5 18C18.5 22.5 21.5 23 23 22"
            stroke="#f97316"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Small analytics pulse dot */}
          <circle cx="25" cy="11" r="2" fill="#fb923c" />
        </svg>
      </div>

      {!isMarkOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={cn(
                'font-bold tracking-tight text-white group-hover:text-white transition-colors',
                titleSizes[size],
              )}
            >
              IC <span className="text-orange-500 font-extrabold">Assessoria</span>
            </span>
          </div>

          {showTagline && (
            <span
              className={cn(
                'font-medium text-slate-400 tracking-normal mt-1 leading-tight',
                taglineSizes[size],
              )}
            >
              Vigilância e Análise de Dados em Saúde
            </span>
          )}
        </div>
      )}
    </div>
  )
}
