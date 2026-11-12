import { cn } from '@/app/utils/cn'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-semibold shadow-[0_0_24px_rgba(249,115,22,0.4)] hover:shadow-[0_0_32px_rgba(251,146,60,0.6)] border border-orange-400/30',
    secondary:
      'bg-slate-900/80 hover:bg-slate-800 text-slate-100 border border-white/10 hover:border-orange-500/40 backdrop-blur-md shadow-sm hover:shadow-[0_0_18px_rgba(249,115,22,0.2)]',
    outline:
      'bg-transparent hover:bg-orange-950/40 text-orange-300 border border-orange-500/50 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(251,146,60,0.25)]',
  }

  const sizeStyles = {
    sm: 'py-2 px-3.5 text-xs rounded-xl gap-1.5',
    md: 'py-2.5 px-5 text-sm font-medium rounded-xl gap-2',
    lg: 'py-3.5 px-6 text-sm sm:text-base font-semibold rounded-xl gap-2.5',
  }

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden',
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
