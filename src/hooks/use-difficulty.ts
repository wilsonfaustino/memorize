import { useState } from 'react'
import type { Difficulty } from '@/@types'

export function useDifficulty() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
  }

  const resetDifficulty = () => {
    setDifficulty(null)
  }

  return {
    difficulty,
    handleDifficultyChange,
    resetDifficulty,
  }
}
