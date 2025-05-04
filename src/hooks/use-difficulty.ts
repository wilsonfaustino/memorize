import { useCallback, useState } from 'react'
import type { Difficulty } from '@/@types'

export function useDifficulty() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)

  const handleDifficultyChange = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
  }, [])

  const resetDifficulty = useCallback(() => {
    setDifficulty(null)
  }, [])

  return {
    difficulty,
    handleDifficultyChange,
    resetDifficulty,
  }
}
