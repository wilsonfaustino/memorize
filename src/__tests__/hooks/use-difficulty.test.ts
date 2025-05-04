import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Difficulty } from '@/@types'
import { useDifficulty } from '@/hooks/use-difficulty'

describe('useDifficulty', () => {
  it('should initialize with difficulty set to null', () => {
    const { result } = renderHook(() => useDifficulty())
    expect(result.current.difficulty).toBe(null)
  })

  it('should update difficulty when handleDifficultyChange is called', () => {
    const { result } = renderHook(() => useDifficulty())
    const newDifficulty: Difficulty = 'easy'

    act(() => {
      result.current.handleDifficultyChange(newDifficulty)
    })

    expect(result.current.difficulty).toBe(newDifficulty)
  })

  it('should set difficulty to null when resetDifficulty is called', () => {
    const { result } = renderHook(() => useDifficulty())
    const newDifficulty: Difficulty = 'medium'

    act(() => {
      result.current.handleDifficultyChange(newDifficulty)
    })
    expect(result.current.difficulty).toBe(newDifficulty)

    act(() => {
      result.current.resetDifficulty()
    })
    expect(result.current.difficulty).toBe(null)
  })

  it('should maintain function references between renders', () => {
    const { result, rerender } = renderHook(() => useDifficulty())

    const { handleDifficultyChange, resetDifficulty } = result.current

    rerender()

    expect(result.current.handleDifficultyChange).toBe(handleDifficultyChange)
    expect(result.current.resetDifficulty).toBe(resetDifficulty)
  })

  it('should handle multiple difficulty changes', () => {
    const { result } = renderHook(() => useDifficulty())

    act(() => {
      result.current.handleDifficultyChange('easy')
    })
    expect(result.current.difficulty).toBe('easy')

    act(() => {
      result.current.handleDifficultyChange('medium')
    })
    expect(result.current.difficulty).toBe('medium')

    act(() => {
      result.current.handleDifficultyChange('hard')
    })
    expect(result.current.difficulty).toBe('hard')
  })
})
