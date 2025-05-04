import { describe, expect, it } from 'vitest'

import { EMOJIS } from '@/const'
import {
  createCardObjects,
  formatTime,
  generateId,
  pickAndShuffleEmojis,
  setupEmojiArray,
  shuffleArray,
} from '@/helpers'

// Utils
const isShuffled = <T>(arr: T[], original: T[]) => {
  return JSON.stringify(arr) !== JSON.stringify(original)
}

describe('helpers', () => {
  it('formatTime - should format seconds into mm:ss', () => {
    expect(formatTime(0)).toBe('00:00')
    expect(formatTime(5)).toBe('00:05')
    expect(formatTime(65)).toBe('01:05')
    expect(formatTime(600)).toBe('10:00')
  })

  it('shuffleArray - should shuffle array elements', () => {
    const original = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray([...original])
    expect(shuffled).toHaveLength(original.length)
    expect(isShuffled(shuffled, original)).toBe(true)
  })

  it('generateId - should return a string of at least 6 chars', () => {
    const id = generateId()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThanOrEqual(6)
  })

  it('pickAndShuffleEmojis - should return a shuffled array of duplicated emojis', () => {
    const count = 4
    const result = pickAndShuffleEmojis(EMOJIS, count)
    expect(result).toHaveLength(count * 2)
    const unique = new Set(result)
    expect(unique.size).toBe(count)
  })

  it('createCardObjects - should create MemoryCard objects with proper fields', () => {
    const emojis = ['🦊', '🐸', '🦊', '🐸']
    const cards = createCardObjects(emojis)
    expect(cards).toHaveLength(4)
    cards.forEach((card) => {
      expect(card).toHaveProperty('id')
      expect(card).toHaveProperty('emoji')
      expect(card).toHaveProperty('isFlipped', false)
      expect(card).toHaveProperty('isMatched', false)
    })
  })

  it('setupEmojiArray - should generate valid MemoryCard array from difficulty', () => {
    const cards = setupEmojiArray('easy')
    expect(cards.length).toBeGreaterThan(0)
    expect(cards[0]).toHaveProperty('emoji')
    expect(cards[0]).toHaveProperty('isFlipped')
    expect(cards[0]).toHaveProperty('isMatched')
  })
})
