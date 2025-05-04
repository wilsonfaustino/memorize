import * as RadioGroup from '@radix-ui/react-radio-group'
import { motion } from 'motion/react'
import { Difficulty } from '@/@types'
import { ANIMATIONS, EASY, HARD, MEDIUM } from '@/const'
import { cn } from '@/lib/utils'
import { ActivityIcon } from './icons/activity'
import { RocketIcon } from './icons/rocket'
import { SparklesIcon } from './icons/sparkles'

const DIFFICULTY_OPTIONS = [
  { label: 'Easy', value: EASY, icon: SparklesIcon, color: 'from-green-500 to-green-700' },
  { label: 'Medium', value: MEDIUM, icon: RocketIcon, color: 'from-indigo-500 to-indigo-700' },
  { label: 'Hard', value: HARD, icon: ActivityIcon, color: 'from-purple-500 to-purple-700' },
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
              className={cn(
                'h-20 w-full rounded-xl border border-transparent bg-gradient-to-b sm:size-32',
                'transition-transform duration-200 hover:scale-105',
                color,
              )}
              type="button">
              <div className="flex items-center justify-center gap-2 sm:flex-col">
                <Icon />
                <span className="font-medium text-base sm:text-lg">{label}</span>
              </div>
            </button>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </motion.div>
  )
}
