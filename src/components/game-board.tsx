import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Difficulty } from '@/@types'
import { ANIMATIONS } from '@/const'
import { cn } from '@/lib/utils'

const GRID_CONFIG = {
  easy: '',
  medium: 'sm:grid-cols-5',
  hard: 'sm:grid-cols-5 md:grid-cols-6',
}

interface GameBoardProps {
  children?: ReactNode
  difficulty: Difficulty
}

export function GameBoard({ children, difficulty }: GameBoardProps) {
  return (
    <motion.div
      className={cn('grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2', GRID_CONFIG[difficulty])}
      {...ANIMATIONS.fadeInUp}>
      {children}
    </motion.div>
  )
}
