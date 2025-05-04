import { Clock, LucideIcon, MousePointerClick, RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { ANIMATIONS } from '@/const'
import { cn } from '@/lib/utils'

interface ScoreBoardProps {
  moves: number
  time: string
  onRestart: () => void
}

interface ScoreItemProps {
  icon: LucideIcon
  label: string
  value: string | number
  color: string
}

type GetValueProps = Pick<ScoreBoardProps, 'moves' | 'time'>

const SCORE_ITEMS = [
  {
    icon: MousePointerClick,
    label: 'Moves',
    color: 'text-yellow-400',
    getValue: (props: GetValueProps) => props.moves,
  },
  {
    icon: Clock,
    label: 'Time',
    color: 'text-blue-400',
    getValue: (props: GetValueProps) => props.time,
  },
] as const

const ScoreItem = ({ icon: Icon, label, value, color }: ScoreItemProps) => (
  <div className="flex w-[130px] items-center justify-center gap-2 text-lg">
    <Icon className={cn('h-5 w-5', color)} />
    {label}:<span className="min-w-[16px]">{value}</span>
  </div>
)

export function ScoreBoard({ moves, time, onRestart }: ScoreBoardProps) {
  return (
    <motion.div
      className="flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-blue-100 p-4 *:text-white sm:w-auto sm:flex-row"
      {...ANIMATIONS.fadeInDown}>
      {SCORE_ITEMS.map(({ icon, label, color, getValue }) => (
        <ScoreItem
          color={color}
          icon={icon}
          key={label}
          label={label}
          value={getValue({ moves, time })}
        />
      ))}

      <button
        className="group flex items-center gap-2 px-2 text-base hover:text-pink"
        onClick={onRestart}
        type="button">
        <RotateCcw className="group-hover:-rotate-45 h-4 w-4 transition-transform duration-500" />
        Restart
      </button>
    </motion.div>
  )
}
