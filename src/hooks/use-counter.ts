import { useCallback, useState } from 'react'

interface UseCounterProps {
  initialValue?: number
  maxValue?: number
  minValue?: number
}

export function useCounter({ initialValue = 0, maxValue = Infinity, minValue = -Infinity }: UseCounterProps) {
  const [counter, setCounter] = useState(initialValue)

  const incrementCounter = useCallback(() => {
    setCounter((prev) => Math.min(prev + 1, maxValue))
  }, [maxValue])

  const decrementCounter = useCallback(() => {
    setCounter((prev) => Math.max(prev - 1, minValue))
  }, [minValue])

  const resetCounter = useCallback(() => {
    setCounter(initialValue)
  }, [initialValue])

  return { counter, incrementCounter, decrementCounter, resetCounter }
}
