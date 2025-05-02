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
