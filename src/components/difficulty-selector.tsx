import * as RadioGroup from '@radix-ui/react-radio-group'
import { Brain, Sparkles, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { Difficulty } from '@/@types'
import { ANIMATIONS, EASY, HARD, MEDIUM } from '@/const'
import { cn } from '@/lib/utils'

const DIFFICULTY_OPTIONS = [
  { label: 'Easy', value: EASY, icon: Sparkles, color: 'from-green-500 to-green-700' },
  { label: 'Medium', value: MEDIUM, icon: Brain, color: 'from-indigo-500 to-indigo-700' },
  { label: 'Hard', value: HARD, icon: Zap, color: 'from-purple-500 to-purple-700' },
]

interface DifficultSelectorProps {
  onChange: (value: Difficulty) => void
}

export function DifficultySelector({ onChange }: DifficultSelectorProps) {
  return (
    <motion.div
      className="flex w-full flex-col gap-8 px-4"
      {...ANIMATIONS.fadeInUp}>
      <h2 className="text-center font-bold text-2xl text-white sm:text-3xl">Select Difficulty</h2>
      <RadioGroup.Root
        className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 "
        onValueChange={onChange}>
        {DIFFICULTY_OPTIONS.map(({ label, value, icon: Icon, color }) => (
          <RadioGroup.Item
            asChild
            key={value}
            value={value}>
            <button
              className={cn('h-20 w-full rounded-xl bg-gradient-to-b sm:size-32', color)}
              type="button">
              <div className="flex items-center justify-center gap-2 sm:flex-col">
                <Icon className="size-6 sm:size-8" />
                <span className="font-medium text-base sm:text-lg">{label}</span>
              </div>
            </button>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </motion.div>
  )
}
