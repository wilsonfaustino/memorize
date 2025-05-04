import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCards } from '@/hooks/use-cards'

// Mocks
vi.mock('@/helpers', () => ({
  setupEmojiArray: vi.fn(() => [
    { id: 'card1', emoji: '🦊', isFlipped: false, isMatched: false },
    { id: 'card2', emoji: '🐸', isFlipped: false, isMatched: false },
    { id: 'card3', emoji: '🦊', isFlipped: false, isMatched: false },
    { id: 'card4', emoji: '🐸', isFlipped: false, isMatched: false },
  ]),
  shuffleArray: vi.fn((arr) => [...arr]),
}))

describe('useCards', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllTimers()
  })

  it('should initialize with empty cards when no difficulty is provided', () => {
    const { result } = renderHook(() => useCards({ difficulty: null }))
    expect(result.current.cards).toEqual([])
  })

  it('should initialize cards when difficulty is provided', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))
    expect(result.current.cards).toHaveLength(4)
  })

  it('should flip a card when flipCard is called', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))

    act(() => {
      result.current.flipCard('card1')
    })

    expect(result.current.cards[0].isFlipped).toBe(true)
  })

  it('should match cards with the same emoji', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))

    act(() => {
      result.current.flipCard('card1') // 🦊
    })

    act(() => {
      result.current.flipCard('card3') // 🦊
      vi.advanceTimersByTime(1500)
    })

    expect(result.current.cards[0].isMatched).toBe(true)
    expect(result.current.cards[2].isMatched).toBe(true)
  })

  it('should flip back unmatched cards after delay', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))

    act(() => {
      result.current.flipCard('card1') // 🦊
    })
    act(() => {
      result.current.flipCard('card2') // 🐸
    })

    expect(result.current.cards[0].isFlipped).toBe(true)
    expect(result.current.cards[1].isFlipped).toBe(true)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.cards[0].isFlipped).toBe(false)
    expect(result.current.cards[1].isFlipped).toBe(false)
  })

  it('should increment moves counter when attempting a match', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))

    act(() => {
      result.current.flipCard('card1')
    })
    act(() => {
      result.current.flipCard('card2')
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.moves).toBe(1)
  })

  it('should restart game when restartGame is called', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))

    act(() => {
      result.current.flipCard('card1')
    })
    act(() => {
      result.current.flipCard('card3')
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.cards[0].isMatched).toBe(true)

    act(() => {
      result.current.restartGame()
    })

    expect(result.current.cards[0].isMatched).toBe(false)
    expect(result.current.moves).toBe(0)
  })

  it('should show success modal when all cards are matched', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))

    act(() => {
      result.current.flipCard('card1') // 🦊
    })
    act(() => {
      result.current.flipCard('card3') // 🦊
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      result.current.flipCard('card2') // 🐸
    })
    act(() => {
      result.current.flipCard('card4') // 🐸
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.isOpen).toBe(true)
  })

  it('should not allow flipping more than 2 cards at once', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))

    act(() => {
      result.current.flipCard('card1')
    })
    act(() => {
      result.current.flipCard('card2')
    })
    act(() => {
      // This should be ignored
      result.current.flipCard('card3')
    })

    expect(result.current.cards[0].isFlipped).toBe(true)
    expect(result.current.cards[1].isFlipped).toBe(true)
    expect(result.current.cards[2].isFlipped).toBe(false)
  })

  it('should not allow flipping the same card twice', () => {
    const { result } = renderHook(() => useCards({ difficulty: 'easy' }))

    act(() => {
      result.current.flipCard('card1')
      result.current.flipCard('card1') // should be ignored
    })

    expect(result.current.cards[0].isFlipped).toBe(true)
  })
})
