import type { MemoryCard } from '@/@types'

export function pickAndShuffleEmojis(emojis: string[], count: number): string[] {
  if (count > emojis.length) {
    throw new Error('Quantidade de pares excede o número de emojis disponíveis.')
  }

  const shuffled = [...emojis].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, count)
  const duplicated = [...selected, ...selected]
  return duplicated.sort(() => Math.random() - 0.5)
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function createCardObjects(emojis: string[]): MemoryCard[] {
  return emojis.map((emoji) => ({
    id: generateId(),
    emoji,
    isFlipped: false,
    isMatched: false,
  }))
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}
