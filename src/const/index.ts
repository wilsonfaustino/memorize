export const EMOJIS = [
  '🦁',
  '🐵',
  '🐸',
  '🐧',
  '🐶',
  '🐱',
  '🐢',
  '🐙',
  '🍎',
  '🍌',
  '🍇',
  '🍉',
  '🍩',
  '🍕',
  '🍔',
  '🍭',
  '🚗',
  '🚕',
  '🚌',
  '🚲',
  '🚀',
  '✈️',
  '🚁',
  '🛴',
  '⚽',
  '🧩',
  '🖍️',
  '🎈',
  '🎲',
  '🎸',
  '🎯',
  '🛷',
  '😀',
  '😎',
  '😱',
  '🥳',
  '😍',
  '🤯',
  '😡',
  '🫶',
]

export const ANIMATIONS = {
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  },
} as const

export const EASY = 'easy'
export const MEDIUM = 'medium'
export const HARD = 'hard'

export const PairCount = {
  [EASY]: 6,
  [MEDIUM]: 10,
  [HARD]: 15,
} as const

export type Difficulty = keyof typeof PairCount
