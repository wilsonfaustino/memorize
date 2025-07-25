import { cn } from '@/lib/utils'
import { SparklesIcon } from './icons/sparkles'

const CARD_STYLES = {
  base: 'backface-hidden absolute inset-0 flex items-center justify-center rounded-xl border-2',
  front: '-rotate-y-180 border-purple-200 bg-white',
  back: 'border-white/20 bg-pink hover:scale-105 transition-transform duration-200',
}

interface CardProps {
  emoji: string
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
}

export function Card({ emoji, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <button
      className="relative size-16 cursor-pointer"
      onClick={onClick}
      type="button">
      <div
        className={cn(
          'transform-3d h-full w-full transition-transform duration-500',
          (isFlipped || isMatched) && 'rotate-y-180',
        )}>
        <div className={cn(CARD_STYLES.base, CARD_STYLES.back)}>
          <SparklesIcon className="animate-pulse text-white" />
        </div>
        <div className={cn(CARD_STYLES.base, CARD_STYLES.front)}>
          <span className="text-3xl">{emoji}</span>
        </div>
      </div>
    </button>
  )
}
