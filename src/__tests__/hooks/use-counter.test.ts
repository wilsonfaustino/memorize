import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useCounter } from '@/hooks/use-counter'

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter({}))
    expect(result.current.counter).toBe(0)
  })

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }))
    expect(result.current.counter).toBe(10)
  })

  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter({}))
    act(() => {
      result.current.incrementCounter()
    })
    expect(result.current.counter).toBe(1)
  })

  it('should decrement counter', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }))
    act(() => {
      result.current.decrementCounter()
    })
    expect(result.current.counter).toBe(4)
  })

  it('should reset counter to initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }))
    act(() => {
      result.current.incrementCounter()
      result.current.incrementCounter()
      result.current.resetCounter()
    })
    expect(result.current.counter).toBe(5)
  })

  it('should not increment above maxValue', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5, maxValue: 6 }))
    act(() => {
      result.current.incrementCounter()
      result.current.incrementCounter()
      result.current.incrementCounter()
    })
    expect(result.current.counter).toBe(6)
  })

  it('should not decrement below minValue', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5, minValue: 4 }))
    act(() => {
      result.current.decrementCounter()
      result.current.decrementCounter()
      result.current.decrementCounter()
    })
    expect(result.current.counter).toBe(4)
  })

  it('should reset to initialValue even after hitting maxValue', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 3, maxValue: 4 }))
    act(() => {
      result.current.incrementCounter()
      result.current.incrementCounter()
      result.current.resetCounter()
    })
    expect(result.current.counter).toBe(3)
  })

  it('should reset even if counter is below initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5, minValue: 0 }))
    act(() => {
      result.current.decrementCounter()
      result.current.decrementCounter()
      result.current.decrementCounter()
      result.current.resetCounter()
    })
    expect(result.current.counter).toBe(5)
  })

  it('should allow incrementing exactly to maxValue', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0, maxValue: 2 }))
    act(() => {
      result.current.incrementCounter()
      result.current.incrementCounter()
    })
    expect(result.current.counter).toBe(2)
  })

  it('should increment infinitely if no maxValue is set', () => {
    const { result } = renderHook(() => useCounter({}))
    act(() => {
      for (let i = 0; i < 100; i++) result.current.incrementCounter()
    })
    expect(result.current.counter).toBe(100)
  })
})
