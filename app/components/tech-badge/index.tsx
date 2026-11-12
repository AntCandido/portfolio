import { cn } from '@/app/utils/cn'

type TechBadgeProps = {
  name: string
  className?: string
  size?: 'sm' | 'md'
}

function TechBadge({ name, className, size = 'sm' }: TechBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-300',
        'text-orange-200 bg-orange-950/30 border border-orange-500/25 backdrop-blur-sm',
        'hover:border-orange-400 hover:bg-orange-900/30 hover:text-white hover:shadow-[0_0_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5',
        size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3.5 py-1.5',
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.9)]" />
      <span>{name}</span>
    </span>
  )
}

export default TechBadge
